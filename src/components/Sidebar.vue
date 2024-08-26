<template>
    <el-menu
      class="el-menu-vertical-demo"
      router
      background-color="#f5f5f5"
      text-color="#333"
      active-text-color="#409EFF"
      :default-active="activeMenu">
      <el-menu-item index="/user-management">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/permission-management/overview">
          <i class="el-icon-lock"></i>
          <span>权限概览</span>
        </el-menu-item>
        <el-menu-item index="/permission-management/own">
          <i class="el-icon-s-unfold"></i>
          <span>我的权限</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/statistics">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
    data() {
      return {
        activeMenu: this.$route.path
      };
    },
    watch: {
      $route(to) {
        this.activeMenu = to.path;
      }
    }
  };
  </script>
  
  <style scoped>
  .el-menu-vertical-demo {
    width: 200px;
    min-height: 100%;
    border-right: 1px solid #e6e6e6;
  }
  </style>
  