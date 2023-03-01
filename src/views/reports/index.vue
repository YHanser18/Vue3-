<template>
  <div class="card-container">
    <el-card class="box-card">
      <div class="text item">item</div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">item</div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">item</div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">item</div>
    </el-card>
  </div>
  <el-card class="box-card">
    <div class="text item">item</div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.card-container {
  display: flex;
}

.box-card {
  margin: 10px 15px;
  cursor: pointer;
  width: 320px;
  height: 120px;
}
</style>
