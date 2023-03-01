<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" @close="handleClose" width="45%">
    <!-- 新增  修改用户的表单验证 -->
    <el-form
      ref="dialogForm"
      :model="form"
      :rules="rules"
      :inline="true"
      :label-position="labelPosition"
      label-width="85px"
    >
      <el-form-item prop="username" :label="$t('form.name')">
        <el-input v-model="form.username" :placeholder="$t('form.nameInput')" />
      </el-form-item>

      <!-- 选择编辑用户时 不显示密码框 -->
      <el-form-item
        prop="password"
        :label="$t('form.password')"
        v-if="dialogTitle === $t('dialog.addUser')"
      >
        <el-input v-model="form.password" :placeholder="$t('form.passwordInput')" />
      </el-form-item>
      <el-form-item prop="email" :label="$t('form.email')">
        <el-input v-model="form.email" :placeholder="$t('form.emailInput')" />
      </el-form-item>
      <el-form-item prop="mobile" :label="$t('form.mobile')">
        <el-input v-model="form.mobile" :placeholder="$t('form.mobileInput')" />
      </el-form-item>
    </el-form>

    <!-- 确认 取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { addUser, editUser } from '@/api/user'
import { defineEmits, ref, defineProps, watch } from 'vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t // 使用全局函数

// 子传父
const emits = defineEmits(['update:modelValue', 'initUserList'])
const labelPosition = ref('right')
const dialogForm = ref(null)
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

// 接受父组件的传值
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
      props.dialogTitle === t('dialog.addUser') ? await addUser(form.value) : await editUser(form.value)
      ElMessage({
        message: t('message.updeteSuccess'),
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
    { required: true, message: t('form.nameInput'), trigger: 'blur' },
    { min: 2, max: 9, message: t('form.nameRequired'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('form.passwordInput'), trigger: 'blur' }
  ],
  email: [
    { required: true, message: t('form.emailInput'), trigger: 'blur' },
    { type: 'email', message: t('form.emailRequired'), trigger: ['blur', 'change'] }
  ],
  mobile: [
    { required: true, message: t('form.mobileInput'), trigger: 'blur' },
    { pattern: '^1[3456789]\\d{9}$' }
  ]
})
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 20px 15px;
}

::v-deep .el-input__inner {
  width: 210px;
}
</style>
