# 一期需求：

1. 订单管理 【租户】
   - 全部订单
   - 逾期订单
   - 代扣管理
2. 设备管理 【租户】
   - 设备管理
   - 设备型号
3. 代理商 【租户】
   - 店铺管理
   - 租金设置
4. 资产统计
5. 财务管理 【租户】
   - 分润打款
   - 分润明细
6. 审核管理 【租户】

   - 租金审核
   - 减押申请
   - 扣押申请
   - 退租申请

7. 系统管理 【平台 | 租户】
   - 账号管理
   - 角色管理 (菜单 | 数据)
8. 平台管理 【平台】

   - 租户管理
   - 菜单管理

   - 全部订单
   - 逾期订单
   - 代扣管理

   - 资产统计

   - 分润打款
   - 分润明细

   - 扣押申请

system(系统)

system:index(首页)

tenant:order(订单管理) ok

tenant:order:all(全部订单) ok

tenant:order:overtime-order(逾期订单)

tenant:order:bill(代扣管理) ok

tenant:device(设备管理) ok

tenant:device:device(设备管理) ok

tenant:device:device-type(设备型号) ok

tenant:store(代理商) ok

tenant:store:store(店铺管理) ok

tenant:store:rent-type(租金设置) ok

tenant:statistics(数据统计) ok

tenant:statistics:assets(资产统计) ok

tenant:finance(财务管理) ok

tenant:finance:profit-distribution(分润打款) ok

tenant:finance:profit-distribution-detail(分润明细) ok

tenant:approve(审核管理) ok

tenant:approve:rent-price(租金审核) ok

tenant:approve:deposit-reduce(减押申请) ok

tenant:approve:deduct-deposit(扣押申请) ok

tenant:approve:withdraw-rent(退租申请) ok

tenant:system(系统管理) ok

tenant:system:account(账号管理) ok

tenant:system:role(角色管理) ok

platform:tenant(平台管理) ok

platform:tenant:tenant(租户管理) ok

platform:tenant:menu(菜单管理) ok

platform:business(业务管理) ok

platform:business:deduct-deposit-apply(扣押申请) ok

platform:business:profit-distribution(分润打款) ok

platform:statistics(数据统计) ok

platform:statistics:assets(资产统计) ok

platform:statistics:profit-distribution-detail(分润明细) ok

platform:statistics:all-order(全部订单) ok

platform:statistics:overtime-order(逾期订单) ok

platform:statistics:bill(代扣管理) ok
