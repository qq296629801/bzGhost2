import cache from "@/utils/cache.js";
import { post } from "@/utils/request.js";
import store from "@/store/index.js";
var postfix = "msgItem_";
const message = {
   getItem(gid) {
    let list = cache.get(postfix + gid);
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
   online() {
    let userId = store.state.user.operId || '';
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
  del(id, gid, obj) {
    let list = cache.get(postfix + gid);
    if (list == "") {
      let tempItem = [];
      tempItem.push(obj);
      cache.set(postfix + gid, tempItem);
      return;
    }
    for (var i in list) {
      if (list[i].id === id) {
        list.splice(i, 1);
      }
    }
    cache.set(postfix + gid, list);
  },
  upPacket(id, gid, msgContext) {
    let list = cache.get(postfix + gid);
    if (list == "") {
      return;
    }
    for (var i in list) {
      if (list[i].id === id) {
        list[i].msgContext = msgContext;
      }
    }
    cache.set(postfix + gid, list);
  },
  commit(obj, gid) {
    let list = cache.get(postfix + gid);
    if (list == "") {
      let tempItem = [];
      tempItem.push(obj);
      cache.set(postfix + gid, tempItem);
      return;
    }
    if (list.length >= 10) {
      list.splice(0, 1);
    }
    list.push(obj);
    cache.set(postfix + gid, list);
  }
}
export default message;
