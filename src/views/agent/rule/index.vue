<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllRule"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem :content-width="290">
          <n-input v-model:value="queryItems.searchString" type="text" placeholder="输入要搜索的内容" @keydown.enter="$table?.handleSearch" />
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
      <n-form-item path="payType" label="支付类型名称" :rule="[{ required: true, message: '请输入支付类型名称', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.payType" placeholder="请输入支付类型名称" />
      </n-form-item>

      <n-form-item path="padFunded" label="是否平台垫资" :rule="[{ required: true, message: '请选择', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.padFunded" name="radiogroup">
          <n-space>
            <n-radio v-for="item in options.padFunded" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="ensure" label="是否兜底" :rule="[{ required: true, message: '请选择', trigger: ['change'] }]">
        <n-radio-group v-model:value="modalForm.ensure" name="radiogroup">
          <n-space>
            <n-radio v-for="item in options.ensure" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>

      <n-form-item path="platformRate" label="平台服务费" :rule="[{ required: true, message: '请输入平台服务费', trigger: ['input', 'blur'] }]">
        <n-input v-model:value="modalForm.platformRate" placeholder="请输入平台服务费"><template #suffix>%</template></n-input>
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
import { NButton } from 'naive-ui'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import api from '../api'

defineOptions({ name: 'Crud' })

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
  add: '添加规则',
  edit: '编辑规则'
})
const modalForm = ref({
  id: '',
  payType: '',
  padFunded: null,
  ensure: null,
  platformRate: ''
})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '支付类型',
    key: 'payType',
    render(row) {
      return h('span', options.payType.filter((e) => e.value == row.payType + '')[0]?.label)
    }
  },
  {
    title: '是否平台垫资',
    key: 'padFunded',
    render(row) {
      return h('span', options.padFunded.filter((e) => e.value == row.padFunded + '')[0]?.label)
    }
  },
  {
    title: '是否兜底',
    key: 'ensure',
    render(row) {
      return h('span', options.ensure.filter((e) => e.value == row.ensure + '')[0]?.label)
    }
  },
  {
    title: '平台服务费',
    key: 'platformRate',
    render(row) {
      return h('span', row.platformRate + '%')
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
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.id || row.gainsharingRuleId)
          },
          { default: () => '删除' }
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
  modalForm.value.payType = row.payType || ''
  modalForm.value.padFunded = row.padFunded || null
  modalForm.value.ensure = row.ensure || null
  modalForm.value.platformRate = row.platformRate || ''
  handleModal('edit')
}

// modal取消
const handleCancel = () => {
  $modalForm.value?.restoreValidation()
  modalVisible.value = false
  modalForm.value.id = ''
}
// modal保存
const handleSave = () => {
  console.log({ ...modalForm.value })
  $modalForm.value?.validate((errors) => {
    if (!errors) {
      console.log({ ...modalForm.value })
    } else {
      console.log(errors)
    }
  })
}

const { handleDelete } = useCRUD({
  doDelete: api.deletePost,
  refresh: () => $table.value?.handleSearch()
})
</script>
