const { defineConfig } = require('@vue/cli-service')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验

  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      })
    )
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
  },
  chainWebpack (config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      .rule('svg') // 规则
      .exclude.add(resolve('src/icons')) // 忽略
      .end() // 结束
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      .rule('icons') // 规则
      .test(/\.svg$/) // 正则，解析 .svg 格式文件
      .include.add(resolve('src/icons')) // 解析的文件
      .end() // 结束
      .use('svg-sprite-loader') // 新增了一个解析的loader
      .loader('svg-sprite-loader') // 具体的loader
      .options({
        symbolId: 'icon-[name]' // loader 的配置
      })
      .end() // 结束
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
