<template>
	<view>
		<!-- 加载动画组件 -->
		<z-loading></z-loading>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序登录弹窗组件 -->
		<applets-login></applets-login>
		<!-- #endif -->
		
		<u-notice-bar :text="packetPush.msg || ''"></u-notice-bar>
	</view>
</template>

<script>
	import zLoading  from "@/components/common/loading.vue"
	// #ifdef MP-WEIXIN
	import appletsLogin  from "@/components/common/applets_login.vue"
	// #endif
	import { mapState, mapMutations} from 'vuex';
	export default {
		components:{
			zLoading,
			// #ifdef MP-WEIXIN
			appletsLogin,
			// #endif
		},
		computed: {
			...mapState(['user','packetPush'])
		},
		watch:{
		    packetPush: function(v){
				console.log(JSON.stringify(v))
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
