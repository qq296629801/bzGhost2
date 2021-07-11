<template>
	<view class="content">
		<u-navbar
			:is-back="true"
			:title="'群聊(' + group.members.length + ')'"
			:background="{ background: '#F6F7F8' }"
			:border-bottom="false"
			z-index="1001"
		></u-navbar>
		<view class="group-box">
			<u-grid :col="6" :border="false">
				<u-grid-item v-for="(item, index) in group.members" :index="index" :key="item.id" v-if="index<=10" @tap="linkCard(item.id)">
					<img-cache :src="$url + item.avatar"></img-cache>
					<view class="group-text">{{ item.groupNickName || item.nickName }}</view>
				</u-grid-item>
				<u-grid-item @click="linkAdd">
					<view class="group-plus">
						<u-icon name="plus" size="35" color="#a9a9aa"></u-icon>
					</view>
				</u-grid-item>
				<u-grid-item @click="linkDel">
					<view class="group-plus">
						<u-icon name="minus" size="35" color="#a9a9aa"></u-icon>
					</view>
				</u-grid-item>
			</u-grid>
			<view class="more-btn" @tap="seeMore" v-if="group.members.length>20">查看更多</view>
		</view>
		<view style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item title="群名称" @click="link(group.mine.id, group.mine.groupName, 1)" :value="group.mine.groupName" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
			<u-cell-item title="二维码" :title-style="{ marginLeft: '10rpx' }">
				<view style="font-size: 16px;color: #969799;" class="iconfont iconxingzhuangjiehe"></view>
			</u-cell-item>
			<u-cell-item title="群公告" @click="link(group.mine.id, group.gContext, 2)" :value="group.gContext ? group.gContext : '暂无公告'" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
		</u-cell-group>
			<view style="height: 20rpx;"></view>
		<u-cell-group>
			<u-cell-item
				title="群昵称"
				@click="link(3)"
				:value="group.user.groupNickName || userData.user.realname"
				:title-style="{ marginLeft: '10rpx' }"
			></u-cell-item>
			<u-cell-item title="全体禁言" :title-style="{ marginLeft: '10rpx' }" :arrow="false">
				<u-switch active-color="rgb(25, 190, 107)" v-model="allSpeak"></u-switch>
			</u-cell-item>
		</u-cell-group>
		<view style="height: 20rpx;"></view>
		<u-cell-group>
			<u-cell-item title="查看聊天内容" @click="linkSearch" :title-style="{ marginLeft: '10rpx' }"></u-cell-item>
			<u-cell-item title="设置聊天背景" :title-style="{ marginLeft: '10rpx' }" @click="chooseImg"></u-cell-item>
			<u-cell-item :title-style="{ marginLeft: '10rpx' }" @click="clearGroupMsg" :arrow="false">
				<view style="text-align: center; color: red;">清空聊天记录</view>
			</u-cell-item>
		</u-cell-group>
		
		<view style="height: 20rpx;"></view>
		<u-cell-group>
			<u-cell-item :title-style="{ marginLeft: '10rpx' }" @click="removeMem" :arrow="false">
				<view style="text-align: center; color: red;">删除并退出</view>
			</u-cell-item>
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
			allSpeak: false,
			group:{
				mine:{},
				user:{},
				members:[],
				gContext:''
			}
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
		link(groupId, context, type) {
			this.$u.route({
				url: 'pages/chat/groupEdit',
				params: {  groupId,  context,  type }
			});
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
			this.$u.route({
				url: 'pages/chat/memAdd'
			});
		},
		linkDel(){
			this.$u.route({
				url: 'pages/chat/memDel'
			});
		},
		removeMem() {
			this.$socket.removeGroupUser([this.userData.user.operId], this.chatObj.chatId, res => {
				if (res.success) {
					this.$u.route({
						type: 'navigateBack'
					});
				}
			});
		},
		clearGroupMsg() {
			this.$socket.clearGroupMsg(this.userData.user.operId, this.chatObj.chatId, res => {
				this.message.info(res.success?'成功':'失败');
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
		queryMembers() {
			this.$socket.queryMembers(this.chatObj.chatId, this.userData.user.operId, res => {
				if (res.success) {
					this.group.members = res.members;
					this.group.user = res.groupUser;
					this.group.mine = res.group;
					this.$u.vuex('memberItemIndex',res.members);
				} else {
					this.message.info('获取数据失败');
				}
			});
		}
	},
	onShow() {
		this.queryMembers();
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
			text-align: center;
			color: #404133;
			padding-bottom: 10rpx;
		}
		.group-plus{
			border: 4rpx dashed #d9d9da;
			border-radius: 20rpx;
			padding: 20rpx;
		}
		.group-text {
			width: 80rpx;
			height: 40rpx;
			overflow: hidden;
			text-align: center;
			color: #242424;
		}
		.img-cache{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
