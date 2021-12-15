<!-- 发布朋友圈 -->
<template>
	<view class="content">
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<textarea class="input" v-model="content" placeholder="这一刻的想法..." :show-confirm-bar="false" :adjust-position="false" :disable-default-padding="true"></textarea>
		<u-upload
				:fileList="fileList1"
				@afterRead="afterRead"
				@delete="deletePic"
				name="1"
				multiple
				:maxCount="10"
			></u-upload>
		
		<view class="tips">
			<u-cell-group>
				<u-cell bg-color="#f8f8f8" title="占位字段" :title-style="{ marginLeft: '10rpx' }"></u-cell>
				<u-cell bg-color="#f8f8f8" title="占位字段" :title-style="{ marginLeft: '10rpx' }"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations} from 'vuex';
import base from '@/util/baseUrl.js';
import store from '@/store/index.js' 
export default {
	data() {
		return {
			content: '',
			files:[],
			fileList1: [],
			action: base.baseUrl,
			maxSize: 2 * 1024 * 1024, //限制文件大小 2M
			btnLoading: false //防止重复点击
		};
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1)
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file)
			let fileListLen = this[`fileList${event.name}`].length
			lists.map((item) => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].thumb)
				
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result
				}))
				this.files.push(result)
				fileListLen++
			}
		},
		// 上传文件回调
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: base.baseUrl + 'file/upload', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					formData: {
						user: 'test'
					},
					success: (res) => {
						// 字符串转json
						let data = res.data
						if (typeof(data) == "string") {
							data = JSON.parse(data);
						}
						resolve(data.data)
					}
				});
			})
		},
		//自定义标题栏按钮 h5&&app
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.handleRelease()
			}
		},
		//自定义标题栏按钮点击事件  微信小程序
		handleRelease(){
			if (this.$u.trim(this.content) || this.fileList1.length) {
				this.btnLoading = true;
				uni.showLoading({
					title: '正在发布...',
					mask: true
				});
				const { operId } = this.user;
				
				const reqData = {
					userId: operId,
					postContext: this.content,
					urls: this.files.join(",")
				}
				this.$http.post('app/post/add',reqData).then(res=>{
					this.btnLoading = false;
					uni.hideLoading();
					this.$http.post("app/post/list", {
						userId: operId
					}).then(res=>{
						store.commit("setPost", res)
					});
					this.$u.route({ type: 'back'});
				});
			}
		}
	}
	
};
</script>

<style scoped lang="scss">
.content {
	padding: 20rpx 40rpx;
	.input {
		caret-color: $uni-color-success;
		height: 160rpx;
		padding: 0 15rpx;
	}
	.tips {
		margin-top: 120rpx;
	}
}
</style>
<style lang="scss">
.content {
	.upload {
		/deep/.u-list-item,
		.u-add-wrap {
			background-color: #eceae8;
		}
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx; 
	}
}
</style>