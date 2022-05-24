// 引用路由
import {
	reqCategoryList,
	reqGetBannerList,
	reqGetFloorList} from '@/api'
//引用轮播图路由
//state:仓库存储数据的地方
const state = {
	categoryList: [],
	//存数据的地方
	catBannerList: [],
	catFloorList:[]
};
//mutations:修改state的唯一手段 
const mutations = {
	//三级联动
	CATEGORYLIST(state, categoryList) {
		state.categoryList = categoryList;
		
	},
	//轮播图
	CATBANNERLIST(state, catBannerList) {
		state.catBannerList = catBannerList;
	},
	//电梯导航
	CATFLOORLIST(state,catFloorList){
		state.catFloorList=catFloorList;
	}

};
//action:处理action:可以书写自己的业务逻辑和处理异步
// Vuex 中 使用 Action 处理异步请求时写法 
// 使用vuex时 官方推荐使用commit才修改state数据。
const actions = {
	async categoryList({commit}) {
		let result = await reqCategoryList();
		//判断请求
		if (result.code == 200) {
			//vueX(commit)保存数据 mutations函数 数据
			commit('CATEGORYLIST', result.data);
		}
	},
	//banner数据
	async getBannerList({commit}) {
		let result = await reqGetBannerList();
		if (result.code == 200) {
			commit('CATBANNERLIST', result.data);
		}
	},
	//floor数据
	async getFloorList({commit}){
		let result =await reqGetFloorList();
		if(result.code == 200){
			commit('CATFLOORLIST',result.data)
		}
	}
};
//getters:可以理解为计算属性，用于简化仓库数据
const getters = {};

//需要对外暴露Store类的一个实例
export default ({
	state,
	mutations,
	actions,
	getters
})
