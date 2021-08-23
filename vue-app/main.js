import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import webim from 'webim.js';
import util from '@/util/util.js'

//数据管理中心
import store from '@/store/index.js'
Vue.prototype.$store = store;
//权限配置中心
import base from '@/config/baseUrl'
Vue.prototype.$base = base;
//挂载全局http请求
import $http from '@/config/requestConfig'
Vue.prototype.$http = $http;

import publicModule from "@/components/common/public_module.vue";
Vue.component("public-module", publicModule);
Vue.use(uView);

Object.keys(filters).forEach(name=>{
	Vue.filter(name,filters[name])
})

Vue.config.productionTip = false;
Vue.prototype.$socket = webim;
Vue.prototype.$url = 'http://42.193.146.14/';
Vue.prototype.$uploadUrl = 'http://42.193.146.14/file/upload';
Vue.prototype.$util = util
App.mpType = 'app'

Promise.prototype.finally = function(callback) {
    let constructor = this.constructor;
    return this.then(function(value) {
        return constructor.resolve(callback()).then(function() {
            return value
        })
    }, function(issue) {
        return constructor.resolve(callback()).then(function() {
            throw issue
        })
    })
}

const app = new Vue({
	store,
    ...App
})
app.$mount()
