<template>
	<view class="selfCenter ">	
		<usershow  :list="userInfos" :userId="id" :guanzhu="guanzhu" :looktotals="looktotals"  :lookerCount="lookerCount" :likeCount="likeCount" v-on:clidtags='clidtags' :num="num" v-on:clickMe="clickMe"></usershow>
		<view class="moreInfo">
			<view class="moreInfoRow2">
				<view class="user_column_item">
					<button class='content cu-btn' @tap="gomoney">
					      <text class="lg text-gray cuIcon-moneybag"></text>
					      <text class='thin'>钱包</text>
						  <text class="lg text-orange cuIcon-pay margin-left-lg">{{rmb}}元</text>
						  <view class="cu-tag  tag-text1 bg-red" v-if="wg_num>0&&wg_num<100">{{wg_num}}</view>
						  <view class="cu-tag  tag-text1 bg-red" v-if="wg_num>=100">99+</view>
				     </button>
				</view>
				<view class="user_column_item">
				    <button class='content cu-btn' open-type="feedback">
				      <text class="lg text-gray cuIcon-question"></text>
				      <text class='thin'>问题反馈</text>
				    </button>
				</view>
				<view class='user_column_item'>
					<button class="content cu-btn" open-type="contact">
						<view class="text-lg">
							<text class="lg text-gray cuIcon-service"></text>
						</view>
						<text class="thin">联系客服</text>
					</button>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	import usershow from "@/components/usershow.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		components:{
			usershow
			
		},
		data() {
			return {
				tab: 0, //行动，围观，收藏
				// list: [1, 2, 3, 4, 5],
				userInfos:'',
				looktotals:0,
				lookerCount: 0,
				likeCount: 0,
				num:0, //关注新增数量
				wg_num:0, //围观分钱新增数量
				// onOff: true,
				// env:uni.getStorageSync('env'),
				rmb:0.00,
				id:uni.getStorageSync('id'),
				userId:'',
				guanzhu:''
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShow() {
			
			if(!this.hasLogin){
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			if (this.userInfos == '' || this.userInfos == undefined || this.userInfos == null) {
				try {
					this.userInfos = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};

			}
			this.getBalance();
			this.lookerCountData();
			this.burieInit();
			this.getShowFollow();
		},

		onLoad() {
			if(!this.hasLogin){
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			this.onToOff();
			
		},
		watch: {
			userInfo() {
				this.userInfos= '';
				setTimeout(() => {
					this.userInfos=this.xdUniUtils.xd_getStorageSync('userInfo');
				}, 100);
			},
		},
		methods: {
			...mapMutations(['logOut']),
			async getBalance(){
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance,
				{
					token:uni.getStorageSync('token'),
				},true).then((res) => {
					if(typeof res.obj.rmb !== undefined){
						this.rmb=res.obj.rmb/100;
					}
				})
			},
			getShowFollow(){
				this.xd_request_post(this.xdServerUrls.xd_getInviteList,
				{
					token:uni.getStorageSync('token'),
				
				},
				true
					   ).then((res) => {
						   this.looktotals=res.obj.total;
					   }).catch(err => {											
				                           });
				
				
			},
			burieInit(){
				this.xd_request_post(this.xdServerUrls.xd_selectBurieStatistics,
				{
				},true).then((res) => {
					if (res.resultCode == 0) {
						let gz_num = res.obj.gzCount;
						let wg_num = res.obj.wgCount;
						this.num = gz_num;
						this.wg_num = wg_num;
						let num = gz_num+wg_num;
						this.xdUniUtils.updateNumber(0);
					}
				})
				
			},
			onToOff() {
				const accountInfo = wx.getAccountInfoSync();
				// env类型
				const env = accountInfo.miniProgram.envVersion;		

				this.onOff = (env != 'release' ? true : false)
				
			},
			gomoney(){
				
				uni.navigateTo({
					url:'./income'
				});
			},
			goPage(url) {
				uni.navigateTo({
					url
				});
			},
		   lookerCountData: function(list) {
				var that = this;
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.userId = uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_getLookerCountByUserId, {
					userId: that.userId
				}, false).then(res => {

					if (res.resultCode == 0) {
						
						that.lookerCount = res.obj.lookerCount
						that.likeCount = res.obj.likeCount
					} else {
						console.log(res)
					}
				})
			},
			clickMe: function() {
				let that = this;

				wx.getSetting({
					success: res => {

						if (res.authSetting['scope.userInfo']) {
							that.xd_request_post(that.xdServerUrls.xd_pay, {
								unionId: that.userInfos.unionId,
								openid: that.userInfos.openId,
								userName: that.userInfos.nickName,
								id: uni.getStorageSync('id'),
								token: uni.getStorageSync('token'),
								userHead: that.userInfos.avatarUrl,
								city: that.userInfos.city,
								province: that.userInfos.province,
								payRmb: 1,
								pushId: 1,

							}, true).then(res => {

								uni.requestPayment({
									'appId': res.obj.appId,
									'timeStamp': res.obj.timeStamp,
									'nonceStr': res.obj.nonceStr,
									'package': res.obj.packageAlias,
									'signType': 'MD5',
									'paySign': res.obj.paySign,
									success: function(res) {
										that.xd_request_post(that.xdServerUrls.xd_resultCallBack, {}, false).then(res => {})
										uni.showToast({
											title: '微信支付成功',
											icon: 'success',
											duration: 1500
										});
										uni.reLaunch({
											url: '../index/index'
										})
									},
									fail: function(err) {
										// 支付失败的回调中 用户未付款
										uni.showModal({
											content: '支付取消',
											confirmText: '继续支付',
											cancelText: '返回首页',
											image: '/static/images/icon/clock.png',
											success: function(res) {
												if (res.confirm) {
													return false
												} else if (res.cancel) {
													uni.reLaunch({
														url: '../index/index',
													})
												}
											},

										});
									}
								});
							})

						} else {
							this.logOut();
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				})


			},
		},
		// components:{
		// 	actionlist
		// }
	}
</script>

<style lang="scss">
	.selfCenter {
		padding:10rpx 20rpx 20rpx;
	}
	.moreInfo {
		padding: 6rpx 0;
		font-size: 26rpx;


		.user_column_item {
			background-color: #e2e2e2;
			height: 80rpx;
			line-height: 80rpx;
			padding-left: 20px;
			margin: 10rpx 0;

		}
		.user_column_item .cu-btn {
			background-color: #e2e2e2;
			padding: 0;
		}

		.user_column_item .thin {
			padding: 0 16rpx;
		}
		.tag-text1{
			border-radius: 200rpx;
			font-size: 20rpx;
			padding: 0rpx 10rpx;
			height: 28rpx;
			color: #ffffff;
			margin-bottom: 14rpx;
		}
	}

	.actionInfo {
		margin: 24rpx 0;

		.tabbar {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;

			.tab {
				flex: 1;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;
				padding: 16rpx;

				&.active {
					border-bottom: 1px solid #fd5107;
					color: #fd5107;
				}
			}
		}
	}
</style>
