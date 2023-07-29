<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div style="transform: translateY(25px)" class="m-auto max-w-700 min-w-345 f-c-c rounded-10 bg-white bg-opacity-60 p-15 card-shadow" dark:bg-dark>
      <div hidden w-380 px-20 py-35 md:block>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a"><icon-custom-logo mr-10 text-50 color-primary />{{ title }}</h5>
        <div mt-30>
          <n-input
            v-if="!isMessage"
            v-model:value="loginInfo.name"
            autofocus
            class="h-50 items-center pl-10 text-16"
            placeholder="admin"
            :maxlength="20"
          />
          <n-input
            v-else
            v-model:value="loginInfo.phone"
            autofocus
            class="h-50 items-center pl-10 text-16"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </div>
        <div mt-30>
          <n-input
            v-if="!isMessage"
            v-model:value="loginInfo.password"
            class="h-50 items-center pl-10 text-16"
            type="password"
            show-password-on="mousedown"
            placeholder="123456"
            :maxlength="20"
          />
          <n-input-group v-else>
            <n-input
              v-model:value="loginInfo.code"
              class="h-50 flex-1 items-center pl-10 text-16"
              show-password-on="mousedown"
              placeholder="请输入验证码"
              :maxlength="6"
            />
            <n-button type="primary" ghost size="large" class="h-50 items-center pl-10 text-16"> 获取验证码 </n-button>
          </n-input-group>
        </div>

        <div mt-20 h-24 f-b-c>
          <div v-if="isMessage"></div>
          <n-checkbox v-else :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />
          <n-button text type="primary" @click="toMessage">{{ isMessage ? '账号登录' : '短信登录' }}</n-button>
        </div>

        <div mt-20>
          <n-button h-50 w-full rounded-5 text-16 type="primary" :loading="loading" @click="handleLogin"> 登录 </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import { lStorage, setToken } from '@/utils'
import { useStorage } from '@vueuse/core'
import bgImg from '@/assets/images/login_bg.webp'
import api from './api'
import { addDynamicRoutes } from '@/router'
import { usePermissionStore } from '@/store'

const title = import.meta.env.VITE_TITLE

const router = useRouter()
const { query } = useRoute()

const loginInfo = ref({
  name: 'admin',
  password: '123456',
  phone: '',
  code: ''
})

const isMessage = ref(false)
const toMessage = () => {
  isMessage.value = !isMessage.value
}

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

const isRemember = useStorage('isRemember', false)
const permissionStore = usePermissionStore()
const loading = ref(false)
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    loading.value = true
    $message.loading('正在验证...')
    // const data = {
    //   phone: 15501673636,
    //   password: 'riding',
    //   verifyCode: '',
    //   verifyId: ''
    // }
    const res = await api.login({ phone: name, password: password.toString() })
    $message.success('登录成功')
    setToken(res.data.token)
    permissionStore.setAllPermission(res.data.menus)
    if (isRemember.value) {
      lStorage.set('loginInfo', { name, password })
    } else {
      lStorage.remove('loginInfo')
    }
    const redirect = await addDynamicRoutes()
    if (query.redirect && query.redirect !== '/') {
      const path = query.redirect
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    } else if (redirect) {
      router.push(redirect)
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    $message.removeMessage()
  }
  loading.value = false
}
</script>
