<template>
  <div class="panel-login">
    <h1 class="title">后台管理系统</h1>

    <!-- 将 active-key 作为组件value -->
    <a-tabs type="card-gutter" size="large" v-model:active-key="activeName">
      <a-tab-pane key="account">
        <template #title> <icon-user /> 帐户登录 </template>
        <!-- 帐户子组件 -->
        <pane-account ref="accountRef"></pane-account>
      </a-tab-pane>
      <a-tab-pane key="phone">
        <template #title> <icon-phone /> 手机登录 </template>
        <!-- 手机子组件 -->
        <pane-phone></pane-phone>
      </a-tab-pane>
    </a-tabs>

    <!-- 底部区域 -->
    <div class="controls">
      <a-checkbox value="isRemPwd">记住密码</a-checkbox>
      <a-link href="link">忘记密码</a-link>
    </div>
    <a-button @click="handleLoginBtnClick" type="primary" long>登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'

const isRemPwd = ref(false)
const activeName = ref('account')

// 引用组件的实例类型
const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction()
  } else {
    console.log('pppppp')
  }
}
</script>

<style lang="less" scoped>
.panel-login {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    // margin-top: 12px;
    margin: 12px 0 12px 0;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
