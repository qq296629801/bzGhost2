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
			
			<view class="more" @tap="seeMore" v-if="group.members.length>20">查看更多</view>
		</view>
		
		<view style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item title="群名称" @click="link(group.mine.id, group.mine.groupName, 1)" :value="group.mine.groupName" :title-style="titleStyle"></u-cell-item>
			<u-cell-item title="二维码" :title-style="titleStyle">
				<view style="font-size: 16px;color: #969799;" class="iconfont iconxingzhuangjiehe"></view>
			</u-cell-item>
			<u-cell-item title="群公告" @click="link(group.mine.id, group.gContext, 2)" :value="group.gContext ? group.gContext : '暂无公告'" :title-style="titleStyle"></u-cell-item>
			<u-cell-item
				title="群昵称"
				@click="link(3)"
				:value="group.user.groupNickName || userData.user.realname"
				:title-style="titleStyle"
			></u-cell-item>
			<u-cell-item title="全体禁言" :title-style="titleStyle" :arrow="false">
				<u-switch active-color="rgb(25, 190, 107)" v-model="allSpeak"></u-switch>
			</u-cell-item>
			<u-cell-item title="查看聊天内容" @click="linkSearch" :title-style="titleStyle"></u-cell-item>
			<u-cell-item title="设置聊天背景" :title-style="titleStyle" @click="chooseImg"></u-cell-item>
			
		</u-cell-group>
		
		<view  style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell-item :title-style="titleStyle" @click="clearGroupMsg" :arrow="false">
				<view style="text-align: center; color: red;">清空聊天记录</view>
			</u-cell-item>
			<u-cell-item :title-style="titleStyle" @click="removeMem" :arrow="false">
				<view style="text-align: center; color: red;">删除并退出</view>
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
			src1: require('@/static/qrcode.png'),
			allSpeak: false,
			titleStyle:{ marginLeft: '10rpx' },
			group:{
				mine:{},
				user:{},
				members:[],
				gContext:''
			}
		};
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
				this.util.modal('不能添加自己为好友');
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
			this.$http.post('app/group/member',{userId:this.userData.user.operId,groupId:this.chatObj.chatId}).then(res => {
				this.group.members = res.members;
				this.group.user = res.groupUser;
				this.group.mine = res.group;
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
