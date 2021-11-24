<template>
	<view class="content-mem">
		<u-navbar :is-back="true" title="成员" :border-bottom="false"
		 z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button size="mini" type="success" @click="delGroupMember">保存</u-button>
			</view>
		</u-navbar>
		<view class="list-search">
		</view>
		<u-index-list class="list-box" :scrollTop="scrollTop" :indexList="indexList">
			<view class="list-wrap" v-if="item.members.length" v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.name" />
				<u-checkbox-group style="width: 100%;">
					<view class="member-list u-border-bottom list-cell" v-for="(user, jndex) in item.members" :key="jndex">
						<u-checkbox @change="chechMem(user)" v-model="user.checked" :name="user.id">
							{{ user.nickName }}
						</u-checkbox>
					</view>
				</u-checkbox-group>
			</view>
		</u-index-list>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
				scrollTop: 0,
				indexList: [],
				ids: [],
				userNames: [],
				list: [],
				keyword: '',
				firendItem:[],
				groupId:''
			}
		},
		onShow() {
			this.groupMember();
		},
		computed:{
			...mapState(['user'])
		},
		onLoad({groupId}) {this.groupId=groupId},
		watch: {
			keyword: function(val) {
				let arr = this.firendItem;
				if (val != '') {
					this.list = arr.filter(v => {
						let flag = false
						if (v.members.length > 0) {
							v.members.forEach(m => {
								if (m.nickName.includes(val)) {
									flag = true
								}
							})
						}
						return flag
					})
				} else {
					this.list = this.firendItem
				}
			}
		},
		methods: {
			groupMember(){
				let reqData = {
					groupId: this.groupId,
					userId: this.user.operId
				}
				this.$http.post('app/group/member', reqData).then(res=>{
					this.list = res.memberResponse
					let indexList = []
					this.list.forEach(item => {
						if(item.members.length>0){
							indexList.push(item.name)
						}
					})
					this.indexList = indexList
				});
			},
			chechMem(user) {
				if (user.checked==undefined || user.checked==false) {
					this.ids.push(user.id);
					this.userNames.push(user.nickName);
				} else {
					this.ids.splice(this.ids.indexOf(user.id), 1);
					this.userNames.splice(this.userNames.indexOf(user.nickName), 1);
				}
			},
			delGroupMember() {
				let data = {
					userIds:this.ids,
					groupId:this.groupId, 
				}
				this.$http.post('app/group/user/del',data).then(res => {
					uni.navigateBack({
						delta: 0,
						animationDuration: 0
					})
				});
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	};
</script>

<style lang="scss">
	.content-mem {
		height: 100%;
		.list-search {
			padding: 0 24rpx;
			margin-top: 24rpx;
		}
		/deep/.u-index-anchor {
			background: #F6F7F8;
		}
		/deep/.u-checkbox__label {
			display: flex;
		}
		.list-wrap {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: 100%;
			overflow: hidden;
			color: #323233;
			font-size: 14px;
			line-height: 24px;
			background-color: #fff;
		}
		.member-list {
			padding: 24rpx;
			display: flex;
			align-items: center;
		}
		.u-checkbox-group {
			flex-direction: column;
		}
	}
</style>
