<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(shop,index) in carShopInfo" :key="shop.id">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="shop.isChecked==1" @change="updeteChecked($event,shop)">
					</li>
					<li class="cart-list-con2">
						<img :src="shop.imgUrl">
						<div class="item-msg">{{shop.skuName}}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{shop.skuPrice}}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="handle('minus',-1,shop)">-</a>
						<input autocomplete="off" type="text" minnum="1" class="itxt" :value="shop.skuNum"
							@change="handle('change',$event.target.value *1,shop)">
						<a href="javascript:void(0)" class="plus" @click="handle('add',1,shop)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{shop.skuNum * shop.skuPrice}}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="delectShop(shop)">删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" :checked="AllCheck" @change="updeteAllChecked" :disabled="carShopInfo.length==''?true:false" />
				<span>全选</span>
			</div>
			<div class="option">
				<a  @click="deleteAllChekedShop">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>0</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{total}}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="/trade">结算</router-link>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import throttle from "lodash/throttle"
	export default {
		name: 'ShopCart',
		//自调用一次 只调用一次
		mounted() {
			this.getDate();
		},
		methods: {
			getDate() {
				this.$store.dispatch('getCartList')
			},
			
			handle: throttle(async function(type, disNum, shop) {
				//修改某一个产品的回调函数 需要
				switch (type) {
					//如果是加号
					case 'add':
						disNum = 1
						break;
					case 'minus':
						disNum = shop.skuNum > 1 ? -1 : 0;
						break;
					case 'change':
						//非正常的情况 
						if (isNaN(disNum) || disNum < 1) {
							disNum = 0
						} else {
							disNum = parseInt(disNum) - shop.skuNum;
						}
						break;
				}
				//这里需要派发action 因为用的是一个接口 同时也需要返回用户失败和成功的值
				try {
					let ruset = await this.$store.dispatch('getAddOrUpdateShopCat', {
						skuId: shop.skuId,
						skuNum: disNum
					})
					// 需要重新向服务器再次发送一个数据 因为上面只调用了一次
					this.getDate()
				} catch (errer) {
					alert(errer.message);
				}
			}, 1000),
			//删除的数据发送
			async delectShop(shop) {
				try {
					await this.$store.dispatch('getDelect', shop.skuId);
					this.getDate();
				} catch (errer) {
					alert(errer.message)
				}
			},
			//修改的数据
			 async updeteChecked(e,shop){
				try{
					let isChecked=e.target.checked ? "1" :"0"
					await this.$store.dispatch('getUpdate',{
						skuId:shop.skuId,
						isChecked,
					})
					this.getDate();
				}catch(errer){
					alert(errer.message)
				}
			},
			//删除全部的数据
			async deleteAllChekedShop(){
				try{
					 await this.$store.dispatch('deleteAllChekedShop')
					this.getDate()
				}catch(errer){
					console.log(errer.message)
				}
			},
		//全选反选 event 不用传值也可以拿到
		async updeteAllChecked(event){
			try{
			let isChecked=event.target.checked ?'1':'0';
			await this.$store.dispatch('updetaAllCheckedShop',isChecked)
			this.getDate();
			}catch(errer){
			alert (errer.message)
			}
		}
			
		},
		computed: {
			...mapGetters(['cartList']),
			carShopInfo() {
				return this.cartList.cartInfoList || []
			},
			//计算总价
			total() {
				let sum = 0;
				this.carShopInfo.forEach((item) => {
					if(item.isChecked==1){
						sum+=item.skuNum*item.skuPrice
					}
				})
				return sum;
			},
			//全选按钮
			AllCheck(){
					return this.carShopInfo.every((item) =>{
						return this.isChecked == 1
					});
				}
			},
             
		}
	
</script>

<style lang="less" scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				&>div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;

				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					&>li {
						float: left;
					}

					.cart-list-con1 {
						width: 15%;
					}

					.cart-list-con2 {
						width: 35%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					.cart-list-con4 {
						width: 10%;

					}

					.cart-list-con5 {
						width: 17%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 10%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 13%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
