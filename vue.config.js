const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: "examples/main.js", //入口
      template: "public/index.html", //模板
      filename: "index.html" //输出文件
    }
  },
  configureWebpack: (config) => {
    config["performance"] = { //打包文件大小配置
      "maxEntrypointSize": 10000000,
      "maxAssetSize": 30000000
    }
  }
}
