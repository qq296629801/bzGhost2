<template>
	<view class="content">
		<view class="member">
			
			<u-grid :col="6" :border="false">
				<u-grid-item v-for="(item, index) in group.members" :index="index" :key="item.id" v-if="index<=10" @tap="linkCard(item.id)">
					<image class="img" :src="host + item.avatar"></image>
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
			<u-cell @tap="show = true" title="群名称" :value="group.group.groupName" :title-style="titleStyle"></u-cell>
			<u-cell @tap="xxShow = true" title="群公告" label="暂无公告" :title-style="titleStyle"></u-cell>
			<u-cell title="二维码" :title-style="titleStyle">
				<view class="iconfont iconxingzhuangjiehe erweima"></view>
			</u-cell>
			<u-cell @tap="xxxShow = true"
				title="群昵称"
				:value="group.groupUser.groupNickName"
				:title-style="titleStyle"
			></u-cell>
			<u-cell title="全体禁言" :title-style="titleStyle" :arrow="false">
				<u-switch active-color="rgb(25, 190, 107)" v-model="disTalk"></u-switch>
			</u-cell>
			<u-cell title="查看内容" @click="linkSearch" :title-style="titleStyle"></u-cell>
			<u-cell title="设置背景" @click="chooseImg" :title-style="titleStyle"></u-cell>
		</u-cell-group>
		
		<view  style="height: 20rpx;"></view>
		
		<u-cell-group>
			<u-cell :title-style="titleStyle" @click="delMess" :arrow="false">
				<view class="btn-red">清空聊天记录</view>
			</u-cell>
			<u-cell :title-style="titleStyle" @click="removeMem" :arrow="false">
				<view class="btn-red">删除并退出</view>
			</u-cell>
		</u-cell-group>
		
		
		<u-popup v-model="show" mode="bottom">
			<view class="xx">
				<view class="xx-t">
					群名称
				</view>
				<u-input class="textarea" height="200" v-model="group.group.groupName" />
				<u-button type="success" @tap="tapGroupName">保存</u-button>
			</view>
		</u-popup>
		
		<u-popup v-model="xxShow" mode="bottom">
			<view class="xx">
				<view class="xx-t">
					群公告
				</view>
				<u-input class="textarea" height="200" v-model="group.group.gContext" />
				<u-button type="success" @tap="tapGroupNotice">保存</u-button>
			</view>
		</u-popup>
		
		
		<u-popup v-model="xxxShow" mode="bottom">
			<view class="xx">
				<view class="xx-t">
					群昵称
				</view>
				<u-input class="textarea" height="200" v-model="group.group.gContext" />
				<u-button type="success" @tap="tapGroupNick">保存</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import base from '@/util/baseUrl.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			host: base.webUrl,
			disTalk: false,
			titleStyle:{ marginLeft: '10rpx' },
			group:{
				group:{},
				groupUser:{},
				members:[],
				gContext:''
			},
			show:false,
			xxShow:false,
			xxxShow:false,
			context:''
		};
	},
	methods: {
		tapGroupName(){
			let reqData = {
				groupName: this.group.group.groupName,
				groupId: this.group.group.id
			}
			this.$http.post("app/group/upGroupName",reqData).then(res=>{
				uni.showToast({
					title:'修改成功',
					icon:'success'
				})
			});
		},
		tapGroupNick(){
			let reqData = {
				groupName: this.group.group.groupName,
				groupId: this.group.group.id
			}
			this.$http.post("app/group/upGroupName",reqData).then(res=>{
				uni.showToast({
					title:'修改成功',
					icon:'success'
				})
			});
		},
		tapGroupNotice(){
			let reqData = {
				groupName: this.group.group.groupName,
				groupId: this.group.group.id
			}
			this.$http.post("app/group/upGroupName",reqData).then(res=>{
				uni.showToast({
					title:'修改成功',
					icon:'success'
				})
			});
		},
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
				params:{groupId: this.chatObj.chatId}
			});
		},
		linkDel(){
			this.$u.route({
				url: 'pages/group/memDel',
				params:{groupId: this.chatObj.chatId}
			});
		},
		removeMem() {
		},
		delMess() {
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
				userId: this.user.operId,
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
		...mapState(['user','chatObj'])
	}
};
</script>

<style lang="scss">
	.content{
		.xx{
			height: 500rpx;
			padding: 50rpx;
			.xx-t{
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 2rpx solid #ebebeb;
			}
		}
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
		.img{
			width: 80rpx;
			height: 80rpx;
		}
		.img-cache{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
