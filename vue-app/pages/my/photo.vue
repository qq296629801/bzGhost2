<template>
	<view>
		<view v-for="(item,index) in photoList">
			<nongmo-feebox :item="item"></nongmo-feebox>
		</view>
	</view>
</template>

<script>
	import nongmoFeebox from '@/components/nongmo-feedbox/nongmo-feedbox.vue'
	export default {
		components:{
			nongmoFeebox
		},
		data() {
			return {
				pageNum:1,
				photoList:[],
				//item:{}
			};
		},
		methods:{
			/* 获取照片 */
			getPhoto(){
				this.$socket.getPhotos(this.userData.user.operId,r=>{
					if(r.response.success){
						for(var i in r.response.data){
							let urls = r.response.data[i].urls;
							let arr =  urls.split(',');
							for(var a in arr){
								let b = {
									url: this.$url + arr[a],
									username: r.response.data[i].userName,
									avatar: this.$url + r.response.data[i].avatar,
									content: r.response.data[i].context,
									date: r.response.data[i].lastTime
								}
								this.photoList.push(b);
							}
						}
					}
				})
			},
		},
		onShow() {
			this.getPhoto();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}
	
	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 20upx 0 20upx;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;
	
		&>view {
			background-color: #fff;
			width: 345upx;
			padding: 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			opacity: 0;
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}
	
	.load{
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
</style>
