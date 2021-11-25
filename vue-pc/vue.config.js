module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "https://gitee.com/Huiyun-Co/yiqun.git",
        productName: "bzGhost", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2020 bzGhost", //版权信息
        directories: {
          output: "./dist_electron" //输出文件路径
        },
        win: {
          //win相关配置
          icon: "public/favicon.ico",
          target: [
            {
              target: "nsis",
              arch: ["x64"]
            }
          ]
        }
      }
    }
  },
  devServer: {
    port: 8088,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      "/": {
        target: "http://127.0.0.1:9998/",
        ws: false,
        changeOrigin: true,
        xfwd: false
      }
    }
  }
};
