import cache from "@/utils/cache.js";
import { post } from "@/utils/request.js";
import store from "@/store/index.js";
const common = {
  post(key) {
    return new Promise((resolve, reject) => {
      let httpData = {
        userId:store.state.user.operId || ''
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
    return new Promise((resolve, reject) => {
      try {
        let userId = store.state.user.operId || '';
        resolve(cache.get(key + "_" + userId));
      } catch (e) {
        reject(e);
      }
    });
  }


}
  
export default common;
