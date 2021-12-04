<template>
	<view class="content">
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
