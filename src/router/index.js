import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes"
//使用路由插件
Vue.use(VueRouter)
import store from '@/store'
//保留vueRouter原型对象的push,先保存一份
let originpush = VueRouter.prototype.push;
//保留vueRouter原型对象的replace,先保存一份
let originreplace = VueRouter.prototype.replace;
//重写push|replace方法 底层为promise 先把路由地址传递过去,然后用指定成功和失败的回调
VueRouter.prototype.replace=function(location,resolve,reject){
	//先判断是否有正确或错误传递
	if(resolve&&reject){
		// 判断是否有值传入,依然要调用原型对象的方法
		originreplace.call(this,location,resolve,reject)
	}else{
		originreplace.call(this,location,()=>{},()=>{})
	}
}
//replace 重写
VueRouter.prototype.push=function(location,resolve,reject){
	//先判断是否有正确或错误传递
	if(resolve&&reject){
		// 判断是否有值传入,依然要调用原型对象的方法
		originpush.call(this,location,resolve,reject)
	}else{
		originpush.call(this,location,()=>{},()=>{})
	}
}



//对外暴露VUEROUTER的实例
let router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
	    return {y:0}
	  }
});
//全局前置守卫
router.beforeEach(async (to,form,next)=>{
	next();
	//获取token和用户名
	let token =store.state.user.token;
	//这个name不是存在而是判断userinfo这个属性是否存在
	let name = store.state.user.userinfo.name;
	//判断是否有token,用户登录了
	if(token){
	  //已经登录了,所有要用路由守卫了
	  if(to.path=="/login"|| to.path=="/register"){
		next('/'); 
	  }else{
		  //如果登录了,且页面有name属性
		  if(name){
			  next();
		  }else{
			  //如果有登录信息但是页面上没有name属性
			  //就派发让页面展示就可以了
			  try{
			  await store.dispatch('getInfoUser');
			  next();
			  }catch(error){
			//失效的时候就是token没有的时候
			await store.dispatch('getSignOutUser');
			next('/login');
			  }
		  }
	  }
	}else{
	//存一个变量 再没有登录的时候 不能使用这些路由
	let toPath=to.path;
	//如果点击了,但是没有登录，需要把参数带到query参数里面
	if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
		      
		next('/login?redirect='+toPath);
	}else{
		//不是这些正常通行
		next();
	}
	
	}
});
export default router