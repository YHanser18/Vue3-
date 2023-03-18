const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false, // 关闭eslint校验
  // 配置代理跨域
  devServer: {
    https: false,
    hot: false,
    proxy: {
      '/api': {
        target: 'http://43.143.0.76:8889/api/private/v1/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // 配置element-plus按需引入
  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: false })]
      })
    )
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver({ importStyle: false })]
      })
    )
  },
  // 配置全局sass
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixin.scss";
        `
      }
    }
  },
  // 配置svg图标
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
}
