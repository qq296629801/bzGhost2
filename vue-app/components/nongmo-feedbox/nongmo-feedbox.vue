<template name="feedBox">
  <view>
    <view class="main u-margin-top-20 u-m-r-30 u-m-l-30 u-p-b-10">
      <view>
        <view class="u-flex u-m-t-20 u-m-r-20 bottom">
          <view class="u-flex">
            <u-avatar size="50" :src="item.avatar"></u-avatar>
            <view class="u-font-15 u-p-l-20 u-p-b-15 name">{{
              item.username
            }}</view>
          </view>
          <u-icon
            v-if="showDeleteIcon"
            @click="deleteRecord"
            size="40"
            name="trash"
          ></u-icon>
        </view>
      </view>
      <view>{{ item.content }}</view>
      <view class="u-m-t-10 u-m-b-10">
        <u-image
          width="100%"
          height="300rpx"
          @click="previewImage"
          :src="item.image"
        ></u-image>
      </view>
      <view class="u-flex u-m-b-10 u-p-t-20 u-p-b-10 bottom">
        <view>
          <u-icon size="40" name="chat" @click="goDetail" label="4865" v-if="showDeleteIcon"></u-icon>
          <u-icon
            class="u-m-l-60"
            size="40"
            @click="upClick"
            :color="upColor"
            name="thumb-up"
            label="4865"
			v-if="showDeleteIcon"
          ></u-icon>
        </view>
        <view>{{ item.date }}</view>
      </view>
    </view>
    <u-action-sheet
      :list="list"
      v-model="show"
      :tips="tips"
      :cancel-btn="true"
    ></u-action-sheet>
  </view>
</template>

<script>
export default {
  name: 'feedBox',
  props: {
    showDeleteIcon: {
      type: Boolean,
      default: false,
    },
    allowGoDetail: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: {
        username: '顾艺馨',
        avatar:
          'https://img0.baidu.com/it/u=2322326169,1418475405&fm=11&fmt=auto&gp=0.jpg',
        content: '今天的数学题, 有点难度, 不过终于解答出来了, 大家一起加油.',
        image:
          'https://wx1.sinaimg.cn/mw600/71db2511ly1gqcn92klluj21zi2z9npe.jpg',
        date: '2021-06-01',
      },
    },
  },
  data() {
    return {
      upColor: '',
      list: [
        {
          text: '不删除',
          color: '#FC6B00',
        },
        {
          text: '删除',
        },
      ],
      show: false,
      tips: {
        text: '是否删除该条动态?',
        color: '#909399',
        fontSize: 24,
      },
    }
  },
  methods: {
    goWrite() {
      uni.navigateTo({
        url: `/pages/index/write`,
      })
    },
    goDetail() {
      if (!this.allowGoDetail) return
      uni.navigateTo({
        url: `/pages/index/detail`,
      })
    },
    upClick() {
      if (this.upColor === '') {
        this.upColor = '#FC6B00'
      } else {
        this.upColor = ''
      }
    },
    previewImage(event) {
      wx.previewImage({
        urls: [
          'https://wx1.sinaimg.cn/mw600/71db2511ly1gqcn92klluj21zi2z9npe.jpg',
        ],
      })
    },
    deleteRecord() {
      this.show = true
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
  line-height: 180%;
}
</style>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  padding: 30rpx 20rpx 40rpx 20rpx;
}
.name {
  font-weight: 200;
}
.bottom {
  justify-content: space-between;
}
</style>