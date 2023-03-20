<template>
  <!-- 卡片视图 -->
  <el-card>
    <!-- 添加角色按钮区 -->
    <el-row>
      <el-col>
        <el-button @click="handleDialog()" type="primary" :icon="Plus">添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 角色列表区 -->
    <el-table :data="roleList" stripe border style="width: 100%">
      <!-- 展开列 -->
      <el-table-column type="expand"></el-table-column>

      <el-table-column
        v-for="(item,index) in tableLabel"
        :prop="item.prop"
        :label="item.label"
        :key="index"
        align="center"
      >
        <!-- 修改  删除用户按钮 -->
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="handleDialog(row)" />
          <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)" />
          <el-tooltip effect="dark" :content="$t('button.assign')" placement="top" class="box-item">
            <el-button type="warning" size="small" :icon="Setting" @click="handleSet" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 对话框弹窗 -->
  <Dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogTableVal="dialogTableVal"
    @initUserList="initGetRoles"
  />
</template>

<script setup>
import Dialog from './components/Dialog.vue'
import { ref } from 'vue'
import { isNull } from '@/utils/filters'
import { getRoles, deleteRole } from '@/api/right'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete, Setting, Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const roleList = ref([]) // 角色列表

const dialogTitle = ref('') // 弹窗标题
const dialogVisible = ref(false) // 弹窗显示
const dialogTableVal = ref({}) // 弹窗内的用户信息

const initGetRoles = async () => {
  const res = await getRoles()
  roleList.value = res
}
initGetRoles()

// 新增、编辑用户
const handleDialog = (row) => {
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
    await deleteRole(row.id)
    ElMessage({
      type: 'success', message: i18n.t('message.deletedSuccess')
    })
    initGetRoles() // 删除成功后刷新数据
  }).catch(() => {
    ElMessage({
      type: 'info', message: i18n.t('message.deletedFailure')
    })
  })
}

// 表格内容
const tableLabel = [
  { label: '角色名称', prop: 'roleName' },
  { label: '角色描述', prop: 'roleDesc' },
  { label: '操作', prop: 'action' },
]
</script>

<style lang="scss" scoped>
</style>
