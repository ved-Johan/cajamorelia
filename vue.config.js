const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://localhost:5001',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
})
