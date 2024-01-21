<template>
  <div class="modal">
    <a-modal
      v-model:visible="dialogVisible"
      title="新建用户"
      @cancel="handleCancelBtnClick"
      @before-ok="handleCreateBtnClick"
    >
      <a-form :model="formData" :style="{ width: '430px' }">
        <a-form-item field="name" label="用户名">
          <a-input v-model="formData.name" />
        </a-form-item>
        <a-form-item field="realname" label="真实姓名">
          <a-input v-model="formData.realname" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="formData.password" />
        </a-form-item>
        <a-form-item field="cellphone" label="手机号码">
          <a-input v-model="formData.cellphone" />
        </a-form-item>
        <a-form-item field="roleId" label="选择角色">
          <a-select v-model="formData.roleId">
            <template v-for="item in entireRoles" :key="item.id">
              <a-option :value="item.id" :label="item.name"></a-option>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item field="departmentId" label="选择部门">
          <a-select v-model="formData.departmentId">
            <template v-for="item in entireDepartments" :key="item.id">
              <a-option :value="item.id" :label="item.name"></a-option>
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
// 1.定义内部的属性
const dialogVisible = ref(true)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 2.定义设置dialogVisible方法
function setModalVisible() {
  dialogVisible.value = true
}

function handleCancelBtnClick() {
  dialogVisible.value = false
}

// 3.点击了确定的逻辑
function handleCreateBtnClick() {
  dialogVisible.value = false
  // 创建新的用户
  systemStore.createUserDataAction(formData)
}

// 3.获取roles/departments数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped></style>
