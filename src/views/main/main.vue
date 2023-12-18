<template>
  <div class="main">
    <h2>main: {{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <div @click="changeCounter">修改</div>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
function changeCounter() {
  counterStore.changeCounterAction(888)
}
</script>

<style scoped>
.main {
  color: red;
}
</style>
