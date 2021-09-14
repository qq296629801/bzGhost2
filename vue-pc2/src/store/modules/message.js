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
            window.sessionStorage.setItem('checkedAddressData', JSON.stringify(state.checkedAddressData));
        }
    },
    setCheckedCouponData(state, data) {
        if (data) {
            state.checkedCouponData = data;
            window.sessionStorage.setItem('checkedCouponData', JSON.stringify(state.checkedCouponData));
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
            window.sessionStorage.setItem('preOrderData', JSON.stringify(state.preOrderData));
        }
    },
    setSignPopup(state, data) {
        state.signPopupShow = data;
    },
};
export const actions = {

};