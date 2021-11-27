<template>
	<view>
		<user-card :user="userCardData"></user-card>
		
		<view class="cell-group">
			<u-cell-group :border="false">
				<u-cell title="朋友圈" label="模拟数据暂不支持查看好友朋友圈"></u-cell>
				<u-cell title="更多"></u-cell>
				<u-cell v-if="source == 1" title="" @click="linkAdd" :arrow="false">
						<view  style="text-align: center;">添加到通讯录</view>
				</u-cell>
				<u-cell v-else title="发消息" :arrow="false" @click="linkChat">
					<u-icon  slot="icon" name="chat-fill" color="#b4b4b4" size="34"></u-icon>
				</u-cell>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex';
	import userCard from "@/components/chat/user-card.vue"
	import base from '@/util/baseUrl.js';
	export default {
		components:{
			userCard
		},
		data() {
			return {
				nickName:'',
				userId:'',
				source:0,
				u:{},
			}
		},
		computed:{
			...mapState(['user','userCardData']),
		},
		methods: {
			linkChat(){
				this.$store.commit("setChatObj",{
					chatId: this.userId,
					chatName:this.nickName,
					chatType:0
				})
				this.$u.route({
					url:"pages/chat/chat"
				});
			},
			linkAdd(){
				let item = {
					userId: this.user.operId,
					friendId: this.userId,
				}
				this.$http.post('app/friend/addAsk', item).then(res=>{
					uni.navigateBack()
				});
			},
			linkImg(urls){
				uni.previewImage({urls:[urls]})
			},
		},
		onLoad({ userId, nickName, source }) {
			this.nickName = nickName
			this.userId = userId
			this.source = source
			this.u = {
				nickName,
				avatar:'',
				money:0
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
