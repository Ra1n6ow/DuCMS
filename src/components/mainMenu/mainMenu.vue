<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <!-- 折叠状态才显示 -->
      <h2 v-if="!isFold" class="title">后台管理系统</h2>
    </div>
    <!-- 导航 -->
    <div class="navdemo">
      <a-menu
        :default-open-keys="[defaultOpenKeys]"
        :default-selected-keys="[defaultSelectKeys]"
        :collapsed="isFold"
      >
        <template v-for="item in userMenus" :key="item.id">
          <!-- arco 组件在v-for条件下设置key会报错，需要在 arco 组件加个判断 -->
          <a-sub-menu v-if="item.id" :key="item.id + ''">
            <!-- 通过服务器获取 icon 字符串,这里没测试数据，所以写死, 这里可以使用动态组件,
            <template #icon>
              <component :is="'icon-desktop'" /> 将字符串换成对应的变量就行了
            </template>
           -->
            <template #icon><icon-desktop /></template>
            <template #title>{{ item.name }}</template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <a-menu-item
                v-if="subitem.id"
                :key="subitem.id + ''"
                @click="handleItemClick(subitem)"
                >{{ subitem.name }}</a-menu-item
              >
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
      <!-- <a-menu>
        <a-sub-menu key="0">
          <template #icon><icon-desktop /></template>
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <a-menu-item key="1_0">Menu 1</a-menu-item>
          <a-menu-item key="1_1">Menu 2</a-menu-item>
          <a-menu-item key="1_2">Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
        </a-sub-menu>
      </a-menu> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { router, useRoute } from '@/router'
import useLoginStore from '@/store/login'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/mapMenus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 默认菜单
const route = useRoute()
// 当前菜单选择始终保持和当前路由一致
const menu: [any, any] = mapPathToMenu(route.path, userMenus)
const defaultOpenKeys = ref(menu[0].id + '')
const defaultSelectKeys = ref(menu[1].id + '')

const router = useRouter()
function handleItemClick(item: any) {
  const url: string = item.url
  router.push(url)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 0px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.arco-menu {
  background-color: #001529;
  :deep(.arco-menu-inline-header.arco-menu-selected:hover) {
    background-color: #001529;
  }
  :deep(.arco-menu-inline-header.arco-menu-selected) {
    color: #fff;
  }
  :deep(.arco-menu-inline-header) {
    color: #b7bdc3;
    background-color: #001529;
  }
  .arco-menu-item.arco-menu-selected {
    color: #fff;
    background-color: #0a60bd;
  }
  .arco-menu-item {
    color: #b7bdc3;
    background-color: #001529;
    // background-color: #0c2135;
  }
  :deep(.arco-menu-selected .arco-icon) {
    color: #fff;
  }
  :deep(.arco-menu-pop) {
    color: #b7bdc3;
    background-color: #001529;
  }
}
</style>
