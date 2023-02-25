<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input clearable :placeholder="$t('table.placeholder')" v-model="queryForm.query"></el-input>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

const queryForm = ref({
  query: '',
  pageNum: 1,
  pageSize: 2
})
</script>

<style lang="scss" scoped></style>
