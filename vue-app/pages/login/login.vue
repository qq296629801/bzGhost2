<template>
	<view class="login">
		<view class="content">
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			
			<view class="main">
				<wInput
					v-model="formData.username"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="formData.password"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			
			<wButton
				class="wbutton"
				text="登 录"
				:rotate="loading" 
				@click="jumpLogin"
			></wButton>
			
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
	import wInput from '@/components/watch-login/watch-input.vue' 
	import wButton from '@/components/watch-login/watch-button.vue'
	import commonApi from '@/util/api/comApi.js'
	import msgApi from '@/util/api/msgApi.js'
	import { mapState, mapMutations } from 'vuex';
	import store from '@/store/index.js' 
	export default {
		data() {
			return {
				loading: false, 
				isFocus: true, 
			    formData:{
					username: 'admin',
					password: '123456'
				},
				homePath:'',
				logoImage: '',
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			my= this;
		},
		onLoad() {
			this.homePath = this.$base.homePath
			this.logoImage = this.$base.logoImage
		},
		methods: {
		    jumpLogin(e){
				if(my.loading){
					return false;
				}
				my.loading=true
				this.$http.get('/login',this.formData).then(res=>{
					store.commit("setUser",res.user);
					store.commit("setToken",res.token);
					store.commit("setConfig",res.config);
					store.commit("setRoles",res.roles);
					store.commit("setPermissions",res.permissions);
					
					uni.setStorageSync('PERMISSIONS', res.permissions)
					
					this.$socket.login(()=>{
						
						commonApi.download();
						msgApi.download();
						
						my.loading=false;
						
						uni.reLaunch({
							url: this.homePath,
						});
						
					});
				});
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
