<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuBtnClick">
      <!-- 子组件三元运算，这里如果没有全局导入icon组件会不生效 -->
      <component :is="isFold ? 'icon-menu-unfold' : 'icon-menu-fold'" size="26px" />
      <!-- <component :is="'icon-menu-fold'" size="26px" />
      <icon-menu-unfold size="26px" />
      <icon-menu-fold size="26px" /> -->
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div>个人信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isFold = ref(false)

// 定义emit 事件
const emit = defineEmits(['foldChange'])

function handleMenuBtnClick() {
  isFold.value = !isFold.value

  // 将foldChange事件传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
