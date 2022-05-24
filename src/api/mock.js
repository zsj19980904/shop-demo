//存放axios文件夹 
//二次封装axios 对Api进行统一管理
import axios from 'axios';
//引入进度条文件
import nprogress from 'nprogress'
// console.log(nprogress)
//引入进度条的样式
import "nprogress/nprogress.css"
const requests = new axios.create({
	baseURL: "/mock",
	timeout: 5000, //超时时间5s
});
//请求拦截器
// 添加请求拦截器
requests.interceptors.request.use((config) => {
			// 在发送请求之前做些什么
			nprogress.start();//请求响应之前开始进度条
			return config; //config 记录了本次请求的信息
		})

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
