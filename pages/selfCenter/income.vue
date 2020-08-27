<template>
	<view class="">
		<view class="bg-green padding flex flex-direction justify-center hedersize align-center">
			<view class=" text-xxl">
				<text>余额：</text>
				<text>{{rmb}}</text>
				<text>元</text>
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
						<text >日期:{{xdUniUtils.xd_timestampToTime(item.createTime,false,true,false) }}</text>
						<text >金额:￥{{item.rmb/100}}</text>
						<text v-if="item.type==101">交易方式:余额支付</text>
						<text v-if="item.type==102">交易方式:余额支付</text>
						<text v-if="item.type==103">交易方式:余额收入</text>
						<text v-if="item.type==104">交易方式:微信支付</text>
						<text v-if="item.type==105">交易方式:余额支付</text>
						<text v-if="item.type==106">交易方式:余额支付</text>
						<text v-if="item.type==107">交易方式:余额提现</text>
						<text v-if="item.type==000">交易方式:微信支付</text>
						<text class="text-blue" v-if="item.type==103" @tap="gopush(item.pushId)">说明:{{item.cause}}</text>
						<text  v-else >说明:{{item.cause}}</text>
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
				//page:0,
				balanceList:[],
				rmb:0.00,
				nextPage:1,//当前页数
				pageSize:10,//每页条数
			};
		},
		onLoad() {
			this.loadata();
			this.getBalance();
			this.burieUpdate();//查看埋点数据后删除
		},
		onReachBottom() {
			this.loadata()
		},
		methods:{
			gopush(e){
				uni.navigateTo({
					url:'../index/action/action?pushId='+e
				})
			},
			burieUpdate(){
				this.xd_request_post(this.xdServerUrls.xd_updateBurieStatistics,
				{
					type: 2
				},true).then((res) => {
					
				})
				
			},
			getBalance(){
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance,
				{
					token:uni.getStorageSync('token'),
				
				},true).then((res) => {
					if(typeof res.obj.rmb !== undefined){
						this.rmb=res.obj.rmb/100;
					}
				})
			},
			loadata(){
				//let pages=this.page++ 
				this.xd_request_post(this.xdServerUrls.xd_balanceOrderQuery,
				{
					token:uni.getStorageSync('token'),
					pageNum:1,
					pageSize:10,
				},true).then((res) => {
					this.nextPage=res.obj.nextPage;
					this.balanceList=res.obj.list; 	   
				})
			},
			gobalance(){
				uni.navigateTo({
					url:'balanDrawal'
				})
			},
			getReachList(){
				if(this.nextPage==0){
					uni.showLoading(
					{
						title: '没有更多数据了'
					})
					setTimeout(function () {
						uni.hideLoading();
					}, 1000);
					return false
				}
				uni.showLoading(
				{
					title: '加载中..',
					mask:true
				})
				this.xd_request_post(this.xdServerUrls.xd_balanceOrderQuery,
				{
					token:uni.getStorageSync('token'),
					pageNum:this.nextPage,
					pageSize:this.pageSize,
				},false).then(res=>{
					this.nextPage=res.obj.nextPage;
					this.balanceList=this.balanceList.concat(res.obj.list);
					setTimeout(function () {
						uni.hideLoading()
					}, 1000);
						
				})	
			}
			
		},
		onReachBottom() {
			this.getReachList()
		},
		onPullDownRefresh() {
			this.loadata();
			uni.stopPullDownRefresh()
		},
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
