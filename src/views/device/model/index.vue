<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getDeviceModel"
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
      <n-form-item path="productName" label="名称" :rule="[{ required: true, message: '请输入名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.productName" :disabled="!!modalForm.productId" placeholder="请输入名称" />
      </n-form-item>
      <n-form-item path="brand" label="品牌" :rule="[{ required: true, message: '请输入品牌', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.brand" placeholder="请输入品牌" />
      </n-form-item>
      <n-form-item path="voltage" label="电池">
        <n-input v-model:value="modalForm.voltage" placeholder="请输入电池规格"><template #suffix>伏</template></n-input>
      </n-form-item>
      <n-form-item path="speed" label="速度">
        <n-input v-model:value="modalForm.speed" placeholder="请输入速度"><template #suffix>km/h</template></n-input>
      </n-form-item>
      <n-form-item path="price" label="价格" :rule="[{ required: true, message: '请输入价格', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.price" placeholder="请输入价格"><template #suffix>元</template></n-input>
      </n-form-item>
      <n-form-item path="imageUrl" label="图片">
        <n-input v-show="false" v-model:value="modalForm.imageUrl" />
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
import { formatFee } from '@/utils'
import { useCRUD } from '@/composables'
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
  add: '添加型号',
  edit: '编辑型号'
})
const modalForm = ref({
  productId: '',
  productName: '',
  brand: '',
  voltage: '',
  speed: '',
  price: '',
  imageUrl: ''
})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  { title: '产品名称', key: 'productName' },
  { title: '品牌', key: 'brand' },
  { title: '电池(V)', key: 'voltage' },
  { title: '车速(km/h)', key: 'speed' },
  {
    title: '价格(元)',
    key: 'price',
    render(row) {
      return h('span', formatFee(row.price, 'front'))
    }
  },
  {
    title: '图片',
    key: 'imageUrl',
    render(row) {
      return h(NImage, { width: '30', height: '30', src: row.imageUrl })
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
            onClick: () => handleDelete(row.productId)
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
  modalForm.value.productId = row.productId || ''
  modalForm.value.productName = row.productName || ''
  modalForm.value.brand = row.brand || ''
  modalForm.value.voltage = row.voltage || ''
  modalForm.value.speed = row.speed || ''
  modalForm.value.price = row.price || ''
  modalForm.value.imageUrl = row.imageUrl || ''
  fileList.value = [
    {
      status: 'finished',
      url: row.imageUrl
    }
  ]
  handleModal('edit')
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
  modalForm.imageUrl = `前缀${file.fullPath}`
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
  modalForm.value.productId = ''
  modalForm.value.productName = ''
  modalForm.value.brand = ''
  modalForm.value.voltage = ''
  modalForm.value.speed = ''
  modalForm.value.price = ''
  modalForm.value.imageUrl = ''
  fileList.value = []
}
// modal保存
const handleSave = () => {
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
