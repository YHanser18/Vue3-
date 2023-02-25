<template>
  <div @click="toggleClick" class="hamburger-container" id="hamburger">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 头部导航栏 按钮切换
const toggleClick = () => {
  store.commit('app/changeSideBarType')
}

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
