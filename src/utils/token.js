//添加本地存储的token
import store from '@/store'
export const setToken=(token)=>{
	localStorage.setItem('TOKEN',token)
}
//获取本地存储的token
export const getToken =()=>{
	return localStorage.getItem('TOKEN');
}
//删除本地存储的的token
export const removeToken =()=>{
	localStorage.removeItem('TOKEN');
}
export const removeUserToken=(code)=>{
	if(code==208){
	localStorage.removeItem('TOKEN');
	store.state.user.token=null
	}
}
