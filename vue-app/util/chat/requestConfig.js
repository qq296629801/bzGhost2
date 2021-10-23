import request from "@/util/request";
import store from '@/store';
import base from '@/util/chat/baseUrl';
let version_code = '';
// #ifdef APP-PLUS
import {
	getCurrentNo
} from '@/chat/APPUpdate';
setTimeout(() => {
	getCurrentNo(function(res) {
		console.log("版本号", res);
		version_code = res.versionCode;
	});
}, 300);
// #endif

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: base.baseUrl,
	//服务器本地上传文件地址
	fileUrl: base.baseUrl,
	// 服务器上传图片默认url
	// defaultUploadUrl: "api/open/v1/upload_image",
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'Content-Type': 'application/json;charset=UTF-8',
		'project_token': base.projectToken,
	}
});
// 添加获取七牛云token的方法
$http.getQnToken = function(callback) {
	//该地址需要开发者自行配置（每个后台的接口风格都不一样）
	$http.get("api/open/v1/qn_upload").then(data => {
		/*
		 *接口返回参数：
		 *visitPrefix:访问文件的域名
		 *token:七牛云上传token
		 *folderPath:上传的文件夹
		 *region: 地区 默认为：SCN
		 */
		callback({
			visitPrefix: data.visitPrefix,
			token: data.token,
			folderPath: data.folderPath
		});
	});
}
//请求开始拦截器
$http.requestStart = function(options) {
	//console.log("请求开始", options);
	if (options.load) {
		//打开加载动画
		store.commit("setLoadingShow", true);
	}
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		let maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					uni.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	// #ifdef APP-PLUS
	// 添加当前版本号
	if (version_code) {
		options.header['version_code'] = version_code;
	}
	// #endif
	//请求前加入token
	let storeUserData = store.state.userData;
	if (!storeUserData.token) {
		storeUserData = uni.getStorageSync("userData");
	}
	if (storeUserData.token) {
		options.header['Authentication'] = storeUserData.token;
	};
	return options;
}
//请求结束
$http.requestEnd = function(options) {
	//判断当前接口是否需要加载动画
	if (options.load) {
		// 关闭加载动画
		store.commit("setLoadingShow", false);
	}
}
let loginPopupNum = 0;
//所有接口数据处理（此方法需要开发者根据各自的接口返回类型修改，以下只是模板）
$http.dataFactory = async function(res) {
	// console.log("接口请求数据", {
	// 	url: res.url,
	// 	resolve: res.response,
	// 	header: res.header,
	// 	data: res.data,
	// 	method: res.method,
	// });
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		if (typeof(httpData) == "string") {
			httpData = JSON.parse(httpData);
		}
		//判断数据是否请求成功
		if (httpData.success) {
			// 返回正确的结果(then接受数据)
			return Promise.resolve(httpData.data);
		}
	} else {
		// 返回错误的结果(catch接受数据)
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "【request】数据工厂验证不通过",
			data: res.data
		});
	}
};
// 错误回调
$http.requestError = function(e) {
	// e.statusCode === 0 是参数效验错误抛出的
	if (e.statusCode === 0) {
		throw e;
	} else {
		// console.log(e);
		// uni.showToast({
		// 	title: "网络错误，请检查一下网络",
		// 	icon: "none"
		// });
	}
}
export default $http;
