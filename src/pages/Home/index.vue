<template>
	<div>
	<TypeNav/>
	<ListContainer/>
	<Recommend/>
	<Like/>
	<Rank/>
	<!-- 父传子 使用prpos 原理是通过参数来传递 -->
	<!-- floor这给组件:是因为组件内部是绵阳发现请求的，数据是父组件给的 -->
	<Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
	<Brand/>
	</div>
</template>

<script>
	import ListContainer from '@/pages/Home/ListContainer'
	import Recommend from '@/pages/Home/Recommend'
	import Rank from "@/pages/Home/Rank"
	import Like from "@/pages/Home/Like"
	import Floor from "@/pages/Home/Floor"
	import Brand from "@/pages/Home/Brand"
	import { mapState } from 'vuex';
	import store from '@/store'
	export default{
		name:'',
		components:{
			ListContainer,
			Recommend,
			Rank,
			Like,
			Floor,
			Brand
		},
		mounted(){
			console.log(store)
			this.$store.dispatch('getFloorList');
			//登录请求用户数据
			if(!localStorage.getItem('TOKEN')){
				store.state.user.token=null
			}
		},
		computed: {
			...mapState({
				floorList: (state) => state.home.catFloorList
			})
		},
	}
</script>

<style>
</style>
