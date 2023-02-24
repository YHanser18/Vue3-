<template>
  <div class="navbar">
    <Hanburger />
    <Breadcrumb />
    <div class="navbar-right">
      <Lang class="navbar-item" />
      <Avatar class="navbar-item" />
    </div>
  </div>
</template>

<script setup>
import Hanburger from './components/Hanburger'
import Breadcrumb from './components/Breadcrumb'
import Avatar from './components/Avatar'
import Lang from './components/Lang'
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
