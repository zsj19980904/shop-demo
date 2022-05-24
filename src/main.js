import Vue from 'vue';
import App from './App.vue';
import router from './router';
//引用vueX
import store from './store';
//注册为全局组件
import typeNav from "@/components/TypeNav";
//轮播图全局组件
import Carsousel from "@/components/Carsousel";
//分页器全局组件
import Pagination from "@/components/Pagination";
//注册Element-ui
import {MessageBox} from 'element-ui'
//注册全局组件 第一个参数为 组件名称  第二个参数 那个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);
//Elenmentui注册组件的时候，有俩种写法 一种是挂载到原型上，还有一种是注册全局组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockSever.js
import '@/mock/mockServe.js';
//引入swiper的css
import "swiper/css/swiper.css";
//引用的api文件夹里面的所有请求的参数
import * as API from '@/api'
//引入路由插件
import VueLazyload from 'vue-lazyload';
//引入图片
import atm from '@/assets/bidou.gif'
//注册插件
Vue.use(VueLazyload,{
	//懒加载默认的图
	loading:atm
});
//引入表单验证插件
import '@/plugin/validate'
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
	  //相当于把这个总线放到了原型上面
	  Vue.prototype.$bus=this;
	  //相当于把这个api放在Vue的原型上 然后通过原型对象可以访问到所有的API的标签
	  Vue.prototype.$API=API; 
	   },
  //注册路由
  router,
  //注册Vuex的仓库 并在组件实例上有$store属性
  store
  
}).$mount('#app')
