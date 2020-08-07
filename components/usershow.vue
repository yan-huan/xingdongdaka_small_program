<template name='usershow'>
	
		<view class="cu-list  bg-blue ">
			<view class="cu-item flex padding flex-wrap align-center solid-bottom">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +newList.userHead + ')'}" @click="clidgoPage(1,'/pages/selfCenter/editUserInfo')">
					<view v-if="newList.gender==2" class="cu-tag badge cuIcon-female bg-pink"></view>
					<view v-if="newList.gender==1" class="cu-tag badge cuIcon-male bg-cyan"></view>
				</view>
				<view class="content flex-sub margin-left-sm" @click="clidgoPage(1,'/pages/selfCenter/editUserInfo')">
					<view>{{newList.userName}}</view>
					<view class=" text-lg flex align-center">
						<text class="lg text-orange cuIcon-location"></text>
						<text class="text-gray text-sm ">{{newList.province}}{{newList.city}}</text>
					</view>
					<view class=" text-lg flex align-center" v-if="newList.schoolName">
						<text class="lg text-orange cuIcon-home"></text>
						<text class="text-gray text-sm ">{{newList.schoolName}}</text>
					</view>
				</view>
				<view >
					<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0"  @tap="clidtags(newList)" >
						{{guanzhu}}
					</view>
					<view class="personOpt" v-if="guanzhu.length== ''">
						<button @click="clickMe" class="pay" v-if="env!='release'">支付</button>
					</view>
				</view>
			</view>
			
			<view class="moreInfoRow">
			
				<view class="moreInfoIn flex flex-wrap justify-around">
					<text @click="clidgoPage('/pages/selfCenter/myattention?userId='+userId)">关注 {{lookerCount}}</text>
					<text v-if="guanzhu.length== ''" class="moreInfoIn_text" @click="clidgoPage('/pages/selfCenter/myfans')">围观量 {{looktotals}}</text>
					<view class="flex flex-wrap">
						<text class="moreInfoIn_text" @click="clidgoPage('/pages/selfCenter/myfans?userId='+userId)">粉丝 {{likeCount}}</text>
						<view class="cu-tag  tag-text bg-red" v-if="num>0&&num<100">{{num}}</view>
						<view class="cu-tag  tag-text bg-red" v-if="num>=100">99+</view>
					</view>
					
				</view>
			
			</view>
			
		</view>
	
</template>

<script>
	export default {
		name:"usershow",
		props:['userId','list','looktotals','guanzhu','likeCount','lookerCount','num'],
		data() {
			return {
				env:uni.getStorageSync('env'),
				newList:''
			}
		},
		watch:{
			list:function(){
				console.log(this.list)
				this.newList=this.list;
			}
		},
		methods: {
			clidtags(e){
				this.$emit("clidtags",e);
			},
			clickMe(){
				this.$emit("clickMe");
			},
			clidgoPage(num,url) {
				if(num==1&&this.guanzhu==''){
					uni.navigateTo({
						url
					});
				}else{
					if(num!=1){
						
						uni.navigateTo({
							url:num
						});
					}
				}
				
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
			// margin-left: 300rpx;
		}
	
		.moreInfoIn .thin {
			padding: 0 16rpx;
		}
	}
	.tag-text{
		border-radius: 200rpx;
		font-size: 20rpx;
		padding: 0rpx 10rpx;
		height: 28rpx;
		color: #ffffff;

	}
</style>
