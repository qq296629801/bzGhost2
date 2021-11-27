<template>
  <div class="user-info">
    <Row>
      <Col span="12">
        <h5 class="username">{{ user.nickName }}</h5>
      </Col>
      <Col span="12" class="text-right">
        <Avatar size="large" :src="webUrl + user.avatar" />
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span="3" class="label">账户</Col>
      <Col span="2"></Col>
      <Col span="18" class="value">{{ user.userName }}</Col>
    </Row>
    <Row>
      <Col span="3" class="label">积分</Col>
      <Col span="2"></Col>
      <Col span="18">{{ user.money }}</Col>
    </Row>
    <Row>
      <Col span="18"></Col>
      <Col span="6" class="text-right">
        <i-button type="primary" shape="circle" size="large" @click="showChat()"
          >发送消息</i-button
        >
      </Col>
    </Row>
  </div>
</template>

<script>
import base from "@/utils/baseUrl.js";
import store from "@/store/index.js";
export default {
  name: "userInfo",
  props: ["user"],
  data() {
    return {
      webUrl: base.webUrl
    };
  },
  methods: {
    // 打开一个聊天对话框
    showChat: function() {
      let self = this;
      let obj = {
        chatName:self.user.nickName,
        chatType:0,
        chatId:self.user.id,
        avatar:self.user.avatar
      };
      store.commit("setChatObj",obj);

      self.$router.push({
        path: "/index/chatBox/"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.user-info {
  font-size: 16px;
  line-height: 200%;
  color: #666;

  .text-right {
    text-align: right;
  }

  .username {
    font-weight: bold;
    font-size: 20px;
  }

  .label {
    text-align: justify;
    text-align-last: justify;
    font-weight: bold;
  }
}
</style>
