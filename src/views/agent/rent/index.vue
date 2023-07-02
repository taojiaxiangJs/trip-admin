<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllRent"
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
    :style="{ width: '800px' }"
    :bordered="false"
    @close="handleCancel"
  >
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="80" :rules="rules" :model="modalForm">
      <n-form-item path="productType" label="租用物" :rule="[{ required: true, message: '请选择租用物', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.productType" name="radiogroup">
          <n-space>
            <n-radio v-for="item in options.orderType" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="name" label="展示名" :rule="[{ required: true, message: '请输入展示名', trigger: ['input', 'input', 'blur'] }]">
        <n-input v-model:value="modalForm.name" placeholder="请输入展示名" />
      </n-form-item>
      <n-form-item path="minUnitNum" label="起租期" :rule="[{ required: true, message: '请输入起租期', trigger: ['change', 'input', 'blur'] }]">
        <n-input v-model:value="modalForm.minUnitNum" placeholder="请输入起租期"><template #suffix>月</template></n-input>
      </n-form-item>
      <n-form-item path="rentUnitNum" label="租期" :rule="[{ required: true, message: '请输入租期', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.rentUnitNum" placeholder="请输入租期"><template #suffix>月</template></n-input>
      </n-form-item>
      <n-form-item path="payType" label="支付方式">
        <n-select v-model:value="modalForm.payType" :options="options.payType" placeholder="请选择支付方式" />
      </n-form-item>
      <n-form-item path="rentUnitFee" label="价格">
        <n-input v-model:value="modalForm.rentUnitFee" placeholder="请输入价格"><template #suffix>元/月</template></n-input>
        <n-button ml-20 type="success" @click="handle2Modal(modalForm.unitFee)">高级设置</n-button>
      </n-form-item>
      <n-form-item path="depositFee" label="押金">
        <n-input v-model:value="modalForm.depositFee" placeholder="请输入押金"><template #suffix>元</template></n-input>
      </n-form-item>
      <n-form-item path="overdueFine" label="滞纳金">
        <n-input v-model:value="modalForm.overdueFine" placeholder="请输入滞纳金"><template #suffix>元/日</template></n-input>
      </n-form-item>
      <n-form-item path="storeId" label="店铺">
        <n-select v-model:value="modalForm.storeId" filterable placeholder="选择店铺" :options="storeList" />
      </n-form-item>

      <n-form-item path="productImageUrl" label="产品图片">
        <n-input v-show="false" v-model:value="modalForm.productImageUrl" />
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
  <n-modal v-model:show="modal2Visible" title="租金设置" preset="card" :style="{ width: '800px' }" @close="handle2Cancel">
    <n-form ref="$modal2Form" label-placement="left" label-align="right" inline flex-wrap :label-width="80" :rules="rules" :model="modal2Form">
      <n-form-item v-for="(item, index) in modal2Form.unitFee" :key="index" :label="`第${index + 1}期租金`">
        <n-input-number v-model:value="modal2Form.unitFee[index].value" placeholder="请输入金额" :disabled="modal2Type !== 'edit'"
          ><template #suffix>元</template></n-input-number
        >
        <n-button v-if="modal2Type === 'edit'" strong secondary circle type="error" ml-4 @click="handle2Delete(index)">
          <template #icon>
            <icon-typcn:trash />
          </template>
        </n-button>
      </n-form-item>
      <n-button v-if="modal2Type === 'edit'" type="success" @click="handle2Add()">添加期数</n-button>
    </n-form>
    <template #footer>
      <div flex items-center justify-between>
        <div><span v-if="modal2Type === 'edit'">*不能超过设定值，后面期次和最后一期自定义金额相同。</span></div>
        <div>
          <n-button @click="handle2Cancel()">{{ modal2Type === 'edit' ? '取消' : '关闭' }}</n-button>
          <n-button v-if="modal2Type === 'edit'" :loading="modalLoading" ml-20 type="primary" @click="handle2Save()">确定</n-button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, useMessage } from 'naive-ui'
import { formatFee, debounce } from '@/utils'
import { useCRUD } from '@/composables'
import globalApi from '@/api'
import { options } from '../constant'
import api from '../api'

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
  add: '添加租金套餐',
  edit: '编辑租金套餐'
})
const modalForm = ref({
  id: '',
  productType: null,
  name: '',
  minUnitNum: '',
  rentUnitNum: '',
  payType: null,
  unitFee: [{ value: null }],
  rentUnitFee: '',
  depositFee: '',
  overdueFine: '',
  storeId: null,
  productImageUrl: ''
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

const columns = [
  { title: '租金套餐名称', key: 'rentName' },
  { title: '展示名称', key: 'name' },
  {
    title: '产品类型',
    key: 'productType',
    render(row) {
      return h('span', options.orderType.filter((e) => e.value == row.productType)[0]?.label)
    }
  },
  {
    title: '支付类型',
    key: 'payType',
    render(row) {
      return h('span', options.payType.filter((e) => e.value == row.payType + '')[0]?.label)
    }
  },
  {
    title: '价格',
    key: 'rentUnitFee',
    render(row) {
      return h('span', formatFee(row.rentUnitFee, 'front'))
    }
  },
  {
    title: '租期',
    key: 'rentUnitNum',
    render(row) {
      return h('span', row.rentUnitNum + '个月')
    }
  },
  {
    title: '起租期',
    key: 'minUnitNum',
    render(row) {
      return h('span', row.minUnitNum + '个月')
    }
  },
  {
    title: '押金（元）',
    key: 'depositFee',
    render(row) {
      return h('span', formatFee(row.depositFee, 'front'))
    }
  },
  {
    title: '滞纳金（元）',
    key: 'overdueFine',
    render(row) {
      return h('span', formatFee(row.overdueFine, 'front'))
    }
  },
  { title: '店铺', key: 'storeName' },
  { title: '租金审核状态', key: 'status' },
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
            onClick: () => handleDetail(row)
          },
          { default: () => '租金明细' }
        ),
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
  modalForm.value.id = row.id || ''
  modalForm.value.productType = `${row.productType}` || ''
  modalForm.value.name = row.name || ''
  modalForm.value.minUnitNum = `${row.minUnitNum}` || ''
  modalForm.value.rentUnitNum = `${row.rentUnitNum}` || ''
  modalForm.value.payType = `${row.payType}` || null
  modalForm.value.unitFee = row.unitFee || [{ value: null }]
  modalForm.value.rentUnitFee = `${row.rentUnitFee}`.slice(0, -2) || ''
  modalForm.value.depositFee = `${row.depositFee}`.slice(0, -2) || ''
  modalForm.value.overdueFine = `${row.overdueFine}`.slice(0, -2) || ''
  modalForm.value.storeId = row.storeId || null

  modalForm.value.productImageUrl = row.productImageUrl || ''
  fileList.value = [
    {
      status: 'finished',
      url: row.productImageUrl
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
  modalForm.productImageUrl = `前缀${file.fullPath}`
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
  modalForm.value.id = ''
  modalForm.value.productType = ''
  modalForm.value.name = ''
  modalForm.value.minUnitNum = ''
  modalForm.value.rentUnitNum = ''
  modalForm.value.payType = null
  modalForm.value.rentUnitFee = ''
  modalForm.value.depositFee = ''
  modalForm.value.overdueFine = ''
  modalForm.value.storeId = null
  modalForm.value.productImageUrl = ''
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

watch(
  () => modalForm.value.rentUnitNum,
  debounce((val) => {
    if (val > 0) {
      if (modalForm.value.unitFee.length > val) {
        modalForm.value.unitFee.length = Number(val)
      }
    } else {
      modalForm.value.unitFee.length = 1
    }
  }, 200)
)

const $modal2Form = ref(null)
const modal2Visible = ref(false)
const modal2Type = ref('edit')
// const modal2Loading = ref(false)
const modal2Form = ref({
  id: '',
  unitFee: [{ value: null }]
})

const handleDetail = (row) => {
  modal2Form.value.id = row.id || ''
  handle2Modal(row.unitFee || [{ value: null }], 'detail')
}

const handle2Modal = (unitFee, type = 'edit') => {
  modal2Form.value.unitFee = unitFee
  modal2Type.value = type
  modal2Visible.value = true
}

const handle2Add = () => {
  if (modalForm.value.unitFee.length >= Number(modalForm.value.rentUnitNum)) {
    message.warning('对不起，设置期数不能超过设定值')
  } else {
    modalForm.value.unitFee.push({ value: null })
  }
}

const handle2Delete = (index) => {
  modalForm.value.unitFee.splice(index, 1)
}

const handle2Cancel = () => {
  modal2Form.value.id = ''
  modal2Form.value.unitFee = [{ value: null }]
  modal2Visible.value = false
}

const handle2Save = () => {
  console.log({ ...modal2Form.value })
}

const { handleDelete } = useCRUD({
  doDelete: api.deletePost,
  refresh: () => $table.value?.handleSearch()
})
</script>
