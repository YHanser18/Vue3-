<template>
  <el-dropdown @command="handleCommand">
    <svg-icon icon="language"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const i18n = useI18n()

// 禁用当前的语言
const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>
</style>
