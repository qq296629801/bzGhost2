<template>
	<view>
		<u-lazy-load v-for="(item, index) in list" :key="index" :image="item.src"></u-lazy-load>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 设计成数组内嵌对象而不是纯数组形式，是考虑到真实环境后端返回的数据为如此形式
				list: [{
						src: "https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						src: "https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						src: "https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg",
					},
					{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "xxx",
					},
				]
			}
		}
	}
</script>