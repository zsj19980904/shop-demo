import { reqAddressList,reqOrder } from '@/api';
const state = {
	address:[],
	orderinfo:{}
};
//获取用户地址的数据
const mutations={
	GETRESSLIST(state,address){
		state.address=address;
	},
	//获取用户订单数据
	GETORDER(state,orderinfo){
		state.orderinfo=orderinfo;
	}
};
const actions = {
	//获取用户地址信息
	async getAddressList({commit}){
		let result =await reqAddressList()
		console.log(result)
		if(result.code==200){
			commit('GETRESSLIST',result.data)
		}
	},
	//获取用户订单交易信息
	async getOrder({commit}){
		let result =await reqOrder();
		console.log(result);
		if(result.code==200){
		commit('GETORDER',result.data)
		}
	},
};
const getters = {
};
export default {
	state,
	mutations,
	actions,
	getters
}
