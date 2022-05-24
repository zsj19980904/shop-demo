<template>
  <div class="spec-preview" ref="max">
    <img :src='imgObj.imgUrl'/>
	<!-- 大盒子 存放事件的地方 -->
    <div class="event" @mousemove="move"></div>
	<!-- 大图片存放的位置 -->
    <div class="big" ref="big" >
      <img :src="imgObj.imgUrl" ref="img" />
    </div>
	<!-- 移动的小盒子 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
	props:['skuImageList'],
	data(){
		return{
			cuttIndex:0,
		}
	},
	computed:{
		imgObj(){
			return this.skuImageList[this.cuttIndex] ||[]
		}
	},
	mounted(){
		this.$bus.$on('getIndex',(index)=>{
			this.cuttIndex=index
		})
	},
	methods:{
		move(e){
			//获取小盒子是容器的DOM
			let max=this.$refs.max;
			//获取小盒子的DOM
			let mask=this.$refs.mask;
			//获取大盒子的DOM
			let big=this.$refs.big;
			//获取大盒子里面的图片的Dom
			let img=this.$refs.img;
			let left=e.offsetX-mask.offsetWidth/2;
			let top=e.offsetY-mask.offsetHeight/2;
			//获取小盒子的最大的移动位置
			let maskmax=max.offsetWidth-mask.offsetWidth;
			//获取大盒子的最大移动位置
			let bigmax=big.offsetWidth-img.offsetHeight;
			if(left<=0){
				left=0
			}else if(mask.offsetWidth<=left){
				left=mask.offsetWidth;
			}
			if(top<=0){
				top=0;
			}else if(mask.offsetHeight<=top){
				top=mask.offsetHeight;
			}
			mask.style.left=left+'px';
			mask.style.top=top+'px';
			img.style.left=bigmax*left/maskmax+'px';
			img.style.top=bigmax*top/maskmax+'px';
		}
	}
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>