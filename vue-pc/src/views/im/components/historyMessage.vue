<template>
  <div style="height: calc(100% - 40px);">
    <div class="im-chat-main" style="height: 100%">
      <div class="messages" id="his-chat-message" style="height: 100%">
        <ul>
          <li
            v-for="(item, index) in hisMessageList"
            :key="index"
            :class="{ 'im-chat-mine': item.isItMe }"
          >
            <div class="im-chat-user" id="historyMessageBox">
              <img :src="[host + item.fromUserHeadImg]" />
              <div class="message-info right" v-if="item.isItMe">
                <i>{{ item.createTime }}</i>
                <span>{{ item.fromUserName }}</span>
              </div>
              <div class="message-info" v-if="!item.isItMe">
                <span>{{ item.fromUserName }}</span>
                <i>{{ item.createTime }}</i>
              </div>
            </div>

            <div class="im-chat-text" v-if="item.contentType == 0">
              <pre
                v-html="item.content"
                v-on:click="openImageProxy($event)"
              ></pre>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Page
      :total="count"
      size="small"
      show-total
      class="page"
      :page-size="pageSize"
      @on-change="getHistoryMessage"
    />
  </div>
</template>

<script>
import base from "@/utils/baseUrl.js";
import { mapState } from "vuex";
export default {
  name: "history-message",
  props: {
    showHistory: {
      type: Boolean,
      default: false
    },
    chat: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      count: 0,
      pageSize: 10,
      hisMessageList: [],
      host: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    showHistory: function(show) {
      this.showHistory = show;
      if (show) {
        this.getHistoryMessage(1);
      }
    }
  },
  mounted() {
    this.host = base.webUrl;
  },
  methods: {
    // 附件和图片点击展开
    openImageProxy: function(event) {
      let self = this;
      event.preventDefault();
      if (event.target.nodeName === "IMG") {
        self.winControl.openURL(event.target.src);
      } else if (
        event.target.className === "message-file" ||
        event.target.nodeName === "A"
      ) {
        self.winControl.openURL(event.target.href);
      }
    },
    getHistoryMessage(pageNo) {
      let httpReqData = {
        chatType: this.chat.chatType,
        chatId: this.chat.chatId,
        userId: this.user.operId,
        condition: "",
        pageNum: pageNo,
        pageSize: this.pageSize
      };
      this.$post("app/msg/list", httpReqData).then(res => {
        this.count = res.totalSize;
        this.hisMessageList = res.list;
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
