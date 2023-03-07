<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in BreadCrumbList" :key="index">
      <span
        v-if="index === BreadCrumbList.length - 1"
        class="no-redirect"
      >{{ $t(`menus.${item.name}`) }}</span>
      <span
        v-else
        @click="handleRedirect(item.path)"
        class="redirect"
      >{{ $t(`menus.${item.name}`) }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const BreadCrumbList = ref([])
const initBreadCrumbList = () => {
  BreadCrumbList.value = route.matched // 获取当前路径
}

const handleRedirect = (path) => {
  router.push(path) // 跳转页面
}

// 监听路由
watch(route, () => {
  initBreadCrumbList()
}, { deep: true, immediate: true })

</script>

<style lang="scss" scoped>
.no-redirect {
  cursor: pointer;
  color: #304156;
}

.redirect {
  color: #666;
  cursor: pointer;

  &.active {
    color: yellow;
  }
}
</style>
