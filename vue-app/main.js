import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import webim from '@/util/chat/webim.js';
//数据管理中心
import store from '@/store/index.js'
Vue.prototype.$store = store;
//权限配置中心
import base from '@/util/chat/baseUrl.js'
Vue.prototype.$base = base;
//挂载全局http请求
import $http from '@/util/chat/requestConfig'
Vue.prototype.$http = $http;

import publicModule from "@/components/common/public_module.vue";
Vue.component("public-module", publicModule);
Vue.use(uView);

Vue.config.productionTip = false;
Vue.prototype.$socket = webim;
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
