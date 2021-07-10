<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar :is-back="false" title="消息" :background="{ background: '#F6F7F8'  }" title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-icon name="plus-circle" size="34" @click="showSelect"></u-icon>
			</view>		
		</u-navbar>
		<!-- #endif -->
		<selectInput :list="selectList" :list-key="'name'" :show.sync="selectShow" @on-select="checkSelect" @close="closeSelect" />
		<searchInput :searchType="1"/>
		<u-swipe-action style="margin-right: 1px;" :show="item.show" v-for="(item, index) in chatItem" :index="index" btn-width="160" :key="item.id" @click="click" @open="open" :options="options">
			<chatItem @linkTo="linkTo" :value="item" :index="index" :voiceIcon="true"></chatItem>
		</u-swipe-action>
	</view>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
import chatItem from '@/components/chatItem.vue';
import dbUtil from '../../util/dbUtil.js'
export default {
	components: { searchInput, selectInput,chatItem },
	data() {
		return {
			selectShow: false,
			options: [
				{
					text: '置顶',
					style: {
						backgroundColor: '#b4b4b4',
						fontSize: '24rpx'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
						fontSize: '24rpx'
					}
				}
			],
			selectList: [
				{ id: '1', name: '添加朋友', icon: 'man-add' },
				{ id: '2', name: '扫一扫', icon: 'scan' },
				{ id: '3', name: '发起群聊', icon: 'chat' }
				]
		};
	},
	watch:{
        pushRes: function(value){
			this.getChatList()
		}
	},
	onShow() {
		this.getAll();
	},
	onLoad(){
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		this.getAll();
	},
	methods: {
		linkTo(item){
			this.$u.vuex('chatObj', item);
			this.$u.route({
				url: 'pages/chat/chat',
				params: {}
			});
		},
		getAll(){
			if(this.userData.user==undefined){
				return
			}
			dbUtil.upCacheMsg(this.userData.user.operId).catch(e=>{
			});
			dbUtil.upCacheAddr(this.userData.user.operId).then(res=>{
				this.$u.vuex('firendItem', res)
			});
			dbUtil.upCacheChat(this.userData.user.operId).then(res=>{
				this.$u.vuex('chatItem', res);
			}).catch(e=>{
				uni.clearStorageSync();
				uni.showToast({
					icon:'none',
					title: res.response.errorMessage
				})
			});
		},
		getChatList(){
			dbUtil.upCacheChat(this.userData.user.operId).then(res=>{
				this.$u.vuex('chatItem', res);
			}).catch(e=>{
				uni.clearStorageSync();
				uni.showToast({
					icon:'none',
					title: res.response.errorMessage
				})
			});
		},
		//打开或者关闭弹窗
		showSelect(){
			this.selectShow = !this.selectShow;
		},
		//action 点击事件
		click(index,index1) {
			if(index1==0){
				this.chatItem[index].isTop = true;
				// TODO 留空
			}else {
				this.chatItem.splice(index, 1);
				let obj = this.chatItem[index==this.chatItem.length?index-1:index];
				this.$socket.delChat(this.userData.user.operId, obj.id, (res) => {})
			}
		},
		//action 打开事件
		open(index) {
			this.chatItem[index].show = true;
			this.chatItem.map((val, idx) => {
				if (index != idx) this.chatItem[idx].show = false;
			});
		},
		//点击导航栏自定义按钮
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.showSelect()
			}
		},
		//关闭弹窗
		closeSelect(){
			//小程序兼容
			this.selectShow = false;
		},
		//扫码
		checkSelect(index) {
			if (index == 0) {
				this.$u.route({
					url:"pages/search/search",
					params: {searchType: 0}
				})
			}
			else if (index == 1) {
				//扫码
				const t = this
				uni.scanCode({
					success: function(res) {
						uni.vibrateLong();
						let uId = res.result
						if (uId==t.userData.user.operId){
							uni.showToast({
								icon:'none',
								title:'不能添加自己为好友'
							})
						} else {
							t.$u.route({
								url: 'pages/businessCard/businessCard',
								params:{ id: uId, source: 2}
							})
						}
					}
				});
			}else {
				this.$u.route({
					url: 'pages/chat/groupCreate'
				})
			}
		},
	},
};
</script>
