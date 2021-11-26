<template>
	<view class="content">
		<u-cell-group>
			<u-cell title="头像">
				<u-upload slot="right-icon"
					:fileList="fileList3"
					@afterRead="afterRead"
					@delete="deletePic"
					name="3"
					multiple
					:maxCount="10"
					:previewFullImage="true"
				></u-upload>
			</u-cell>
			
			<u-cell title="昵称" @tap="linkTo(user.realname,0)" :value="user.realname">
			</u-cell>
			
			<u-cell title="用户名" :arrow="false" :value="user.username">
			</u-cell>
			
			<u-cell @tap="jumpQr" title="二维码">
				<u-avatar
					slot="right-icon"
					size="30"
					icon="fingerprint"
					fontSize="26"
					randomBgColor
					customStyle="margin: -3px 5px -3px 0"
				></u-avatar>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import base from '@/util/baseUrl.js'
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				action:base.baseUrl,
				webUrl:base.webUrl,
				fileList3: [{
					url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				}],
			}
		},
		computed:{
			...mapState(['user'])
		},
		methods: {
			jumpQr(){
				this.$u.route({
					url: 'pages/user/qr'
				});
			},
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
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: base.baseUrl + '/file/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let json = JSON.parse(res.data)
							console.log(json)
							this.upAvatar(json.data)
							resolve(json.data)
						}
					});
				})
			},
			upAvatar(avatar){
				let { username } = this.user
				const params = {
					username,
					avatar: avatar
				}
				this.$http.put('user/avatar', params).then(res => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: white;
	}
</style>
