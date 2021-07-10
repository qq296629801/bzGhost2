<template>
	<view class="content">
		<u-navbar
			:is-back="true"
			:title="'群聊(' + members.length + ')'"
			:background="{ background: '#F6F7F8' }"
			:border-bottom="false"
			z-index="1001"
		></u-navbar>
		<view class="group-box">
			<u-grid :col="6" :border="false">
				<u-grid-item v-for="(item, index) in members" :index="index" :key="item.id" v-if="index<=10" @tap="linkCard(item.id)">
					<img-cache :src="$url + item.avatar"></img-cache>
					<view class="group-text">{{ item.groupNickName || item.nickName }}</view>
				</u-grid-item>
				<u-grid-item @click="linkAdd">
					<view class="group-plus">
						<u-icon name="plus" size="50" color="#e0e0e1"></u-icon>
					</view>
				</u-grid-item>
				<u-grid-item @click="linkDel">
					<view class="group-plus">
						<u-icon name="minus" size="50" color="#e0e0e1"></u-icon>
					</view>
				</u-grid-item>
			</u-grid>
			<view class="more-btn" @tap="seeMore" v-if="members.length>10">查看更多</view>
		</view>
		<view style="height: 10rpx;"></view>
		<u-cell-group>
			<u-cell-item title="群名称" @click="upGroup(group.id, group.groupName, 1)" :value="group.groupName" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
		</u-cell-group>
		<u-cell-group>
			<u-cell-item title="二维码" :title-style="{ marginLeft: '10rpx' }"><u-avatar :src="src1" size="50"></u-avatar></u-cell-item>
		</u-cell-group>
		<u-cell-group>
			<u-cell-item title="群公告" @click="upGroup(group.id, context, 2)" :value="context ? context : '暂无公告'" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
		</u-cell-group>
		<view style="height: 10rpx;"></view>
		<u-cell-group>
			<u-cell-item
				title="群昵称"
				@click="upGroup(group.id, mine.groupNickName || userData.user.realname, 3)"
				:value="mine.groupNickName || userData.user.realname"
				:title-style="{ marginLeft: '10rpx' }"
			></u-cell-item>
		</u-cell-group>
		
		<u-cell-group>
			<u-cell-item title="全体禁言" :title-style="{ marginLeft: '10rpx' }" :arrow="false">
				<u-switch active-color="rgb(25, 190, 107)" v-model="anyDisnable"></u-switch>
			</u-cell-item>
		</u-cell-group>
		<view style="height: 10rpx;"></view>
		<u-cell-group><u-cell-item title="查看聊天内容" @click="linkSearch" :title-style="{ marginLeft: '10rpx' }"></u-cell-item></u-cell-group>
		<u-cell-group><u-cell-item title="设置聊天背景" :title-style="{ marginLeft: '10rpx' }" @click="chooseImg"></u-cell-item></u-cell-group>
		<view style="height: 10rpx;"></view>
		<u-cell-group>
			<u-cell-item :title-style="{ marginLeft: '10rpx' }" @click="clearGroupMsg" :arrow="false">
				<view style="text-align: center; color: red;">清空聊天记录</view>
			</u-cell-item>
		</u-cell-group>
		<u-cell-group>
			<u-cell-item :title-style="{ marginLeft: '10rpx' }" @click="removeMem" :arrow="false"><view style="text-align: center; color: red;">删除并退出</view></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
import ImgCache from '@/components/img-cache/img-cache.vue';
export default {
	components:{
		ImgCache
	},
	data() {
		return {
			src1: require('@/static/qrcode.png'),
			chatId: '',
			chatName: '',
			members: [],
			group: {
				groupName:''
			},
			context: '',
			mine: '',
			anyDisnable:false,
		};
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	},
	methods: {
		seeMore(){
			this.$u.route({
				url: 'pages/chat/moreMem'
			})
		},
		linkCard(id){
			this.$u.route({
				url: 'pages/businessCard/businessCard',
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
			// if (this.userData.user.username != this.group.operUser) {
			// 	uni.showModal({
			// 		title: '无权限修改',
			// 		showCancel: false
			// 	});
			// 	return;
			// }
			this.$u.route({
				url: 'pages/chat/memAdd'
			});
		},
		linkDel(){
			// if (this.userData.user.username != this.group.operUser) {
			// 	uni.showModal({
			// 		title: '无权限修改',
			// 		showCancel: false
			// 	});
			// 	return;
			// }
			this.$u.route({
				url: 'pages/chat/memDel'
			});
		},
		removeMem() {
			this.$socket.removeGroupUser([this.userData.user.operId], this.chatObj.chatId, res => {
				if (res.success) {
					uni.showToast({
						title:'移除成功',
						icon:'success'
					});
					this.$u.route({
						type: 'navigateBack',
						url: 'pages/home/home'
					});
				}
			});
		},
		upGroup(groupId, context, type) {
			if (this.userData.user.username != this.group.operUser && 3 != type) {
				uni.showModal({
					title: '无权限修改',
					showCancel: false
				});
				return;
			}
			this.$u.route({
				url: 'pages/chat/groupEdit',
				params: {  groupId,  context,  type }
			});
		},
		clearGroupMsg() {
			this.$socket.clearGroupMsg(this.userData.user.operId, this.chatObj.chatId, res => {
				console.log(res);
				if (res.success) {
					uni.showModal({
						title: '成功',
						showCancel: false
					});
				} else {
					uni.showModal({
						title: '失败',
						showCancel: false
					});
				}
			});
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

		loadMem() {
			this.$socket.queryMembers(this.chatObj.chatId, this.userData.user.operId, res => {
				if (res.success) {
					this.members = res.members;
					this.mine = res.groupUser;
					this.group = res.group;
					this.$u.vuex('_membersNoneIndex',res.members)
				} else {
					uni.showModal({
						title: '获取数据失败',
						showCancel: false
					});
				}
			});
			/* this.$socket.queryNotice(this.userData.user.operId, this.chatObj.chatId, res => {
				if (res.success) {
					this.context = res.context;
				} else {
					uni.showModal({
						title: '获取数据失败',
						showCancel: false
					});
				}
			}); */
		}
	},
	onLoad(option) {
	},
	onShow() {
		this.loadMem();
	}
};
</script>

<style lang="scss">
	.content{
		.group-box{
			background-color: #FFFFFF;
			padding-left: 30rpx;
		}
		.more-btn{
			text-align: center;color: #404133;
			padding-bottom: 10rpx;
		}
		.group-plus{
		}
		.group-text {
			width: 80rpx;
			height: 40rpx;
			overflow: hidden;
			text-align: center;
			color: #000000;
		}
		.img-cache{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
