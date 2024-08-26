import axios from 'axios';

// 设置全局的 baseURL
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'http://39.99.245.72:8090';

// 获取用户数据，传递分页参数
export function fetchUsers(page, size) {
    return axios.post('users/list', {
        page: page,
        size: size
    });
}

// 搜索用户
export function searchUsers(page, size, keyword) {
    return axios.post('users/search', {
        page: page,
        size: size,
        keyword: keyword
    });
}

// 增加用户
export function addUser(user) {
    return axios.post('users/add', user);
}

// 修改用户信息
export function updateUser(user) {
    return axios.post('users/update', user);
}

// 删除用户
export function deleteUser(userId) {
    return axios.post(`users/delete/${userId}`);
}
