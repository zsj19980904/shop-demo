import { reqGetCode,reqGetRegister,reqGetLogin,reqInfoUser,reqSingOutUser} from "@/api";
import { setToken,getToken,removeToken,removeUserToken} from '@/utils/token'
const state={
	code:'',
	token:getToken(),
	userinfo:{}
};
const mutations={
	GETCODE(state,code){
		state.code=code
	},
	GETLOGIN(state,token){
		state.token=token;
	},
	GETINFO(state,userinfo){
		state.userinfo=userinfo
	},
	GETOUTUSER(state){
		state.token=null,
		state.userinfo={},
		removeToken();
	}
};
const actions={
	//获取验证码
	async getCode({commit},phone){
		let result = await reqGetCode(phone);
		if(result.code==200){
			commit('GETCODE',result.data)
			return 'ok';
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	//获取密码 
	async getRegister({commit},data){
		let result = await reqGetRegister(data);
		if(result.code==200){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	//登录验证
	async getLogin({commit},user){
		let result = await reqGetLogin(user)
		if(result.code==200){
			//这里面的token是服务器给用户的唯一标识的信息
			commit('GETLOGIN',result.data.token)
			setToken(result.data.token)
			return 'ok'
		}else{
			removeUserToken(result.code)
			return Promise.reject(result.message);
		}
		},
		//获取用户信息
		async getInfoUser({commit},user){
			let result= await reqInfoUser();
			//如果这里发送的是208 就删除token
			removeUserToken(result.code)
			if(result.code==200){
				commit('GETINFO',result.data);
			}
		},
		//退出登录
		async getSignOutUser({commit}){
			let result =await reqSingOutUser();
			if(result.code==200){
				commit('GETOUTUSER')
				return 'ok'
			}else{
				return Promise.reject(result.data)
			}
		} 
	};
//简化数据用
const getters={};
export default{
	state,
	actions,
	mutations,
	getters
}