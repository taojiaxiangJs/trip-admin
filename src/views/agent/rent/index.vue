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
          <n-input v-model:value="queryItems.key" type="text" placeholder="输入要搜索的内容" />
        </QueryBarItem>
        <QueryBarItem :content-width="290">
          <n-select v-model:value="queryItems.approved" :options="options.approveType" placeholder="审核状态" />
        </QueryBarItem>
        <QueryBarItem :content-width="290">
          <n-select v-model:value="queryItems.status" :options="options.rentStatusOptions" placeholder="上线状态" />
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
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="120" :rules="rules" :model="modalForm">
      <n-form-item path="productType" label="产品类型" :rule="[{ required: true, message: '请选择产品类型', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.productType" name="radiogroup">
          <n-space>
            <n-radio v-for="item in options.orderType" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="name" label="租金套餐名称" :rule="[{ required: true, message: '请输入租金套餐名称', trigger: ['input', 'input', 'blur'] }]">
        <n-input v-model:value="modalForm.name" placeholder="请输入租金套餐名称" />
      </n-form-item>
      <n-form-item path="showName" label="展示名" :rule="[{ required: true, message: '请输入展示名', trigger: ['input', 'input', 'blur'] }]">
        <n-input v-model:value="modalForm.showName" placeholder="请输入展示名" />
      </n-form-item>
      <n-form-item path="minTerms" label="起租期" :rule="[{ required: true, message: '请输入起租期', trigger: ['change', 'input', 'blur'] }]">
        <n-input v-model:value="modalForm.minTerms" placeholder="请输入起租期"><template #suffix>月</template></n-input>
      </n-form-item>
      <n-form-item path="terms" label="租期" :rule="[{ required: true, message: '请输入租期', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.terms" placeholder="请输入租期"><template #suffix>月</template></n-input>
      </n-form-item>
      <n-form-item path="payType" label="支付方式">
        <n-select v-model:value="modalForm.payType" :options="options.payType" placeholder="请选择支付方式" />
      </n-form-item>
      <n-form-item path="price" label="价格">
        <n-input v-model:value="modalForm.price" placeholder="请输入价格"><template #suffix>元/月</template></n-input>
        <!-- <n-button ml-20 type="success" @click="handle2Modal(modalForm.unitFee)">高级设置</n-button> -->
      </n-form-item>
      <n-form-item path="deposit" label="押金">
        <n-input v-model:value="modalForm.deposit" placeholder="请输入押金"><template #suffix>元</template></n-input>
      </n-form-item>
      <n-form-item path="overdueFine" label="滞纳金">
        <n-input v-model:value="modalForm.overdueFine" placeholder="请输入滞纳金"><template #suffix>元/日</template></n-input>
      </n-form-item>
      <n-form-item path="storeId" label="店铺">
        <n-select v-model:value="modalForm.storeId" filterable placeholder="选择店铺" :options="storeList" />
      </n-form-item>
      <n-form-item path="status" label="状态" :rule="[{ required: true, message: '请选择状态', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.status" name="status">
          <n-space>
            <n-radio :value="'1'">上线</n-radio>
            <n-radio :value="'0'">下线</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="attachmentId" label="产品图片">
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
import { NButton, useMessage, useDialog } from 'naive-ui'
import { formatFee, debounce } from '@/utils'
import { useCRUD } from '@/composables'
import globalApi from '@/api'
import { options } from '../constant'
import api from '../api'

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
  add: '添加租金套餐',
  edit: '编辑租金套餐'
})
const modalForm = ref({
  id: '',
  productType: null,
  name: '',
  showName: '',
  minTerms: '',
  terms: '',
  payType: null,
  unitFee: [{ value: null }],
  price: '',
  deposit: '',
  overdueFine: '',
  storeId: null,
  status: null,
  attachmentId: ''
})

onMounted(() => {
  $table.value?.handleSearch()
})
// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.map((e) => ({ label: e.name, value: e.id }))
    console.log(storeList.value)
  })
}
getStoreList()

const columns = [
  { title: '租金套餐名称', key: 'name' },
  { title: '展示名称', key: 'showName' },
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
    key: 'price',
    render(row) {
      return h('span', formatFee(row.price, 'front'))
    }
  },
  {
    title: '租期',
    key: 'terms',
    render(row) {
      return h('span', row.terms + '个月')
    }
  },
  {
    title: '起租期',
    key: 'minTerms',
    render(row) {
      return h('span', row.minTerms + '个月')
    }
  },
  {
    title: '押金（元）',
    key: 'deposit',
    render(row) {
      return h('span', formatFee(row.deposit, 'front'))
    }
  },
  {
    title: '滞纳金（元）',
    key: 'overdueFine',
    render(row) {
      return h('span', formatFee(row.overdueFine, 'front'))
    }
  },
  {
    title: '应用中订单数',
    key: 'num'
  },
  {
    title: '店铺',
    key: 'storeId',
    render(row) {
      return h('span', storeList.value.filter((e) => e.value == row.storeId)[0]?.label)
    }
  },
  {
    title: '上下线状态',
    key: 'status',
    render(row) {
      return h('span', row.status == 1 ? '已上线' : '下线中')
    }
  },
  {
    title: '审核状态',
    key: 'approved',
    render(row) {
      return h('span', row.approved == 1 ? '通过' : row.approved == -1 ? '未审核' : '未通过')
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
        // h(
        //   NButton,
        //   {
        //     size: 'small',
        //     type: 'primary',
        //     style: 'margin-left: 15px;',
        //     onClick: () => handleDetail(row)
        //   },
        //   { default: () => '租金明细' }
        // ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleOnline(row)
          },
          { default: () => (row.status == 1 ? '下线' : '上线') }
        ),
        row.approved != 1
          ? h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                style: 'margin-left: 15px;',
                onClick: () => handleTable(row)
              },
              { default: () => '编辑' }
            )
          : '',
        row.approved === 0
          ? h(
              NButton,
              {
                size: 'small',
                type: 'error',
                style: 'margin-left: 15px;',
                onClick: () => handleDelete(row.storeId)
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
  modalForm.value.id = row.id || ''
  modalForm.value.productType = `${row.productType}` || ''
  modalForm.value.name = row.name || ''
  modalForm.value.showName = row.showName || ''
  modalForm.value.minTerms = `${row.minTerms}` || ''
  modalForm.value.terms = `${row.terms}` || ''
  modalForm.value.payType = `${row.payType}` || null
  modalForm.value.unitFee = row.unitFee || [{ value: null }]
  modalForm.value.price = `${row.price}`.slice(0, -2) || ''
  modalForm.value.deposit = `${row.deposit}`.slice(0, -2) || ''
  modalForm.value.overdueFine = `${row.overdueFine}`.slice(0, -2) || ''
  modalForm.value.storeId = row.storeId || null
  modalForm.value.status = row.status || null
  modalForm.value.attachmentId = row.attachmentId || ''
  handleModal('edit')
}

const uploadImage = ({ file, data, onFinish, onError }) => {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
  }
  formData.append('file', file.file)
  globalApi
    .uploadFile(formData)
    .then(({ data }) => {
      console.log(data)
      modalForm.value.attachmentId = data.id
      onFinish()
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
  modalForm.value.productType = ''
  modalForm.value.name = ''
  modalForm.value.showName = ''
  modalForm.value.minTerms = ''
  modalForm.value.terms = ''
  modalForm.value.payType = null
  modalForm.value.price = ''
  modalForm.value.deposit = ''
  modalForm.value.overdueFine = ''
  modalForm.value.storeId = null
  modalForm.value.status = null
  modalForm.value.attachmentId = ''
}
// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
      let ajax = null
      if (modalType.value === 'add') {
        ajax = api.postAddRent
      } else {
        ajax = api.putEditRent
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

watch(
  () => modalForm.value.terms,
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

const handleOnline = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定${row.status === 1 ? '下线' : '上线'}该套餐`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      let reqApi = row.status === 1 ? api.putOfflineRent : api.putOnlineRent
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

const $modal2Form = ref(null)
const modal2Visible = ref(false)
const modal2Type = ref('edit')
// const modal2Loading = ref(false)
const modal2Form = ref({
  id: '',
  unitFee: [{ value: null }]
})

// const handleDetail = (row) => {
//   modal2Form.value.id = row.id || ''
//   handle2Modal(row.unitFee || [{ value: null }], 'detail')
// }

// const handle2Modal = (unitFee, type = 'edit') => {
//   modal2Form.value.unitFee = unitFee
//   modal2Type.value = type
//   modal2Visible.value = true
// }

const handle2Add = () => {
  if (modalForm.value.unitFee.length >= Number(modalForm.value.terms)) {
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
  doDelete: api.deleteRent,
  refresh: () => $table.value?.handleSearch()
})
</script>
