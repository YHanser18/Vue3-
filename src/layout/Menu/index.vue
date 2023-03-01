<template>
  <!-- 左侧导航栏 -->
  <el-menu
    :default-active="defaultActive"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :collapse="!$store.getters.sideBarType"
    router
    unique-opened
  >
    <el-sub-menu v-for="(item,index) in menus" :key="item.id" :index="item.id">
      <template #title>
        <el-icon :size="20">
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ $t(`mainMenu.${item.order }`) }}</span>
      </template>
      <el-menu-item
        v-for="(subItem) in item.children"
        :key="subItem.id"
        :index="'/' + subItem.path"
        @click="savePath(subItem.path)"
      >
        <template #title>
          <el-icon :size="20">
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${subItem.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const menus = ref([])
const inintMenuList = async () => {
  menus.value = await menuList() // 获取菜单列表
}
inintMenuList() // 初始化菜单栏

// 获取sessionStorage内的路径
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const savePath = (path) => {
  sessionStorage.setItem('path', `${path}`)
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-menu {
//   background: #1f2d3d!important;
// }
</style>
