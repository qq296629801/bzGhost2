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
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
}
</style>
