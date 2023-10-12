<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getBeReviewedWithdraw"
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
  <n-modal v-model:show="showModal" preset="dialog" title="提示">
    <n-form ref="formRef" inline :label-width="80" :model="reasonForm" :rules="rules" size="medium" class="mt-8">
      <n-form-item
        label="原因"
        path="reason"
        :rule="{
          required: true,
          message: '请输入原因',
          trigger: 'blur'
        }"
      >
        <n-input v-model:value="reasonForm.reason" placeholder="请输入原因" style="width: 380px" />
      </n-form-item>
    </n-form>
    <div flex justify-end>
      <n-button mr-4 @click="cancelCallback"> 取消 </n-button>
      <n-button type="primary" @click="sureCallback"> 确定 </n-button>
    </div>
  </n-modal>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
// import { formatFee } from '@/utils'
import { options } from './constant'
import api from './api'
import globalApi from '@/api'
import { ref } from 'vue'

defineOptions({ name: 'Crud' })
const dialog = useDialog()
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
  { title: '订单号', key: 'orderNo' },
  { title: '用户名', key: 'applyUsername' },
  { title: '店铺名称', key: 'storeName' },
  { title: '申请时间', key: 'applyTime' },
  { title: '审批人', key: 'approveUsername' },
  { title: '审核时间', key: 'approveTime' },
  {
    title: '审核状态',
    key: 'status',
    render(row) {
      let classType = row.status === 0 ? 'text-rose-500' : row.status == 1 ? 'text-green-500' : 'text-yellow-500'
      return h('span', { class: classType }, row.status == 1 ? '通过' : row.status == -1 ? '未审核' : '未通过')
    }
  },
  { title: '申请备注', key: 'applyRemarks' },
  { title: '审批备注', key: 'approveRemarks' },
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
              onClick: () => handleTable(row, 1)
            },
            { default: () => '通过' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              style: 'margin-left: 15px;',
              onClick: () => handleTable(row, 0)
            },
            { default: () => '拒绝' }
          )
        ]
      }
      return arr
    }
  }
]

const showModal = ref(false)
const reasonForm = ref({ reason: '' })
const formRef = ref(null)
const sureCallback = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      api.putRejectWithdraw(handleData.id, { ...reasonForm.value }).then(() => {
        handleData = null
        message.success('操作成功')
        cancelCallback()
        $table.value?.handleSearch()
      })
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
const cancelCallback = () => {
  formRef.value?.restoreValidation()
  showModal.value = false
}

let handleData = null
const handleTable = (row, type) => {
  if (type) {
    dialog.warning({
      title: '警告',
      content: `确定同意吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        api.putPassWithdraw(row.id).then(() => {
          message.success('操作成功')
          $table.value?.handleSearch()
        })
      },
      onNegativeClick: () => {
        message.error('取消')
      }
    })
  } else {
    showModal.value = true
    handleData = row
  }
}
useCRUD({ refresh: () => $table.value?.handleSearch() })
</script>
