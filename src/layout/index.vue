<template>
  <el-container class="app-wrapper">
    <el-aside :width="asideWidth" class="sidebar-container">
      <Menu />
    </el-aside>
    <el-container :class="{ hidderContainer: !$store.getters.sideBarType }" class="container">
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from './Menu'
import Header from './Header'
import { computed } from 'vue'
import { useStore } from 'vuex'
// import variables from '@/styles/variables.scss'

const store = useStore()
const asideWidth = computed(() => {
  // 左侧导航栏宽度变化
  return store.getters.sideBarType ? '300px' : '67px'
})
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
