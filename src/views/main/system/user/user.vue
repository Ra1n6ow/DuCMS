<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './userSearch.vue'
import userContent from './userContent.vue'

import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()

function handleQueryClick(formData: any) {
  // console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
