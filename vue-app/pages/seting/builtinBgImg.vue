<template>
	<view class="content">
		<u-grid @click="clickGrid">
			<u-grid-item v-for="(item, index) in bgList" :key="index"  :index="index">
				<image :src="item.src" class="img" mode="scaleToFill"></image>
				<view class="check-box" v-show="item.isCheck"><u-icon style="display: inline-block;" name="checkbox-mark"></u-icon></view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bgList:[]
		};
	},
	methods: {
		clickGrid(index){
			this.bgList.forEach((item,i)=>{
				if(index == i) item.isCheck = !item.isCheck;
				else item.isCheck = false;
			})
		},
		//自定义标题栏按钮 h5&&app
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.handleLink()
			}
		},
		//处理跳转逻辑
		handleLink(){
			const item = this.bgList.find(it=>it.isCheck);
		},
		
	},
	onShow() {
		this.bgList = JSON.parse(JSON.stringify(this.circleBgList))
	}
};
</script>

<style lang="scss" scoped>
.content {
	.img {
		width: calc(750rpx / 3.4);
		height: calc(750rpx / 3.4);
	}
	.check-box{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		background-color: $u-success;
		opacity: 0.7;
		text-align: center;
		color:#FFFFFF;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx; 
	}
}
</style>
