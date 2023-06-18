<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAll"
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
        <QueryBarItem label="状态" :label-width="40">
          <n-select v-model:value="queryItems.status" :options="options.status" />
        </QueryBarItem>
        <QueryBarItem label="店铺" :label-width="40">
          <n-select v-model:value="queryItems.storeId" filterable placeholder="选择店铺" :options="storeList" />
        </QueryBarItem>
      </template>
      <template #extraHandle>
        <n-button ml-20 type="success" @click="handleModal('add')">添加</n-button>
        <n-button ml-20 type="primary" @click="exportData">导出数据</n-button>
      </template>
    </CrudTable>
  </CommonPage>
  <n-modal v-model:show="modalVisible" :title="modalTitleMap[modalType]" preset="card" :style="{ width: '600px' }" :bordered="false">
    <n-form v-if="modalType !== 'qrcode'" ref="$modalForm" label-placement="left" label-align="right" :label-width="80" :model="modalForm">
      <n-form-item path="chassisNumber" label="车架号" :rule="[{ required: true, message: '请输入车架号', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.chassisNumber" :disabled="!!modalForm.id" placeholder="请输入车架号" />
      </n-form-item>
      <n-form-item path="productId" label="品牌" :rule="[{ required: true, message: '请选择品牌', trigger: ['change', 'blur'] }]">
        <n-select v-model:value="modalForm.productId" filterable placeholder="请选择品牌" :options="brandList" />
      </n-form-item>
      <n-form-item path="licensePlateNumber" label="车牌号">
        <n-input v-model:value="modalForm.licensePlateNumber" placeholder="请输入车架号" />
      </n-form-item>
      <n-form-item path="controlType" label="中控类型">
        <n-select
          v-model:value="modalForm.controlType"
          placeholder="*泰比特中控的设备号输入：S/N号，万位中控设备号输入IMEI号"
          :options="options.controlType"
        />
      </n-form-item>
      <n-form-item path="equipmentCode" label="设备号">
        <n-input v-model:value="modalForm.equipmentCode" placeholder="请输入设备号" />
      </n-form-item>
      <n-form-item path="storeId" label="所属店铺">
        <n-select v-model:value="modalForm.storeId" filterable placeholder="请选择店铺" :options="storeList" />
      </n-form-item>
    </n-form>

    <div v-if="modalType === 'qrcode'" text-center>
      <img :src="qrcodeData.url" />
      <p>{{ qrcodeData.qrcode }}</p>
    </div>
    <template v-if="modalType !== 'qrcode'" #footer>
      <div flex justify-end>
        <n-button @click="handleCancel()">取消</n-button>
        <n-button :loading="modalLoading" ml-20 type="primary" @click="handleSave()">确定</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton } from 'naive-ui'
import QRCode from 'qrcode'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import globalApi from '@/api'
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
  add: '添加设备',
  edit: '编辑设备',
  qrcode: '设备二维码'
})
const modalForm = ref({
  id: '',
  chassisNumber: '',
  productId: undefined,
  licensePlateNumber: '',
  controlType: undefined,
  equipmentCode: '',
  storeId: undefined
})

onActivated(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getStore().then((res) => {
    storeList.value = res.data?.list.map((e) => ({ label: e.storeName, value: e.storeId }))
  })
}
getStoreList()

// 店铺
const brandList = ref([])
const getBrandList = () => {
  globalApi.getBrand().then((res) => {
    brandList.value = res.data?.list.map((e) => ({ ...e, label: e.productName, value: e.productId + '' }))
    console.log()
  })
}
getBrandList()

const columns = [
  { title: '车架号', key: 'chassisNumber' },
  { title: '车牌', key: 'licensePlateNumber' },
  { title: '设备号', key: 'equipmentCode' },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h('span', valueToName(row.status, options.status))
    }
  },

  { title: '店铺名称', key: 'storeName' },
  { title: '代理商', key: 'agentName' },
  {
    title: '中控号',
    key: 'controlType',
    render(row) {
      return h('span', valueToName(row.controlType, options.controlType))
    }
  },
  { title: '车辆来源', key: 'sourceType' },
  {
    title: '操作',
    key: 'actions',
    width: 340,
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
            onClick: () => handleTable(row, 'edit')
          },
          { default: () => '编辑' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 15px;',
            onClick: () => handleTable(row, 'qrcode')
          },
          { default: () => '二维码' }
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

const valueToName = (value, options) => {
  return options.filter((e) => e.value === value + '')[0]?.label || ''
}

// 导出数据
const exportData = () => {
  console.log({ ...queryItems.value })
}

const handleModal = (type) => {
  modalType.value = type
  modalVisible.value = true
}

const qrcodeData = ref({})
const handleTable = async (row, type) => {
  if (type === 'qrcode') {
    qrcodeData.value.qrcode = row.qrCode
    qrcodeData.value.url = await QRCode.toDataURL(row.qrCode)
    handleModal('qrcode')
  }
  if (type === 'edit') {
    modalForm.value.id = row.id
    modalForm.value.chassisNumber = row.chassisNumber || ''
    modalForm.value.productId = row.productId ? row.productId + '' : undefined
    modalForm.value.licensePlateNumber = row.licensePlateNumber || ''
    modalForm.value.controlType = row.controlType || row.controlType === 0 ? row.controlType + '' : undefined
    modalForm.value.equipmentCode = row.equipmentCode || ''
    modalForm.value.storeId = row.storeId ? row.storeId : undefined
    handleModal('edit')
  }
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = ''
  modalForm.value.chassisNumber = ''
  modalForm.value.productId = undefined
  modalForm.value.licensePlateNumber = ''
  modalForm.value.controlType = undefined
  modalForm.value.equipmentCode = ''
  modalForm.value.storeId = undefined
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
