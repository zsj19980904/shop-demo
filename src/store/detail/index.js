import { reqGoodsInfo,reqAddOrUpdateShopCat } from "@/api"
import { getUUid } from "@/utils/uuid_token"
const state={
	goodInfo:{},
	getuuid: getUUid(),
};
const mutations={
	//这里的state是上面的state goodinfo是相当于传递过来的仓库的值
	GETGOODINFO(state,goodInfo){
		//相当于把仓库的值给state里面的goodInfo
		state.goodInfo=goodInfo;
	}
};
//获取产品信息的actin 使用vuex时 官方推荐使用commit才修改state数据。
const actions={
	async getGoodInfo({commit},skuId){
		//premise请求 返回的结果
		let result =await reqGoodsInfo(skuId);
		if(result.code == 200){
			commit("GETGOODINFO",result.data)
		} 
	},
	//存放请求成功的购物车数据 
	async getAddOrUpdateShopCat({commit},{skuId, skuNum }){
		let result = await reqAddOrUpdateShopCat(skuId,skuNum);
       if(result.code==200){
		   return 'ok';
	   }else{
		   return Promise.reject( new Error('falle')) 
	   }
		
			
		
	}
	
	
};
//简化数据用
const getters={
	categoryView(state){
		// 这里为什么是state goodinfo是相当于传递过来的仓库的值！！！
		return state.goodInfo.categoryView || {};
	},
	skuInfo(state){
		return state.goodInfo.skuInfo||{}
	},
	//售卖属性的简化
	spuSaleAttrList(state){
		return state.goodInfo.spuSaleAttrList || []
	}
};
export default{
	state,
	actions,
	mutations,
	getters
}