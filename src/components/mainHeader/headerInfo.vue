<template>
  <div class="header-info">
    <!-- 1.操作小图标 -->
    <div class="operation">
      <span>
        <icon-message size="20" />
      </span>
      <span>
        <icon-email size="20" />
      </span>
      <span>
        <span class="dot"></span>
        <icon-notification size="20" />
      </span>
    </div>

    <!-- 2.个人信息 -->
    <div class="info">
      <a-dropdown trigger="hover">
        <span class="user-info">
          <a-avatar>
            <img
              size="30px"
              src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            />
          </a-avatar>
          <span class="name">coderwhy</span>
        </span>
        <template #content>
          <a-doption @click="handleQuitBtnClick">
            <template #icon>
              <icon-poweroff />
            </template>
            <template #default>退出系统</template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-user />
            </template>
            <template #default>个人信息</template>
          </a-doption>
          <a-doption>
            <template #icon>
              <icon-unlock />
            </template>
            <template #default>修改密码</template>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'
import { localStorageCache } from '@/utils/cache'

function handleQuitBtnClick() {
  localStorageCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}
</style>
