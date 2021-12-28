import Vue from "vue";
import cache from "@/util/cache.js"
export const state = {
  exipreTime:0,
  token:'',
  user: {},
  config:{},
  roles:[],
  permissions:[]
};
export const mutations = {
  setUser(state, data) {
  	if (data) {
  		state.user =  Object.assign({}, state.user, data);
		cache.set("user",state.user);
  	}
  },
  setToken(state, data) {
  	if (data) {
  		state.token =  data;
  		cache.set("token",state.token);
  	}
  },
  setConfig(state, data) {
  	if (data) {
  		state.config =  Object.assign({}, state.config, data);
  		cache.set("config",state.config);
  	}
  },
  setRoles(state, data) {
  	if (data) {
  		state.roles =  Object.assign({}, state.roles, data);
  		cache.set("roles",state.roles);
  	}
  },
  setPermissions(state, data){
	  if (data) {
	  	state.permissions =  Object.assign({}, state.permissions, data);
	  	cache.set("permissions",state.permissions);
	  }
  },
  emptyUser(state) {
  	state.user = {};
	state.config = {};
	state.roles = {};
	state.permissions = {};
	state.token = '';
	cache.remove("user");
	cache.remove("config");
	cache.remove("roles");
	cache.remove("permissions");
	cache.remove("token");
  },
};
export const actions = {
};
