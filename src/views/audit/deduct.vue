<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getDeductList"
      @on-data-change="(data) => (tableData = data)"
      @reset-extra-params="resetExtraParams"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.key" type="text" placeholder="订单号等关键字" @keydown.enter="$table?.handleSearch" />
        </QueryBarItem>
        <QueryBarItem label="审批状态" :label-width="70">
          <n-select v-model:value="queryItems.status" :options="options.depositDeductApplyStatus" />
        </QueryBarItem>
        <QueryBarItem label="日期" :label-width="70" :content-width="300">
          <n-date-picker v-model:value="queryDate.date" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { useCRUD } from '@/composables'
import api from './api'
import { options } from './constant'

defineOptions({ name: 'Crud' })

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

const queryDate = ref({
  date: null
})

onMounted(() => {
  $table.value?.handleSearch()
})

// 日期切换
const dateChange = (arg1, arg2) => {
  extraParams.value.startDate = arg2[0] || ''
  extraParams.value.endDate = arg2[1] || ''
}

const columns = [
  { title: '订单编号', key: 'orderNo', width: 200 },
  { title: '姓名', key: 'username', width: 140 },
  { title: '实缴押金', key: 'deposit', width: 130 },
  { title: '初始押金', key: 'sourceDeposit', width: 130 },
  {
    title: '押金支付状态',
    key: 'status',
    width: 140,
    render(row) {
      return h('span', valueToName(row.depositPayStatus, options.depositPayStatus))
    }
  },
  { title: '申请人', key: 'applyUsername', width: 140 },
  { title: '申请时间', key: 'applyTime', width: 200 },
  { title: '申请金额', key: 'applyDeductDeposit', width: 130 },
  {
    title: '审批状态',
    key: 'status',
    width: 120,
    render(row) {
      return h('span', valueToName(row.status, options.depositDeductApplyStatus))
    }
  },
  { title: '申请原因', key: 'reason' },

  {
    title: '操作',
    key: 'actions',
    width: 140,
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      let btns = []
      if (row.status == '-1') {
        btns.push(
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              style: 'margin-left: 15px;',
              onClick: () => handleAgree(row)
            },
            { default: () => '取消' }
          )
        )
      }
      return btns
    }
  }
]

const valueToName = (value, options) => {
  return options.filter((e) => e.value + '' === value + '')[0]?.label || ''
}

// 重置
const resetExtraParams = () => {
  queryDate.value.date = null
  extraParams.value = {}
}

const handleAgree = (row) => {
  $dialog.success({
    title: '提示',
    content: '确认取消吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      api.putDeductCancel(row.id).then(() => {
        $message.success('操作成功')
        $table.value?.handleSearch()
      })
    },
    onNegativeClick: () => {}
  })
}

useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
