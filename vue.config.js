const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
  },
  configureWebpack: {
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
});
