<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <div style="float: right;">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索用户名、邮箱、手机号"
            style="width: 300px; margin-right: 10px;"
            @input="handleSearch"
            clearable
            prefix-icon="el-icon-search"
          />
          <el-button type="primary" size="small" @click="openAddUserDialog">新增用户</el-button>
        </div>
      </div>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.gender === 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewUser(scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="openEditUserDialog(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="confirmDeleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalUsers">
      </el-pagination>
    </el-card>

    <!-- 增加用户的对话框 -->
    <el-dialog title="新增用户" :visible.sync="addUserDialogVisible" :close-on-click-modal="false">
      <el-form :model="newUser" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="newUser.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="newUser.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="newUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="newUser.address"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="newUser.gender" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="bio">
          <el-input v-model="newUser.bio"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddUser">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editUserDialogVisible" :close-on-click-modal="false">
      <el-form :model="selectedUser" :rules="editRules" ref="editUserForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="selectedUser.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="selectedUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="selectedUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="selectedUser.address"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="selectedUser.gender" placeholder="请选择性别">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="bio">
          <el-input v-model="selectedUser.bio"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditUser">保存</el-button>
      </div>
    </el-dialog>

    <!-- 用户详情的对话框 -->
    <el-dialog title="用户详情" :visible.sync="viewUserDialogVisible">
      <el-form :model="selectedUser">
        <el-form-item label="用户名">
          <span>{{ selectedUser.name }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ selectedUser.email }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{ selectedUser.phone }}</span>
        </el-form-item>
        <el-form-item label="地址">
          <span>{{ selectedUser.address }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ selectedUser.gender === 0 ? '男' : '女' }}</span>
        </el-form-item>
        <el-form-item label="简介">
          <span>{{ selectedUser.bio }}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{ selectedUser.status }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewUserDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchUsers, addUser, deleteUser, updateUser, searchUsers } from '@/api/user';

export default {
  data() {
    return {
      users: [], // 用户数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的用户数量
      totalUsers: 0, // 用户总数
      searchKeyword: '', // 搜索关键词
      addUserDialogVisible: false, // 控制新增用户对话框的显示
      editUserDialogVisible: false, // 控制修改用户对话框的显示
      viewUserDialogVisible: false, // 控制用户详情对话框的显示
      selectedUser: {}, // 当前选中的用户，用于详情和编辑
      newUser: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
        gender: 0,
        bio: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.newUser.password) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      },
      editRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetchUsers(this.currentPage, this.pageSize).then(response => {
          console.log("Fetched Users:", response.data.records); // 打印获取到的用户数据
          this.users = response.data.records; // 从响应中获取用户数据
          this.totalUsers = response.data.total; // 获取用户总数用于分页
      }).catch(error => {
          console.error("Failed to fetch users:", error);
      });
    },
    handleSearch() {
      this.currentPage = 1;
      searchUsers(this.currentPage, this.pageSize, this.searchKeyword).then(response => {
        console.log("Searched Users:", response.data.records);
        this.users = response.data.records;
        this.totalUsers = response.data.total;
      }).catch(error => {
        console.error("Failed to search users:", error);
      });
    },
    openAddUserDialog() {
      this.addUserDialogVisible = true;
      this.resetNewUser();
    },
    openEditUserDialog(user) {
      this.selectedUser = { ...user };
      this.editUserDialogVisible = true;
    },
    resetNewUser() {
      this.newUser = {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: '',
        gender: 0,
        bio: ''
      };
      this.$refs.addUserForm.resetFields(); // 重置表单验证
    },
    handleAddUser() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          addUser(this.newUser).then(() => {
            this.$message({
              message: '用户添加成功',
              type: 'success'
            });
            this.addUserDialogVisible = false;
            this.fetchUsers(); // 刷新用户列表
          }).catch(error => {
            console.error("Failed to add user:", error);
          });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    handleEditUser() {
      this.$refs.editUserForm.validate(valid => {
        if (valid) {
          updateUser(this.selectedUser).then(() => {
            this.$message({
              message: '用户信息更新成功',
              type: 'success'
            });
            this.editUserDialogVisible = false;
            this.fetchUsers(); // 刷新用户列表
          }).catch(error => {
            console.error("Failed to update user:", error);
          });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    handleViewUser(user) {
      this.selectedUser = { ...user };
      this.viewUserDialogVisible = true;
    },
    confirmDeleteUser(user) {
      this.$confirm(`此操作将永久删除用户 ${user.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDeleteUser(user);
      }).catch(() => {
        console.log('取消删除');
      });
    },
    handleDeleteUser(user) {
      console.log(`Attempting to delete user with ID: ${user.id}`);
      deleteUser(user.id).then(() => {
          this.$message({
              message: '用户删除成功',
              type: 'success'
          });
          if (this.users.length === 1 && this.currentPage > 1) {
              this.currentPage--; // 如果当前页面只剩一个用户且当前页码大于1，跳到前一页
          }
          this.fetchUsers(); // 删除成功后刷新用户列表
      }).catch(error => {
          console.error("Failed to delete user:", error);
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchUsers(); // 切换分页时重新获取用户数据
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
