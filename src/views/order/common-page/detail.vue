<template>
  <CommonPage>
    <n-h6 prefix="bar" align-text><n-text type="primary">基础信息</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>租借人：</div>
        <div flex-1 ml-8>{{ orderDetail.rentUserInfoVo?.name || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>支付宝账号：</div>
        <div flex-1 ml-8>{{ orderDetail.rentUserInfoVo?.phone || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>身份证号码：</div>
        <div flex-1 ml-8>
          <span>{{ orderDetail.rentUserInfoVo?.idCard || '--' }}</span>
          <n-button type="primary" size="small" ml-16>查看身份证</n-button>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">紧急联系人</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>姓名：</div>
        <div flex-1 ml-8>{{  orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.name || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>关系：</div>
        <div flex-1 ml-8>{{  orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.relation || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>联系方式：</div>
        <div flex-1 ml-8>
          <span>{{  orderDetail.rentUserInfoVo?.emergencyContactVos[0]?.phone || '--' }}</span>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">租借设备</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>车架号：</div>
        <div flex-1 ml-8>{{ orderDetail.equipmentInfoVo?.chassisNumber || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>车牌号：</div>
        <div flex-1 ml-8>{{ orderDetail.equipmentInfoVo?.licensePlateNumber || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>中控号：</div>
        <div flex-1 ml-8>{{ orderDetail.equipmentInfoVo?.equipmentCode || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>车辆来源：</div>
        <div flex-1 ml-8>{{ '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>型号：</div>
        <div flex-1 ml-8>{{ orderDetail.productInfoVo?.productName || '--' }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>电压：</div>
        <div flex-1 ml-8>{{ orderDetail.productInfoVo?.voltage || '--' }} V</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>速度：</div>
        <div flex-1 ml-8>{{ orderDetail.productInfoVo?.speed || '--' }} km/h</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>价值：</div>
        <div flex-1 ml-8>{{ orderDetail.productInfoVo?.price ? formatFee( orderDetail.productInfoVo?.price, 'front') : '--' }} 元</div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">换车记录</n-text></n-h6>
    
    <n-h6 prefix="bar" align-text><n-text type="primary">租借方式</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>支付方式：</div>
        <div flex-1 ml-8>{{ orderDetail.payTypeInfoVo?.payType }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>租借合同：</div>
        <div flex-1 ml-8><n-button type="primary" size="small">下载</n-button></div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>租借时间：</div>
        <div flex-1 ml-8>{{ formatDate( orderDetail.payTypeInfoVo?.createTime) }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>到期时间：</div>
        <div flex-1 ml-8>{{ formatDate( orderDetail.payTypeInfoVo?.expireTime) }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>租借期限：</div>
        <div flex-1 ml-8>{{ orderDetail.payTypeInfoVo?.rentDays }} 天</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>退租时间：</div>
        <div flex-1 ml-8>{{ formatDate( orderDetail.payTypeInfoVo?.returnTime ) }}</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>免押押金：</div>
        <div flex-1 ml-8>
          <span>{{ formatFee( orderDetail.sesameDepositDetail?.unfreeze, 'front') }} 元</span>
          <n-button type="primary" size="small" ml-16>冻结</n-button>
          <n-button type="primary" size="small" ml-8>申扣押金</n-button>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">其他信息</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>办单人：</div>
        <div flex-1 ml-8>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16>添加办单人</n-button>
        </div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>推荐人：</div>
        <div flex-1 ml-8>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16>添加推荐人</n-button>
        </div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>备注：</div>
        <div flex-1 ml-8>
          <span>{{ '--' }}</span>
          <n-button type="primary" size="small" ml-16>添加备注</n-button>
        </div>
      </div>
    </div>
    <n-h6 prefix="bar" align-text><n-text type="primary">租金支付情况</n-text></n-h6>
    <div p-4 text-16 flex flex-wrap>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>租车单价：</div>
        <div flex-1 ml-8>{{ formatFee( orderDetail.productRentVo?.rentUnitFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>换电单价：</div>
        <div flex-1 ml-8>{{ formatFee( orderDetail.productRentVo?.depositFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>合计月租金：</div>
        <div flex-1 ml-8>{{ formatFee( orderDetail.productRentVo?.sumUnitFee, 'front') }} 元/月</div>
      </div>
      <div class="w-1/4" flex mb-8>
        <div w-120 text-right>总租金：</div>
        <div flex-1 ml-8>{{ formatFee( orderDetail.productRentVo?.sumFee, 'front') }} 元</div>
      </div>
    </div>
    <CrudTable
      ref="$table"
      :scroll-x="1200"
      :columns="columns"
      :init-table-data="tableData"
    >
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { formatDateTime, formatFee } from '@/utils'
import { useCRUD } from '@/composables'
import { options } from '../constant'
import api from '../api'

defineOptions({ name: 'Crud' })

const router = useRouter()
const { query } = useRoute()

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
const orderDetail = ref({})
const getDetail = ()=> {
  api.getOrderDetail( { rentOrderI: query.rentOrderId } ).then(res=> {
    tableData.value = res.data?.payInfoVos || []
    orderDetail.value = res.data
    console.log(orderDetail, tableData.value)
  })
}
getDetail()

const agentUser = ref([])
const getAgentUser = ()=> {
  api.getAgentUser( { rentOrderI: query.rentOrderId } ).then(res=> {
    agentUser.value = res.data || []
    console.log(agentUser)
  })
}
getAgentUser()


const columns = [
  { title: '预扣日期', key: 'payTime', render(row) { return h('span', formatDate( row.payTime))} },
  { title: '支付日期', key: 'realPayTime', render(row) { return h('span', formatDate( row.realPayTime))} },
  { title: '支付金额', key: 'payFee', render(row) { return h('span', formatFee( row.payFee, 'front'))} },
  { title: '支付方式', key: 'payType', render(row) { return h('span', valueToName(row.payType, options.payType) )}  },
  { title: '支付结果', key: 'refundStatus', render(row) { return h('span', valueToName(row.refundStatus, options.status) )} },
  {
    title: '操作',
    key: 'actions',
    width: 500,
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
            onClick: () => handleView(row),
          },
          { default: () => '立即代付' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'tertiary',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '取消代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'info',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '恢复代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'success',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '发起代扣' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            style: 'margin-left: 15px;',
            onClick: () => handleView(row),
          },
          { default: () => '修改租金' }
        )
      ]
    },
  },
]

const valueToName = (value, options)=> {
  return options.filter( e=> e.value === value+'')[0]?.label || ''
}

const formatDate = (time) => {
  return time ? formatDateTime( time ) : '--'
}

const handleView = (row) => {
  console.log(row)
  router.push({ name: 'order-detail', params: { ...row }})
  
}

useCRUD({
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch(),
})
</script>

