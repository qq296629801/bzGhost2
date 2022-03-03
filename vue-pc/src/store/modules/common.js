import Vue from "vue";
import cache from "@/utils/cache.js";
export const state = {
  // 加载动画
  loadingShow: false,
  // 登录弹窗状态
  loginPopupShow: false,
  // 聊天对象
  chatObj: {},
  // 红包对象
  packetData: {},
  packetPush: {},
  // 缓存
  post: [],
  friend: [],
  group: [],
  conversation: []
};
//缓存浏览器的数据名称
const cacheNameList = [
  "user",
  "token",
  "config",
  "roles",
  "permissions",
  "post",
  "friend",
  "group",
  "conversation"
];
let clearTime;
export const mutations = {
  setPost(state, data) {
    if (data) {
      state.post = Object.assign({}, state.post, data);
      cache.set("post", state.post);
    }
  },
  setFriend(state, data) {
    if (data) {
      state.friend = Object.assign({}, state.friend, data);
      cache.set("friend", state.friend);
    }
  },
  setGroup(state, data) {
    if (data) {
      state.group = Object.assign({}, state.group, data);
      cache.set("group", state.group);
    }
  },
  setConversation(state, data) {
    if (data) {
      state.conversation = Object.assign({}, state.conversation, data);
      cache.set("conversation", state.conversation);
    }
  },
  setCacheData(state) {
    for (let name of cacheNameList) {
      let data = cache.get(name);
      if (data) {
        state[name] = data;
      }
    }
  },
  setPacketData(state, data) {
    if (data) {
      state.packetData = data;
    }
  },
  // 推送
  setPacketPush(state, data) {
    if (data) {
      state.packetPush = data;
    }
  },
  // 聊天对象
  setChatObj(state, data) {
    if (data) {
      state.chatObj = data;
    }
  },
  //数据加载状态
  setLoadingShow(state, data) {
    if (state.loadingShow) {
      clearTime && clearTimeout(clearTime);
      clearTime = setTimeout(function() {
        state.loadingShow = data;
      }, 50);
    } else {
      state.loadingShow = data;
    }
  },
  //登录弹窗状态
  setLoginPopupShow(state, data) {
    state.loginPopupShow = data;
  }
};
export const actions = {};
