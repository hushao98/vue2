<template>
  <el-container>
    <el-aside v-if="showSidebar" width="200px" class="sidebar">
      <SidebarMenu />
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import SidebarMenu from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  computed: {
    showSidebar() {
      // 判断当前路由是否为登录页面
      return this.$route.name !== 'Login';
    }
  }
};
</script>

<style scoped>
.el-container {
  height: 100vh; /* 确保整个容器占满视口高度 */
}

.sidebar {
  background-color: #f0f2f5; /* 设定左侧导航栏背景颜色 */
  height: 100%; /* 设置高度为100% */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-main {
  padding: 20px;
  background-color: #fafafa; /* 可选：设置右侧内容区背景颜色 */
  overflow-y: auto; /* 使内容可以滚动 */
}
</style>
