import cache from "@/utils/cache.js";
import { post } from "@/utils/request";
import store from "@/store/index.js";
var postfix = "msgItem_";
const message = {
  getItem: function() {
    let chatId = store.state.chatObj.chatId;
    let list = cache.get(postfix + chatId);
    return new Promise((resolve, reject) => {
      try {
        if (list == "") {
          resolve([]);
          return;
        }
        list.sort((a, b) => {
          return a.id - b.id;
        });
      } catch (e) {
        reject(e);
      }
      resolve(list);
    });
  },
  download: function() {
    let userId = store.state.user.operId;
    post("app/group/msg/online", {
      userId
    }).then(res => {
      res.forEach(r => {
        cache.set(postfix + r.groupInfo.chatId, r.groupMsg.list);
      });
    });
    post("app/friend/msg/online", { userId, condition: "" }).then(res => {
      res.forEach(r => {
        cache.set(postfix + r.friendInfo.id, r.friendMsg);
      });
    });
  },
  del(id, obj = {}) {
    let chatId = store.state.chatObj.chatId;
    let list = cache.get(postfix + chatId);
    if (list == "") {
      let tempItem = [];
      tempItem.push(obj);
      cache.set(postfix + chatId, tempItem);
      return;
    }
    for (var i in list) {
      if (list[i].id == id) {
        list.splice(i, 1);
      }
    }
    cache.set(postfix + chatId, list);
  },
  upPacket(hasBeenSentId, content) {
    let chatId = store.state.chatObj.chatId;
    let list = cache.get(postfix + chatId);
    if (list == "") {
      let tempItem = [];
      tempItem.push(obj);
      cache.set(postfix + chatId, tempItem);
      return;
    }
    for (var i in list) {
      if (list[i].hasBeenSentId === hasBeenSentId) {
        list[i].content = content;
      }
    }
    cache.set(postfix + chatId, list);
  },
  commit(obj = {}) {
    let chatId = store.state.chatObj.chatId;
    let list = cache.get(postfix + chatId);
    if (list == "") {
      let tempItem = [];
      tempItem.push(obj);
      cache.set(postfix + chatId, tempItem);
      return;
    }
    if (list.length >= 10) {
      list.splice(0, 1);
    }
    list.push(obj);
    cache.set(postfix + chatId, list);
  }
};
export default message;
