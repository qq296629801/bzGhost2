import Vue from 'vue'
export const state = {
    listLength: 0,
    chatList: [],
    msgList: [],
    cardList: [],
    card: {},
    token: null,
    chat:{},
    chatType:0,
    members:[],
    member:{},
    groups:[],
    friends:[],
    modalMine:false,
    user:{},
    userData:{},
    push:{},
  };
  export const mutations = {
    setPush(state,push){
        state.push = push
    },
    setUser(state,user){
        state.user=user
    },
    setMember(state,mem){
        state.member=mem
    },
    setFriends(state,friends){
        state.userList=friends
    },
    setGroups(state,groups){
        state.groups=groups
    },
    setMembers(state,members){
        state.members=members
    },
    setChatType(state, chatType){
        state.chatType = chatType
    },
    setChat(state, chat){
        state.chat = chat
    },
    setToken (state, data) {
        state.token = data
    },
    setCard (state, data) {
        state.card = data
    },
    setCardList (state, data) {
        state.cardList = data
    },
    setListLength (state, data) {
        state.listLength = data
    },
    setChatList (state, data) {
        state.chatList = data
    },
    setMsgList (state, data) {
        state.msgList = data
    },
    //储存用户信息
    setUserData(state, data) {
        if (data) {
            state.userData =  Object.assign({}, state.userData,data);
            // #ifdef H5
            window.sessionStorage.setItem('userData', JSON.stringify(state.userData));
            // #endif
            // #ifndef H5
            uni.setStorageSync('userData', state.userData);
            // #endif
        }
    },
    // 退出APP
    emptyUserData(state) {
        state.userData = {};
        // #ifdef H5
        window.sessionStorage.removeItem("userData");
        // #endif
        // #ifndef H5
        uni.removeStorageSync("userData");
        // #endif
    },
  };
  export const actions = {
    
  };
