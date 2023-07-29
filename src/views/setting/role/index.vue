<template>
  <CommonPage>
    <n-tabs type="line" animated @update:value="handleUpdateValue">
      <n-tab-pane name="menus" tab="菜单角色">
        <n-button type="success" @click="handleModal('add')">添加角色</n-button>
        <div mt-20 flex>
          <div v-for="item in roleList" :key="item.id" mr-28 border border-slate-200 rounded-3xl p-16 text-center>
            <div ml-30 mr-30><TheIcon icon="carbon:user-avatar" color="#0da599" :size="120" /></div>
            <p text-18>{{ item.name }} ({{ item.num || 0 }}人)</p>
            <div mt-10>
              <n-button quaternary type="success" @click="handleRole(item)">编辑权限</n-button>
              <n-button quaternary type="success" @click="handleEditUser(item)">编辑成员</n-button>
            </div>
            <div mt-10>
              <n-button type="primary" @click="handleEdit(item)">编辑</n-button>
              <n-button ml-30 type="error" @click="handleDelete(item)">删除</n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="data" tab="数据角色">
        <n-button type="success" @click="handleModal('add')">添加角色</n-button>
        <div mt-20 flex>
          <div v-for="item in dataRoleList" :key="item.id" mr-28 border border-slate-200 rounded-3xl p-16 text-center>
            <div ml-30 mr-30><TheIcon icon="material-symbols:database-outline" color="#0da599" :size="120" /></div>
            <p text-18>{{ item.name }} ({{ item.num || 0 }}人)</p>
            <div mt-10>
              <n-button quaternary type="success" @click="handleRole(item)">编辑权限</n-button>
              <n-button quaternary type="success" @click="handleEditUser(item)">编辑成员</n-button>
            </div>
            <div mt-10>
              <n-button type="primary" @click="handleEdit(item)">编辑</n-button>
              <n-button ml-30 type="error" @click="handleDelete(item)">删除</n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
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
      <n-form-item path="name" label="角色名称" :rule="[{ required: true, message: '请输入角色名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.name" placeholder="请输入角色名称" />
      </n-form-item>
    </n-form>
    <template #footer>
      <div flex justify-end>
        <n-button @click="handleCancel()">取消</n-button>
        <n-button :loading="modalLoading" ml-20 type="primary" @click="handleSave()">确定</n-button>
      </div>
    </template>
  </n-modal>
  <n-modal
    v-model:show="modalEditUserVisible"
    title="编辑成员"
    preset="card"
    :style="{ width: '500px' }"
    :bordered="false"
    @close="handlePutUserCancel"
  >
    <n-transfer ref="transfer" v-model:value="roleUserList" :options="allUserList" source-filterable />
    <template #footer>
      <div flex justify-end>
        <n-button @click="handlePutUserCancel()">取消</n-button>
        <n-popconfirm @positive-click="handlePutUserSave">
          <template #trigger>
            <n-button :loading="modalLoading" ml-20 type="primary">确定</n-button>
          </template>
          确定提交？
        </n-popconfirm>
      </div>
    </template>
  </n-modal>
  <n-modal
    v-model:show="modalEditRoleVisible"
    title="编辑权限"
    preset="card"
    :style="{ width: '500px' }"
    :bordered="false"
    @close="handlePutUserCancel"
  >
    <div h-400 overflow-auto>
      <n-tree
        v-if="activedTab === 'menus'"
        :data="lesseeAllMenuList"
        block-line
        cascade
        checkable
        expand-on-click
        selectable
        default-expand-all
        :default-checked-keys="roleMenusList"
        @update:checked-keys="checkedRole"
      />
      <n-tree
        v-if="activedTab === 'data'"
        block-line
        cascade
        :data="roleDataAllStoreList"
        checkable
        default-expand-all
        expand-on-click
        selectable
        :default-checked-keys="roleStores"
        @update:checked-keys="checkedRole"
      />
    </div>

    <template #footer>
      <div flex justify-end>
        <n-button @click="handlePutRoleCancel()">取消</n-button>
        <n-popconfirm @positive-click="handlePutRoleSave">
          <template #trigger>
            <n-button :loading="modalLoading" ml-20 type="primary">确定</n-button>
          </template>
          确定提交？
        </n-popconfirm>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { NButton, useDialog, useMessage, NTree } from 'naive-ui'
import globalApi from '@/api'
import api from '../api'
import { onMounted } from 'vue'
import { array2tree } from '@/utils'

const message = useMessage()
const dialog = useDialog()

const $modalForm = ref(null)
const modalVisible = ref(false)
const modalLoading = ref(false)
const modalType = ref('')
const modalTitleMap = reactive({
  add: '添加角色',
  edit: '编辑角色'
})
const modalForm = ref({
  id: '',
  name: ''
})

onMounted(() => {
  getAllRoles()
  getAllDataRoles()
  getAllUserList()
  getLesseeAllMenuList()
  getRoleDataAllStoreList()
})

const roleList = ref([])
const getAllRoles = () => {
  api.getAllRole().then((res) => {
    roleList.value = res.data || []
  })
}

const dataRoleList = ref([])
const getAllDataRoles = () => {
  api.getAllDataRole().then((res) => {
    dataRoleList.value = res.data || []
  })
}

const allUserList = ref([])
const getAllUserList = () => {
  globalApi.getAllUser().then((res) => {
    allUserList.value = res.data.map((e) => ({ value: e.id, label: e.realName, ...e })) || []
  })
}

const lesseeAllMenuList = ref([])
const getLesseeAllMenuList = () => {
  api.getLesseeAllMenu().then((res) => {
    lesseeAllMenuList.value =
      array2tree(
        res.data.map((e) => ({ ...e, label: e.name, key: e.id })),
        'id',
        'parentId',
        -1
      ) || []
  })
}

const roleDataAllStoreList = ref([])
const getRoleDataAllStoreList = () => {
  api.getRoleDataAllStore().then((res) => {
    roleDataAllStoreList.value = res.data.map((e) => ({ ...e, label: e.name, key: e.id })) || []
  })
}

let activedTab = 'menus'
const handleUpdateValue = (value) => {
  activedTab = value
}

const handleModal = (type) => {
  modalType.value = type
  modalVisible.value = true
}

const handleEdit = (row) => {
  modalForm.value.id = row.id || ''
  modalForm.value.name = row.name || ''
  handleModal('edit')
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = ''
  modalForm.value.name = ''
}
// modal保存
const handleSave = () => {
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      let reqApi
      if (activedTab === 'menus') {
        reqApi = modalType.value === 'edit' ? api.putEditRole : api.postAddRole
      }
      if (activedTab === 'data') {
        reqApi = modalType.value === 'edit' ? api.putEditDataRole : api.postAddDataRole
      }
      reqApi({ ...modalForm.value }).then(() => {
        message.success('操作成功')
        if (activedTab === 'menus') {
          getAllRoles()
        } else {
          getAllDataRoles()
        }
        handleCancel()
      })
    } else {
      console.log(errors)
    }
  })
}

const handleDelete = (row) => {
  dialog.warning({
    title: '提示',
    content: `确定删除该角色吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      let reqApi = activedTab === 'menus' ? api.deleteRole : api.deleteDataRole
      reqApi(row.id).then(() => {
        message.success('删除成功')
        if (activedTab === 'menus') {
          getAllRoles()
        } else {
          getAllDataRoles()
        }
      })
    },
    onNegativeClick: () => {
      message.info('已取消')
    }
  })
}

let editRoleId = ''
// 编辑权限 开始
const modalEditRoleVisible = ref(false)
const roleMenusList = ref([])
const roleStores = ref([])
const handleRole = (row) => {
  editRoleId = row.id
  roleMenusList.value = []
  roleStores.value = []
  let reqApi = activedTab === 'menus' ? api.getRoleMenus : api.getRoleDataStores
  reqApi(row.id)
    .then((res) => {
      if (activedTab === 'menus') {
        roleMenusList.value = res.data || []
      } else {
        roleStores.value = res.data || []
      }
    })
    .finally(() => {
      modalEditRoleVisible.value = true
    })
}

const handlePutRoleSave = () => {
  let putApi = null
  const data = {
    roleId: editRoleId
  }
  if (activedTab === 'menus') {
    putApi = api.putRoleMenus
    data.menus = roleMenusList.value
  } else {
    putApi = api.putRoleStores
    data.stores = roleStores.value
  }
  putApi(data).then(() => {
    message.success('编辑成功')
    if (activedTab === 'menus') {
      getAllRoles()
    } else {
      getAllDataRoles()
    }
    handlePutRoleCancel()
  })
}

const handlePutRoleCancel = () => {
  editRoleId = ''
  modalEditRoleVisible.value = false
}

const checkedRole = (keys) => {
  if (activedTab === 'menus') {
    roleMenusList.value = keys
  } else {
    roleStores.value = keys
  }
}

// 编辑成员 开始
const modalEditUserVisible = ref(false)
const handleEditUser = (row) => {
  editRoleId = row.id
  getRoleUser(row.id)
  modalEditUserVisible.value = true
}

const handlePutUserCancel = () => {
  editRoleId = ''
  modalEditUserVisible.value = false
  roleUserList.value = []
}

const handlePutUserSave = () => {
  console.log([...roleUserList.value])
  const data = {
    roleId: editRoleId,
    users: roleUserList.value
  }
  let putApi = activedTab === 'menus' ? api.putRoleUser : api.putRoleDataUser
  putApi(data).then(() => {
    message.success('编辑成功')
    if (activedTab === 'menus') {
      getAllRoles()
    } else {
      getAllDataRoles()
    }
    handlePutUserCancel()
  })
}
// 获取角色下的成员
const roleUserList = ref([])
const getRoleUser = (id) => {
  roleUserList.value = []
  let reqApi = activedTab === 'menus' ? api.getRoleUser : api.getRoleDataUser
  reqApi(id).then((res) => {
    roleUserList.value = res.data || []
  })
}
</script>
