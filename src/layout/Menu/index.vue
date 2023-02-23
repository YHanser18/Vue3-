<template>
  <el-menu
    :default-active="defaultActive"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    router
    unique-opened
  >
    <el-sub-menu v-for="(item,index) in menus" :key="item.id" :index="item.id">
      <template #title>
        <component :is="iconList[index]"></component>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + subItem.path"
        v-for="(subItem) in item.children"
        :key="subItem.id"
        @click="savePath(subItem.path)"
      >
        <template #title>
          <component :is="icon"></component>
          <span>{{ subItem.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'

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
::v-deep .el-sub-menu__title svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

::v-deep .el-menu-item svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
