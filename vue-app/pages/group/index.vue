<template>
	<view class="content">
		<view class="member">
			
			<u-grid :col="6" :border="false">
				<u-grid-item v-for="(item, index) in group.members" :index="index" :key="item.id" v-if="index<=10" @tap="linkCard(item.id)">
					<img-cache src="/static/image/huge.jpg"></img-cache>
					<view class="text">{{ item.groupNickName || item.nickName }}</view>
				</u-grid-item>
				<u-grid-item @click="linkAdd">
					<view class="plus">
						<u-icon name="plus" size="35" color="#cececf"></u-icon>
					</view>
				</u-grid-item>
				<u-grid-item @click="linkDel">
					<view class="plus">
						<u-icon name="minus" size="35" color="#cececf"></u-icon>
					</view>
				</u-grid-item>
			</u-grid>
			
			<view class="more" @tap="linkMore" v-if="group.members.length>20">查看更多</view>
		</view>
		
		<view style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item title="群名称" :value="group.group.groupName" :title-style="titleStyle"></u-cell-item>
			<u-cell-item title="群公告" label="暂无公告" :title-style="titleStyle"></u-cell-item>
			<u-cell-item title="二维码" :title-style="titleStyle">
				<view class="iconfont iconxingzhuangjiehe erweima"></view>
			</u-cell-item>
			<u-cell-item
				title="群昵称"
				:value="group.groupUser.groupNickName"
				:title-style="titleStyle"
			></u-cell-item>
			<u-cell-item title="全体禁言" :title-style="titleStyle" :arrow="false">
				<u-switch active-color="rgb(25, 190, 107)" v-model="disTalk"></u-switch>
			</u-cell-item>
			<u-cell-item title="查看内容" @click="linkSearch" :title-style="titleStyle"></u-cell-item>
			<u-cell-item title="设置背景" @click="chooseImg" :title-style="titleStyle"></u-cell-item>
		</u-cell-group>
		
		<view  style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item :title-style="titleStyle" @click="delMess" :arrow="false">
				<view class="btn-red">清空聊天记录</view>
			</u-cell-item>
			<u-cell-item :title-style="titleStyle" @click="removeMem" :arrow="false">
				<view class="btn-red">删除并退出</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
import ImgCache from '@/components/img-cache/img-cache.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components:{
		ImgCache
	},
	data() {
		return {
			disTalk: false,
			titleStyle:{ marginLeft: '10rpx' },
			group:{
				group:{},
				groupUser:{},
				members:[],
				gContext:''
			}
		};
	},
	methods: {
		linkMore(){
			this.$u.route({
				url: 'pages/group/moreMem'
			})
		},
		linkName(groupId, context, type) {
			this.$u.route({
				url: 'pages/group/groupName',
				params: {  groupId,  context,  type }
			});
		},
		linkCard(id){
			this.$u.route({
				url: 'pages/friend/businessCard',
				params:{ id: id, source: 1}
			})
		},
		linkSearch() {
			this.$u.route({
				url:"pages/search/search",
				params: {searchType: 4, chatId: this.chatObj.chatId}
			})
		},
		linkAdd(){
			this.$u.route({
				url: 'pages/group/memAdd',
				params:{groupId:this.chatObj.chatId}
			});
		},
		linkDel(){
			this.$u.route({
				url: 'pages/group/memDel',
				params:{groupId:this.chatObj.chatId}
			});
		},
		removeMem() {
			// this.$socket.removeGroupUser([this.userData.user.operId], this.chatObj.chatId, res => {
			// 	if (res.success) {
			// 		this.$u.route({
			// 			type: 'navigateBack'
			// 		});
			// 	}
			// });
		},
		delMess() {
			// this.$socket.clearGroupMsg(this.userData.user.operId, this.chatObj.chatId, res => {
			// 	this.util.modal('不能添加自己为好友');
			// });
		},
		chooseImg() {
			this.$u.route({
				url: 'components/u-avatar-cropper/u-avatar-cropper',
				params: {
					destWidth: uni.upx2px(750),
					rectWidth: uni.upx2px(500),
					fileType: 'jpg'
				}
			});
		},
		queryMembers() {
			let pData = {
				userId: this.userData.user.operId,
				groupId: this.chatObj.chatId,
			}
			this.$http.post('app/group/member', pData).then(res => {
				this.group = res
			});
		}
	},
	onShow() {
		this.queryMembers();
	},
	computed:{
		...mapState(['userData','chatObj'])
	}
};
</script>

<style lang="scss">
	.content{
		.btn-red{
			text-align: center; color: red;
		}
		.erweima{
			font-size: 16px;
			color: #969799;
		}
		.member{
			background-color: #FFFFFF;
			padding-left: 30rpx;
		}
		.more{
			text-align: center;
			color: #404133;
			padding-bottom: 10rpx;
		}
		.plus{
			//border: 4rpx dashed #f3f3f4;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			width: 70rpx;
			height: 70rpx;
		}
		.text {
			width: 80rpx;
			height: 40rpx;
			overflow: hidden;
			text-align: center;
			color: #343434;
		}
		.img-cache{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
