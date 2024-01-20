<template>
  <div class="search">
    <a-form :model="searchForm" size="large" ref="formRef">
      <a-row :gutter="20">
        <a-col :span="8">
          <!-- field 字段类似于 prop 属性，重置方法resetFields()需要根据该字段定位到该组件 -->
          <a-form-item
            label="用户名"
            label-col-flex="100px"
            style="padding-right: 50px"
            field="name"
          >
            <a-input v-model="searchForm.name" placeholder="请输入查询的用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="realname" label="真实姓名" label-col-flex="80px">
            <a-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="cellphone" label="手机号码" label-col-flex="80px">
            <a-input v-model="searchForm.cellphone" placeholder="请输入手机号码" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="enable" label="状态" label-col-flex="100px">
            <a-select placeholder="选择查询状态">
              <a-option>0</a-option>
              <a-option>1</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="createAt" label="创建时间" label-col-flex="80px">
            <a-range-picker
              v-model="searchForm.createAt"
              show-time
              :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
              format="YYYY-MM-DD HH:mm"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 一个 a-row 即可，超过 24 span 自动换行 -->
      <!-- <a-row :gutter="20"> </a-row> -->
    </a-form>
    <div class="btns">
      <a-button @click="handleResetClick">
        <template #icon>
          <icon-refresh />
        </template>
        <template #default>重置</template>
      </a-button>
      <a-button type="primary" @click="handleQueryClick">
        <template #icon>
          <icon-search />
        </template>
        <template #default>查询</template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Form } from '@arco-design/web-vue/es'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  // 这里应该是个数组，接口有 bug，传 [] 会报错
  createAt: []
})

// const formRef = ref<InstanceType<(typeof import('@arco-design/web-vue'))['Form']>>()
const formRef = ref<InstanceType<typeof Form>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleQueryClick() {
  // 将事件传递到父组件 user
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  :deep(.arco-row) {
    padding: 5px 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
    .arco-btn {
      margin-left: 15px;
    }
  }
}
</style>
