import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import home from "./home";
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import trade from './trade'
//需要对外暴露Store类的一个实例
export default new Vuex.Store({
	//分割模块
	modules:{
		home,
		search,
		detail,
		shopcart,
		user,
		trade
		}
})