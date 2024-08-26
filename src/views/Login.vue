<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">用户管理系统</h2>
      <el-form :model="form" @submit.native.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      this.$router.push('/user-management');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://hebutai-1312789137.cos.ap-beijing.myqcloud.com/userAdmin/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.85);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.el-form-item {
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  border-radius: 8px;
  height: 40px;
}
</style>
