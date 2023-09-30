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
      <n-form-item
        v-if="modalType === 'add'"
        path="name"
        label="租户名"
        :rule="[{ required: true, message: '请输入租户名', trigger: ['input', 'blur'] }]"
      >
        <n-input v-model:value="modalForm.name" placeholder="请输入租户名" />
      </n-form-item>
      <n-form-item
        v-if="modalType === 'add'"
        path="realName"
        label="姓名"
        :rule="[{ required: true, message: '请输入姓名', trigger: ['input', 'blur'] }]"
      >
        <n-input v-model:value="modalForm.realName" placeholder="请输入姓名" />
      </n-form-item>
      <n-form-item path="phone" label="手机号" :rule="[{ required: true, message: '请输入手机号', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.phone" placeholder="请输入手机号" />
      </n-form-item>
      <n-form-item
        v-if="modalType === 'add'"
        path="times"
        label="有效期"
        :rule="[{ type: 'array', required: true, message: '请选择有效期', trigger: ['change'] }]"
      >
        <n-date-picker v-model:formatted-value="modalForm.times" type="daterange" clearable value-format="yyyy-MM-dd" />
      </n-form-item>
      <n-form-item v-if="modalType === 'add'" path="status" label="状态" :rule="[{ required: true, message: '请选择状态', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.status" name="radiogroup">
          <n-space>
            <n-radio value="1">启用</n-radio>
            <n-radio value="0">禁用</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex justify-end>
        <n-button @click="handleCancel()">取消</n-button>
        <n-popconfirm @positive-click="handleSave">
          <template #trigger>
            <n-button :loading="modalLoading" ml-20 type="primary">确定</n-button>
          </template>
          确定提交？
        </n-popconfirm>
      </div>
    </template>
  </n-modal>
  <n-modal
    v-model:show="modalEditMenusRoleVisible"
    title="编辑权限"
    preset="card"
    :style="{ width: '500px' }"
    :bordered="false"
    @close="handlePutRoleCancel"
  >
    <div h-400 flex-1 overflow-auto p-16>
      <n-tree
        :data="allMenuRoleList"
        cascade
        checkable
        defaultexpandall
        expand-on-click
        selectable
        block-line
        :default-checked-keys="roleMenusList"
        @update:checked-keys="checkedMenusRole"
      />
    </div>

    <template #footer>
      <div flex justify-end>
        <n-button @click="handlePutRoleCancel()">取消</n-button>
        <n-popconfirm @positive-click="handlePutRoleSave">
          <template #trigger>
            <n-button :loading="modalRoleLoading" ml-20 type="primary">确定</n-button>
          </template>
          确定提交？
        </n-popconfirm>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useCRUD } from '@/composables'
import { array2tree } from '@/utils'
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
  tenantId: '',
  name: '',
  username: '',
  realName: '',
  phone: '',
  times: null,
  menus: [],
  status: '1'
})

onMounted(() => {
  $table.value?.handleSearch()
  getAllMenuRoles()
})

const allMenuRoleList = ref([])
const getAllMenuRoles = () => {
  api.getPlatFormAllMenu().then((res) => {
    allMenuRoleList.value =
      array2tree(
        res.data.map((e) => ({ ...e, label: e.name, key: e.id, checked: false })),
        'id',
        'parentId',
        -1
      ) || []

    console.log(allMenuRoleList.value)
  })
}

const columns = [
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '租户名',
    key: 'name'
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
    title: '有效期',
    key: 'startTime',
    render(row) {
      return h('span', `${row.startTime} ~ ${row.endTime}`)
    }
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return h('span', row.status === 1 ? '启用' : '禁用')
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
        ),
        row.status === 1
          ? h(
              NButton,
              {
                size: 'small',
                type: 'tertiary',
                style: 'margin-left: 15px;',
                onClick: () => handleEnable(row)
              },
              { default: () => '禁用' }
            )
          : h(
              NButton,
              {
                size: 'small',
                type: 'success',
                style: 'margin-left: 15px;',
                onClick: () => handleEnable(row)
              },
              { default: () => '启用' }
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
  const startTime = row.startTime.split(' ')[0]
  const endTime = row.endTime.split(' ')[0]
  modalForm.value.tenantId = row.id || ''
  modalForm.value.id = row.userId || ''
  modalForm.value.name = row.name || ''
  modalForm.value.username = row.username || ''
  modalForm.value.realName = row.realName || ''
  modalForm.value.phone = row.phone || ''
  modalForm.value.times = [startTime, endTime]
  modalForm.value.status = row.status + '' || '1'
  handleModal('edit')
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = ''
  modalForm.value.name = ''
  modalForm.value.username = ''
  modalForm.value.realName = ''
  modalForm.value.phone = ''
  modalForm.value.times = null
  modalForm.value.status = '1'
}
// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      let reqApi = modalType.value === 'edit' ? api.putLesseeDetail : api.postAddLessee
      modalForm.value.status = Number(modalForm.value.status)
      modalForm.value.startTime = modalForm.value.times[0]
      modalForm.value.endTime = modalForm.value.times[1]
      modalLoading.value = true
      reqApi({ ...modalForm.value })
        .then(() => {
          message.success('操作成功')
          $table.value?.handleSearch()
          handleCancel()
        })
        .finally(() => {
          modalLoading.value = false
        })
    } else {
      console.log(errors)
    }
  })
}

const handleEnable = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定${row.status === 1 ? '禁用' : '启用'}该租户`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      let reqApi = row.status === 1 ? api.putLesseeDisable : api.putLesseeEnable
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

const handleReset = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定重置该账号的密码`,
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

const modalEditMenusRoleVisible = ref(false)
let editUserId = ''
const handleRole = ({ id }) => {
  editUserId = id
  api
    .getLesseeMenuRole(id)
    .then((res) => {
      roleMenusList.value = res.data || []
    })
    .finally(() => {
      modalEditMenusRoleVisible.value = true
    })
}

const roleMenusList = ref([])
const checkedMenusRole = (keys) => {
  roleMenusList.value = keys
}

const handlePutRoleCancel = () => {
  roleMenusList.value = []
  modalEditMenusRoleVisible.value = false
}

const modalRoleLoading = ref(false)
const handlePutRoleSave = () => {
  modalRoleLoading.value = true
  // let roles = []
  // roleMenusList.value.forEach((e) => {
  //   let ids = filterParentChildIds(allMenuRoleList.value, e)
  //   roles = [...roles, ...ids]
  // })
  // const roleIds = [...new Set(roles)]
  // console.log(roleIds)
  // const menusRole = { tenantId: editUserId, menus: roleIds }
  const menusRole = { tenantId: editUserId, menus: [...roleMenusList.value] }
  api
    .putLesseeMenuRole(menusRole)
    .then(() => {
      message.success('编辑成功')
    })
    .finally(() => {
      modalRoleLoading.value = false
      handlePutRoleCancel()
    })
}

useCRUD({
  refresh: () => $table.value?.handleSearch()
})
</script>
