<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<friend-list></friend-list>
	</view>
</template>
<script>
import friendList from '@/components/msg/friend-list.vue'
export default {
	components:{ friendList },
	data() {
		return {
		};
	},
	methods: {
	},
	onNavigationBarButtonTap({ index }) {
		this.$u.route({
			url: 'pages/group/groupCreate'
		})
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: white;
}
</style>
