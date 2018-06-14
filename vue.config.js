// vue.config.js
// [更多配置](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/config.md)

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  baseUrl: isProduction ? '/hello/dist/' : '/',

  // 将构建好的文件输出到哪里
  outputDir: isProduction ? 'dist' : 'dist_local',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 是否为生产环境构建生成 source map？
  productionSourceMap: !isProduction
}
