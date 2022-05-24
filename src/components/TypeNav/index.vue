<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="leaveshow" @mouseenter="entershow">
				<h2 class="all">全部商品分类</h2>
				<!-- 使用过渡动画一定要加上transition而且组件必须有v-if/v-show指令 -->
				<transition name="sort">
					<div class="sort" v-show="show">
						<!-- 这里采用的是自定义属性+事件委派来完成确定是那个a标签跳转的 -->
						<div class="all-sort-list2" @click="goSearch">
							<div class="item" v-for="(c1,index) in category" :key="c1.categoryId"
								:class="{cur:currentIndex==index}">
								<h3 @mouseenter="changeIndex(index)">
									<!-- 用自定义属性确定那些是A标签 -->
									<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
								</h3>
								<!-- 二三级目录模块 -->
								<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
									<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
											</dt>
											<dd>
												<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>

				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>

		</div>
	</div>


</template>

<script>
	//获取vueX的数据
	import {
		mapState
	} from 'vuex'

	//按需加载节流函数
	import throttle from "lodash/throttle"
	export default {
		name: 'TypeNav',
		data() {
			return {
				currentIndex: -1,
				show: 'true'
			}
		},
		//挂载完成后通知VueX发起请求 获取请求 并存放仓库
		mounted() {
			//这里判断路由,是否为home首页
			if (this.$route.path!= '/home') {
				this.show = false
			}
		},
		computed:{
			//VUEX生成的map赋值函数 少用几次计算属性 对象形式
			...mapState({//把仓库里面的数据映射成组件自身的数据
				//category存放在页面上的字段名
				category: (state) => state.home.categoryList
			})
		},
		methods: {
			changeIndex: throttle(function(index) {
				this.currentIndex = index
			}, 50),
			entershow() {
				this.show = true;
			},
			leaveshow() {
				this.currentIndex = -1;
				if (this.$route.path != "/home") {
					this.show = false;
				}

			},
			goSearch(event) {
				let element = event.target;
				//把需要的数据结构出来 就是自定义属性里面的数据拿出来
				let {
					categoryname,
					category1id,
					category2id,
					category3id
				} = element.dataset;
				//判断点击的是不是a标签
				if (categoryname) {
					//整理路由的跳转参数
					let localtion = { name: 'search'};
					//把动态标签名当成query参数
					let query = {
						categoryName: categoryname
					}
					//这是一级目录的a标签
					if (category1id) {
						query.category1Id = category1id
						//二级目录的a标签
					} else if (category2id) {
						query.category2Id = category2id
						//三级目录的a标签
					} else {
						query.category3Id = category3id
					}

					//判断路由跳转的时候，带有params参数的时候，应该一起传递过去
					if(this.$route.params){
						localtion.params=this.$route.params;
						localtion.query =query;
						this.$router.push(localtion)
					}
				}
			}




		},
	}
</script>

<style scoped lang="less">
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 27px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						&:hover {
							.item-list {
								// display: block;
							}
						}
					}

					.cur {
						background: skyblue;
					}
				}

			}
			//过渡动画开始
			.sort-enter{
				height: 0px;
			}
			.sort-enter-to{
				height: 461px;
			}
			.sort-enter-active{
				transition: all .5s linear;
			}
		}
	}
</style>
