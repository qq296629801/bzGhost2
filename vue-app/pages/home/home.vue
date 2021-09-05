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
		
		<view v-for="(item,index) in list">
			<message @jump="jump" :value="item" :index="index"></message>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
import message from '@/components/message.vue';
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import common from '@/util/common.js'
import { mapState, mapMutations} from 'vuex';
export default {
	components: { searchInput, selectInput, message },
	mixins: [MescrollMixin],
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
				auto: true 
			},
			downOption:{
				auto: true
			},
			list:{}
		};
	},
	watch:{
        push: function(value){
		}
	},
	computed: {
		...mapState(['userData','packet'])
	},
	onLoad() {
	},
	onShow() {
		common.put('conversation').then(res=>{
			this.list = res
		});
	},
	methods: {
		...mapMutations(['setChatObj']),
		a(){
			common.get('conversation').then(res=>{
				this.list = res
				this.mescroll.endSuccess(this.list.length);
			}).catch(e=>{
				this.mescroll.endErr();
			});
		},
		jump(item){
			this.setChatObj(item);
			this.onPageJump('/pages/chat/chat');
		},
		onPageJump(url){
			this.$u.route({
				url: url,
				params: {}
			});
		},
		showSelect(){
			this.selectShow = !this.selectShow;
		},
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.showSelect()
			}else {
				this.$u.route({
					url: 'pages/search/search'
				})
			}
		},
		closeSelect(){
			this.selectShow = false;
		},
		checkSelect(index) {
			if (index == 0) {
				this.onPageJump('/pages/search/search2');
			}
			else if (index == 1) {
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
