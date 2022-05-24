import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符 且不能发生变化 
export const getUUid=()=>{
	//先判断本地存储里面是否有值
	let uuid_token=localStorage.getItem('UUIDTOKEN');
	//如果没有就生成
	if(!uuid_token){
		//就生成uuid
		uuid_token=uuidv4();
		//并把uuid存在localStorage中
		localStorage.setItem('UUIDTOKEN',uuid_token)
	}
	//封装函数一定要有返回值
	return uuid_token
}