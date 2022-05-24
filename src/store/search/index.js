import {
	reqGetSearchInfo
} from "@/api"

//state:仓库存储数据的地方
const state = {
	searchList:{}
};
//mutations:修改state的唯一手段
const mutations = {
	GETSEARCHLIST(state, searchList) {
		state.searchList = searchList
	}
};
//action:处理action:可以书写自己的业务逻辑和处理异步
const actions = {
	async getSearchList({commit}, params = {}) {
		let result = await reqGetSearchInfo(params)
		if (result.code === 200) {
			commit('GETSEARCHLIST', result.data)
		}
	}
};
//getters:可以理解为计算属性，用于简化仓库数据(简化数据)
//可以把我们将来在组件需要使用的数据简化一下(将来组件在获取数据的时候方便)
const getters = {
//当前形参的state，并非大仓库的state，而且当前仓库的state
	goodsList(state){
		//返回数据,为什么要加为空？
		//如果有网返回的肯定是一个数组 但是如果没有网or网速慢 就会出现undefined 会报错，因此要加上空数组
		return state.searchList.goodsList || []
	},
	trademarkList(state){
		return state.searchList.trademarkList || []
	},
	attrsList(state){
		return state.searchList.attrsList || []
	},
	
};

//需要对外暴露Store类的一个实例
export default ({
	state,
	mutations,
	actions,
	getters
})
