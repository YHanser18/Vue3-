<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl" :key="squareUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="profile">个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const squareUrl = ref('https://img2.baidu.com/it/u=864800148,863255913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')

// 退出登录
const logout = () => {
  store.dispatch('app/logout')
}

const profile = () => {
  ElMessage.error('尚未开发')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
