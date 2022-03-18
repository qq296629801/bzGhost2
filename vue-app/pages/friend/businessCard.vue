<template>
	<view>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<user-card :user="userCardData"></user-card>
		
		<view class="cell-group">
			<u-cell-group :border="false">
				<u-cell title="朋友圈" label="模拟数据暂不支持查看好友朋友圈"></u-cell>
				<u-cell title="更多"></u-cell>
				
				<u-cell v-if="userCardData.source==1" @click="jumpAdd" :arrow="false">
					<u-button type="primary" slot="icon" text="添加到通讯录"></u-button>
				</u-cell>
				
				<u-cell v-else title="发消息" :arrow="false" @click="jumpChat">
					<u-icon  slot="icon" name="chat-fill" color="#b4b4b4" size="34"></u-icon>
				</u-cell>
				
				
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	import userCard from "@/components/packet/user-card.vue"
	import base from '@/util/baseUrl.js';
	export default {
		components:{
			userCard
		},
		data() {
			return {
			}
		},
		computed:{
			...mapState(['user','userCardData']),
		},
		methods: {
			jumpAdd(){
				this.$http.post('app/friend/addAsk', {
					userId: this.user.operId,
					friendId: this.userCardData.id,
				}).then(res=>{
					uni.navigateBack()
				});
			},
			jumpChat(){
				this.$store.commit("setChatObj",{
					chatId: this.userCardData.id,
					chatName:this.userCardData.nickName,
					chatType:0
				})
				this.$u.route({
					url:"pages/chat/chat"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.perch{
	height: 10rpx;
}
.cell-group{
	background-color: white;
}
.userinfo{
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20rpx 30rpx 40rpx 40rpx;
	background-color: #FFFFFF;
	.img{
		display: block;
		width: 110rpx;
		height: 110rpx;
		border-radius: 10rpx;
	}
	&-desc{
		padding-left: 30rpx;
		&-name{
			font-weight: bold;
			font-size: 36rpx;
			transform: translateY(-10rpx);
		}
		&-gray{
			color: $u-tips-color;
			font-size: 29rpx;
		}
	}
}
</style>
