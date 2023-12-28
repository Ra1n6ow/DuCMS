<template>
  <div class="main">
    <a-layout class="main-content">
      <a-layout-sider :width="isFold ? 60 : 210">
        <!-- 传递给子组件 -->
        <main-menu :is-fold="isFold" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <!-- 接收子组件传递的事件 -->
          <main-header @fold-change="handleFoldChange" />
        </a-layout-header>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import mainHeader from '@/components/mainHeader/mainHeader.vue'
import mainMenu from '@/components/mainMenu/mainMenu.vue'
import { ref } from 'vue'

const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}

.main-content {
  height: 100%;
  .arco-layout-sider {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    // 折叠动画
    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  :deep(.arco-layout-header) {
    height: 50px;
    padding: 0 18px;
  }

  .arco-layout-content {
    background-color: #f0f2f5;
    padding: 18px 18px;
  }
}
</style>
