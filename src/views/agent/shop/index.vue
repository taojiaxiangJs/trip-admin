<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllStore"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.keyWord" type="text" placeholder="输入要搜索的内容" @keydown.enter="$table?.handleSearch" />
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="success" @click="handleModal('add')">添加</n-button>
      </template>
    </CrudTable>
  </CommonPage>
  <n-modal
    v-model:show="modalVisible"
    :title="modalTitleMap[modalType]"
    preset="card"
    :style="{ width: '600px' }"
    :bordered="false"
    @close="handleCancel"
  >
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="80" :rules="rules" :model="modalForm">
      <n-form-item path="name" label="店铺名称" :rule="[{ required: true, message: '请输入店铺名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.name" :disabled="!!modalForm.storeId" placeholder="请输入店铺名称" />
      </n-form-item>
      <n-form-item path="contactName" label="联系人" :rule="[{ required: true, message: '请输入联系人', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.contactName" placeholder="请输入联系人" />
      </n-form-item>
      <n-form-item path="contact" label="电话" :rule="[{ required: true, message: '请输入请输入电话', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.contact" placeholder="请输入电话" />
      </n-form-item>
      <div flex>
        <n-form-item path="businessStartTime" label="营业时间" :rule="[{ required: true, message: '请选择开始时间', trigger: ['change', 'blur'] }]">
          <n-time-picker v-model:formatted-value="modalForm.businessStartTime" value-format="HH:mm" format="HH:mm" placeholder="开始时间" />
        </n-form-item>
        <n-form-item path="businessEndTime" label="" ml-12 :rule="[{ required: true, message: '请选择结束时间', trigger: ['change', 'blur'] }]">
          <n-time-picker v-model:formatted-value="modalForm.businessEndTime" value-format="HH:mm" format="HH:mm" placeholder="结束时间" />
        </n-form-item>
      </div>

      <n-form-item
        v-if="modalType === 'add'"
        path="county"
        label="省市区"
        :rule="[{ required: true, message: '请选择省市区', trigger: ['input', 'blur'] }]"
      >
        <n-cascader
          v-model:value="modalForm.county"
          placeholder="请选择省市区"
          :options="chinaOptions"
          check-strategy="child"
          label-field="name"
          value-field="code"
          remote
          :on-load="formatChinaData"
        />
      </n-form-item>

      <n-form-item
        v-if="modalType === 'add'"
        path="address"
        label="店铺地址"
        :rule="[{ required: true, message: '请输入店铺地址', trigger: ['input', 'blur'] }]"
      >
        <n-input v-model:value="modalForm.address" placeholder="请输入店铺地址" />
      </n-form-item>
      <n-form-item path="businessType" label="经营范围" :rule="[{ type: 'array', required: true, message: '请选择经营范围', trigger: ['change'] }]">
        <n-checkbox-group v-model:value="modalForm.businessType">
          <n-space item-style="display: flex;">
            <n-checkbox v-for="item in options.scope" :key="item.value" :value="item.value" :label="item.label" />
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item path="picUrl" label="店铺图片">
        <n-input v-show="false" v-model:value="modalForm.picUrl" />
        <n-upload list-type="image-card" :max="1" :custom-request="uploadImage">上传文件</n-upload>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex justify-end>
        <n-button @click="handleCancel()">取消</n-button>
        <n-button :loading="modalLoading" ml-20 type="primary" @click="handleSave()">确定</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, NImage, useMessage, useDialog } from 'naive-ui'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import api from '../api'
import globalApi from '@/api'
import { getChinaData, ossUpload } from '@/utils'

defineOptions({ name: 'Crud' })
const message = useMessage()
const dialog = useDialog()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
const $modalForm = ref(null)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('')
const modalTitleMap = reactive({
  add: '添加店铺',
  edit: '编辑店铺'
})
const modalForm = ref({
  id: undefined,
  storeId: undefined,
  name: undefined,
  contactName: undefined,
  contact: undefined,
  businessStartTime: undefined,
  businessEndTime: undefined,
  county: undefined,
  address: undefined,
  businessType: null,
  picUrl: undefined,
  attachmentId: undefined
})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '店铺名称', key: 'name' },
  { title: '联系人', key: 'contactName' },
  { title: '电话', key: 'contact' },
  { title: '地址', key: 'address' },
  {
    title: '营业时间',
    key: 'businessStartTime',
    render(row) {
      return h('span', `${row.businessStartTime}-${row.businessEndTime}`)
    }
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h('span', row.status === 1 ? '上线中' : '已下线')
    }
  },
  {
    title: '店铺图片',
    key: 'picUrl',
    render(row) {
      return row.attachmentAccessUrl ? h(NImage, { width: '30', height: '30', src: row.attachmentAccessUrl }) : h('span', '--')
    }
  },
  {
    title: '店铺二维码',
    key: 'qrCode',
    render(row) {
      return row.qrCode ? h(NImage, { width: '30', height: '30', src: row.qrCode }) : h('span', '--')
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row)
          },
          { default: () => '编辑' }
        ),
        row.status === 1
          ? h(
              NButton,
              {
                size: 'small',
                type: 'tertiary',
                style: 'margin-left: 15px;',
                onClick: () => handleEnable(row)
              },
              { default: () => '下线' }
            )
          : h(
              NButton,
              {
                size: 'small',
                type: 'success',
                style: 'margin-left: 15px;',
                onClick: () => handleEnable(row)
              },
              { default: () => '上线' }
            ),
        row.status === 0
          ? h(
              NButton,
              {
                size: 'small',
                type: 'error',
                style: 'margin-left: 15px;',
                onClick: () => handleDelete(row.id)
              },
              { default: () => '删除' }
            )
          : ''
      ]
    }
  }
]

const handleModal = (type) => {
  modalType.value = type
  modalVisible.value = true
}

const handleTable = (row) => {
  modalForm.value.id = row.id
  modalForm.value.storeId = row.storeId
  modalForm.value.name = row.name
  modalForm.value.contactName = row.contactName
  modalForm.value.contact = row.contact
  modalForm.value.address = row.address
  modalForm.value.picUrl = row.picUrl
  modalForm.value.businessStartTime = row.businessStartTime
  modalForm.value.businessEndTime = row.businessEndTime
  modalForm.value.province = row.province
  modalForm.value.city = row.city
  modalForm.value.county = row.county
  modalForm.value.status = row.status
  modalForm.value.attachmentGroupId = row.attachmentGroupId
  modalForm.value.attachmentId = row.attachmentId
  modalForm.value.businessType = getScopeValue(row.businessType) || []

  handleModal('edit')
}

const getScopeValue = (value) => {
  return value.includes(',') ? value.split(',') : value.split('')
}

const uploadImage = ({ file, data, onFinish, onError }) => {
  console.log(data)
  globalApi
    .uploadFileOss({
      type: 'store',
      fileType: file.type.split('/')[1]
    })
    .then((res) => {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', (event) => {
        const arrayBuffer = event.target.result
        ossUpload
          .put(res.data.accessUrl, arrayBuffer)
          .then((oss) => {
            console.log(oss)
            modalForm.value.attachmentId = res.data.id
            onFinish()
          })
          .catch((error) => {
            message.error(error.msg)
            onError()
          })
      })
      fileReader.readAsArrayBuffer(file.file)
    })
    .catch((error) => {
      message.error(error.msg)
      onError()
    })
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = undefined
  modalForm.value.storeId = undefined
  modalForm.value.name = undefined
  modalForm.value.contactName = undefined
  modalForm.value.contact = undefined
  modalForm.value.address = undefined
  modalForm.value.picUrl = undefined
  modalForm.value.attachmentId = undefined
  modalForm.value.businessStartTime = undefined
  modalForm.value.businessEndTime = undefined
  modalForm.value.county = undefined
  modalForm.value.businessType = []
}
// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      let ajax = null
      if (modalType.value === 'add') {
        modalForm.value.province = modalForm.value.county.substr(0, 2)
        modalForm.value.city = modalForm.value.county.substr(0, 4)
        modalForm.value.status = 0
        ajax = api.postAddStore
      } else {
        ajax = api.putEditStore
      }
      modalForm.value.businessType = modalForm.value.businessType.toString()
      ajax({ ...modalForm.value }).then(() => {
        message.success('操作成功！')
        handleCancel()
        $table.value?.handleSearch()
      })
    } else {
      console.log(errors)
    }
  })
}

const chinaData = getChinaData()
const chinaOptions = ref(chinaData.provinces.map((e) => ({ ...e, isLeaf: false })))
const formatChinaData = (option) => {
  return new Promise((resolve) => {
    switch (option.code.length) {
      case 2:
        option.children = chinaData.cities.filter((e) => e.provinceCode === option.code).map((e) => ({ ...e, isLeaf: false }))
        break
      case 4:
        option.children = chinaData.areas.filter((e) => e.cityCode === option.code)
        break
    }
    resolve()
  })
}

const handleEnable = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定${row.status === 1 ? '下线' : '上线'}该店铺`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      let reqApi = row.status === 1 ? api.putOnlineStore : api.putOfflineStore
      reqApi(row.id).then(() => {
        message.success('操作成功')
        $table.value?.handleSearch()
      })
    },
    onNegativeClick: () => {
      message.info('已取消')
    }
  })
}

const { handleDelete } = useCRUD({
  doDelete: api.deleteStore,
  refresh: () => $table.value?.handleSearch()
})
</script>
