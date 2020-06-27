<template>
	<view class="msg">
		<view class="msglis">
			
			<!-- <view class="msgli" @click="goPage('/pages/msg/talk')" v-for="(item,index) in 6" :key="index">
				<view class="msgheader">
					<img src="../../static/images/pic/header.png" class="xd-list-head-img ">
				</view>
				<view class="msgbody">
					<view class="msgbody-title"><text>系统消息</text></view>
					<view class="msgbody-detail"><text>快来围观我的打卡行动吧</text></view>
				</view>
				<view class="msgright">
					<text class="arrow">
						
					</text>
				</view>
			</view>
			 -->
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		onLoad() {
			uni.showToast({
				icon:'none',
				title:'正在加紧开发中!',
				duration:3000,
			})
		},
		methods:{
			goPage(url){
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style lang="scss">
	.msg{
		padding:12rpx 30rpx;
	}
	.arrow{
		width: 8px;
		  height: 8px;
		  border-top: 2px solid #999;
		  border-right: 2px solid #999;
		  position: absolute;
		  right: 0;
		  transform: rotate(45deg);
		   top:-5rpx;
	}
	.msgli{
		display: flex;
		padding:12rpx 0;
		align-items: center;
		.msgheader{
			padding:12rpx;
		}
		.msgbody{
			flex: 1;
			.msgbody-title{
				font-size: 28rpx;
			}
			.msgbody-detail{
				font-size: 24rpx;
				color:#9f9fa4;
			}
		}
		.msgright{
			position:relative;
			height: 100%;
		}
	}
</style>
