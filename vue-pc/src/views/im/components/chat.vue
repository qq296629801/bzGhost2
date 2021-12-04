<template>
  <div class="im-chat" v-if="chatObj.chatName">
    <div class="im-chat-top" v-if="chatObj">
      <span>{{ chatObj.chatName }}</span>
      <a href="javascript:;" @click="modal = true" class="pull-right menu">
        <Icon type="md-menu" />
      </a>
    </div>
    <div class="im-chat-main">
      <div class="im-chat-main-left">
        <div class="im-chat-main-box messages" id="message-box">
          <ul>
            <li
              v-for="(item, index) in messageList"
              :key="index"
              :class="{ 'im-chat-mine': item.isItMe }"
            >
              <div class="im-chat-user">
                <img :src="[host + item.fromUserHeadImg]" alt="头像" />
                <div class="message-info right" v-if="item.isItMe">
                  <i>
                    <Time :time="item.createTime" />
                  </i>
                  <span>{{ item.fromUserName }}</span>
                </div>
                <div class="message-info" v-if="!item.isItMe">
                  <span>{{ item.fromUserName }}</span>
                  <i>
                    <Time :time="item.createTime" />
                  </i>
                </div>
              </div>

              <div class="im-chat-text" v-if="item.contentType == 0">
                <pre
                  v-html="transformFace(item.content)"
                  v-on:click="openImageProxy($event)"
                ></pre>
              </div>

              <div class="im-chat-img" v-if="item.contentType == 3">
                 <imgView :images="[webUrl + item.content]"></imgView>
              </div>   
              
            </li>
          </ul>
        </div>
        <div class="im-chat-footer">
          <div class="im-chat-tool">
            <Icon type="ios-happy-outline" @click="showFaceBox()"></Icon>
            <upload-tool @uploadBack="uploadBack"></upload-tool>
            <Faces
              v-show="showFace"
              @click="showFace = true"
              class="faces-box"
              @insertFace="insertFace"
            ></Faces>
            <Button class="history-message-btn" @click="history"
              >聊天记录</Button
            >
          </div>
          <textarea
            v-model="messageContent"
            class="textarea"
            @keyup.enter="mineSend()"
          ></textarea>
          <div class="im-chat-send">
            <Button @click="mineSend()">发送</Button>
          </div>
        </div>
      </div>

      <!-- <div v-if="chatObj.chatType==1" class="im-chat-users">
        <ul class="chat-user-list">
          <li
            v-for="(item, index) in userList"
            :key="index"
            @click="showUser(item)"
          >
            <span class="im-chat-avatar">
              <img src="/static/logo.png" alt="" />
            </span>
            {{ item.name }}
          </li>
        </ul>
      </div> -->

    </div>
    <Modal
      closable
      class="user-model"
      v-model="modal"
      footer-hide
      title="信息"
      width="300"
    >
      <div v-if="chatObj.chatType==0">
        <UserModal :user="chatObj"></UserModal>
      </div>

      <div v-if="chatObj.chatType==1">
        <p class="user-model-img">
          <img :src="[webUrl + chatObj.imgUrl]" class="img" />
        </p>
        <p class="user-model-item">
          <label>群名称：</label>
          <span>{{ chatObj.chatName }}</span>
        </p>
      </div>
    </Modal>
    <Modal
      closable
      class="user-model"
      v-model="groupUserModel"
      footer-hide
      title="信息"
      width="300"
    >
      <UserModal :userId="groupUser.id" :show-send="false"></UserModal>
      <div class="model-footer">
        <Button @click="showChat(groupUser)">发送消息</Button>
      </div>
    </Modal>

    <Drawer
      title="聊天记录"
      :closable="true"
      v-model="showHistory"
      class="history-message"
      width="60%"
    >
      <history-message
        :showHistory="showHistory"
        :chat="chatObj"
      ></history-message>
    </Drawer>
  </div>
</template>

<script>
import Faces from "./faces.vue";
import UserModal from "./userModal.vue";
import UploadTool from "./uploadTool.vue";
import HistoryMessage from "./historyMessage.vue";
import imgView from "./imgView.vue";
import { mapState } from 'vuex';
import { imageLoad, transform } from "../../../utils/ChatUtils";
import db from "@/utils/api/message.js";
import base from "@/utils/baseUrl.js";
export default {
  components: {
    Faces,
    UserModal,
    HistoryMessage,
    UploadTool,
    imgView
  },
  name: "UserChat",
  computed: {
    ...mapState(["user","chatObj"])
  },
  data() {
    return {
      webUrl:base.webUrl,
      count: 0,
      pageSize: 20,
      modal: false,
      groupUserModel: false,
      groupUser: {},
      messageContent: "",
      messageList: [],
      showFace: false,
      showHistory: false,
      messageType:{
				text:0,
				video:1,
				audio:2,
				image:3,
				createPacket:4,
				robPacket:5
			}
    };
  },
  methods: {
    transformFace(content){
      return transform(content)
    },
    history() {
      this.showHistory = !this.showHistory;
    },
    uploadBack(url) {
      this.messageContent += url;
    },
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
    showChat() {},
    showUser: function(user) {
      let self = this;
      self.groupUserModel = true;
      self.groupUser = user;
    },
    showFaceBox: function() {
      this.showFace = !this.showFace;
    },
    insertFace: function(item) {
      this.messageContent = this.messageContent + "face" + item;
      this.showFace = false;
    },
    // 本人发送信息
    mineSend() {
      let self = this;
      let content = self.messageContent;
      if (content !== "" && content !== "\n") {
        if (content.length > 2000) {
          console.log(1);
        } else {
          this.send();
        }
      }
    },
    send(data){
          let _t = this

          const params = {
            isItMe:true,
            contentType: _t.messageType.text,
            content:  _t.messageContent,
            createTime: Date.now(),
            hasBeenSentId: Date.now(),
            fromUserId: _t.user.operId,
            fromUserName: _t.user.username,
            fromUserHeadImg: _t.user.avatar,
            userId: _t.user.operId,
            toUserId: _t.chatObj.chatId,
            toUserName: _t.chatObj.chatName,
            toUserHeadImg:_t.chatObj.avatar,
            chatType: _t.chatObj.chatType
          };

          if(!_t.messageContent==''){
             _t.messageList.push(params);
              db.commit(params);
             _t.$post('app/msg/add',{
              chatId: _t.chatObj.chatId,
              chatType:_t.chatObj.chatType,
              userId: _t.user.operId,
              message: params.content,
              msgType: params.contentType
            });
          }
          _t.messageContent = '';
          this.$nextTick(() => {
            imageLoad("message-box");
          });

          // 发送消息到服务器转发
          this.$socket.sendMessage(params, res => {
              // 判断是否当前群组
              if(res.toUserId==_t.chatObj.chatId){
                // 判断发送人是不是自己
                if(res.fromUserId!=_t.user.operId){
                  if(res.content!=''){
                    res.isItMe = false;
                    _t.messageList.push(res);
                    db.commit(res);
                    this.$nextTick(() => {
                      imageLoad("message-box");
                    });
                  }
                }
              }
          });
    },
    loadHistory() {
      this.host = base.webUrl;
      // 从本地获取最新历史记录
      db.getItem().then(res=>{
				this.messageList = res.sort(function(a, b){return a.hasBeenSentId-b.hasBeenSentId});
				this.$nextTick(() => {
           imageLoad("message-box");
				});
			});

      //加入群通道
      this.$socket.joinGroup(() =>{
         this.send(null);
      });
    }
  },
  watch: {
    chatObj: function() {
      this.loadHistory();
    }
  },
  mounted: function() {
    this.loadHistory();
  }
};
</script>

<style lang="scss">
@import "@/static/styles/theme";

.im-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  overflow: hidden;
}

.im-chat-top {
  border-bottom: 1px solid #cccccc;
  color: $color-default;
  padding: 0 0 0.2rem 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  height: 40px;

  .menu {
    color: $color-default;
    display: inline-block;
    padding: 0 10px;
  }
}

.user-model {
  .user-model-img {
    padding: 15px;
    text-align: center;

    img {
      border-radius: 50%;
    }
  }

  .user-model-item {
    display: flex;
    padding: 5px 0;

    label {
      flex: 2;
      font-weight: bold;
      text-align: right;
    }

    span {
      flex: 3;
    }
  }
}

.im-chat-main {
  flex: 1;
  display: flex;
  flex-direction: row;
  height: calc(100% - 40px);

  .im-chat-main-left {
    flex: 4;
    display: flex;
    flex-direction: column;

    .im-chat-main-box {
      flex: 1;
      padding-top: 1rem;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .message-img {
    max-width: 20rem;
  }

  .im-chat-users {
    width: 180px;
    border-left: 1px solid #cccccc;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 0;
    }

    .chat-user-list {
      list-style: none;
      margin: 0;

      & > li {
        margin-bottom: 1rem;
        cursor: pointer;
        padding: 5px 2px;
        position: relative;

        &:hover {
          background-color: #eeeeee;

          &:after {
            content: "...";
            position: absolute;
            right: 10px;
            font-weight: bold;
          }
        }

        & > .im-chat-avatar {
          width: 3.2rem;
          height: 3.2rem;
          display: inline-block;
          vertical-align: middle;

          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .messages {
    width: 100%;
    height: calc(100% - 3rem);
    overflow-y: scroll;

    ul {
      width: 100%;

      li {
        position: relative;
        font-size: 0;
        margin-bottom: 10px;
        padding-left: 60px;
        min-height: 68px;


        .im-chat-packet {
            position: relative;
            line-height: 22px;
            margin-top: 25px;
            border-radius: 3px;
            color: #333;
            word-break: break-all;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            .packet {
              height: 80rpx;
              color: #fff;
              padding: 20rpx;
              display: flex;
              background-color: #F09D47;
              line-height: 60rpx;
            }
            .tag {
              height: 50rpx;
              line-height: 50rpx;
              font-size: 20rpx;
              background: #F09D47;
              border-top: 1px solid #f9b56f;
              padding-left: 20rpx;
              color: #fff;
            }
        }

        .im-chat-img {
          max-width: 200px;
          position: relative;
          line-height: 22px;
          margin-top: 25px;
          padding: 1rem;
          color: #e2e2e2;
          word-break: break-all;
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
        }

        .im-chat-text {
          max-width: 800px;
          position: relative;
          line-height: 22px;
          margin-top: 25px;
          padding: 1rem;
          background-color: #333;
          border-radius: 3px;
          color: #e2e2e2;
          word-break: break-all;
          display: inline-block;
          vertical-align: top;
          font-size: 14px;

          &:after {
            content: "";
            position: absolute;
            left: -10px;
            top: 13px;
            width: 0;
            height: 0;
            border-style: solid dashed dashed;
            border-color: #333 transparent transparent;
            overflow: hidden;
            border-width: 10px;
          }

          pre {
            width: 100%;
            white-space: pre-wrap;
            word-break: break-all;

            img {
              display: block;
            }
          }
        }
      }
    }

    .im-chat-user {
      width: 4rem;
      height: 4rem;
      position: absolute;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      left: 3px;
      right: auto;

      .message-info {
        position: absolute;
        left: 60px;
        top: -2px;
        width: 500px;
        line-height: 24px;
        font-size: 12px;
        white-space: nowrap;
        color: #999;
        text-align: left;
        font-style: normal;

        i {
          font-style: normal;
          padding-left: 15px;
        }
      }

      .right {
        right: 0;
        text-align: right;
        left: auto;

        i {
          padding-right: 15px;
        }
      }

      img {
        width: 4rem;
        height: 4rem;
      }
    }

    .im-chat-mine {
      text-align: right;
      padding-left: 0;
      padding-right: 60px;

      .im-chat-text {
        max-width: 800px;
        margin-left: 10px;
        text-align: left;
        background-color: #C6EBFE;
        color: #000;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:after {
          left: auto;
          right: -10px;
          border-top-color: #C6EBFE;
        }
      }

      .im-chat-user {
        left: auto;
        right: 3px;

        cite {
          left: auto;
          right: 60px;
          text-align: right;

          i {
            padding-left: 0;
            padding-right: 15px;
          }
        }

        .message-info {
          right: 60px !important;
        }
      }
    }
  }
}

.im-chat-footer {
  border-top: 1px solid $color-gray;
  height: 15rem;
  display: flex;
  flex-direction: column;

  .im-chat-tool {
    padding: 0.5rem 1rem;
    height: 3.4rem;
    position: relative;

    i {
      font-size: 2.4rem;
      cursor: pointer;
      margin-left: 1rem;
    }

    .faces-box {
      position: absolute;
      bottom: 3.8rem;
    }

    .ivu-upload {
      display: inline-block;
    }

    .history-message-btn {
      float: right;
    }
  }

  textarea {
    border: 0;
    padding: 0.5rem;
    width: 100%;
    flex: 1;
    resize: none;
    background-color: $color-box-bg !important;

    &:focus {
      border: 0;
    }
  }

  .im-chat-send {
    height: 4rem;
    text-align: right;
    padding: 0 1rem 1rem 0;
  }
}

.ivu-scroll-wrapper {
  margin: 0 !important;
}

.ivu-scroll-container {
  padding: 15px 15px 5px;
  overflow-y: visible !important;
}

/* 重新覆盖iview 里面的 model 小于768px 时候 宽度变100% 的问题 */
@media (max-width: 768px) {
  .user-model {
    .ivu-modal {
      width: 30rem !important;
      margin: 0 auto;
    }
  }
}

.history-message {
  width: 80%;
  height: calc(100% - 30px);
}

.page {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0.5rem;
}

.ivu-drawer-body {
  padding: 0 !important;

  .messages {
    height: calc(100% - 3rem);
  }
}

.model-footer {
  text-align: right;
  margin: 10px;
}
</style>
