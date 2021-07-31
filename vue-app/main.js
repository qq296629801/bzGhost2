import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from '@/store';
import webim from 'webim.js';
import util from '@/util/util.js'
import * as filters from '@/filter/index.js'
const vuexStore = require("@/store/$u.mixin.js");
import publicModule from "@/components/common/public_module.vue";
Vue.component("public-module", publicModule);
import MescrollBody from "@/components/common/mescroll-uni/mescroll-body.vue";
Vue.component("mescroll-body", MescrollBody);
Vue.mixin(vuexStore);
Vue.use(uView);

Object.keys(filters).forEach(name=>{
	Vue.filter(name,filters[name])
})

Vue.config.productionTip = false;
Vue.prototype.$socket = webim;
Vue.prototype.$url = 'http://42.193.146.14/';
Vue.prototype.$uploadUrl = 'http://42.193.146.14/file/upload';
Vue.prototype.util = util
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
