let baseUrl = "";
let socketUrl = "";
let projectToken = "3jiayun";
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = "http://127.0.0.1:9998/";
	socketUrl = "ws://127.0.0.1:9999/chat";
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	baseUrl = "http://120.27.95.106:9094/";
	socketUrl = "ws://120.27.95.106:9094/";
}
const courtConfig = {
	//微信公众号APPID
	publicAppId: "",
	//请求接口
	baseUrl: baseUrl,
	//webSocket地址
	socketUrl: socketUrl,
	//平台Token
	projectToken: projectToken,
	//平台名称
	platformName: "茶客",
	// 首页页面路径
	homePath: '/pages/home/homeShangjiayun',
	// 我的页面路径
	myPath: '/pages/my/my',
	//项目logo
	logoUrl: "http://qn.kemean.cn/upload/202004/08/15863540965488mlv1qgj.png",
	//公众号二维码
	publicAttentionCode: "http://qn.kemean.cn/upload/202004/08/15863540965488mlv1qgj.png",
	// 推广背景图片
	promoteBgImgs: [
		"https://qn.kemean.cn/upload/202006/05/1591346203171zj5m2qkl.png",
		"https://qn.kemean.cn/upload/202006/05/1591346218311qsy0h9h7.png",
		"https://qn.kemean.cn/upload/202006/05/15913462289486a12js7d.png",
	],
    // 关于我们背景图
    aboutBgImg: "http://qn.kemean.cn/upload/202007/16/1594887857690zu9em619.jpg",
	//页面分享配置
	share: {
		title: '茶客',
		// #ifdef MP-WEIXIN
		path: '/pages/home/homeShangjiayun', //小程序分享路径
		// #endif
		// #ifdef H5 || APP-PLUS
		// 公众号分享
		desc: "茶客",
		link: "http://www.3jiayun.com/sameCity/3jiayun/index.html#/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: "http://qn.kemean.cn/upload/202004/08/15863540965488mlv1qgj.png", // 分享图标
		// #endif
	},
	//模块显示
	module: {
		navigation: true,
		mySettle: true,
		balancePay: true,
		goodsCode: true,
		distributionLevel: 3,
		// 店铺
		shop: true,
		// 是否有客服
		customerService: true,
		// 优惠券
		coupon: true,
		// 是否支持上门自提
		selfMention: true,
		// 是否支持售后
		afterSale: true,
		// 商品列表是否有分类
		goodsListClassify: true,
        // 积分
        integral: true,
        // 代理商入驻
        agentSettle: true,
        // 股东入驻
        shareholderSettle: true,
        // 农场游戏
        farmGame: true,
        // 会员功能
        member: true,
        // 签到
        signin: true,
        // 砍价
        bargain: true,
        // 幸运转盘
        lottery: true,
        // 积分商城
        integralMall: true,
		// 消息是否在导航中
		navigationMessage: false,
		// 分享锁客
		shareGuest: true
	},
};
//手机号验证正则表达式
const phoneRegular = /^1\d{10}$/;
//邮箱验证正则表达式
const mailRegular = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
//密码验证正则表达式
const passwordRegular = /^[a-zA-Z0-9]{4,10}$/;
export default Object.assign({
	phoneRegular,
	mailRegular,
	passwordRegular
}, courtConfig);
