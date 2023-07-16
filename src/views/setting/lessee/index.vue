<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllLessee"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.key" type="text" placeholder="输入要搜索的内容" @keydown.enter="$table?.handleSearch" />
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
    :style="{ width: '500px' }"
    :bordered="false"
    @close="handleCancel"
  >
    <n-form ref="$modalForm" label-placement="left" label-align="right" :label-width="120" :rules="rules" :model="modalForm">
      <n-form-item path="username" label="用户名" :rule="[{ required: true, message: '请输入用户名', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item path="realName" label="姓名" :rule="[{ required: true, message: '请输入姓名', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.realName" placeholder="请输入姓名" />
      </n-form-item>
      <n-form-item path="phone" label="手机号" :rule="[{ required: true, message: '请输入手机号', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.phone" placeholder="请输入手机号" />
      </n-form-item>
      <n-form-item path="status" label="状态" :rule="[{ required: true, message: '请选择状态', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.status" name="radiogroup">
          <n-space>
            <n-radio value="1">启用</n-radio>
            <n-radio value="0">禁用</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item
        path="times"
        label="有效时间"
        :rule="[{ type: 'array', required: true, message: '请输选择有效时间', trigger: ['change', 'blur'] }]"
      >
        <n-date-picker v-model:formatted-value="modalForm.times" type="daterange" clearable value-format="yyyy-MM-dd" @update:value="dateChange" />
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
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
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
  add: '添加账号',
  edit: '编辑账号'
})
const modalForm = ref({
  id: '',
  username: '',
  realName: '',
  phone: '',
  status: '1',
  times: null
})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '姓名',
    key: 'realName'
  },
  {
    title: '手机号',
    key: 'phone'
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h('span', row.status === '1' ? '启用' : '禁用')
    }
  },
  {
    title: '有效时间',
    key: 'startTime',
    render(row) {
      return h('span', `${row.startTime} - ${row.endTime}`)
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 420,
    align: 'left',
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
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleRole(row)
          },
          { default: () => '编辑权限' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            style: 'margin-left: 15px;',
            onClick: () => handleReset(row)
          },
          { default: () => '重置密码' }
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
  modalForm.value.username = row.username || ''
  modalForm.value.realName = row.realName || ''
  modalForm.value.phone = row.phone || ''
  modalForm.value.status = row.status || '1'
  modalForm.value.times = row.startTime ? [row.startTime, row.endTime] : []
  console.log(modalForm.value.times)
  handleModal('edit')
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = ''
}

const dateChange = (d, a) => {
  modalForm.value.startTime = a[0]
  modalForm.value.endTime = a[1]
}

// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
      let reqApi = modalType.value === 'edit' ? api.putEditLessee : api.postAddLessee
      reqApi({ ...modalForm.value }).then(() => {
        message.success('操作成功')
        $table.value?.handleSearch()
        handleCancel()
      })
    } else {
      console.log(errors)
    }
  })
}

const handleReset = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定重置该租户的账号密码吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      api.putLesseeResetPassword(row.id).then(() => {
        message.success('操作成功')
      })
    },
    onNegativeClick: () => {
      message.info('已取消')
    }
  })
}

const handleRole = (row) => {
  message.warning('暂无功能')
}

useCRUD({
  refresh: () => $table.value?.handleSearch()
})
</script>
