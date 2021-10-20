<template>
  <div class="user-box">
    <div class="user-box-list">
      <Search class="search-box" @showChat="showChat"></Search>
      <div class="group-box">
              <Collapse simple>
                <template v-for="(item, index) in userFriendList">
                    <Panel v-if="item.members.length" :key="index" :name="`${index}`">
                        <span class="group-head">
                            <span>{{item.name}}</span>
                            <span class="my-num">{{item.members.length}}</span>
                        </span>
                        <div slot="content" class="group-wrap">
                            <div :class="m.id==chat.chatId?'con-item active':'con-item'" v-for="(m, n) in item.members" :key="n" @click="showUser(m)">
                                <img class="member-img" :src="`${$url}/${m.avatar}`" />
                                <span>{{ m.nickName }}</span>
                            </div>
                        </div>
                    </Panel>
                </template>
            </Collapse>
      </div>
    </div>
    <div class="chat-box">
      <Top></Top>
      <Welcome v-if="first"></Welcome>
      <UserInfo
        class="user-box-view"
        v-if="!first"
        v-bind:user="user"
      ></UserInfo>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Top from "../components/top.vue";
import Welcome from "../components/welcome.vue";
import UserInfo from "../components/userInfo.vue";
import conf from "../conf";
import { MessageTargetType } from "../../../utils/ChatUtils";

const { ChatListUtils } = require("../../../utils/ChatUtils.js");
 import { put,get } from '@/utils/common'
export default {
  components: {
    Search,
    Top,
    Welcome,
    UserInfo
  },
  computed: {
  },
  data() {
    return {
      chat: {},
      user: {},
      currentUser: {},
      host: conf.getHostUrl(),
      userFriends: [],
      first: true,
      userFriendList:[]
    };
  },
  mounted: function(){
    get('friend').then(list=>{
      this.userFriendList = list
    });
  },
  methods: {
    // 打开一个聊天对话框
    showChat: function(user) {
      let self = this;
      self.$router.push({
        path: "/index/chatBox/",
        query: {
          chat: ChatListUtils.resetChatList(
            self,
            user,
            conf.getHostUrl(),
            MessageTargetType.FRIEND
          )
        }
      });
    },
    // 打开一个用户信息对话框
    showUser: function(user) {
      let self = this;
      self.$router.push({
        path: "/index/userBox/"
      });

      self.first = false;
      self.user = user;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/static/styles/theme";

.ivu-tabs-content {
  height: 100%;
}
.group-head {
    span {
        margin-left: -10px;
    }
}
.my-num {
    position: absolute;
    right: 16px;
    color: #959595;
}

.ivu-collapse-content-box {
    padding-bottom: 0 !important;
}

.member-img {
    width: 44px;
    height: 44px;
}

.search {
    margin: 30px 20px;
    width: calc(100% - 40px);
}

.con-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    span {
        margin-left: 10px;
    }
    
}
.active{
    background: #eee;
}

.ivu-collapse-simple {
    background-color: #fdfdfd;
    border: none;

    * {
        border: none;
    }
}

.ivu-collapse-item {
    border-top: none !important;
    border: none;
}

.ivu-collapse-content {
    background-color: #fdfdfd;
    padding: 0 !important;
}

.ivu-collapse-header {
    border-bottom: none !important;
}

.group-wrap {
    .con-item {
        padding: 8px 16px;
    }

    .con-item:hover {
        background: #eee;
    }

    .con-item:last-child {
        margin-bottom: 0;
    }
}

.user-box {
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

    .user-box-view {
      position: absolute;
      width: 100%;
      top: 40px;
      padding: 100px;
    }
  }

  .user-box-list {
    height: 100%;
    width: 22rem;
    display: flex;
    flex-direction: column;

    .search-box {
      margin: 1.5rem;
      width: 19rem;
    }

    .group-box {
      overflow-y: scroll;
      flex: 1;

      .user-list {
        .count {
          color: #aaaaaa;
        }

        li {
          list-style: none;
          position: relative;
          font-size: 1.2rem;
          cursor: pointer;
          font-weight: 200;

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
            border-radius: 50%;
            position: absolute;
            top: 0.4rem;
            left: 1.5rem;
          }

          .outline {
            filter: grayscale(100%);
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
          padding-left: 1.3rem;
          height: 5.2rem;

          a {
            display: block;
            width: 100%;
            height: 100%;
            color: $color-default;
          }
        }

        > li:hover {
          background-color: #ddd;
        }

        > li > ul {
          /*background-color: #ffffff;*/
        }

        li.user:hover {
          /*background-color: #efefef;*/
        }
      }
    }
  }
}
</style>
