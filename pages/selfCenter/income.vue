<template>
	<view class="">
		<view class="bg-green padding flex flex-direction justify-center hedersize align-center">
			<view class=" text-xxl">
				<text>余额：</text>
				<text>{{rmb}}</text>
			</view>
			<view class="margin-top-sm">
				<button class="cu-btn bg-white round shadow" @tap="gobalance">提现</button>
			</view>
			
		</view>
		<view class="padding-top-sm padding-bottom-sm ">
			<view class="padding-sm  solids-bottom solids-top">账单</view>
		</view>
		<block v-for="(item,index) in balanceList" :key="index">
			<view class="margin bg-gray radius ">
				<view class="padding ">
					<view class="mabottom">订单号：{{item.payNo}}</view>
				</view>
				<view class="bg-white"></view>
				<view class="padding-left padding-bottom">
					<view class="flex flex-direction">
						<text >金额:￥{{item.rmb/100}}</text>
						<text >支付方式:微信支付</text>
						<text v-if="item.type==1">账单类型:充值</text>
						<text v-if="item.type==2">账单类型:退款</text>
						<text v-if="item.type==3">账单类型:围观分钱</text>
						<text >说明:{{item.cause}}</text>
					</view>
				</view>
			</view>
		</block>
	</view>
		
</template>

<script>
	export default {
		data(){
			return {
				page:0,
				balanceList:[],
				rmb:0.00,
			};
		},
		onLoad() {
			this.loadata();
			this.getBalance();
		},
		onReachBottom() {
			this.loadata()
		},
		methods:{
			getBalance(){
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance,
				{
					token:uni.getStorageSync('token'),
				
				},
				true
					   ).then((res) => {
						  this.rmb=res.obj.rmb;
				})
			},
			loadata(){
				let pages=this.page++ 
				this.xd_request_post(this.xdServerUrls.xd_balanceOrderQuery,
				{
					token:uni.getStorageSync('token'),
					pageNum:pages,
				
				},
				true
					   ).then((res) => {
						   if(res.obj.pages>=pages){
							    this.balanceList=res.obj.list;
						   }else{
							   this.xdUniUtils.xd_showToast('没有更多了')
						   }	   	   
				})
			},
			gobalance(){
				uni.navigateTo({
					url:'balanDrawal'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.hedersize{
		min-height: 250upx;
		max-height: 350upx;
		width: 100%;
	}
	.mabottom{
		border-bottom:5upx solid #FFFFFF ;
	}

</style>
