<template>
  <CommonPage>
    <n-button type="success" @click="handleModal('add')">添加角色</n-button>
    <div mt-20 flex>
      <div v-for="item in roleList" :key="item.id" mr-28 border border-slate-200 rounded-3xl p-16 text-center>
        <div ml-30 mr-30><TheIcon icon="carbon:user-avatar" color="#0da599" :size="120" /></div>
        <p text-18>{{ item.name }}</p>
        <n-button quaternary mt-10 type="success" @click="handleRole(item)">编辑权限</n-button>
        <div mt-10>
          <n-button type="primary" @click="handleEdit(item)">编辑</n-button>
          <n-button ml-30 type="error" @click="handleDelete(item)">删除</n-button>
        </div>
      </div>
    </div>
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
</template>

<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import api from '../api'
import { onMounted } from 'vue'

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
})

const roleList = ref([])
const getAllRoles = () => {
  api.getAllRole().then((res) => {
    roleList.value = res.data.list || []
  })
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
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      let reqApi = modalType.value === 'edit' ? api.putEditRole : api.postAddRole
      reqApi({ ...modalForm.value }).then(() => {
        message.success('操作成功')
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
      api.deleteRole(row.id).then(() => {
        message.success('删除成功')
        getAllRoles()
      })
    },
    onNegativeClick: () => {
      message.info('已取消')
    }
  })
}

// 编辑权限
const handleRole = () => {}
</script>
