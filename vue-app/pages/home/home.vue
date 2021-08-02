<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar :is-back="false" title="消息" :background="{ background: '#F6F7F8'  }" title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-icon name="plus-circle" size="34" @click="showSelect"></u-icon>
			</view>	
		</u-navbar>
		<!-- #endif -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="a" @up="upCallback">
		<selectInput :list="selectList" :list-key="'name'" :show.sync="selectShow" @on-select="checkSelect" @close="closeSelect" />
		<searchInput :searchType="1"/>
			<view v-for="(item,index) in list">
				<chatItem @linkTo="jump" :value="item" :index="index"></chatItem>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
import chatItem from '@/components/chatItem.vue';
import MescrollMixin from "@/components/common/mescroll-uni/mescroll-mixins.js";
import { queryChat } from '@/util/chatStorage.js'
import { cacheChats } from '@/util/yiqun.js'
export default {
	components: { searchInput, selectInput, chatItem },
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			show: false,
			selectShow: false,
			selectList: [
			{ id: '1', name: '添加朋友', icon: 'man-add' },
			{ id: '2', name: '扫一扫', icon: 'scan' },
			{ id: '3', name: '发起群聊', icon: 'chat' }
			],
			upOption: {
				auto: false 
			},
			downOption:{
				auto: true
			},
			list:{}
		};
	},
	watch:{
        push: function(value){
			cacheChats(this.userData.user.operId).then(data=>{
				this.list = data
			});
		}
	},
	computed:{
	},
	onLoad() {
		this.a()
	},
	methods: {
		a(){
			if(this.userData.user==undefined){
				return;
			}
			// 查询缓存
			queryChat(this.userData.user.operId).then(data=>{
				this.list = data
				uni.stopPullDownRefresh()
				this.mescroll.endByPage(1, 1)
			}).catch(e=>{
				//刷新缓存
				cacheChats(this.userData.user.operId).then(data=>{
					this.list = data
				});
				 this.mescroll.endErr();
			});
		},
		// 跳转
		jump(item){
			this.$u.vuex('chatObj', item);
			this.$u.route({
				url: 'pages/chat/chat',
				params: {}
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
							t.util.modal('不能添加自己为好友');
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
