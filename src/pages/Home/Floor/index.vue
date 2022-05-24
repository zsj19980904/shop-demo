<template>
	<div class="floor">
		<div class="py-container">
			<div class="title clearfix">
				<h3 class="fl">{{list.name}}</h3>
				<div class="fr">
					<ul class="nav-tabs clearfix">
						<li class="active" v-for="(text,index) in list.navList" :key="text.id">
							<a :href="text.url+index" data-toggle="tab">{{text.text}}</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="tab-content">
				<div class="tab-pane">
					<div class="floor-1">
						<div class="blockgary">
							<ul class="jd-list">
								<li v-for="(keyword,index) in list.keywords" :key="index">{{keyword}}</li>
							</ul>
							<img :src="list.imgUrl" />
						</div>
						<div class="floorBanner">
						<Carsousel :list="list.carouselList"/>	
						</div>
						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<img :src="list.recommendList[0]" />
							</div>
							<div class="floor-conver-pit">
								<img :src="list.recommendList[1]" />
							</div>
						</div>
						<div class="split center">
							<img :src="list.imgUrl" />
						</div>
						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<img :src="list.recommendList[2]" />
							</div>
							<div class="floor-conver-pit">
								<img :src="list.recommendList[3]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from "swiper";
	export default {
		name: 'Floor',
		//props:接收的是名称而不是值
		props: ['list'],
		//这里可以用mounted可以 因为请求的是父组件发的，父组件通过props传递过来过来，结构这些都已经有了的情况下mounted
		// mounted(){
		// 	var mySwiper = new Swiper(this.$refs.cur, {
		// 		loop: true,
		// 		pagination: {
		// 			el: ".swiper-pagination",
		// 			clickable: true,
		// 		},
		// 		navigation: {
		// 			nextEl: ".swiper-button-next",
		// 			prevEl: ".swiper-button-prev",
		// 		},
		// 	});
		// }
		//watch 数据变化就执行(这里情况是，数据变化了，但是不知道DOM元素是否更新了)
		// watch: {
		// 	list: {
		// 		immediate: true,
		// 		handler(newValue, oldValue) {
		// 			this.$nextTick(() => {
		// 				//这里也只能监听到数据的变化 v-for的DOM元素渲染还为确定，因此需要用到￥nextTice
		// 				var mySwiper = new Swiper(this.$refs.cur, {
		// 					loop: true,
		// 					pagination: {
		// 						el: ".swiper-pagination",
		// 						clickable: true,
		// 					},
		// 					navigation: {
		// 						nextEl: ".swiper-button-next",
		// 						prevEl: ".swiper-button-prev",
		// 					},
		// 				});
		// 			})
		// 		}
		// 	}
		// }
	}
</script>

<style scoped lang="less">
	.floor {
		margin-top: 15px;

		.py-container {
			width: 1200px;
			margin: 0 auto;

			.title {
				.fl {
					float: left;
					color: #c81623;
					font-size: 20px;
					line-height: 30px;
					margin: 9px 0;
					font-weight: 700;
				}

				.fr {
					float: right;

					.nav-tabs {
						margin: 10px 0 0;
						display: inline-block;

						li {
							float: left;
							line-height: 18px;

							a {
								padding-top: 1px;
								font-weight: 400;
								background-color: #fff;

								&::after {
									content: "|";
									padding: 0 10px;
								}
							}

							&:nth-child(7) {
								a {
									&::after {
										content: "";
									}
								}
							}

							&.active {
								a {
									color: #e1251b;
								}
							}
						}
					}
				}
			}

			.tab-content {
				border-top: 2px solid #c81623;
				border-bottom: 1px solid #e4e4e4;

				.tab-pane {
					.floor-1 {
						height: 360px;
						display: flex;

						.blockgary {
							width: 210px;
							height: 100%;
							background: #f7f7f7;

							.jd-list {
								padding: 15px 0;
								overflow: hidden;

								li {
									list-style-type: none;
									float: left;
									width: 40%;
									margin: 0 10px;
									border-bottom: 1px solid #e4e4e4;
									text-align: center;
									line-height: 26px;
								}
							}

							img {
								width: 100%;
							}
						}

						.floorBanner {
							width: 330px;
							height: 100%;
						}

						.split {
							width: 220px;
							height: 100%;
							position: relative;

							.floor-x-line {
								position: absolute;
								background: #e4e4e4;
								width: 220px;
								height: 1px;
								top: 180px;
							}

							.floor-conver-pit {
								width: 100%;
								height: 50%;

								img {
									width: 100%;
									height: 100%;
									transition: all 400ms;

									&:hover {
										opacity: 0.8;
									}
								}
							}
						}

						.center {
							border: 1px solid #e4e4e4;
						}
					}
				}
			}
		}
	}
</style>
