import {
	reqCartList,
	reqDelectShop,
	reqUpdeteShop
} from '@/api';
const state = {
	cartList: []
};
const mutations = {
	GETCARTLIST(state, cartList) {
		state.cartList = cartList;
	}
};
//请求购物车的数据
const actions = {
	async getCartList({
		commit
	}) {
		let result = await reqCartList();
		if (result.code == 200) {
			commit('GETCARTLIST', result.data)
		}
	},
	//删除购物车的数据
	async getDelect({
		commit
	}, skuId) {
		let result = await reqDelectShop(skuId);
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('felie'))
		}
	},
	//修改购物车的数据
	async getUpdate({
		commit
	}, {
		skuId,
		isChecked
	}) {
		let result = await reqUpdeteShop(skuId, isChecked);
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.resolve(new Error('felie'))
		}
	},
	//存放删除已经选中的购物车的信息
	deleteAllChekedShop({
		dispatch,
		getters
	}) {
		//存放成功与失败的回调函数
		let arr = [];
		
		getters.cartList.cartInfoList.forEach(item => {
			let promise = item.isChecked == 1 ? dispatch('getDelect', item.skuId) : '';
			arr.push(promise);
		})
		return Promise.all(arr)
	},
	//全选与全不选
	updetaAllCheckedShop({ dispatch,state }, isChecked) {
		let arr = [];
		state.cartList[0].cartInfoList.forEach((item) => {
			let promise = dispatch('getUpdate', {skuId: item.skuId,isChecked})
			arr.push(promise);
		})
		return Promise.all(arr)
	}

};
const getters = {
	cartList(state) {
		//为什么数组里面只要一个寻找第0个? 因为是返回的是一个对象
		return state.cartList[0] || [];
	}
};
export default {
	state,
	mutations,
	actions,
	getters
}
