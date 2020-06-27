<template>
	<view class="income">
		<view class="incomeItem">
			<view class="incomeTxt">
				<text>余额：</text>
				<text class="price">3000</text>
			</view>
			<view class="incomBtns">
				<button class="btn">充值</button>
				<button class="btn other">提现</button>
			</view>
		</view>
		<view class="incomeItem">
			<view class="incomeTxt">
				<text>收益：</text>
				<text  class="price">3000</text>
			</view>
		</view>
		
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0">
					<text>收益明细</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=1">
					<text>支出明细</text>
				</view>

			</view>
			<view class="actionTabList">
				<view class="actionbody" v-show="tab===0">
					<!-- <view class="brow">
						<view class="rowItem">
							<text>围观分配：</text>
							<text>100</text>
						</view>
						<view class="rowItem">
							<text>被打赏：</text>
							<text>100</text>
						</view>
					</view>
					<view class="brow">
						<view class="rowItem">
							<text>拉赞助：</text>
							<text>100</text>
						</view>
						<view class="rowItem">
							<text>行动项分配：</text>
							<text>100</text>
						</view>
					</view>
					<view class="brow">
						<view class="rowItem">
							<text>挑战赛分配：</text>
							<text>100</text>
						</view>
						<view class="rowItem">
							<text>圈费分配：</text>
							<text>100</text>
						</view>
					</view>
					<view class="brow">
						<view class="rowItem">
							<text>邀请分配：</text>
							<text>100</text>
						</view>
					</view> -->
					<view class="icm-list">
						<view class="icm-item icm-name">
							<text>围观分配</text>
						</view>
						<view class="icm-item ">
							<text>200元</text>
						</view>
						<view class="icm-item">
							<text>2020年1月1日 12:20:34</text>
						</view>
					</view>
					<view class="icm-list">
						<view class="icm-item icm-name">
							<text>被打赏</text>
						</view>
						<view class="icm-item ">
							<text>200元</text>
						</view>
						<view class="icm-item">
							<text>2020年1月1日 12:20:34</text>
						</view>
					</view>
					<view class="icm-list">
						<view class="icm-item icm-name">
							<text>圈费分配</text>
						</view>
						<view class="icm-item ">
							<text>200元</text>
						</view>
						<view class="icm-item">
							<text>2020年1月1日 12:20:34</text>
						</view>
					</view>
				</view>
				<view class="actionbody" v-show="tab===1">

				</view>

			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				tab:0
			};
		}
	}
</script>

<style lang="scss">
	.income{
		padding:30rpx;
		font-size: 30rpx;
		.price{
			font-weight: bold;
		}
	}
	.incomeItem{
		display: flex;
		justify-content: space-between;
		.incomBtns{
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		height: 80rpx;
		line-height: 80rpx;
	}
	.btn{
		display: block;
		font-size: 26rpx;
		height: 50rpx;
		line-height: 50rpx;
		background: $xd-color-base;
		width:150rpx;
		margin:0 20rpx 0 0;
		&.other{
			background: #fd5107;
			color:#fff;
		}
	}
	.actionInfo{
		margin:24rpx 0;
		.tabbar{
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;;
			.tab{
				flex: 1;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;
				padding:16rpx;
				&.active{
					border-bottom: 1px solid #fd5107;
					color:#fd5107;
				}
			}
		}
	}
	.brow{
		font-size: 24rpx;
		display: flex;
		padding:20rpx 0 10rpx 0;
		.rowItem{
			flex:1;
		}
	}
	.actionbody{
		padding:12rpx 0 ;
		.icm-list{
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			margin-bottom: 10rpx;
			.icm-name{
				width: 200rpx;
				overflow: hidden;
				text-overflow:ellipsis;
			}
		}
	}
	
</style>
