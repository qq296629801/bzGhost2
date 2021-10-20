import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js'
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import { post, get, deleteData, download, put, formData, formDataType2 } from './utils/request'
import { dateStr, formatDateTime } from "./utils/ChatUtils.js";
import webim from './utils/webim'
import './utils/directives'
Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.prototype.formatDateTime = formatDateTime;
Vue.prototype.$socket = webim;
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$delete = deleteData
Vue.prototype.$formData = formData
Vue.prototype.$download = download
Vue.prototype.$put = put
Vue.prototype.$formDataType2 = formDataType2

Vue.prototype.dateStr = dateStr;
if (process.env.VUE_APP_MODE === "web") {
  Vue.prototype.winControl = require("@/mode/webControl").default;
} else {
  Vue.prototype.winControl = require("@/mode/windowControl").default;
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
