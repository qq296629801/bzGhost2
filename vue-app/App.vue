<script>
	import store from '@/store/index.js'
	import webim from '@/util/socket/webim.js'
	export default {
		onLaunch: function() {
			store.commit('setCacheData');
			webim.initSocket();
			if(store.state.token == ''){
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";
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
