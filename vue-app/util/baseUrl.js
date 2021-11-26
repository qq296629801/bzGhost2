let baseUrl = "";
let socketUrl = "";
let webUrl = ""
let projectToken = "yiqun";
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = "http://127.0.0.1:9998/";
	socketUrl = "ws://127.0.0.1:9999/chat";
	webUrl = "http://42.193.146.14:8089/";
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	baseUrl = "http://42.193.146.14:9998/";
	socketUrl = "ws://42.193.146.14:9999/chat";
	webUrl = "http://42.193.146.14:8089/";
}
const courtConfig = {
	//微信公众号APPID
	publicAppId: "",
	//请求接口
	baseUrl: baseUrl,
	// 静态地址
	webUrl: webUrl,
	//webSocket地址
	socketUrl: socketUrl,
	//平台Token
	projectToken: projectToken,
	//平台名称
	platformName: "yiqun",
	// 首页页面路径
	homePath: "/pages/home/home",
	// 我的页面路径
	myPath: "/pages/my/my",
	//项目logo
	logoImage: "/static/logo.png",
    //相册背景图
    pictureBanner: "/static/image/circleBanner/3.jpg",
	//模块显示
	module: {
		navigation: true,
		mySettle: true,
		balancePay: true,
		goodsCode: true,
		distributionLevel: 3,
		shop: true,
		customerService: true,
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
