const message = {
	info: function(title){
		uni.clearStorageSync();
		uni.showToast({
			icon:'none',
			title: title
		})
	}
}
module.exports = {
	info: message.info
}
