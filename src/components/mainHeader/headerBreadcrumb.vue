<template>
  <div class="Bread">
    <a-breadcrumb>
      <template #separator>
        <icon-right />
      </template>
      <template v-for="item in currentMenu" :key="item.name">
        <a-breadcrumb-item>{{ item.name }}</a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { mapPathToMenu } from '@/utils/mapMenus'
import useLoginStore from '@/store/login'

const loginStore = useLoginStore()
const route = useRoute()

// currentMenu 渲染面包屑
// computed 属性监听path的变化, 自动更新 currentMenu
const currentMenu = computed(() => {
  return mapPathToMenu(route.path, loginStore.userMenus)
})
</script>

<style lang="less" scoped>
.Bread {
  color: red;
}
</style>
