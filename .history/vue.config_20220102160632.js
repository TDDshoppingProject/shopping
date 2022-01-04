module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://111.73.199.127:8082', // 接口的前缀
        ws: true, // 代理websocked
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': '' // 重写路径
        }
      }
    }
  }
}
