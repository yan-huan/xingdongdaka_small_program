<template>
	<view>
		<!-- 弹出层 -->
		<view  class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			
		</view>
		
		<!-- 做黑色阴影颜色 -->
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				'bannerShow':false
			};
		},
		// 监听页面返回
		onBackPress() {
			if(this.bannerShow){
				this.bannerShow = false;
				return true;
			}
		},
		methods: {
			closeBanner:function(){
				this.bannerShow=false;
			},
			showBanner:function(lookUserId,pushId){
				this.bannerShow=false;
				console.log(lookUserId+"----------"+pushId)
				this.xd_request_post(this.xdServerUrls.xd_getLookerCountInfoByPushIdAndUserId,{
					pushId:pushId,
					userId:lookUserId
				},true).then(res=>{	
					if(res.resultCode==0){
						var data=res.obj;
						console.log(data)
						uni.showToast({
							title: '评论数量：'+data.commitCount+'，打Call次数：'+data.shareCount+'，打Call点击人次：'+data.shareClickCount,
							duration: 3000,
							icon:'none'
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
						})
					}
									
				})
				
			}
		}
 
	}
</script>
 
 
<style>
	/* 弹出层形式的广告 */
	.uni-banner {
		width: 70%;
		position: fixed;
		left: 15%;
		z-index: 99;
	}
	.uni-mask{
		 z-index: 1;
		background: rgba(0, 0, 0, 0.6);
	}
</style>