module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 去掉 `/api` 前缀
        }
      }
    }
  }
};
