module.exports = {
	//关闭打包后出现的文件
  productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
		  //配置代理服务器 解决跨域
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
};
