<template>
	<view class="content-mem">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
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
					>
						<u-checkbox-group slot="icon" v-if="user.operId != item1.id">
							<u-checkbox  v-model="item1.checked" :name="item1.id" @change="chechMem(item1)">
							</u-checkbox>
						</u-checkbox-group>
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
			...mapState(['friend','user'])
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
		onNavigationBarButtonTap({ index }) {
			this.createGroup()
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
