import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import webim from '@/util/socket/webim.js';
//数据管理中心
import store from '@/store/index.js'
Vue.prototype.$store = store;
//权限配置中心
import base from '@/util/baseUrl.js'
Vue.prototype.$base = base;
//挂载全局http请求
import $http from '@/util/requestConfig'
Vue.prototype.$http = $http;

import publicModule from "@/components/common/public_module.vue";
Vue.component("public-module", publicModule);
Vue.use(uView);
let permissions = JSON.parse(localStorage.getItem("PERMISSIONS"));
// 防止重复点击
Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 2000);
      }
    });
  }
});
// 权限指令
Vue.directive("hasPermission", {
  bind(el, binding) {
    if (permissions && !permissions.includes(binding.value)) {
      el.style.display = "none";
    } else {
      permissions = JSON.parse(localStorage.getItem("PERMISSIONS"));
    }
  }
});
Vue.config.productionTip = false;
Vue.prototype.$socket = webim;
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
