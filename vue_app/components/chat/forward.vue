<template>
	<u-popup v-model="pStatus" :mask-close-able="false">
		<u-navbar :is-back="false">
			<view class="slot-wrap" @click="close">
				<u-icon name="arrow-left"></u-icon>
				返回
			</view>
		</u-navbar>
		<view>
			<view v-for="(item,index) in list">
				<message @jump="b(item)" :value="item" :index="index"></message>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import message from '@/components/message.vue'
	export default {
		name:'forward',
		components:{ message },
		props: {
			pStatus: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list:[],
				message:'',
				msgType:0,
			};
		},
		methods:{
		}
	}
</script>

<style lang="scss">
</style>
