import Vue from 'vue';
import VueRouter from 'vue-router';
import UserManagement from '../views/UserManagement.vue';
import PermissionManagement from '../views/PermissionManagement.vue';
import UserStatistics from '../views/Statistics.vue';
import LoginView from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/user-management', name: 'UserManagement', component: UserManagement },
  { path: '/permission-management/overview', name: 'PermissionOverview', component: PermissionManagement },
  { path: '/permission-management/own', name: 'OwnPermissions', component: PermissionManagement },
  { path: '/statistics', name: 'Statistics', component: UserStatistics }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
