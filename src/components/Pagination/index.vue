<template>
	<div class="pagination">
		<button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)" >上一页</button>
		<button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
		<button v-if="startNumAndEndNum.start > 2">···</button>
		<!-- 中间部分 -->
		<button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)":class="{ active: pageNo == page }">{{page}}</button>
		<!-- 下面 -->
		<button v-if="startNumAndEndNum.end<totalPage-1">···</button>
		<button v-if="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
		<button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div>
</template>

<script>
	export default {
		name: "Pagination",
		//父传子   pageNO当前页码 pageSize为总页数  tatal总数据  continues分页的码数
		props: ['pageNo', 'pageSize', 'total', 'continues'],
		computed: {
			//总共多少页
			totalPage(){
				//向上取整
				return Math.ceil(this.total / this.pageSize);
			},
			//计算出连续的页码的起始与结束数字
			startNumAndEndNum() {
				const {pageNo,totalPage,continues} = this;
				let start = 0,
					end = 0;
				//如果总页数小于连续页数 是不支持的
				if (continues > totalPage) {
					start = 1;
					end = totalPage
				} else {
					//正常现象[连续页码]
					//起始数字 活的
					start = pageNo - parseInt(continues / 2);
					//结束数字
					end =pageNo +parseInt(continues/2);
					//当起始位置小于1时
					if(start<1){
						start=1
						end = continues;
					}
					//当end大于最终页时
					if(end>totalPage){
						end=totalPage;
						//为什么+1 原因是在设计页码时也加了1
						start=totalPage-continues+1;
					}
				}
				return {start,end};
			},
			
		},
	};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
	color: #007AFF;
	}
</style>
