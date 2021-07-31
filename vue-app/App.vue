<script>
	// #ifdef APP-PLUS
	import APPUpdate from "@/plugins/APPUpdate";
	// #endif
	import { cacheAll } from '@/util/yiqun.js';
	export default {
		onLaunch: function() {
			this.$socket.initWebIM().then(e=>{});
			// #ifdef APP-PLUS
			APPUpdate();
			// #endif
		},
		onShow: function() {
			if(this.userData.user){
				cacheAll(this.userData.user.operId);
			}else {
				uni.navigateTo({
					url: "pages/login/login"
				});
			}
		},
		onHide: function() {
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
	html,body,page{
		background-color: $uni-bg-color-grey;
	}
	.select-hover-class{ //首页导航栏按钮
		background-color: $uni-color-subtitle !important;
	}
	.message-hover-class{ //评论区 点击
		background-color: $uni-bg-color-hover !important;
	}
	.contentType2-hover-class{ //语音信息点击
		background-color: #c7c6c6 !important;
	}
	image{
		will-change: transform;
	}
	.u-actionsheet-cancel,
	.u-action-sheet-itemz{
		font-size: 28rpx !important;
	}
	@import "/components/font/iconfont.css";
</style>
