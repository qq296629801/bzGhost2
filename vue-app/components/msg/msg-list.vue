<template>
	<view class="u-page">
		<u-list
			@scrolltolower="scrolltolower"
		>
			<u-list-item
				v-for="(item, index) in indexList"
				:key="index"
			>
				<u-cell
					:title="`列表长度-${index + 1}`"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="35"
						:src="item.url"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	export default {
		name:'msg-list',
		data() {
			return {
				indexList: [
					{
						url:'https://cdn.uviewui.com/uview/album/1.jpg'
					},
					{
						url:'https://cdn.uviewui.com/uview/album/2.jpg'
					}
				]
			}
		},
		onLoad() {
			this.loadmore()
		},
		methods: {
			scrolltolower() {
			},
		},
	}
</script>

<style lang="scss">
	.u-page {
		padding: 0;
	}
</style>
