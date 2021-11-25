<template>
	<view class="content-mem">
		<u-navbar :is-back="true" title="创建群组" :border-bottom="false"
		 z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button size="mini" type="success" @click="createGroup">保存</u-button>
			</view>
		</u-navbar>
		<u-index-list>
			<template
				v-for="(item, index) in friend"
			>
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="item.name" :key="index" v-if="item.members.length>0"></u-index-anchor>
				<!-- #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="item.name" v-if="item.members.length>0"></u-index-anchor>
					<!-- #endif -->
					<u-cell 
						v-for="(item1, index1) in item.members"
						:key="index1"
						:title="item1.nickName"
						:border="index1 !== item.members.length - 1"
						@tap="jumpBusinessCard(item1)"
					>
					
						<u-checkbox v-model="item1.checked" :name="item1.id" @change="chechMem(item1)">
							<u-avatar
								slot="icon"
								shape="square"
								size="35"
								src="https://cdn.uviewui.com/uview/album/1.jpg"
								customStyle="margin: -3px 5px -3px 0"
							></u-avatar>
						</u-checkbox>
						
					</u-cell>
				</u-index-item>
			</template>
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
				keyword: ''
			}
		},
		computed:{
			...mapState(['friend'])
		},
		onLoad(option) {},
		watch: {
			keyword: function(val) {
				let arr = this.friend;
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
					this.list = this.friend
				}
			}
		},
		methods: {
			chechMem(user) {
				if (user.checked==undefined || user.checked==false) {
					this.ids.push(user.id);
					this.userNames.push(user.nickName);
				} else {
					this.ids.splice(this.ids.indexOf(user.id), 1);
					this.userNames.splice(this.userNames.indexOf(user.nickName), 1);
				}
			},
			createGroup(){
				if(this.userNames.length==0){
					uni.showToast({
						title:'至少选中一个',
						icon:'none'
					})
					return;
				}
				let data = {
					users:this.ids,
					defaultGroupNames:this.userNames, 
					userId: this.user.operId
				}
				this.$http.post('app/group/create',data).then(res => {
					uni.reLaunch({
						url: '/pages/home/home',
					});
				});
			},
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
