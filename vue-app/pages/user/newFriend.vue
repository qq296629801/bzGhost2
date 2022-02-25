<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view class="u-page">
			<u-list
				@scrolltolower="scrolltolower"
			>
				<u-list-item
					v-for="(item, index) in list"
					:key="index"
				>
					<u-cell
						:title="item.nickName" :label="item.lastOperTime | format"
					>
						<u-avatar
							slot="icon"
							shape="square"
							size="50"
							src="https://cdn.uviewui.com/uview/album/1.jpg"
							customStyle="margin: -3px 5px -3px 0"
						></u-avatar>
						
						<u-button slot="right-icon" @tap="accept(item)" type="primary">同意</u-button>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
	},
	data() {
		return {
			list: []
		};
	},
	computed:{
		...mapState(['user'])
	},
	onShow() {
		uni.hideTabBarRedDot({
			index: 1
		})
		this.findFriend()
	},
	methods: {
		scrolltolower(){
		},
		accept(item){
			item.userId = this.user.operId
			this.$http.post('app/friend/accept',item).then(res=>{
				this.findFriend();
			});
		},
		findFriend() {
			this.$http.post('app/friendAsk/list',{userId:this.user.operId}).then(res => {
				this.list = res;
			});
		}
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
};
</script>

<style lang="scss">
	.content{
		background-color: #fff;
	}
</style>
