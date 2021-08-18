import Vue from "vue";

export const state = {
    //地址选择的地址
    selectAddress: {},
    //选中的收货地址
    checkedAddressData: {},
    //选中的优惠券
    checkedCouponData: {},
    // 支付方式
    paymentMethod: "",
    //客服电话
    serverPhone: "",
    // 预下单数据
    preOrderData: {},
    //签到弹窗状态
    signPopupShow: false,
	//会员预下单
	vipPreOrderData: {},
};
export const mutations = {
    //地址选择的地址
    setSelectAddress(state, data) {
        if (data) {
            state.selectAddress = data;
        }
    },
    //选中的收货地址
    setCheckedAddressData(state, data) {
        if (data) {
            state.checkedAddressData = data;
            // #ifdef H5
            window.sessionStorage.setItem('checkedAddressData', JSON.stringify(state.checkedAddressData));
            // #endif
        }
    },
    //选中的优惠券
    setCheckedCouponData(state, data) {
        if (data) {
            state.checkedCouponData = data;
            // #ifdef H5
            window.sessionStorage.setItem('checkedCouponData', JSON.stringify(state.checkedCouponData));
            // #endif
        }
    },
    //支付方式
    setPaymentMethod(state, data) {
        if (data) {
            state.paymentMethod = data;
            uni.setStorageSync("paymentMethod", state.paymentMethod);
        }
    },
    //客服电话
    setServerPhone(state, data) {
		console.log(data);
        if (data) {
            state.serverPhone = data;
        }
    },
    //预下单数据
    setPreOrderData(state, data) {
        if (data) {
            state.preOrderData = data;
            // #ifdef H5
            window.sessionStorage.setItem('preOrderData', JSON.stringify(state.preOrderData));
            // #endif
        }
    },
    //签到弹窗状态
    setSignPopup(state, data) {
        state.signPopupShow = data;
    },
	// //会员预下单数据
	// setVipPreOrderData(state, data) {
	//     if (data) {
	//         state.vipPreOrderData = data;
	//         // #ifdef H5
	//         window.sessionStorage.setItem('vipPreOrderData', JSON.stringify(state.vipPreOrderData));
	//         // #endif
	//     }
	// },
	// //会员预下单清除
	// emptyVipPreOrderData(state) {
	// 	state.vipPreOrderData = {};
	// 	// #ifdef H5
	// 	window.sessionStorage.removeItem("vipPreOrderData");
	// 	// #endif
	// 	// #ifndef H5
	// 	uni.removeStorageSync("vipPreOrderData");
	// 	// #endif
	// },
};
export const actions = {

};