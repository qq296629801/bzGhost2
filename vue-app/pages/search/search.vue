<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar title=" " :background="{ background: '#F6F7F8' }">
			<view class="slot-wrap">
				<u-search
					:focus="true"
					@custom="clickCancel"
					placeholder="搜索..."
					shape="square"
					:action-style="{ color: '#007aff' }"
					action-text="取消"
					:bg-color="'#ffffff'"
					v-model="searchWord"
				></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="status_bar"></view>
		<view class="content_search">
			<u-search
				:focus="true"
				@custom="clickCancel"
				@search="toSearch"
				:placeholder="p"
				shape="square"
				:action-style="{ color: '#007aff' }"
				action-text="取消"
				:bg-color="'#ffffff'"
				:animation="true"
				v-model="searchWord"
			></u-search>
		</view>
		<!-- #endif -->
		<view class="history_search_box">
		    <view class="history_search_text">
		        <view>猜你喜欢</view>
		    </view>
		    <view class="history_search_content">
		        <view v-for="(item,index) of popularList" :key="index" @click="onHistory(item)">{{item}}</view>
		    </view>
		</view>
		<view>
			<view class="mescroll-empty empty-fixed">
				<view> <image class="empty-icon" :src="empty.icon" mode="widthFix" /> </view>
				<view class="empty-tip">{{ empty.tip }}</view>
				<view class="empty-btn" @click="emptyClick">
					你想干嘛?
				</view>
			</view>
		</view>
		<view class="content1" v-if="'0' == searchType">
			<view v-for="(item, index) in list" :key="index">
				<chatItem @linkTo="toUserInfo" :badgeIcon="false" :value="item" :index="index"></chatItem>
			</view>
		</view>
		<view class="content" v-else-if="'1' == searchType">
			<template v-for="(item,index) in list">
				<chatItem @linkTo="linkTo" :value="item" :index="index"></chatItem>
			</template>
		</view>
		<view class="content1" v-else-if="'2' == searchType">
			<addressBook :list="list" :scrollTop="scrollTop" @linkTo="linkToCard"></addressBook>
		</view>
		<view class="content" v-else-if="'3' == searchType">
			<view class="msg-list" v-for="(item, index) in list" style="top: 100rpx;">
				<view class="row">
					<view class="my">
						<view class="left">
							<view class="bubble text">
								{{item.msgContext}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-else-if="'4' == searchType">
			<view class="msg-list" v-for="(item, index) in list" style="top: 100rpx;">
				<view class="row">
					<view class="my">
						<view class="left">
							<view class="bubble text">
								{{item.msgContext}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入mescroll-uni.js,处理核心逻辑
import MeScroll from '@/components/common/mescroll-uni/mescroll-uni.js';
import MescrollEmpty from '@/components/common/mescroll-uni/components/mescroll-empty.vue';
import chatItem from '@/components/chatItem.vue';
import addressBook from '@/components/addressBook.vue'
import { pinyin } from '../../public/Pinyin.js';
export default {
	name:'search',
	components:{chatItem,addressBook,MescrollEmpty},
	data() {
		return {
			empty: {
				use: true, // 是否显示空布局
				icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
				tip: '~ 空空如也 ~' // 提示
			},
			chatId: '',
			pageNum: -1,
			searchType: '0',
			placeholder:['好友','消息列表','通讯录','好友消息','群消息'],
			searchWord: '',
			p:'',
			list: [],
			scrollTop:0,
			popularList: [],
		};
	},
	watch:{
		searchWord:function(v){
			this.toSearch(v)
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		toUserInfo(userInfo){
			this.$u.route({
				url: 'pages/businessCard/businessCard',
				params:{ ...userInfo, source: 2}
			})
		},
		clickCancel() {
			this.$u.route({
				type: 'navigateBack'
			});
		},
		linkToCard({ id }) {
			this.$u.route({
				url: 'pages/businessCard/businessCard',
				params:{ id: id, source: 0}
			});
		},
		toSearch(v) {
			let that = this;
			const keyword = v
			switch(that.searchType){
				case '0':
					that.$socket.findFriendRequestList(keyword, res => {
						if (res.success) {
							that.list = res.userList;
						}
					});
					break;
				case '1':
					that.$socket.queryChats(keyword, that.userData.user.operId, res => {
						if (res.success) {
							that.list = res.chats;
							this.list = res.chats.filter(v => v.chatName.includes(keyword));
						}
					});
					break;
				case '2':
					that.list = that.firendItem.filter(v => {
						let flag = false
						if(v.members.length>0){
							v.members.forEach(m=>{
								if(m.nickName.includes(keyword)
								||pinyin.getCamelChars(m.nickName).includes(keyword)
								||pinyin.getFullChars(m.nickName).includes(keyword)){
									flag = true
								}
							})
						}
						return flag
					});
					break;
				case '3':
					that.$socket.getFriendMessageByCondition(this.chatId, that.userData.user.operId, this.pageNum, keyword, res => {
						if (res.success) {
							that.list = res.response.data;
						}
					});
				case '4':
					that.$socket.getGroupMessageByCondition(this.chatId, that.userData.user.operId, this.pageNum, keyword, res => {
						if (res.success) {
							that.list = res.response.data;
						}
					});
					break;
				default:
			}
		},
		linkTo(chat) {
			this.$u.vuex('chatObj',chat);
			this.$u.route({
				url: 'pages/chat/chat',
				params: {}
			});
		}
	},
	onShow() {},
	onLoad({ searchType, chatId }) {
		this.searchType = searchType;
		this.chatId = chatId;
		this.p= this.placeholder[searchType];
		
	}
};
</script>

<style lang="scss" scoped>
@import "@/pages/chat/style.scss";
/* 无任何数据的空布局 */
.mescroll-empty {
	box-sizing: border-box;
	width: 100%;
	padding: 100rpx 50rpx;
	text-align: center;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
}

.mescroll-empty.empty-fixed {
	z-index: 99;
	position: absolute; /*transform会使fixed失效,最终会降级为absolute */
	top: 100rpx;
	left: 0;
}

.mescroll-empty .empty-icon {
	width: 280rpx;
	height: 280rpx;
}

.mescroll-empty .empty-tip {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: gray;
}

.mescroll-empty .empty-btn {
	display: inline-block;
	margin-top: 40rpx;
	min-width: 200rpx;
	padding: 18rpx;
	font-size: 28rpx;
	border: 1rpx solid #e04b28;
	border-radius: 60rpx;
	color: #e04b28;
}

.mescroll-empty .empty-btn:active {
	opacity: 0.75;
}
.u-card-wrap { 
	background-color: $u-bg-color;
	padding: 1px;
}
   .history_search_box {
        padding: 40rpx 25rpx 15rpx 25rpx;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;

        .history_search_text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0rpx 15rpx;
            color: #333333;

            >view {
                font-size: 32rpx;
            }

            >text {
                font-size: 28rpx;
            }
        }

        .history_search_content {
            padding: 40rpx 0rpx 0 0;
            display: flex;
            flex-wrap: wrap;

            >view {
                padding: 18rpx 40rpx;
                background: #f7f7f7;
                border-radius: 30rpx;
                font-size: 24rpx;
                color: #333333;
                margin: 10rpx;
            }
        }
    }
.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}
	
.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.content_search {
	padding: 16rpx;
	background-color: #F6F7F8;
}
.content {
	z-index: 999;
	.item {
		width: 750rpx;
		display: flex;
		align-items: center;
		// padding: 20rpx;
		image {
			width: 76rpx;
			height: 76rpx;
			margin: 20rpx;
			border-radius: 12rpx;
			flex: 0 0 76rpx;
		}
		.right {
			overflow: hidden;
			flex: 1 0;
			padding: 20rpx 20rpx 20rpx 0;
			&_top {
				display: flex;
				justify-content: space-between;
				&_name {
					font-size: 28rpx;
					color: $u-main-color;
					flex: 0 0 450rpx;
					overflow: hidden;
				}
				&_time {
					font-size: 22rpx;
					color: $u-light-color;
				}
			}
			&_btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 22rpx;
				color: $u-tips-color;
				padding-top: 10rpx;
			}
		}
	}
	.bg_view {
		background-color: #fafafa;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}
}

.content1 {
	z-index: 999;
	height: 100%;
	background-color: white;
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 28rpx;
		line-height: 48rpx;
		background-color: #fff;
		align-items: center;
		image {
			width: 76rpx;
			height: 76rpx;
			border-radius: 12rpx;
			flex: 0 0 76rpx;
		}
		&-name {
			padding-left: 20rpx;
		}
	}
}
</style>
