import cache from "@/utils/cache.js";
import store from "@/store/index.js";
import { post } from "@/utils/request.js";


const common = {
  post(key) {
    let userData = store.state.userData;
    if (!userData.token) {
      userData = localStorage.getItem("userData");
    }
    if (userData.user == undefined) {
      return;
    }
    let userId = userData.user.operId;
    return new Promise((resolve, reject) => {
      let httpData = {
        userId
      };
      post("app/" + key + "/list", httpData)
        .then(res => {
          cache.set(key + "_" + userId, res);
          resolve(res);
        })
        .catch(e => {
          reject;
        });
    });
  },
  get(key) {
    let userData = store.state.userData;
    if (!userData.token) {
      userData =  localStorage.getItem("userData");
    }
    if (userData.user == undefined) {
      return;
    }
    let userId = userData.user.operId;
    return new Promise((resolve, reject) => {
      try {
        resolve(cache.get(key + "_" + userId));
      } catch (e) {
        reject(e);
      }
    });
  }


}
  
export default common;
