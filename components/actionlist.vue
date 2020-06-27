<template name='actionlist'>
	<view class="actionLi">
		<view class="ali-top">
			<view class="ali-top-in">
				<text>进度:{{item.pushCardCount}}/{{item.targetDay}}</text>
			</view>
			<view class="ali-top-in">
				<text>休假天数:{{item.holidayDay}}</text>
			</view>
			<view class="ali_right" @click="toggleMask(item.id,index)">
				<text class="cuIcon-moreandroid" ></text>
			</view>
		</view>
		<view class="ali-main">
			<view class="ali-main-img">
				<img v-if="item.pictures!=''" :src="item.pictures" alt="" class="xd-list-image" mode="aspectFill" @tap="goPageImg(item.pictures)">
				<img v-else :src="audioPlaySrc" alt="" class="xd-list-image" @error="error(index)" @tap="goPageImg(audioPlaySrc)">
			</view>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			<view class="lli-main-content xd-list-body ">
				<view class="xd-list-title-text" @tap="goPageCard(item)">
					<text>{{item.content}}</text>
				</view>	
			</view>
		</view>
		<view class="ali-footer">
			<!-- <view class="actionBar xd-tbr-large">
				<text>获赞助金</text>
				<text class="price">￥{{item.giveReward}}</text>
				<text class="sub xd-badge">{{item.onlookerCount}}</text>
			</view> -->
			<view class="actionBar xd-tbr-large">
				<text>我的保证金</text>
				<text class="price">￥{{item.challengeRmb}}</text>
			</view>
			<view class="actionBar xd-tbr-large" >
				<button class="buttonShare"   :id="index" open-type="share" >邀请围观</button>

			</view>
		</view>
		<view class="ali-btns" v-if="tab===0&&showBut!=1">
			<button v-if="item.btn==0" class="btn"  @click="goPage(item.id)">立即打卡</button>
			<button v-else-if="item.btn==1" class="btn"  style="background-color: #ff0000;">未达成</button>
			<button v-else-if="item.btn==2" class="btn" style="background-color: #46ca5c;">已达成</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['tab','item','showBut','index','userId'],
		
		data(){
			return {
				audioPlaySrc:'../static/images/icon/img/title.png',
			}
		},
		methods:{
			error: function(index) {
				console.log(index)
				var num=Math.floor(Math.random()*8+1);
				this.audioPlaySrc='../static/images/icon/img/title'+num+'.png'
			            }  ,
			goPage(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/selfCenter/clockIn?pushId='+item
				});
			},
			goPageCard(e){
				
				uni.navigateTo({
					url:'../index/action/action?pushId='+e.id
				})
			},
			goPageImg(e){
				console.log(e)
				uni.navigateTo({
					url:'../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			},
			lookerClick(list,index){
				
				this.$emit('lookerClick',list,index);
			},
			toggleMask(e,index){
				this.$emit('toggleMask',e,index);
			}
		}
	}
</script>

<style  lang="scss">
	.actionLi{
		.ali-top{
			display: flex;
			justify-content: space-between;
			color:#888;
			font-size: 24rpx;
			line-height: 36rpx;
			padding: 18rpx 0 12rpx 0;
		}
		.ali-main{
			display: flex;
			.ali-main-img{
				img{
					width: 236rpx;
				}
			}
		}
		.ali-footer{
			display: flex;
			justify-content: space-between;
			padding:20rpx;
			.actionBar{
				position: relative;
				background: #f9ebe5;
				color: #e17175;
				.price{
					color: #ea030b;
				}
			}
		}
		.ali-btns{
			display: flex;
			justify-content: center;
			.btn{
				// display: block;
				text-align: center;
				padding:0;
				font-size: 26rpx;
				height: 66rpx;
				 background: $xd-color-base;
				width:200rpx;
				margin:0 20rpx 0 0;
			}
		}
	}
	.buttclass{
			background: #f9ebe5;
			color: #e17175;
			height: 40upx;
			border-radius: 20upx;
			font-size: 25upx;
			margin-top: -4px;
	
	}
		button::after {
			  border: none;
			
			}
			.buttonShare{
				background: #f9ebe5;
				color: #e17175;
				
				border-radius: 20upx;
				font-size: 25upx;
				line-height: 1.4;
			}
			.ali_right{
				font-size: 40upx;
			}
</style>
