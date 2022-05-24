// 对Api进行统一管理
import requests from './request'
//请求mock的数据
import mockRequsests from './mock'
//这里为什么要对外暴露成一个函数？
export const reqCategoryList = () => requests({
	url: '/product/getBaseCategoryList',
	method: 'get'
}); //只要外埠调用这个函数 就可以向服务器发起ajax 获取数据

//调用banner数据
export const reqGetBannerList = () => mockRequsests({
	url: '/banner',
	method: 'get'
});

//请求floor数据
export const reqGetFloorList = () => mockRequsests({
	url: '/floor',
	method: 'get'
});
//请求Search数据
//当前调用接口的时候，至少要给一个(空对象)默认参数
export const reqGetSearchInfo = (params) => requests({
	url: '/list',
	method: 'post',
	data: params
})
//请求获取详情信息的接口

export const reqGoodsInfo =(skuId)=>requests({
	url:`/item/${skuId}`,
	method:'get'
})

//请求添加商城的接口
export const reqAddOrUpdateShopCat =(skuId,skuNum)=>requests({
	url:`/cart/addToCart/${ skuId }/${ skuNum }`,
	method:'post'
})

//请求购物车数据的接口
export const reqCartList =()=>requests({
	url:'/cart/cartList',
	method:'get'
})

//请求删除购物车的数据
export const reqDelectShop = (skuId)=>requests({
	url:`/cart/deleteCart/${skuId}`,
	method:'delete'
})

//请求修改购物车的数据
export const reqUpdeteShop = (skuID,isChecked)=>requests({
	url:`/cart/checkCart/${skuID}/${isChecked}`,
	method:'get'
})
//获取验证码
export const reqGetCode =(phone)=>requests({
	url:`/user/passport/sendCode/${phone}`,
	method:'get'
})
//注册用户
export const reqGetRegister =(data)=>requests({
	url:'/user/passport/register',data,
	method:'post'
})
//登录地址
export const reqGetLogin =( data ) =>requests({
	url:'/user/passport/login',data,
	method:'post'
})
//token校验
export const reqInfoUser=()=>requests({
	url:'/user/passport/auth/getUserInfo',
	method:'get'
})
//退出登录
export const reqSingOutUser=()=>requests({
	url:'/user/passport/logout',
	method:'get'
})
//获取获取用户地址信息
export const reqAddressList =()=>requests({
	url:'/user/userAddress/auth/findUserAddressList',
	method:'get'
})
//获取用户地址信息
export const reqOrder = () =>requests({
	url:'order/auth/trade',
	method:'get'
})
//提交订单详情
export const reqPay =(tradeNo,data)=>requests({
	url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,
	method:'post'
})
export const reqWeixin =(orderId)=>requests({
	url:`/payment/weixin/createNative/${orderId}`,
	method:'get'
})
export const reqPayList =(orderId)=>requests({
	url:`/payment/weixin/queryPayStatus/${orderId}`,
	method:'get'
})
export const reqMyOrder =(page,limit)=>requests({
	url:`/order/auth/${page}/${limit}`,
	method:'get'
})
