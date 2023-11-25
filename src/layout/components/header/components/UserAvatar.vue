<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex cursor-pointer items-center>
      <!-- <img :src="userStore.avatar" mr10 h-35 w-35 rounded-full /> -->
      <img src="../../../../assets/images/logout.png" mr10 h-20 w-20 rounded-full />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
  <n-modal v-model:show="showEditPasswordModal" preset="dialog" title="修改密码" :style="{ width: '400px' }">
    <n-form ref="formRef" :label-width="80" :model="passFormValue" :rules="rules" size="medium" mt-6>
      <n-form-item label="原密码" path="oldPassword">
        <n-input v-model:value="passFormValue.oldPassword" type="password" show-password-on="mousedown" placeholder="输入原密码" />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input v-model:value="passFormValue.newPassword" type="password" show-password-on="mousedown" placeholder="输入新密码" />
      </n-form-item>
      <n-form-item>
        <div w-full flex justify-end>
          <n-button @click="handleEditPasswordCancel()">取消</n-button>
          <n-button ml-20 type="primary" @click="handleEditPasswordSave()">确定</n-button>
        </div>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'
import globalApi from '@/api'

const userStore = useUserStore()

const options = [
  {
    label: '修改密码',
    key: 'editPassword',
    icon: renderIcon('charm:square-tick', { size: '14px' })
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' })
  }
]

const handleSelect = (key) => {
  if (key === 'logout') {
    logout()
  }
  if (key === 'editPassword') {
    showEditPasswordModal.value = true
  }
}

const showEditPasswordModal = ref(false)
const passFormValue = ref({ oldPassword: '', newPassword: '' })
const rules = {
  oldPassword: {
    required: true,
    message: '请输入原密码',
    trigger: ['input', 'blur']
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: ['input', 'blur']
  }
}
const formRef = ref()

const handleEditPasswordCancel = () => {
  formRef.value?.restoreValidation()
  showEditPasswordModal.value = false
}
const handleEditPasswordSave = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      globalApi.editPassword(passFormValue.value).then(() => {
        $message.success('修改成功')
        setTimeout(() => {
          userStore.logout()
        }, 500)
      })
    }
  })
}

const logout = () => {
  $dialog.confirm({
    title: '提示',
    type: 'info',
    content: '确认退出？',
    confirm() {
      userStore.logout()
      $message.success('已退出登录')
    }
  })
}
</script>
