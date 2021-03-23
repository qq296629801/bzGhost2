<template>
	<view>
		<view class="list-box">
			<view 
				v-for="(item,index) in photoList" 
				:key="index" 
				:class="{'active':item.active}"
				:data-index="index"
				@tap="previewPhoto"
			>
				<image :src="item.url" mode="aspectFill" lazy-load="true"></image>
				<view>第 {{item.index+1}} 张图片</view>
			</view>
		</view>
		<view class="load">{{loadTxt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				posts:[],
				photoList:[],
				rows:10,
				page:1,
				isGet:true,
				loadTxt:""
			};
		},
		methods:{
			/* 获取照片 */
			getPhoto(){
				if(!this.isGet){
					return;
				}
				this.isGet=false;
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.page==1){
						uni.showLoading({
							title:'加载中',
							mask:true
						})
					}else{
						this.loadTxt="正在加载中";
					}
					/* 无真实图片请求接口，由 setTimeout 模拟异步过程 */
					setTimeout(()=>{
						/* 拼接图片路径字符串 */
						let joinUrlStr=(num)=>{
							return {
								index:num,
								url:`/static/logo.png`
							}
						}
						let list=[];
						for(let i=0;i<10;i++){
							list.push(joinUrlStr((this.page-1)*this.rows+i))
						}
						success(list);
					},500);
				}).then((res)=>{
					if(this.page==1){
						uni.hideLoading();
					}
					this.photoList=[...this.photoList,...res];
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages(){
				let index=(this.page-1)*this.rows;
				let show=()=>{
					if(index<this.photoList.length){
						this.$set(this.photoList[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						this.loadTxt="上拉加载更多";
						this.page++;
						this.isGet=true;
					}
				}
				
				let interval=setInterval(()=>{
					show();
				},100);
			},
			/* 预览照片 */
			previewPhoto(e){
				let index=e.currentTarget.dataset.index;
				let list=this.photoList.map((item,index)=>{
					return item.url;
				});
				
				uni.previewImage({
					current:list[index],	/* 传 Number H5 端出现不兼容 */
					urls: list
				});
			},
			getPhotos(){
				this.$socket.queryPostsReq(this.userData.user.operId, this.pageNum, res => {
					this.posts = res.response.data.filter(p=>p.urls!='');
					console.log(this.posts)
				});
			},
			openBigImg(current, imgList){
				for(let index in imgList){
					if(!imgList[index]){
						imgList.splice(index, 1)
					}else{
						imgList[index] = this.$url + imgList[index]
					}
				}
				uni.previewImage({
					current,
					urls: imgList,
					// #ifndef MP-WEIXIN
					indicator: 'number'
					// #endif
				});
			}
		},
		filters:{
			format: function (e) {
					  // 获取js 时间戳
					  let time = new Date().getTime();
					  // 去掉 js 时间戳后三位
					  time = parseInt((time - e) / 1000);
					  // 存储转换值
					  let s;
					  if (time < 60 * 10) {
					    // 十分钟内
					    return '刚刚';
					  } else if (time < 60 * 60 && time >= 60 * 10) {
					    // 超过十分钟少于1小时
					    s = Math.floor(time / 60);
					    return s + '分钟前';
					  } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
					    // 超过1小时少于24小时
					    s = Math.floor(time / 60 / 60);
					    return s + '小时前';
					  } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
					    // 超过1天少于3天内
					    s = Math.floor(time / 60 / 60 / 24);
					    return s + '天前';
					  } else {
					    // 超过3天
					   var date = new Date(e);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					   var Y = date.getFullYear() + '-';
					   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					   var D = date.getDate()>10?date.getDate(): '0'+date.getDate() + ' ';
					   var h = date.getHours() + ':';
					   var m = date.getMinutes()>10?date.getMinutes():'0'+ date.getMinutes() + ':';
					   var ss = date.getSeconds();
					   return Y+M+D+h+m+ss;
					  }  
			},
			formatData: function (e) {
			   var date = new Date(e);
			   //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
			   return M;
			}
		},
		mounted() {
			this.getPhoto();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}
	
	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 20upx 0 20upx;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;
	
		&>view {
			background-color: #fff;
			width: 345upx;
			padding: 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			opacity: 0;
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}
	
	.load{
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
</style>
