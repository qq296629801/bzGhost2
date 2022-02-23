<template>
	<view>
		<!-- 加载动画组件 -->
		<z-loading></z-loading>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序登录弹窗组件 -->
		<applets-login></applets-login>
		<!-- #endif -->
		
		<!-- <u-notice-bar :text="packetPush.msg || ''"></u-notice-bar> -->
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
				switch(v.code){
					case 1:
					if(v.eventObj==1){
						// 更新群消息
						
						// 更新会话
						let userId = this.user.operId;
						this.$http.post('app/conversation/list', {
							userId
						}).then(res=>{
							this.$store.commit("setConversation", res)
						});
					}
					break;
					case 2:
						console.log(2);
						break;
					default:
				}
			}
		}
	};
</script>
<style lang="scss" scoped>

</style>
