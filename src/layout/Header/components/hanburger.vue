<template>
  <!-- 折叠收起菜单按钮 -->
  <div @click="toggleClick" class="hamburger-container" id="hamburger">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const toggleClick = () => {
  store.commit('app/changeSideBarType')
}

// 头部导航栏 按钮切换
const icon = computed(() => {
  return store.getters.sideBarType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
