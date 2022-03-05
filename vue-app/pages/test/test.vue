<template>
	<view>
		<u--input
		    placeholder="用户数"
		    border="surround"
		    v-model="value"
		  ></u--input>
		<u-button @tap="myFunction" text="开始"></u-button>
		<u-button @tap="delFunction" text="结束"></u-button>
	</view>
</template>

<script>
	import webim from '@/util/socket/webim.js'
	var myVar = null;
	export default {
		data() {
			return {
				value: 10
			};
		},
		methods:{
			delFunction(){
				clearInterval(myVar);
			},
			myFunction() {
			    myVar = setInterval(this.testConcurrent, 1000);
			},
			testConcurrent(){
				
			}
		}
	}
</script>

<style lang="scss">

</style>
