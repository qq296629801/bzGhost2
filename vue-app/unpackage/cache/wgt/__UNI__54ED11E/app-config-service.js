
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/home/home","pages/addressBook/addressBook","pages/find/find","pages/register/register","pages/agreement/agreement","pages/my/my","pages/search/search","pages/chat/chat","pages/firendCircle/firendCircle","pages/businessCard/businessCard","pages/releaseFirendCircle/releaseFirendCircle","pages/chooseBgImg/chooseBgImg","components/u-avatar-cropper/u-avatar-cropper","pages/builtinBgImg/builtinBgImg","pages/moreInforMation/moreInforMation","pages/chat/userDetail","pages/chat/groupDetail","pages/setings/setings","pages/my/person","pages/my/common","pages/my/accountSafe","pages/chat/updateGroupInfo","pages/chat/addGroupUser","pages/chat/detail","pages/qrcode/qrcode","pages/chat/call","pages/chat/forward","pages/webview/webview","pages/my/photo","pages/my/face","pages/chat/moreMem","pages/my/index","pages/login/reg","pages/login/forget","pages/login/agreement","pages/newFriend/newFriend","pages/groupItem/groupItem"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"聊天","navigationBarBackgroundColor":"#F6F7F8","backgroundColor":"#fff","backgroundTextStyle":"light","pageOrientation":"portrait","bounce":"none"},"tabBar":{"color":"#7B8AA0","selectedColor":"#171717","border":"none","backgroundColor":"#fff","list":[{"pagePath":"pages/home/home","iconPath":"static/menu/chat.png","selectedIconPath":"static/menu/chat_s.png","text":"消息"},{"pagePath":"pages/addressBook/addressBook","iconPath":"static/menu/contact.png","selectedIconPath":"static/menu/contact_s.png","text":"通讯录"},{"pagePath":"pages/find/find","iconPath":"static/menu/see.png","selectedIconPath":"static/menu/see_s.png","text":"发现"},{"pagePath":"pages/my/index","iconPath":"static/menu/my.png","selectedIconPath":"static/menu/my_s.png","text":"我"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"易聊性能版","compilerVersion":"3.0.7","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F6F7F8"}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSrc":"/static/iconfont/iconfont.ttf","float":"right","text":""}]}}},{"path":"/pages/addressBook/addressBook","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"通讯录"}},{"path":"/pages/find/find","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"发现"}},{"path":"/pages/register/register","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"注册"}},{"path":"/pages/agreement/agreement","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"协议"}},{"path":"/pages/my/my","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":" ","navigationStyle":"custom","titleView":false}},{"path":"/pages/search/search","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationStyle":"custom","titleView":false,"animationType":"zoom-out","animationDuration":300}},{"path":"/pages/chat/chat","meta":{},"window":{"enablePullDownRefresh":true,"softinputNavBar":"none","scrollIndicator":"none","softinputMode":"adjustPan","titleNView":{"autoBackButton":false,"backgroundColor":"#fff","buttons":[{"fontSrc":"/static/iconfont/iconfont.ttf","float":"right","text":""},{"fontSrc":"/static/iconfont/iconfont.ttf","float":"left","text":"","color":"#303133","background":"rgba(255,255,255,0)"}]}}},{"path":"/pages/firendCircle/firendCircle","meta":{},"window":{"navigationBarTitleText":" ","transparentTitle":"auto","enablePullDownRefresh":true,"titleNView":{"type":"transparent","backgroundColor":"#f8f9f9","coverage":"45%","backButton":{"color":"#303133","background":"rgba(255,255,255,0)"},"buttons":[{"fontSrc":"/static/iconfont/iconfont.ttf","float":"right","text":"","color":"#303133","background":"rgba(255,255,255,0)"}]}}},{"path":"/pages/businessCard/businessCard","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","titleNView":{"backgroundColor":"#FFFFFF"}}},{"path":"/pages/releaseFirendCircle/releaseFirendCircle","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","titleNView":{"buttons":[{"float":"right","text":"发表","color":"#18b566","fontSize":"16"}]}}},{"path":"/pages/chooseBgImg/chooseBgImg","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择背景图"}},{"path":"/components/u-avatar-cropper/u-avatar-cropper","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择背景图","navigationBarBackgroundColor":"#000000"}},{"path":"/pages/builtinBgImg/builtinBgImg","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择背景图","titleNView":{"buttons":[{"float":"right","text":"完成","color":"#18b566","fontSize":"16"}]}}},{"path":"/pages/moreInforMation/moreInforMation","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"更多信息"}},{"path":"/pages/chat/userDetail","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationStyle":"custom","titleView":false}},{"path":"/pages/chat/groupDetail","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationStyle":"custom","titleView":false}},{"path":"/pages/setings/setings","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"设置"}},{"path":"/pages/my/person","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"个人信息"}},{"path":"/pages/my/common","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"通用"}},{"path":"/pages/my/accountSafe","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"账号与安全"}},{"path":"/pages/chat/updateGroupInfo","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationStyle":"custom","titleView":false}},{"path":"/pages/chat/addGroupUser","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationStyle":"custom","titleView":false}},{"path":"/pages/chat/detail","meta":{},"window":{"enablePullDownRefresh":true,"softinputNavBar":"none","softinputMode":"adjustPan","titleNView":{"backgroundColor":"#EC624F","titleColor":"#fff","titleText":""}}},{"path":"/pages/qrcode/qrcode","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的二维码"}},{"path":"/pages/chat/call","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择要提醒的人"}},{"path":"/pages/chat/forward","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"选择一个聊天"}},{"path":"/pages/webview/webview","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"webview"}},{"path":"/pages/my/photo","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"朋友圈相册"}},{"path":"/pages/my/face","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"表情商店"}},{"path":"/pages/chat/moreMem","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"所有成员"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的","navigationStyle":"custom"}},{"path":"/pages/login/reg","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"","navigationBarBackgroundColor":"#F6F7F8"}},{"path":"/pages/login/forget","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"忘记密码","navigationBarBackgroundColor":"#F6F7F8"}},{"path":"/pages/login/agreement","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"用户协议"}},{"path":"/pages/newFriend/newFriend","meta":{},"window":{"navigationBarTitleText":"新的朋友","enablePullDownRefresh":false}},{"path":"/pages/groupItem/groupItem","meta":{},"window":{"navigationBarTitleText":"我的群组","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
