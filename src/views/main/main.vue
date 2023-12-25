<template>
  <div class="main">
    <h2>main</h2>
    <a-button @click="logoutBtnClick" type="primary" status="warning" shape="round"
      >退出登录</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'
import { localStorageCache } from '@/utils/cache'

function logoutBtnClick() {
  localStorageCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped>
.main {
  color: red;
}
</style>
