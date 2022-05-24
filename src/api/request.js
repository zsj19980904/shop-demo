//存放axios文件夹 
//二次封装axios 对Api进行统一管理
import axios from 'axios';
//引入进度条文件
import nprogress from 'nprogress'
// console.log(nprogress)
//引入进度条的样式
import "nprogress/nprogress.css"

import store from '@/store'

const requests = new axios.create({
	baseURL: "/api", // 默认路径 以后发起Api的时候跨域默认不带改参数
	timeout: 5000, //超时时间5s
});
// 添加请求拦截器
requests.interceptors.request.use((config) => {
	//请求通过请求头带过去的参数
	if(store.state.detail.getuuid){
		//给请求头添加一个自动 需要和后端商量
  config.headers.userTempId = store.state.detail.getuuid
  }
	if(store.state.user.token){
		config.headers.token = store.state.user.token;
	}
  nprogress.start();
  return config;
});

// 添加响应拦截器
requests.interceptors.response.use((res) => {
			// 对响应成功的数据
			nprogress.done(); //请求结束,结束响应
			return res.data;
		},(error) => {
			// 对响应错误做点什么 直接报错
			return Promise.reject(error) //;
		});


export default requests;
