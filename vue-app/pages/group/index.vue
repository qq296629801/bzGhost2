<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		
		<view class="member">
			<u-grid :col="6">
				
				<u-grid-item v-for="(item, index) in groupMembers.members" :index="index" :key="item.id" @tap="linkCard(item.id)">
					<view>
						<u-icon
								:customStyle="{paddingTop:20+'rpx'}"
								:name="webUrl + item.avatar"
								:size="40"
						         ></u-icon>
						<text class="grid-text">{{ item.groupNickName}}</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="linkAdd">
					<view class="plus">
						<u-icon name="plus" size="20" color="#909399"></u-icon>
					</view>
				</u-grid-item>
				<u-grid-item @click="linkDel">
					<view class="plus">
						<u-icon name="minus" size="20" color="#909399"></u-icon>
					</view>
				</u-grid-item>
			</u-grid>
			
			<view class="more" @tap="linkMore"></view>
		</view>
		
		<view class="cell-group">
			<u-gap height="10" bgColor="#f6f7f8"></u-gap>
			
			<u-cell-group :border="false">
				<u-cell @tap="show = true" title="群名称" :value="groupMembers.group.groupName"></u-cell>
				
				<u-cell @tap="xxxShow = true"
					title="群昵称"
					:value="groupMembers.groupUser.groupNickName"
				></u-cell>
				
				<u-cell title="全体禁言">
					<view slot="right-icon">
						<u-switch @change="disTalkClick" v-model="disTalk" active-color="rgb(25, 190, 107)"></u-switch>
					</view>
				</u-cell>
			</u-cell-group>
			
			<u-gap height="10" bgColor="#f6f7f8"></u-gap>
			
			<u-cell-group :border="false">
				<u-cell :arrow="false">
					<view slot="label" @tap="emptyGroupMsg" class="btn-red">清空聊天记录</view>
				</u-cell>
				<u-cell :arrow="false">
					<view slot="label" @tap="delGroupQuit" class="btn-red">删除并退出</view>
				</u-cell>
			</u-cell-group>
		</view>
		
		<u-popup :show="show" @close="show = false" @open="show = true" mode="bottom">
			<view class="xx">
				
				<u--form
						labelPosition="left"
						:model="group"
						:rules="rules"
						ref="form1"
						>
							<u-form-item
									label="群名"
									prop="group.groupName"
									borderBottom
									ref="item1"
							>
								<u--input
										v-model="groupMembers.group.groupName"
										border="none"
								></u--input>
							</u-form-item>
						
						</u--form>
				
						<u-button type="info" @tap="tapGroupName">保存</u-button>
			</view>
		</u-popup>
		
		<u-popup :show="xxxShow" @close="xxxShow = false" @open="xxxShow = true" mode="bottom">
			<view class="xx">
				<u--form
					labelPosition="left"
					:model="groupMembers"
					:rules="rules"
					ref="form1"
					>
						<u-form-item
								label="昵称"
								prop="group.gContext"
								borderBottom
								ref="item1"
						>
							<u--input
									v-model="groupMembers.group.gContext"
									border="none"
							></u--input>
						</u-form-item>
					
					</u--form>
				<u-button type="info" @tap="tapGroupNick">保存</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import base from '@/util/baseUrl.js';
import { mapState, mapMutations } from 'vuex';
import db from '@/util/db/db2.js';
export default {
	data() {
		return {
			webUrl: base.webUrl,
			disTalk: false,
			showSex: false,
			rules: {
				'userInfo.name': {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				}
			},
			model1: {
				userInfo: {
					name: 'uView UI',
					sex: '',
				},
			},
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
		disTalkClick(v){
			const params = {
				groupId: this.chatObj.chatId,
				status: v?0:1
			}
			this.$http.post('/group/updateGroupUserStatus', params).then(res => {
				if (res) {
					this.queryMembers();
				}
			})
		},
		delGroupQuit(){
			const params = {
				groupId: this.chatObj.chatId,
				users:[this.user.operId]
			}
			this.$http.post('/group/removeGroupUsers', params).then(res => {
				if (res) {
					this.$http.post('app/conversation/list', {
						userId:this.user.operId
					}).then(res=>{
						this.$store.commit("setConversation", res)
					});
					
					uni.reLaunch({
						url: '/pages/home/home'
					});
				}
			})
		},
		emptyGroupMsg(){
			db.delMsgByChat(this.groupMembers.group.id)
			uni.showToast({
				icon:'none',
				title:'成功'
			})
		},
		tapGroupName(){
			let reqData = {
				groupName: this.groupMembers.group.groupName,
				groupId: this.chatObj.chatId
			}
			this.$http.post("app/group/upGroupName",reqData).then(res=>{
				uni.showToast({
					title:'修改成功',
					icon:'success'
				})
				this.show = false
			});
		},
		tapGroupNick(){
			let reqData = {
				groupName: this.groupMembers.group.groupName,
				groupId: this.chatObj.chatId
			}
			this.$http.post("app/group/upGroupName",reqData).then(res=>{
				uni.showToast({
					title:'修改成功',
					icon:'success'
				})
				this.xxxShow = false;
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
			// this.$u.route({
			// 	url: 'pages/friend/businessCard',
			// 	params:{ id: id, source: 1}
			// })
		},
		linkAdd(){
			this.$u.route({
				url: 'pages/group/memAdd'
			});
		},
		linkDel(){
			this.$u.route({
				url: 'pages/group/memDel'
			});
		},
		queryMembers() {
			let pData = {
				userId: this.user.operId,
				groupId: this.chatObj.chatId,
			}
			this.$http.post('app/group/member', pData).then(res => {
				this.$store.commit("setGroupMembers",res);
			});
		}
	},
	onShow() {
		this.queryMembers();
	},
	computed:{
		...mapState(['user','chatObj','groupMembers'])
	}
};
</script>

<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
	.content{
		
		.xx{
			padding: 30rpx;
		}
		
		.cell-group{
			background-color: white;
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
			padding-top: 20rpx;
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
			border-radius: 8rpx;
		}
		.img-cache{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
