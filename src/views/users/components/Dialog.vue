<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" @close="handleClose" width="45%">
    <el-form
      ref="dialogForm"
      :model="form"
      :rules="rules"
      :inline="true"
      :label-position="labelPosition"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="dialogTitle ==='添加用户'">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { addUser, editUser } from '@/api/user'
import { defineEmits, ref, defineProps, watch } from 'vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const emits = defineEmits(['update:modelValue', 'initUserList'])
const labelPosition = ref('right')
const dialogForm = ref(null)
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableVal: {
    type: Object,
    default: () => { }
  }
})

// 监听标题
watch(() => props.dialogTableVal, () => {
  form.value = props.dialogTableVal
}, { deep: true, immediate: true })

// 关闭弹窗
const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  // 提交时验证
  dialogForm.value.validate(async valid => {
    if (valid) {
      // 判断是添加用户还是编辑用户
      props.dialogTitle === '添加用户' ? await addUser(form.value) : await editUser(form.value)
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
      emits('initUserList') // 子传父
      handleClose()
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 表单校验
const rules = ref({
  username: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 9, message: '长度在 2 到 9 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' }
    // { pattern: '^1[3578]\\d{9}$' }
  ]
})
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 15px 15px;
}
</style>
