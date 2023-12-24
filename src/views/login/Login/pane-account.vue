<template>
  <div class="pane-account">
    <a-form :model="account" :style="{ width: '300px' }" ref="formRef">
      <a-form-item
        field="name"
        label="帐号"
        validate-trigger="input"
        :rules="[
          { required: true, message: 'name is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
          { maxLength: 15, message: 'must be less than 15 characters' }
        ]"
      >
        <a-input v-model="account.name" placeholder="输入用户名" />
      </a-form-item>
      <a-form-item
        field="password"
        label="密码"
        validate-trigger="input"
        :rules="[
          { required: true, message: 'password is required' },
          { minLength: 5, message: 'must be greater than 5 characters' },
          { maxLength: 15, message: 'must be less than 15 characters' }
        ]"
      >
        <a-input-password v-model="account.password" placeholder="输入密码" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from '@arco-design/web-vue/es/form'
import { Message } from '@arco-design/web-vue'

import useLoginStore from '@/store/login'
import type { IAccount } from '@/types'

const formRef = ref<FormInstance>()
const account = reactive<IAccount>({
  name: '',
  password: ''
})
const loginStore = useLoginStore()

function loginAction() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      const name = account.name
      const password = account.password
      // 可以直接传 account，也可以传里面指定的对象（靠谱)
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log(res)
      // })

      // 改由 pinia 内部发起登录请求
      loginStore.loginAccountAction({ name, password })
    } else {
      Message.error('登录失败')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  padding: 15px 0 15px 0;
}
</style>
