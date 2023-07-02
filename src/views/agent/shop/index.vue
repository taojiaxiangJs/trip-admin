<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllShop"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.searchString" type="text" placeholder="输入要搜索的内容" @keydown.enter="$table?.handleSearch" />
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
      <n-form-item path="storeName" label="店铺名称" :rule="[{ required: true, message: '请输入店铺名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.storeName" :disabled="!!modalForm.storeId" placeholder="请输入店铺名称" />
      </n-form-item>
      <n-form-item path="contactName" label="联系人" :rule="[{ required: true, message: '请输入联系人', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.contactName" placeholder="请输入联系人" />
      </n-form-item>
      <n-form-item path="contactPhone" label="电话">
        <n-input v-model:value="modalForm.contactPhone" placeholder="请输入电话" />
      </n-form-item>
      <div flex>
        <n-form-item path="businessStartTime" label="营业时间">
          <n-time-picker v-model:formatted-value="modalForm.businessStartTime" value-format="HH:mm" format="HH:mm" placeholder="开始时间" />
        </n-form-item>
        <n-form-item path="businessEndTime" label="" ml-12>
          <n-time-picker v-model:formatted-value="modalForm.businessEndTime" value-format="HH:mm" format="HH:mm" placeholder="结束时间" />
        </n-form-item>
      </div>

      <n-form-item path="city" label="省市区">
        <n-tree-select v-model:value="modalForm.city" :options="[]" placeholder="请选择省市区" />
      </n-form-item>

      <n-form-item path="address" label="店铺地址">
        <n-input v-model:value="modalForm.address" placeholder="请输入店铺地址" />
      </n-form-item>
      <n-form-item path="scope" label="经营范围">
        <n-checkbox-group v-model:value="modalForm.scope">
          <n-space item-style="display: flex;">
            <n-checkbox v-for="item in options.scope" :key="item.value" :value="item.value" :label="item.label" />
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item path="storeImageUrl" label="店铺图片">
        <n-input v-show="false" v-model:value="modalForm.storeImageUrl" />
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          :max="1"
          list-type="image-card"
          @finish="handleUploadFinish"
        >
          点击上传
        </n-upload>
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
import { NButton, NImage } from 'naive-ui'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import api from '../api'

defineOptions({ name: 'Crud' })

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
  storeId: '',
  storeName: '',
  contactName: '',
  contactPhone: '',
  businessStartTime: undefined,
  businessEndTime: undefined,
  city: [],
  address: '',
  scope: null,
  storeImageUrl: ''
})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '店铺名称', key: 'storeName' },
  { title: '联系人', key: 'contactName' },
  { title: '电话', key: 'contactPhone' },
  { title: '地址', key: 'address' },
  {
    title: '营业时间',
    key: 'businessStartTime',
    render(row) {
      return h('span', `${row.businessStartTime}-${row.businessEndTime}`)
    }
  },
  {
    title: '店铺图片',
    key: 'storeImageUrl',
    render(row) {
      return h(NImage, { width: '30', height: '30', src: row.storeImageUrl })
    }
  },
  {
    title: '店铺二维码',
    key: 'qrCodeUrl',
    render(row) {
      return h(NImage, { width: '30', height: '30', src: row.qrCodeUrl })
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
            onClick: () => handleDelete(row.storeId)
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
  modalForm.value.storeId = row.storeId || ''
  modalForm.value.storeName = row.storeName || ''
  modalForm.value.contactName = row.contactName || ''
  modalForm.value.contactPhone = row.contactPhone || ''
  modalForm.value.address = row.address || ''
  modalForm.value.storeImageUrl = row.storeImageUrl || ''

  modalForm.value.businessStartTime = row.businessStartTime || ''
  modalForm.value.businessEndTime = row.businessEndTime || ''
  modalForm.value.city = (row.city && JSON.parse(row.city)) || []
  modalForm.value.scope = getScopeValue(row.scopeList) || null

  fileList.value = [
    {
      status: 'finished',
      url: row.storeImageUrl
    }
  ]

  console.log(modalForm.value)
  handleModal('edit')
}

const getScopeValue = (value) => {
  return value.map((e) => e.scopeCode)
}
const fileList = ref([])
const handleUploadFinish = ({ file }) => {
  /**
   * fullPath :  "/11.png"
   * name :  "11.png"
   * percentage :  100
   * status :  "finished"
   * thumbnailUrl :  null
   * type :  "image/png"
   * */
  console.log(file)
  modalForm.storeImageUrl = `前缀${file.fullPath}`
  fileList.value = [
    {
      status: 'finished',
      // url: 前缀 + file.fullPath
      url: 'http://caiyu365.oss-cn-hangzhou.aliyuncs.com/image/product/44472933a2621168b539504f3f1cb542.jpg'
    }
  ]
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.storeId = ''
  modalForm.value.storeName = ''
  modalForm.value.contactName = ''
  modalForm.value.contactPhone = ''
  modalForm.value.address = ''
  modalForm.value.storeImageUrl = ''
  modalForm.value.businessStartTime = undefined
  modalForm.value.businessEndTime = undefined
  modalForm.value.city = []
  modalForm.value.scope = null
  fileList.value = []
}
// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
    } else {
      console.log(errors)
    }
  })
}

const { handleDelete } = useCRUD({
  doDelete: api.deletePost,
  refresh: () => $table.value?.handleSearch()
})
</script>
