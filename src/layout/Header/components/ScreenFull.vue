<template>
  <!-- 全屏按钮 -->
  <div @click="handleFullScreen" id="screenFull">
    <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle() // 全屏切换
  }
}

const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}

// 监听icon的改变
onMounted(() => {
  screenfull.on('change', changeIcon)
})

onBeforeUnmount(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
