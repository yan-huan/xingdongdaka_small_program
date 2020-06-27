<template>
	<view class="container auth">
		<view class="logo">
			<img src="/static/logo.png" class="img">
		</view>
		<view class="notice-title">
			<text>
				行动打卡
			</text>
		</view>
		<view class="notice-detail">
			<text>
				我们需要您的基本信息(头像昵称)和您的手机号，请您允许授权登录
			</text>
		</view>
		<view class="btns">
			<button class="btn btn-create"  open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信信息授权</button>
			<!-- <button class="btn btn-create"  open-type="getPhoneNumber">微信手机号快速登录</button> -->
		</view>
	</view>
</template>

<script>
	import api from "../../server/api.js";
	import wxApi from "../../server/wxApi.js";
	import user from "../../logic/user.js"
	export default{
		data(){
			return {
			}
		},
		
		onLoad() {
			// wxApi.getUserInfo().then(res=>{
			// 	console.log(res);
			// }).catch(err=>{
				
			// })
		},
		methods:{
			bindGetUserInfo(e){
				user.setToken(info=>{
					console.log(info);
					uni.showToast({
					    title: "授权成功",
						icon:"none",
					    duration: 2000
					});
					this.goIndex();
				});
			},
			goCenter(){
				uni.navigateTo({
					url: `/pages/my/center`
				});
			},
			goIndex(){
				uni.navigateTo({
					url: `/pages/index/index`
				});
			}
		}
	}
</script>

<style lang="scss">
	.logo{
		height: 100rpx;
		width: 100rpx;
		//background: $font-color-base;
		.img{
			height: 100rpx;
			width: 100rpx;
		}
	}
	.notice{
		padding:0 25rpx 50rpx 25rpx;
	}
	.notice-title{
		font-size: 28rpx;
		line-height: 36rpx;
		margin-bottom: 45rpx;
		text-align: center;
		margin-top:300rpx;
	}
	.notice-detail{
		color:#666;
		line-height: 42rpx;
		font-size: 24rpx;
		text-align: center;
	}
	.btns{
		margin-top:100rpx;
		display: flex;
		flex-direction: column;
		//justify-content: space-between;
		.btn{
			width: 340rpx;
			height: 70rpx;
			line-height: 70rpx;
			background: #f1f1f1;
			//color:$font-color-title;
			font-size: 28rpx;
			&.btn-create{
				color:#fff;
				//background: $font-color-base;
			}
			margin-bottom: 30rpx;
		}
	}
</style>
