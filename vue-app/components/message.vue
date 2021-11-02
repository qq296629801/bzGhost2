<template>
	<view @longtap="taptext($event)" class="item" :class="value.isTop ? 'bg_view' : ''" hover-class="message-hover-class" @tap="jump(value)">
		<!-- <img-cache :src="$url + (value.avatar|| value.imgUrl)"></img-cache> -->
		<img-cache src="/static/image/huge.jpg"></img-cache>
		<view class="right title-wrap u-border-bottom">
			<view class="right_top">
				<view class="right_top_name u-line-1">
					{{ value.chatName || value.nickName }}
				</view>
				<view class="right_top_time">
					<u-badge v-show="badgeIcon" :count="value.unreadNumber"  type="error" ></u-badge>
				</view>
			</view>
			<view class="right_btm">
				<view class="u-line-1 ">
					{{value.msgType==0?value.content:message[value.msgType]}}
				</view>
				<view class="" v-show="timeIcon">
					{{value.lastOperTime || value.lastOpenTime | format}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ImgCache from '@/components/img-cache/img-cache.vue';
	export default {
		name: 'u-message',
		components:{
			ImgCache
		},
		props: {
			value: {
				type: Object,
				default() {
					return {};
				}
			},
			index: {
				type: Number,
				default: -1
			},
			timeIcon:{
				type: Boolean,
				default () {
					return true;
				}
			},
			badgeIcon:{
				type: Boolean,
				default () {
					return true;
				}
			}
		},
		data() {
			return {
				message:['文字', '图片', '表情', '语音', '视频',
				 '签到', '撤销', '发红包', '抢红包','其它']
			};
		},
		filters: {
		   format: function (e) {
			  // 获取js 时间戳
			  let time = new Date().getTime();
			  // 去掉 js 时间戳后三位
			  time = parseInt((time - e) / 1000);
			  // 存储转换值
			  let s;
			  if (time < 60 * 10) {
			    // 十分钟内
			    return '刚刚';
			  } else if (time < 60 * 60 && time >= 60 * 10) {
			    // 超过十分钟少于1小时
			    s = Math.floor(time / 60);
			    return s + '分钟前';
			  } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
			    // 超过1小时少于24小时
			    s = Math.floor(time / 60 / 60);
			    return s + '小时前';
			  } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
			    // 超过1天少于3天内
			    s = Math.floor(time / 60 / 60 / 24);
			    return s + '天前';
			  } else {
			    // 超过3天
			   var date = new Date(e);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			   var Y = date.getFullYear() + '-';
			   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			   var D = date.getDate() + ' ';
			   var h = date.getHours() + ':';
			   var m = date.getMinutes() + ':';
			   var ss = date.getSeconds();
			   return h+m+ss;
			  }  
		   }
		},
		methods:{
			jump(item) {
				this.$emit('jump',item)
			},
			taptext(e,index){
				this.$emit('taptext',e,index)
			},
		}
	}
</script>

<style lang="scss">
.item {
		background-color: #fafafa;
		width: 750rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		image {
			width: 96rpx;
			height: 96rpx;
			margin: 20rpx;
			border-radius: 12rpx;
			flex: 0 0 96rpx;
		}
		.right {
			overflow: hidden;
			flex: 1 0;
			padding: 20rpx 20rpx 40rpx 0;
			&_top {
				display: flex;
				justify-content: space-between;
				&_name {
					color: $u-main-color;
					flex: 0 0 450rpx;
					font-size: 28rpx;
					font-weight: 400;
					overflow: hidden;
				}
				&_time {
					color: $u-light-color;
					font-size: 28rpx;
					font-weight: 400;
				}
			}
			&_btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $u-tips-color;
				padding-top: 10rpx;
				font-size: 25rpx;
				font-weight: 400;
			}
		}
	}
	.bg_view {
		background-color: #fafafa;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx; 
	}
</style>
