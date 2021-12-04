<template>
	
	<u-transition :show="true" mode="slide-right">
	
	<u-index-list>
		<u-cell-group slot="header">
			
			<u-cell :clickable="true" title="新的朋友" @tap="jumpNewFriend">
				<u-avatar
					slot="icon"
					shape="square"
					size="40"
					icon="man-add-fill"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>

			<u-cell :clickable="true" title="我的群组" @tap="jumpGroupList">
				<u-avatar
					slot="icon"
					shape="square"
					size="40"
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
					:clickable="true"
					:border="index1 !== item.members.length - 1"
					@tap="jumpBusinessCard(item1)"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="40"
						:src="webUrl + item1.avatar"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-index-item>
		</template>
	</u-index-list>
	
	</u-transition>
</template>

<script>
	// #ifdef APP-NVUE
    // 复制后解开下面一行注释
	// const dom = uni.requireNativePlugin('dom')
	// #endif
	import { mapState } from 'vuex';
	import base from '@/util/baseUrl.js';
	export default {
		name:'friend-list',
		data() {
			return {
				webUrl:base.webUrl
			}
		},
		computed: {
			...mapState(['friend'])
		},
		methods:{
			jumpBusinessCard(userCardData){
				userCardData.source = 0
				console.log(JSON.stringify(userCardData))
				this.$store.commit("setUserCardData",userCardData)
				this.$u.route({
					url: 'pages/friend/businessCard'
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
