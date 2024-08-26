<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="权限概览" name="overview">
      <el-table :data="permissions" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditPermission(scope.row)">编辑权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="我的权限" name="own">
      <el-tree :data="ownPermissions" node-key="id" :props="defaultProps"></el-tree>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'overview',
      permissions: [
        { username: 'admin', role: '超级管理员' },
        { username: 'user1', role: '普通用户' }
      ],
      ownPermissions: [
        {
          id: 1,
          label: '用户管理',
          children: [{ id: 2, label: '新增用户' }, { id: 3, label: '编辑用户' }]
        },
        {
          id: 4,
          label: '权限管理',
          children: [{ id: 5, label: '编辑权限' }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleEditPermission() {
      // 编辑用户权限
    }
  }
};
</script>
