<template>
  <div class="chat-panel">
    <div class="chat-box-list">
      <Search class="search-box" @showChat="showSearchChat"></Search>
      <div class="group-box">
        <ul class="user-list">
          <li class="user" v-for="(chat, index) in chatList" :key="index">
            <a
              href="javascript:"
              @click="showChat(chat)"
              :class="
                currentChat && currentChat.chatId === chat.chatId
                  ? 'active'
                  : ''
              "
            >
              <i v-if="chat.unreadNumber > 0">{{ chat.unreadNumber }}</i>
              <img :src="chat.imgUrl" alt="头像" />
              <b>{{ chat.chatName }}</b>
              <p>{{ contontType[chat.chatType] }}</p>
            </a>
            <Icon type="md-close" @click="delChat(chat)"></Icon>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <UserChat :chatObj="currentChat" @showChat="showChat"></UserChat>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Top from "../components/top.vue";
import UserChat from "../components/chat.vue";
import { imageLoad } from "../../../utils/ChatUtils";
import { get } from "@/utils/db_common.js";
import { mapState } from "vuex";
export default {
  components: {
    Search,
    Top,
    UserChat
  },
  data() {
    return {
      currentChat: {},
      chatList: [],
      contontType: ["文本", "语音", "图片", "红包"]
    };
  },
  computed: {
    ...mapState(["userData"])
  },
  methods: {
    showChat: function(chat) {
      let self = this;
      self.currentChat = chat;
      // 每次滚动到最底部
      self.$nextTick(() => {
        imageLoad("message-box");
      });
    },
    showSearchChat: function(chat) {
      let self = this;
      // self.$store.commit("resetUnRead");
      self.currentChat = chat;
      // 每次滚动到最底部
      self.$nextTick(() => {
        imageLoad("message-box");
      });
    },
    delChat() {}
  },
  activated: function() {
    let self = this;
    self.currentChat = {};
    self.currentChat = this.chatList[0];
    // 每次滚动到最底部
    self.$nextTick(() => {
      imageLoad("message-box");
    });
  },
  mounted: function() {
    get("conversation").then(list => {
      this.chatList = list;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/static/styles/theme";

.ivu-tabs-content {
  height: 100%;
}

.chat-panel {
  width: 26rem;
  background-color: $color-light-gray;
  height: 100%;
  display: flex;
  flex-direction: row;

  .chat-box {
    flex: 1;
    background-color: $color-box-bg;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .chat-box-list {
    height: 100%;
    width: 22rem;
    display: flex;
    flex-direction: column;

    .search-box {
      margin: 1.5rem;
      width: 19rem;
    }
  }
}

.group-box {
  height: 100%;
  overflow-y: scroll;

  .count {
    color: #aaaaaa;
  }

  li {
    list-style: none;
    position: relative;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: 200;
    margin-bottom: 2rem;

    h5 {
      padding: 0.5rem 0;
      cursor: pointer;
      font-size: 1.3rem;
      font-weight: 200;

      i {
        vertical-align: baseline;
      }
    }

    img {
      width: 4.4rem;
      height: 4.4rem;
      position: absolute;
      top: 0.4rem;
      left: 2rem;
    }

    b {
      position: absolute;
      font-size: 1.3rem;
      left: 7.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      top: 0.6rem;
    }

    p {
      position: absolute;
      left: 7.5rem;
      bottom: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 75%;
      font-size: 1.1rem;
      color: #aaaaaa;
    }
  }

  .user {
    height: 5.2rem;
    position: relative;

    a {
      display: block;
      width: 100%;
      height: 100%;
      color: $color-default;
      position: relative;

      i {
        display: inline-block;
        width: 1.8rem;
        height: 1.6rem;
        background-color: #ff0000;
        border-radius: 50%;
        color: $color-write;
        text-align: center;
        font-style: normal;
        position: absolute;
        left: 1rem;
        top: 0;
        z-index: 99999999999;
      }

      p {
        width: 12rem;
      }
    }

    &:hover {
      background-color: $color-gray !important;

      & > i {
        color: $color-default;
        background-color: $color-write;
      }
    }

    .active {
      background-color: $color-gray !important;
    }

    & > i {
      position: absolute;
      right: 1rem;
      bottom: 1.6rem;
      cursor: pointer;
      border-radius: 50%;
      padding: 0.2rem;
      text-align: center;
      color: $color-light-gray;

      &:hover {
        color: $color-default;
        background-color: $color-write;
      }
    }
  }
}
</style>
