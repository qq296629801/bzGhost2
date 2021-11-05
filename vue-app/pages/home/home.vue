<template>
	<view class="content">
		<selectInput :list="selectList" :list-key="'name'" :show.sync="selectShow" @on-select="checkSelect" @close="closeSelect" />
		
		<!-- //左右按键 -->
		<chunLei-popups v-model="value" :popData="data" @tapPopup="tapPopup" :x="x" :y="y" direction="column" theme="dark" placement="bottom-end" dynamic>
		</chunLei-popups>
		
		<view class="list">
			<view class="item" v-for="(item,index) in list">
				<message @taptext="taptext($event)" @jump="jump" :value="item" :index="index"></message>
			</view>
		</view>
	</view>
</template>

<script>
import chunLeiPopups from '@/components/chunLei-popups/chunLei-popups.vue'
import selectInput from '@/components/selectInput/selectInput.vue';
import message from '@/components/message.vue';
import common_api from '@/util/api/common.js';
import { mapState, mapMutations} from 'vuex';
export default {
	components: { selectInput, message },
	data() {
		return {
			// 右键
			x: 0,
			y: 0,
			value: false,
			data: [{title:'标记未读'},{title:'置顶该聊天'},{title:'不显示该聊天'},{title:'删除该聊天'}],
			//
			show: false,
			selectShow: false,
			selectList: [
			{ id: '1', name: '发起群聊', icon: 'chat' },
			{ id: '2', name: '扫一扫', icon: 'scan' }
			],
			list:{}
		};
	},
	watch:{
        newsPush: function(value){
			common_api.setItem('conversation').then(res=>{
				this.list = res
			});
		}
	},
	computed: {
		...mapState(['userData','packet','newsPush'])
	},
	onLoad() {
	},
	onPullDownRefresh() {
		common_api.setItem('conversation').then(res=>{
			this.list = res
			uni.stopPullDownRefresh()
		});
	},
	onShow() {
		if(this.userData.user==undefined){
			return;
		}
		common_api.setItem('conversation').then(res=>{
			this.list = res
		});
	},
	methods: {
		...mapMutations(['setChatObj']),
		tapPopup(){
			uni.showToast({
				title:'测试开发',
				icon:'success'
			})
		},
		taptext(e,index){
			this.x = e.touches[0].clientX
			this.y = e.touches[0].clientY
			this.value = !this.value
		},
		a(){
			if(this.userData.user==undefined){
				return;
			}
			common_api.get('conversation').then(res=>{
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
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.selectShow = !this.selectShow;
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
				this.$u.route({
					url: 'pages/group/groupCreate'
				})
				
			} else {
				// const _t = this
				// uni.scanCode({
				// 	success: function(res) {
				// 		let result = res.result
				// 		_t.$u.route({
				// 			url: 'pages/friend/businessCard',
				// 			params:{ userId: result, nickName:'', source: 1}
				// 		})
				// 	}
				// });
			}
		},
	},
};
</script>
<style lang="scss">
	.content{
		.list{
			box-shadow:1rpx 1rpx 15rpx 5rpx #f1f1f1;
		}
	}
</style>