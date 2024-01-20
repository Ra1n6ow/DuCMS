<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <a-button type="primary">
        <template #default>新建用户</template>
      </a-button>
    </div>
    <a-table
      :data="usersList"
      :row-selection="rowSelection"
      :bordered="{ cell: true }"
      :pagination="false"
    >
      <template #columns>
        <!-- <a-table-column title="序号" :cell-style="{ width: '70px' }"> -->
        <a-table-column title="序号" :width="70" align="center">
          <template #cell="scope">
            {{ scope.rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="用户名" data-index="name" align="center"></a-table-column>
        <a-table-column title="真实姓名" data-index="realname" align="center"></a-table-column>
        <a-table-column title="手机号码" data-index="cellphone" align="center"></a-table-column>
        <a-table-column title="状态" align="center">
          <template #cell="scope">
            <a-button
              type="outline"
              size="mini"
              :status="scope.record.enable ? 'normal' : 'danger'"
            >
              {{ scope.record.enable ? '启用' : '禁用' }}
            </a-button>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" align="center">
          <template #cell="scope">
            {{ formatUTC(scope.record.createAt) }}
          </template>
        </a-table-column>
        <a-table-column title="更新时间" align="center">
          <template #cell="scope">
            {{ formatUTC(scope.record.updateAt) }}
          </template>
        </a-table-column>
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
    <div class="pagination">
      <a-pagination
        :total="usersTotalCount"
        v-model:current="currentPage"
        v-model:page-size="pageSize"
        show-total
        show-jumper
        show-page-size
        :page-size-options="pageSizeOptions"
        @change="handleCurrentChange"
        @page-size-change="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/index'
import type { TableRowSelection } from '@arco-design/web-vue'
import { storeToRefs } from 'pinia'
import { reactive, ref, toRaw } from 'vue'
import { formatUTC } from '@/utils/format'

const pageSizeOptions: number[] = reactive([5, 10, 20, 30, 50])

// 1. 发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(5)

fetchUserListData()

const { usersList, usersTotalCount } = storeToRefs(systemStore)

const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true
  // onlyCurrent: true
})

function handleCurrentChange(current: number) {
  console.log('handleCurrentChange', current)
  fetchUserListData()
}

function handlePageSizeChange(current: number) {
  console.log('handlePageSizeChange', current)
  fetchUserListData()
}

function fetchUserListData(formData: any = {}) {
  // 1.获取offset/size
  // 接口参数
  // data: {
  //   offset: 0,
  //   size: 10
  // }
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 本应该是数组，但是空数组接口会报错
  if (formData.createAt?.length === 0) {
    formData.createAt = ''
  }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

defineExpose({
  fetchUserListData
})
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

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
