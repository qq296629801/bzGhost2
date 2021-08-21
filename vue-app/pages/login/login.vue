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
				:rotate="loading" 
				@click="onLogin"
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
	let my;
	import wInput from '../../components/watch-login/watch-input.vue' 
	import wButton from '../../components/watch-login/watch-button.vue'
	import history from '@/util/history.js'
	import common from '@/util/common.js'
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				logoImage: '/static/logo.png',
				loading: false, 
				isFocus: true, 
			    username: 'admin',
			    password: '123456'
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			my= this;
		},
		methods: {
			...mapMutations(['setUserData']),
			isLogin(){
			},
		    onLogin(e){
				if(my.loading){
					return false;
				}
				my.loading=true
				my.$socket.login(my.username,my.password).then(res=>{
					my.setUserData(res.response.data);
					setTimeout(()=>{
						history.push();
						
						common.put('post');
						common.put('friend');
						
						my.loading=false;
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
