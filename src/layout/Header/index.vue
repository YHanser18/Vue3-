<template>
  <div class="navbar">
    <!-- 折叠收起菜单按钮 -->
    <Hanburger />
    <!-- 面包屑导航 -->
    <Breadcrumb />
    <div class="navbar-right">
      <!-- 内容指导 -->
      <Driver class="navbar-item" />
      <!-- 全屏按钮 -->
      <ScreenFull class="navbar-item" />
      <!-- 中英文切换 -->
      <Lang class="navbar-item" />
      <!-- 个人中心 -->
      <Avatar class="navbar-item" />
    </div>
  </div>
</template>

<script setup>
import Hanburger from './components/Hanburger'
import Breadcrumb from './components/Breadcrumb'
import Driver from './components/Driver'
import ScreenFull from './components/ScreenFull'
import Lang from './components/Lang'
import Avatar from './components/Avatar'
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    :deep(.navbar-item) {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
