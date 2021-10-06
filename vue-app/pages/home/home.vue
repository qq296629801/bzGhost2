<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="a" @up="upCallback">
		
		<selectInput :list="selectList" :list-key="'name'" :show.sync="selectShow" @on-select="checkSelect" @close="closeSelect" />
		
		<!-- //左右按键 -->
		<chunLei-popups v-model="value" :popData="data" @tapPopup="tapPopup" :x="x" :y="y" direction="column" theme="dark" placement="bottom-end" dynamic>
		</chunLei-popups>
		
		<view v-for="(item,index) in list">
			<message @taptext="taptext($event)" @jump="jump" :value="item" :index="index"></message>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
import chunLeiPopups from '@/components/chunLei-popups/chunLei-popups.vue'
import selectInput from '@/components/selectInput/selectInput.vue';
import message from '@/components/message.vue';
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import common from '@/util/common.js'
import { mapState, mapMutations} from 'vuex';
export default {
	components: { selectInput, message },
	mixins: [MescrollMixin],
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
        newsPush: function(value){
			console.log(JSON.stringify(value))
			common.put('conversation').then(res=>{
				this.list = res
			});
		}
	},
	computed: {
		...mapState(['userData','packet','newsPush'])
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
