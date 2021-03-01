/**
 * PostCSS配置文件
 */
module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用 autoprefixer
    // 作用：生成浏览器css样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer
    // 所以下面这个配置可以注释掉
    // autoprefixer: {//autoprefixer 插件的配置
    //     //配置使用 postcss-pxtorem 插件
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把px转为rem
    'postcss-pxtorem': {
      // lib-flexible的rem适配方案：把一行分为10份，每份是十分之一
      // 所以rootValue 应该设置为设计稿的十分之一
      // 我们的设计稿是750，所以应该设置为 750 / 10 = 75
      // 但是Vant建议设置为37.5，为什么 因为Vant是基于375写的
      // 所以在测量设计稿的时候要/2再去写
      // rootValue 支持两种数据类型：数字和函数
      // rootValue: 37.5,
      // 数字：固定值
      // 函数：动态计算返回
      // postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
      // 它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性 * 表示所有属性
      propList: ['*']
    }
  }
}
