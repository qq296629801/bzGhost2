<template>
	<view class="content">
		<u-navbar :is-back="true" :title="titles[type]" :background="{ background: '#F6F7F8' }" title-color="#404133" :border-bottom="false" z-index="1001">
			<view class="slot-wrap" slot="right">
				<u-button :disabled="isInput" size="mini" type="success" @click="saveData">保存</u-button>
			</view>
		</u-navbar>
		<u-cell-group>
			<u-cell-item>
				<u-input class="text" v-model="context" :auto-height="true" />
			</u-cell-item>
		</u-cell-group>
	</view>
</template>
<script>
export default {
	data() {
		return {
			type:'0',
			context:'',
			groupId:'',
			value: '',
			isInput:true,
			show: false,
			border: false,
			titles: ['昵称','群名称','群公告','群昵称'],
			func:['updateNickName','updateGroupName','updateNotice','updateGroupNick'],
		}
	},
	watch:{
		context:function(v){
			this.isInput = v==undefined ? true : false;
		}
	},
	onLoad({groupId, context, type}) {
		this.groupId = groupId
		this.context = context
		this.type = type
	},
	onShow() {
	},
	methods: {
		saveData(){
			//this.[func[type]]();
		},
		updateNickName () {
		},
		updateGroupName(){
		},
		updateNotice(){
		},
		updateGroupNick(){
		}
	}
};
</script>

<style lang="scss">
	.content{
		background-color: #fff;
		.text{
			background-color: #fff;
			text-indent: 2em;
			font-size: 16rpx;
			height: 500rpx;
			padding: 15rpx;
		}
	}
</style>
