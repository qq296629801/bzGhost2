<template>
	<u-index-list>
		<u-cell-group slot="header">
			
			<u-cell title="新的朋友">
				<u-avatar
					slot="icon"
					shape="square"
					size="35"
					icon="man-add-fill"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>

			<u-cell title="我的群组">
				<u-avatar
					slot="icon"
					shape="square"
					size="35"
					icon="account-fill"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>
			
		</u-cell-group>
		<template
			v-for="(item, index) in friend"
		>
			<!-- #ifdef APP-NVUE -->
			<u-index-anchor :text="item.name" :key="index"></u-index-anchor>
			<!-- #endif -->
			<u-index-item :key="index">
				<!-- #ifndef APP-NVUE -->
				<u-index-anchor :text="item.name"></u-index-anchor>
				<!-- #endif -->
				<u-cell
					v-for="(item1, index1) in item.members"
					:key="index1"
					:title="item1.nickName"
					:border="index1 !== item.members.length - 1"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="35"
						src="https://cdn.uviewui.com/uview/album/1.jpg"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-index-item>
		</template>
	</u-index-list>
</template>

<script>
	const indexList = () => {
		const indexList = []
		const charCodeOfA = 'A'.charCodeAt(0)
		for (let i = 0; i < 26; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i))
		}
		return indexList
	}
	// #ifdef APP-NVUE
    // 复制后解开下面一行注释
	// const dom = uni.requireNativePlugin('dom')
	// #endif
	import { mapState, mapMutations} from 'vuex';
	export default {
		name:'friend-list',
		data() {
			return {
				indexList: indexList(),
			}
		},
		computed: {
			...mapState(['friend']),
			itemArr() {
				return this.indexList.map(item => {
					const arr = []
					for (let i = 0; i < 10; i++) {
						arr.push({
                            // 复制后解开下面两行注释
							// name: this.names[uni.$u.random(0, this.names.length - 1)],
							// url: this.urls[uni.$u.random(0, this.urls.length - 1)]
						})
					}
					return arr
				})
			}
		},
	}
</script>

<style lang="scss">
	.icon {
		width: 36px;
		height: 36px;
		margin: -3px 5px -3px 0;
	}
</style>
