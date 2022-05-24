<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow" />
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  data() {
    return {
      msg: "abc"
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted(){ 
	//传值给vuex的mutation改变state dispatch('actions方法名',值) 
	// 这样就只执行一次了，相当于优化了代码
	  this.$store.dispatch('categoryList');
  }
};
</script>

<style scoped></style>
