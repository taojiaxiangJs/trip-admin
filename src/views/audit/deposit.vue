<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getDepositList"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.key" type="text" placeholder="输入要搜索的内容" />
        </QueryBarItem>
        <QueryBarItem :content-width="290">
          <n-select v-model:value="queryItems.status" :options="options.approveType" placeholder="审核状态" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
  <n-modal v-model:show="agreeData.showAgreeModal" preset="dialog" title="Dialog">
    <template #header>
      <div>提示</div>
    </template>
    <n-input v-model:value="agreeData.amount" type="text" mt-6 placeholder="需要支付的金额" />
    <template #action>
      <n-button type="tertiary" @click="agreeCancel">取消</n-button>
      <n-button type="primary" @click="agreeSubmit">确定</n-button>
    </template>
  </n-modal>
  <n-modal v-model:show="rejectData.showRejectModal" preset="dialog" title="Dialog">
    <template #header>
      <div>提示</div>
    </template>
    <n-input v-model:value="rejectData.rejectReason" mt-6 type="textarea" placeholder="拒绝原因" />
    <template #action>
      <n-button type="tertiary" @click="rejectCancel">取消</n-button>
      <n-button type="primary" @click="rejectSubmit">确定</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
// import { formatFee } from '@/utils'
import { options } from './constant'
import api from './api'
import globalApi from '@/api'
import { ref } from 'vue'

defineOptions({ name: 'Crud' })
const message = useMessage()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

// 店铺
const storeList = ref([])
const getStoreList = () => {
  globalApi.getAllStoreAvailabel().then((res) => {
    storeList.value = res.data?.map((e) => ({ label: e.name, value: e.id }))
  })
}
getStoreList()

const columns = [
  { title: '订单号', key: 'orderNo', width: 180 },
  { title: '用户', key: 'username' },
  { title: '手机号', key: 'phone' },
  { title: '套餐名称', key: 'showName' },
  {
    title: '租金（元/月）',
    key: 'price'
  },
  {
    title: '押金（元）',
    key: 'sourceDeposit'
  },
  {
    title: '申请金额（元）',
    key: 'applyDeposit'
  },
  {
    title: '店铺',
    key: 'storeId',
    render(row) {
      return h('span', storeList.value.filter((e) => e.value == row.storeId)[0]?.label)
    }
  },
  {
    title: '申请时间',
    key: 'applyTime',
    render(row) {
      return h('span', row.applyTime.replace('T', ' '))
    }
  },
  {
    title: '审核状态',
    key: 'status',
    render(row) {
      let classType = row.status === 0 ? 'text-rose-500' : row.status == 1 ? 'text-green-500' : 'text-yellow-500'
      return h('span', { class: classType }, row.status == 1 ? '通过' : row.status == -1 ? '未审核' : '未通过')
    }
  },
  { title: '备注', key: 'rejectReason' },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      let arr = []
      if (row.status === -1) {
        arr = [
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              style: 'margin-left: 15px;',
              onClick: () => handleAgree(row, 1)
            },
            { default: () => '通过' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              style: 'margin-left: 15px;',
              onClick: () => handleReject(row, 0)
            },
            { default: () => '拒绝' }
          )
        ]
      }
      return arr
    }
  }
]

const agreeData = ref({
  showAgreeModal: false,
  id: '',
  amount: ''
})
const handleAgree = (row) => {
  agreeData.value.id = row.id
  agreeData.value.amount = ''
  agreeData.value.sourceDeposit = row.sourceDeposit
  agreeData.value.showAgreeModal = true
}
const agreeCancel = () => {
  agreeData.value.id = ''
  agreeData.value.amount = ''
  agreeData.value.sourceDeposit = ''
  agreeData.value.showAgreeModal = false
}
const agreeSubmit = () => {
  if (!agreeData.value.amount) {
    message.error('请输入需要支付的押金金额')
    return
  } else if (Number(agreeData.value.amount) > Number(agreeData.value.sourceDeposit)) {
    message.error('实际支付金额不能大于原始押金金额')
    return
  }
  api.putPassDeposit({ id: agreeData.value.id, amount: agreeData.value.amount }).then(() => {
    message.success('操作成功')
    agreeCancel()
    $table.value?.handleSearch()
  })
}

const rejectData = ref({
  showRejectModal: false,
  id: '',
  rejectReason: ''
})
const handleReject = (row) => {
  rejectData.value.id = row.id
  rejectData.value.rejectReason = ''
  rejectData.value.showRejectModal = true
}

const rejectCancel = () => {
  rejectData.value.id = ''
  rejectData.value.rejectReason = ''
  rejectData.value.showRejectModal = false
}

const rejectSubmit = () => {
  if (!rejectData.value.rejectReason) {
    message.error('请输入拒绝原因')
    return
  }
  api.putRejectDeposit({ id: rejectData.value.id, rejectReason: rejectData.value.rejectReason }).then(() => {
    message.success('操作成功')
    rejectCancel()
    $table.value?.handleSearch()
  })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
