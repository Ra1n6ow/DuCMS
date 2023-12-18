<template>
  <div class="app">
    <h2>CMS-app</h2>
    <router-link to="/login">登录页面</router-link>
    <router-link to="/main">主要页面</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
