<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <!-- 搜索用户文本框 -->
        <el-input
          v-model="queryForm.query"
          clearable
          type="text"
          :placeholder="$t('table.placeholder')"
          @clear="initGetUser"
        >
          <template #append>
            <el-button :icon="Search" @click="initGetUser" />
          </template>
        </el-input>
      </el-col>

      <!-- 搜索用户  添加用户按钮 -->
      <el-button type="primary" @click="handleDialogValue()">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <!-- 用户表格展示 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :key="index"
      >
        <!-- 用户状态 -->
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch
            v-model="row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(row)"
          />
        </template>

        <!-- 创建时间 -->
        <template
          v-slot="{ row }"
          v-else-if="item.prop === 'create_time'"
        >{{ $filters.filterTimes(row.create_time) }}</template>

        <!-- 修改  删除用户按钮 -->
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="handleDialogValue(row)" />
          <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)" />
          <el-button type="warning" size="small" :icon="Setting" @click="handleSet" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[5, 15, 20, 30]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <!-- 弹窗对话框 -->
  <Dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogTableVal="dialogTableVal"
    @initUserList="initGetUser"
  />
</template>

<script setup>
import Dialog from './components/Dialog'
import { ref } from 'vue'
import { isNull } from '@/utils/filters'
import { getUser, getUserState, deleteUser } from '@/api/user.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 5
})
const total = ref(0) // 分页总数
const tableData = ref([]) // 表格数据

const dialogVisible = ref(false) // 弹窗显示
const dialogTitle = ref('') // 弹窗标题
const dialogTableVal = ref({}) // 弹窗标题

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
const changeUserState = async (info) => {
  await getUserState(info.id, info.mg_state)
  ElMessage({
    type: 'success', message: i18n.t('message.updeteSuccess')
  })
}

// 新增、编辑用户
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = i18n.t('dialog.addUser')
    dialogTableVal.value = {}
  } else {
    dialogTitle.value = i18n.t('dialog.editUser')
    dialogTableVal.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true // 关闭弹窗
}

// 删除用户
const delUser = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitle'), 'Warning', {
    confirmButtonText: i18n.t('button.confirm'),
    cancelButtonText: i18n.t('button.cancel'),
    type: 'warning'
  }).then(async () => {
    await deleteUser(row.id)
    ElMessage({
      type: 'success', message: i18n.t('message.deletedSuccess')
    })
    initGetUser() // 删除成功后刷新数据
  }).catch(() => {
    ElMessage({
      type: 'info', message: i18n.t('message.deletedFailure')
    })
  })
}

const handleSet = () => {
  ElMessage.error('尚未开发')
}

// 表格内容
const options = [
  { label: 'username', prop: 'username' },
  { label: 'email', prop: 'email' },
  { label: 'mobile', prop: 'mobile' },
  { label: 'role_name', prop: 'role_name' },
  { label: 'mg_state', prop: 'mg_state' },
  { label: 'create_time', prop: 'create_time' },
  { label: 'action', prop: 'action' }
]
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-table--fit {
  margin: 30px 0;
}

.el-pagination {
  float: right; //居右
  //float: left;居左
  // justify-content: center; //居中
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #ff9800 !important; //修改默认的背景色
}
</style>
