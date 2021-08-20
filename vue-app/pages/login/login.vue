<template>
	<view class="login">
		<view class="content">
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			
			<view class="main">
				<wInput
					v-model="username"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="password"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate" 
				@click="startLogin"
			></wButton>
			
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
			
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import conversation from '@/util/conversation.js'
	import history from '@/util/history.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				logoImage: '/static/logo.png',
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
			    username: 'admin',
			    password: '123456'
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			...mapMutations(['setUserData']),
			isLogin(){
			},
		    startLogin(e){
				if(_this.isRotate){
					return false;
				}
				_this.isRotate=true
				_this.$socket.login(_this.username,_this.password,null).then(res=>{
					_this.setUserData(res.response.data);
					history.put(res.response.data.user.operId);
					conversation.put(res.response.data.user.operId);
					setTimeout(()=>{
						_this.isRotate=false;
						uni.reLaunch({
							url: '/pages/home/home',
						});
					},200)
				});
		    },
			login_weixin() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
