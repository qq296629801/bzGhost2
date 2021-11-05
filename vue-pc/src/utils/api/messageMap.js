import $local from "@/utils/local.js";
import { post } from "@/utils/request.js";
import $store from "@/store/index.js";
var postfix = "msgItem_";

function get(gid) {
  let list = $local.get(postfix + gid);
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
}

function pull() {
  let userData = $store.state.userData;
  if (!userData.token) {
    userData = localStorage.getItem("userData");
  }
  let userId = userData.user.operId;
  post("app/group/msg/online", {
    userId
  }).then(res => {
    res.forEach(r => {
      $local.set(postfix + r.groupInfo.chatId, r.groupMsg.list);
    });
  });
  post("app/friend/msg/online", { userId, condition: "" }).then(res => {
    res.forEach(r => {
      $local.set(postfix + r.friendInfo.id, r.friendMsg);
    });
  });
}

function del(id, gid, obj) {
  let list = $local.get(postfix + gid);
  if (list == "") {
    let tempItem = [];
    tempItem.push(obj);
    $local.set(postfix + gid, tempItem);
    return;
  }
  for (var i in list) {
    if (list[i].id === id) {
      list.splice(i, 1);
    }
  }
  $local.set(postfix + gid, list);
}

function upPacket(id, gid, msgContext) {
  let list = $local.get(postfix + gid);
  if (list == "") {
    return;
  }
  for (var i in list) {
    if (list[i].id === id) {
      list[i].msgContext = msgContext;
    }
  }
  $local.set(postfix + gid, list);
}

function commit(obj, gid) {
  let list = $local.get(postfix + gid);
  if (list == "") {
    let tempItem = [];
    tempItem.push(obj);
    $local.set(postfix + gid, tempItem);
    return;
  }
  if (list.length >= 10) {
    list.splice(0, 1);
  }
  list.push(obj);
  $local.set(postfix + gid, list);
}
export { commit, get, pull, del, upPacket };
