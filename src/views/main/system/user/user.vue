<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content
      ref="contentRef"
      @createClick="handleCreateUserClick"
      @editClick="handleEditUserClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './userSearch.vue'
import userContent from './userContent.vue'
import userModal from './userModal.vue'

import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()

function handleQueryClick(formData: any) {
  // console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

function handleCreateUserClick() {
  modalRef.value?.setModalVisible()
}
function handleEditUserClick(itemData: any) {
  // console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
