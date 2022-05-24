<template>
	<div class="swiper-container" ref="cur">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
				<img :src="carousel.imgUrl">
			</div>
		</div>
		<!-- 如果需要点击器 -->
		<div class="swiper-pagination"></div>
		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'Carsousel',
		//props:接收的是名称而不是值
		props: ['list'],
		watch: {
			list: {
				immediate: true,
				handler(newValue, oldValue) {
					this.$nextTick(() => {
						//这里也只能监听到数据的变化 v-for的DOM元素渲染还为确定，因此需要用到￥nextTice
						var mySwiper = new Swiper(this.$refs.cur, {
							loop: true,
							pagination: {
								el: ".swiper-pagination",
								clickable: true,
							},
							navigation: {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							},
						});
					})
				}
			}
		}
	}
</script>

<style scoped="">
</style>
