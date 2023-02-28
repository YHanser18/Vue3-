<template>
  <el-card>
    <!-- 搜索用户与添加用户 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          clearable
          :placeholder="$t('table.placeholder')"
          v-model="queryForm.query"
          type="text"
        ></el-input>
      </el-col>
      <el-button @click="initGetUser" :icon="Search" type="primary">{{ $t('table.search') }}</el-button>
      <el-button @click="handleDialogValue()" type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <!-- 用户表格展示 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-colum
        v-for="(item, index) in options"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template
          v-slot="{ row }"
          v-else-if="item.prop === 'create_time'"
        >{{ $filters.filterTimes(row.create_time) }}</template>

        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="handleDialogValue(row)" />
          <el-button type="warning" size="small" :icon="Setting" />
          <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)" />
        </template>
      </el-table-colum>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <!-- 弹窗对话框 -->
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogTableVal="dialogTableVal"
    @initUserList="initGetUser"
    v-if="dialogVisible"
  />
</template>

<script setup>
import Dialog from './components/Dialog.vue'
import { getUser, getUserState, deleteUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import { isNull } from '@/utils/filters'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const total = ref(0) // 分页总数
const tableData = ref([]) // 表格数据

const dialogVisible = ref(false) // 弹窗显示
const dialogTitle = ref('') // 弹窗标题
const dialogTableVal = ref({}) // 弹窗标题

// 初始化表格数据
const initGetUser = async () => {
  const res = await getUser(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}
initGetUser()

// 页码的改变事件
const handleSizeChange = pageSize => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUser() // 更改后刷新数据
}
const handleCurrentChange = pageNum => {
  queryForm.value.pagenum = pageNum
  initGetUser()
}

// 更新开关状态
const changeState = async info => {
  await getUserState(info.uid, info.mg_state)
  ElMessage({
    type: 'success', message: i18n.t('message.updeteSuccess')
  })
}

// 弹出对话框
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTableVal.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableVal.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true // 关闭弹窗
}

// 删除用户
const delUser = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitle'), 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    await deleteUser(row.id)
    ElMessage({
      type: 'success', message: '删除成功'
    })
    initGetUser() // 删除后刷新数据
  }).catch(() => {
    ElMessage({
      type: 'info', message: '删除失败'
    })
  })
}

// 表格选项
const options = ref([
  { label: 'username', prop: 'username' },
  { label: 'email', prop: 'email' },
  { label: 'mobile', prop: 'mobile' },
  { label: 'role_name', prop: 'role_name' },
  { label: 'mg_state', prop: 'mg_state' },
  { label: 'create_time', prop: 'create_time' },
  { label: 'action', prop: 'action' }
])
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

.el-pagination {
  margin-top: 20px;
  float: right; //居右
  //float: left;居左
  // justify-content: center; //居中
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #ff9800 !important; //修改默认的背景色
}
</style>
