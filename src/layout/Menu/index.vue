<template>
  <el-menu
    default-active="2"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    router
  >
    <el-sub-menu v-for="(item) in menus" :key="item.id" :index="item.id">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + subItem.path"
        v-for="(subItem) in item.children"
        :key="subItem.id"
      >{{ subItem.authName }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'

const menus = ref([])
const inintMenuList = async () => {
  menus.value = await menuList() // 获取菜单列表
}
inintMenuList()

</script>

<style lang="scss" scoped>
</style>
