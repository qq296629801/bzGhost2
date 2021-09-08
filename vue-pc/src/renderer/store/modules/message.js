import Vue from "vue";

export const state = {
    selectAddress: {},
    checkedAddressData: {},
    checkedCouponData: {},
    paymentMethod: "",
    serverPhone: "",
    preOrderData: {},
    signPopupShow: false,
	vipPreOrderData: {},
	chatObj:{},
	packet:{}
};
export const mutations = {
	setPacket(state, data){
		if(data){
			state.packet = data;
		}
	},
	setChatObj(state, data){
		if(data){
			state.chatObj = data;
		}
	},
    setSelectAddress(state, data) {
        if (data) {
            state.selectAddress = data;
        }
    },
    setCheckedAddressData(state, data) {
        if (data) {
            state.checkedAddressData = data;
            // #ifdef H5
            window.sessionStorage.setItem('checkedAddressData', JSON.stringify(state.checkedAddressData));
            // #endif
        }
    },
    setCheckedCouponData(state, data) {
        if (data) {
            state.checkedCouponData = data;
            // #ifdef H5
            window.sessionStorage.setItem('checkedCouponData', JSON.stringify(state.checkedCouponData));
            // #endif
        }
    },
    setPaymentMethod(state, data) {
        if (data) {
            state.paymentMethod = data;
            uni.setStorageSync("paymentMethod", state.paymentMethod);
        }
    },
    setServerPhone(state, data) {
		console.log(data);
        if (data) {
            state.serverPhone = data;
        }
    },
    setPreOrderData(state, data) {
        if (data) {
            state.preOrderData = data;
            // #ifdef H5
            window.sessionStorage.setItem('preOrderData', JSON.stringify(state.preOrderData));
            // #endif
        }
    },
    setSignPopup(state, data) {
        state.signPopupShow = data;
    },
	// setVipPreOrderData(state, data) {
	//     if (data) {
	//         state.vipPreOrderData = data;
	//         // #ifdef H5
	//         window.sessionStorage.setItem('vipPreOrderData', JSON.stringify(state.vipPreOrderData));
	//         // #endif
	//     }
	// },
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