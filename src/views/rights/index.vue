<template>
  <el-card>
    <el-table
      :data="rightList"
      :default-sort="{ prop: 'path', order: 'descending' }"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" :label="$t('right.number')" width="150" />
      <el-table-column prop="authName" :label="$t('right.permission')" />
      <el-table-column prop="path" :label="$t('right.way')" sortable />
      <el-table-column
        prop="level"
        :label="$t('right.privilege')"
        :filters="[
        { text: $t('rightLevel.one'), value: '0' },
        { text: $t('rightLevel.two'), value: '1' },
        { text: $t('rightLevel.three'), value: '2' },
      ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="{ row }">
          <el-tag v-if="row.level === '0'">{{ $t('rightLevel.one') }}</el-tag>
          <el-tag type="success" v-else-if="row.level === '1'">{{ $t('rightLevel.two') }}</el-tag>
          <el-tag type="warning" v-else-if="row.level === '2'">{{ $t('rightLevel.three') }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getRights } from '@/api/right'

const rightList = ref([]) // 角色列表

const getRightsList = async () => {
  const res = await getRights()
  rightList.value = res
}
getRightsList()

// 过滤权限等级
const filterTag = (value, row) => {
  return row.level === value
}
</script>

<style lang="scss" scoped>
.el-table {
  cursor: pointer;
}
</style>
