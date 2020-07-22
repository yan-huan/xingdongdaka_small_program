<template name='usershow'>
	
		<view class="cu-list  bg-blue ">
			<view class="cu-item flex padding flex-wrap align-center solid-bottom">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPage(list)">
					<view v-if="list.sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
					<view v-if="list.sex==1" class="cu-tag badge cuIcon-male bg-cyan"></view>
				</view>
				<view class="content flex-sub margin-left-sm" @tap="goPage(list)">
					<view>{{list.userName}}</view>
					<view class=" text-lg flex align-center">
						<text class="lg text-orange cuIcon-location"></text>
						<text class="text-gray text-sm ">{{list.province}}{{list.city}}</text>
					</view>
				</view>
				<view >
					<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0"  @tap="clidtags(list)" >
						{{guanzhu}}
					</view>
				</view>
			</view>
			
			<view class="moreInfoRow">
			
				<view class="moreInfoIn">
					<text @click="clidgoPage('/pages/selfCenter/myattention?userId='+list.id)">关注 {{lookerCount}}</text>
					<text class="moreInfoIn_text" @click="clidgoPage('/pages/selfCenter/myfans?userId='+list.id)">粉丝 {{likeCount}}</text>
				</view>
			
			</view>
			
		</view>
	
</template>

<script>
	export default {
		name:"usershow",
		props:['list','looktotals','guanzhu','likeCount','lookerCount'],
		data() {
			return {
				
			}
		},
		methods: {
			clidtags(e){
				this.$emit("clidtags",e);
			},
			clidgoPage(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style  lang="scss">
	.moreInfoRow {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 0 0 14rpx 0;
	
		&.rowaction {
			margin-top: 18rpx;
		}
	
		.moreInfoIn {
	
			width: 100%;
			overflow: hidden;
	
			margin: 0;
	
			&.flex1 {
				flex: 1;
			}
	
			padding: 0;
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			background-color: rgb(235, 244, 255);
			border-bottom: 1px solid #e7e7e7;
			border-top: 1px solid #e7e7e7;
		}
	
		.moreInfoIn_text {
			margin-left: 300rpx;
		}
	
		.moreInfoIn .thin {
			padding: 0 16rpx;
		}
	}
</style>
