<template>
  <div class="chat-panel">
    <div class="chat-box-list">
      <Search class="search-box"></Search>
      <div class="group-box">
        <ul class="user-list">
          <li class="user" v-for="(chat, index) in conversation" :key="index">
            <a
              href="javascript:"
              @click="showChat(chat)"
              :class="
                chatObj && chatObj.chatId === chat.chatId
                  ? 'active'
                  : ''
              "
            >
              <i v-if="chat.unreadNumber > 0">{{ chat.unreadNumber }}</i>
              <img :src="[webUrl + chat.imgUrl]" alt="头像" />
              <b>{{ chat.chatName }}</b>
              <p>{{ chat.msgType==0?chat.content:message[chat.chatType] }}</p>
            </a>
            <Icon type="md-close"></Icon>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <Welcome v-if="first"></Welcome>
      <UserChat v-if="!first" @showChat="showChat"></UserChat>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Top from "../components/top.vue";
import Welcome from "../components/welcome.vue";
import UserChat from "../components/chat.vue";
import { imageLoad } from "../../../utils/ChatUtils";
import { mapState} from 'vuex';
import store from "@/store/index.js";
import base from "@/utils/baseUrl.js";
export default {
  components: {
    Search,
    Top,
    UserChat,
    Welcome
  },
  data() {
    return {
      chatList: [],
      message:['文字', '图片', '表情', '语音', '视频',
				 '签到', '撤销', '发红包', '抢红包','其它'],
      webUrl:base.webUrl,
      first:true
    };
  },
  computed: {
    ...mapState(["user","chatObj","conversation","packetPush"])
  },
  watch:{
    packetPush:function(v){
      switch(v.code){
					case 1:
					if(v.eventObj==1){
						// 更新群消息
						// 更新会话
						let userId = this.user.operId
            this.$post('app/conversation/list', {
              userId
            }).then(res=>{
              res.sort(function(a, b){return a.lastOpenTime>b.lastOpenTime});
              store.commit("setConversation", res)
            });
					}
					break;
					case 2:
						console.log(2);
						break;
					default:
				}
    }
  },
  methods: {
    showChat: function(chat) {
      store.commit("setChatObj",chat)
      this.first = false;
      // 每次滚动到最底部
      this.$nextTick(() => {
        imageLoad("message-box");
      });
    },
    showSearchChat: function(chat) {
      let self = this;
      store.commit("setChatObj",chat)
      // 每次滚动到最底部
      self.$nextTick(() => {
        imageLoad("message-box");
      });
    },
    delChat() {}
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
    //margin-bottom: 2rem;

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
        z-index:1;
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
