//配置路由

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
//配置路由信息

//路由懒加载的方式一 会更加高效便捷
const foo=()=>{
	return import('@/pages/Home')
}
export default [
	{
		//路由都是小写字母
		path: '/center',
		//路由懒加载的方式二
		component:()=>import("@/pages/Center"),
		meta: { isShow: true },
		children:[{
			path:'myorder',
			component:MyOrder
		},{
			path:'grouporder',
			component:GroupOrder
		},{
			path:'/center',
			redirect:'/center/myorder'
		}
		]
	},
	{
		//路由都是小写字母
		path: '/paysuccess',
		component: PaySuccess,
		meta: {
			isShow: true
		}
	},
	{
		//路由都是小写字母
		path: '/pay',
		component: Pay,
		meta: {isShow: true},
		beforeEnter:(to,from,next)=>{
			if(from.path == "/trade"){
				next();
			}else{
				//其他的路由组件而来，停留在当前
				next(false)
			}
		}
	},
	{
		//路由都是小写字母
		path: '/trade',
		component: Trade,
		meta: {isShow: true},
		//路由独享守卫
		beforeEnter:(to,from,next)=>{
			if(from.path == "/shopcart"){
				next();
			}else{
				//其他的路由组件而来，停留在当前
				next(false)
			}
		}
	},
	{
		//路由都是小写字母
		path: '/addcartsuccess',
		name: 'addcartsuccess',
		component: AddCartSuccess,
		meta: {
			isShow: true
		}
	},
	{
		//路由都是小写字母
		path: '/shopcart',
		component: ShopCart,
		meta: {
			isShow: true
		}
	},
	{
		path: '/detail/:skuid', //需要跳转的时候 传递参数给我们详情页
		component: Detail,
		//路由源信息 每个路由都有
		meta: {
			isShow: true
		}
	},
	{
		path: '/home',
		component:foo,
		//路由源信息 每个路由都有
		meta: {
			isShow: true
		}
	},
	{
		path: '/login',
		component: Login,
		meta: {
			isShow: false
		}
	},
	{
		path: '/register',
		component: Register,
		meta: {
			isShow: false
		}
	}, 
	{
		name: 'search',
		path: '/search/:keyword?',
		component: Search,
		meta: {
			isShow: true
		}
	},
	//重定向
	{
		path: '*',
		redirect: '/home',
		meta: {
			isShow: true
		}
	}
]
