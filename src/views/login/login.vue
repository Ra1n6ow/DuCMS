<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script setup lang="ts">
import duRequest from '@/service'

duRequest
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style scoped>
.home {
  color: red;
}
</style>
