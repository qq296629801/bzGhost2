<template>
	<u-index-list>
		<u-cell-group slot="header">
			
			<u-cell title="新的朋友" @tap="jumpNewFriend">
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

			<u-cell title="我的群组" @tap="jumpGroupList">
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
			<u-index-anchor :text="item.name" :key="index" v-if="item.members.length>0"></u-index-anchor>
			<!-- #endif -->
			<u-index-item :key="index">
				<!-- #ifndef APP-NVUE -->
				<u-index-anchor :text="item.name" v-if="item.members.length>0"></u-index-anchor>
				<!-- #endif -->
				<u-cell 
					v-for="(item1, index1) in item.members"
					:key="index1"
					:title="item1.nickName"
					:border="index1 !== item.members.length - 1"
					@tap="jumpBusinessCard(item1)"
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
	// #ifdef APP-NVUE
    // 复制后解开下面一行注释
	// const dom = uni.requireNativePlugin('dom')
	// #endif
	import { mapState } from 'vuex';
	export default {
		name:'friend-list',
		data() {
			return {
			}
		},
		computed: {
			...mapState(['friend'])
		},
		methods:{
			jumpBusinessCard({id,nickName}){
				this.$u.route({
					url: 'pages/friend/businessCard',
					params:{ userId: id, source: 0, nickName}
				});
			},
			jumpNewFriend(){
				this.$u.route({
					url: 'pages/user/newFriend'
				});
			},
			jumpGroupList(){
				this.$u.route({
					url: 'pages/group/groupItem'
				});
			}
		}
	}
</script>

<style lang="scss">
	.icon {
		width: 36px;
		height: 36px;
		margin: -3px 5px -3px 0;
	}
</style>
