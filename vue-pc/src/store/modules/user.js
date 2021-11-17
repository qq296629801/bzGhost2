import Vue from "vue";
import cache from "@/utils/cache.js"
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
  		state.token =  Object.assign({}, state.token, data);
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
	cache.remove("user")
  },
};
export const actions = {
};
