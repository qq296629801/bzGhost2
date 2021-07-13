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
		<div v-for="(item,index) in chatItem">
			<chatItem @linkTo="linkToChat" :value="item" :index="index" :voiceIcon="true"></chatItem>
		</div>
	</view>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
import chatItem from '@/components/chatItem.vue';
import { upCacheMsg, upCacheAddr, upCacheChat } from '@/util/tool.js';
export default {
	components: { searchInput, selectInput, chatItem },
	data() {
		return {
			show: false,
			selectShow: false,
			selectList: [
				{ id: '2', name: '扫一扫', icon: 'scan' },
				{ id: '1', name: '添加朋友', icon: 'man-add' },
				{ id: '3', name: '发起群聊', icon: 'chat' }
				]
		};
	},
	watch:{
        pushRes: function(value){
			this.getChatList();
		}
	},
	onShow() {
		this.getAll();
	},
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
		this.getAll();
	},
	methods: {
		linkToChat(item){
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
			upCacheMsg(this.userData.user.operId).catch(e=>{
			});
			upCacheAddr(this.userData.user.operId).then(res=>{
				this.$u.vuex('firendItem', res)
			});
			this.getChatList();
		},
		// 获取列表
		getChatList(){
			upCacheChat(this.userData.user.operId).then(res =>{
				this.$u.vuex('chatItem', res);
			}).catch(e =>{
				this.message.info(e.response.errorMessage);
			});
		},
		//打开或者关闭弹窗
		showSelect(){
			this.selectShow = !this.selectShow;
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
							t.message.info('不能添加自己为好友');
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
