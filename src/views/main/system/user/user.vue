<template>
  <div class="user">
    <user-search />
    <user-content />
  </div>
</template>

<script setup lang="ts">
import userSearch from './userSearch.vue'
import userContent from './userContent.vue'
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
