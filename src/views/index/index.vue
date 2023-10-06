<script setup>
import { usePermissionStore } from '@/store'
const router = useRouter()

const permissionStore = usePermissionStore()
const accessRoutes = permissionStore.generateRoutes()
accessRoutes.sort((a, b) => a?.meta?.order - b?.meta?.order)[0].path
if (accessRoutes.length) {
  router.push(accessRoutes[0].path)
}
</script>
