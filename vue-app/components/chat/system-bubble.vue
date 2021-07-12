<template>
	<view>
		<view class="system">
			<view class="text" v-if="row.msgType==8">
				{{row.msgContext}}
			</view>
			<view class="red-envelope" v-if="row.msgType==8">
				<image src="/static/img/red-envelope-chat.png"></image>
				{{row.msgContext}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'system-bubble',
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import "@/pages/chat/style.scss";
</style>
