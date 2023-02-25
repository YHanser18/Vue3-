<template>
  <el-dropdown @command="handleCommand" id="language">
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
import { useStore } from 'vuex'
const i18n = useI18n()
const store = useStore()

// 禁用当前的语言
const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val) => {
  i18n.locale.value = val
  store.commit('app/changeLang', val)
  localStorage.setItem('lang', val) // 修改localStorage内的值
}
</script>

<style lang="scss" scoped>
</style>
