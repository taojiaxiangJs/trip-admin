<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllDeviceType"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input
            v-model:value="queryItems.searchString"
            type="text"
            placeholder="订单号/租借人/联系方式/店铺/推荐人"
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="success" @click="handleModal('add')">添加</n-button>
      </template>
    </CrudTable>
  </CommonPage>
  <n-modal v-model:show="modalVisible" :title="modalTitleMap[modalType]" preset="card" :style="{ width: '600px' }" :bordered="false">
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="80" :rules="rules" :model="modalForm">
      <n-form-item path="name" label="名称" :rule="[{ required: true, message: '请输入名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.name" :disabled="!!modalForm.id" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item path="brand" label="品牌" :rule="[{ required: true, message: '请输入品牌', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.brand" placeholder="请输入品牌" />
      </n-form-item>
      <n-form-item path="battery" label="电池" :rule="[{ required: true, message: '请输入电池规格', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.battery" placeholder="请输入电池规格"><template #suffix>伏</template></n-input>
      </n-form-item>
      <n-form-item path="speed" label="速度" :rule="[{ required: true, message: '请输入速度', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.speed" placeholder="请输入速度"><template #suffix>km/h</template></n-input>
      </n-form-item>
      <n-form-item path="price" label="价格" :rule="[{ required: true, message: '请输入价格', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.price" placeholder="请输入价格"><template #suffix>元</template></n-input>
      </n-form-item>
      <n-form-item path="attachmentId" label="图片">
        <n-input v-show="false" v-model:value="modalForm.attachmentId" />
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
import { NButton, NImage, useMessage } from 'naive-ui'
// import { formatFee } from '@/utils'
import { useCRUD } from '@/composables'
import api from '../api'
import globalApi from '@/api'
import { ossUpload } from '@/utils'

defineOptions({ name: 'Crud' })
const message = useMessage()
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
  add: '添加型号',
  edit: '编辑型号'
})
const modalForm = ref({
  id: '',
  name: '',
  brand: '',
  battery: '',
  speed: '',
  price: '',
  attachmentId: ''
})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '产品名称', key: 'name' },
  { title: '品牌', key: 'brand' },
  { title: '电池(V)', key: 'battery' },
  { title: '车速(km/h)', key: 'speed' },
  {
    title: '价格(元)',
    key: 'price'
    // render(row) {
    //   return h('span', formatFee(row.price, 'front'))
    // }
  },
  {
    title: '图片',
    key: 'picUrl',
    render(row) {
      return h(NImage, { width: '30', height: '30', src: row.picUrl })
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
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.id)
          },
          { default: () => '删除' }
        )
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
  modalForm.value.name = row.name
  modalForm.value.brand = row.brand
  modalForm.value.battery = row.battery
  modalForm.value.speed = row.speed
  modalForm.value.price = row.price
  modalForm.value.attachmentId = row.attachmentId
  handleModal('edit')
}

const uploadImage = ({ file, data, onFinish, onError }) => {
  console.log(file, data)
  globalApi
    .uploadFileOss({
      type: 'deviceType',
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
  modalForm.value.id = ''
  modalForm.value.name = ''
  modalForm.value.brand = ''
  modalForm.value.battery = ''
  modalForm.value.speed = ''
  modalForm.value.price = ''
  modalForm.value.attachmentId = ''
}
// modal保存
const handleSave = () => {
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
      let ajax = null
      if (modalType.value === 'add') {
        ajax = api.postAddDeviceType
      } else {
        ajax = api.putEditDeviceType
      }
      ajax({ ...modalForm.value }).then(() => {
        $table.value?.handleSearch()
        handleCancel()
      })
    } else {
      console.log(errors)
    }
  })
}

const { handleDelete } = useCRUD({
  doDelete: api.deleteDeviceType,
  refresh: () => $table.value?.handleSearch()
})
</script>
