<template>
	<view>
		<view v-for="(item,index) in photoList">
		</view>
		<nongmo-feebox :item="obj"></nongmo-feebox>
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
				obj:{
					username: '顾艺馨',
					avatar:
					  'https://img0.baidu.com/it/u=2322326169,1418475405&fm=11&fmt=auto&gp=0.jpg',
					content: '今天的数学题, 有点难度, 不过终于解答出来了, 大家一起加油.',
					image:
					  'https://wx1.sinaimg.cn/mw600/71db2511ly1gqcn92klluj21zi2z9npe.jpg',
					date: '2021-06-01',
				}
			};
		},
		methods:{
			/* 获取照片 */
			getPhoto(){
				this.$socket.getPhotos(this.userData.user.operId,r=>{
					console.log(r)
					if(r.response.success){
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

