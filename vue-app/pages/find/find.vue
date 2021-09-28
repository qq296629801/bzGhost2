<template>
	<view class="content">
		<u-cell-group>
			<u-cell-item  title="朋友圈" :title-style="titleStyle" @tap="linkToMoment">
				<u-icon slot="icon" name="moments-circel-fill" color="#00aaff" size="40"></u-icon> 
			</u-cell-item>
		</u-cell-group>	
		<view style="height: 20rpx;"></view>
		<u-cell-group>
			<u-cell-item  title="扫一扫" :title-style="titleStyle" @tap="linkToScan">
				<u-icon slot="icon" name="scan" color="#00aaff" size="40"></u-icon> 
			</u-cell-item>
		</u-cell-group>	
		<view style="height: 20rpx;"></view>
		<view class="" v-for="(item,index) in links" :key="index">
			<u-cell-group>
				<u-cell-item  :title="item.title" :title-style="titleStyle"  @tap="linkTo(item,index)">
					<u-icon slot="icon" :name="item.icon" :color="item.color" size="40"></u-icon> 
				</u-cell-item>
			</u-cell-group>
			<view v-if="index!=links.length" class="" style="height: 20rpx;"></view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			titleStyle: {marginLeft:'20rpx',fontWeight:'800'},
			links:[]
		};
	},
	onShow() {
		//this.querylinkItem()
	},
	computed: {
		...mapState(['userData'])
	},
	methods: {
		querylinkItem(){
			this.$socket.getLinks(this.userData.user.operId, res=>{
				if(res.response.success){
					//this.$u.vuex('linkItem',res.response.data);
				}else {
					this.util.modal(res.response.errorMessage)
				}
			});
		},
		linkToMoment(){
			this.$u.route({
				url:'pages/firendCircle/firendCircle'
			})
		},
		linkToScan(){
			uni.scanCode({
				success: function(res) {
					uni.vibrateLong();
					let uId = res.result
					if (uId==t.userData.user.operId){
						uni.showToast({
							icon:'none',
							title:'暂不支持添加自己'
						})
					} else {
						t.$u.route({
							url: 'pages/businessCard/businessCard',
							params:{ id: uId, source: 2}
						})
					}
				}
			});
		},
		linkTo(item, index){
			this.$u.route({
				url:'pages/webview/webview',
				params:{url:item.url,name:item.title}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.content{
		
	}
</style>
