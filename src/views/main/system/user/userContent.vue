<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <a-button type="primary">
        <template #default>新建用户</template>
      </a-button>
    </div>
    <a-table :data="usersList" :row-selection="rowSelection" :bordered="{ cell: true }">
      <template #columns>
        <!-- <a-table-column title="序号" :cell-style="{ width: '70px' }"> -->
        <a-table-column title="序号" :width="70" align="center">
          <template #cell="data">
            {{ data.rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="用户名" data-index="name" align="center"></a-table-column>
        <a-table-column title="真实姓名" data-index="realname" align="center"></a-table-column>
        <a-table-column title="手机号码" data-index="cellphone" align="center"></a-table-column>
        <a-table-column title="状态" data-index="enable" align="center"></a-table-column>
        <a-table-column title="创建时间" data-index="createAt" align="center"></a-table-column>
        <a-table-column title="更新时间" data-index="updateAt" align="center"></a-table-column>
        <a-table-column title="操作" :width="200" align="center">
          <template #cell>
            <a-button type="text">
              <template #icon>
                <icon-edit />
              </template>
              <template #default>编辑</template>
            </a-button>
            <a-button type="text" status="danger">
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <!-- <div class="pagination">分页</div> -->
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/index'
import type { TableRowSelection } from '@arco-design/web-vue'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const systemStore = useSystemStore()
systemStore.postUsersListAction()

const { usersList } = storeToRefs(systemStore)

const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true
  // onlyCurrent: true
})
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  }
]
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}
</style>
