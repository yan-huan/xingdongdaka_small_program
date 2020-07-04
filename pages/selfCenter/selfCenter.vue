<template>
	<view class="selfCenter padding">
		<view class="personContent">
			<view class="personHead" @click="goPage('/pages/selfCenter/editUserInfo')">
				<img :src="userInfo.avatarUrl" alt="" class="imgHead">
			</view>
			<view class="personInfo" @click="goPage('/pages/selfCenter/editUserInfo')">
				<view class="xd-list-title-text name moreInfo">
					<text>{{userInfo.nickName}}</text>
					<text v-if="userInfo.gender==1" class="boy">♂</text>
					<text v-else-if="userInfo.gender==2" class="boy">♀</text>
					<text v-else class="boy">密</text>
					<text>{{userInfo.schoolName == null ? '': userInfo.schoolName}}</text>
				</view>
				<view class="moreInfoIn">
					<image class='address' src="/static/images/icon/address.png"></image>
					<text class="province">{{userInfo.province}}.{{userInfo.city}}</text>
				</view>
				<view class="subInfo">
					<text></text>
				</view>
			</view>
			<view class="personOpt">
				<button @click="clickMe" class="pay" v-if="env!='release'">支付</button>
			</view>
		</view>
		<view class="moreInfo">
			<view class="moreInfoRow">

				<view class="moreInfoIn">
					<text @click="goPage('/pages/selfCenter/myattention')">关注 {{lookerCount}}</text>
					<text class="moreInfoIn_text" @click="goPage('/pages/selfCenter/myfans')">粉丝 {{likeCount}}</text>
				</view>

				<!-- <view class="moreInfoIn">
					<text>  &nbsp;</text>
				</view> -->
			</view>

			<view class="moreInfoRow2">
				
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// import actionlist from "./selfCenterList.vue"
	// import actionlist from "@/components/actionlist.vue"
	export default {
		data() {
			return {
				tab: 0, //行动，围观，收藏
				list: [1, 2, 3, 4, 5],
				userInfo: '',
				lookerCount: 0,
				likeCount: 0,
				onOff: true,
				env:uni.getStorageSync('env'),
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onShow() {
			if (this.userInfo == '' || this.userInfo == undefined || this.userInfo == null) {
				try {
					this.userInfo = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};

			}
		},

		onLoad() {
			if (!this.hasLogin) {
				uni.redirectTo({
					url: '../login/login'
				});
				return false;
			};
			try {

				this.userInfo = uni.getStorageSync('userInfo')

			} catch (e) {
				console.log(Error)
			};
			this.onToOff();
			this.lookerCountData();
		},
		methods: {
			...mapMutations(['logOut']),
			onToOff() {
				const accountInfo = wx.getAccountInfoSync();
				// env类型
				const env = accountInfo.miniProgram.envVersion;		

				this.onOff = (env != 'release' ? true : false)
				/* this.xd_request_post(this.xdServerUrls.xd_onOff, {
					versionCode: '2',

				}, true).then(res => {
					this.onOff = res.obj
				}) */
			},
			goPage(url) {
				uni.navigateTo({
					url
				});
			},
			lookerCountData: function(list) {
				var that = this;
				if (!that.hasLogin) {
					uni.navigateTo({
						url: '../login/login'
					});
					return false;
				}
				that.userId = uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_getLookerCountByUserId, {
					userId: that.userId
				}, false).then(res => {

					if (res.resultCode == 0) {
						console.log(res)
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
								unionId: that.userInfo.unionId,
								openid: that.userInfo.openId,
								userName: that.userInfo.nickName,
								id: uni.getStorageSync('id'),
								token: uni.getStorageSync('token'),
								userHead: that.userInfo.avatarUrl,
								city: that.userInfo.city,
								province: that.userInfo.province,
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
		/* padding:10rpx 30rpx 30rpx; */
	}

	.viewself {
		font-size: 26rpx;
		margin-right: 24rpx;
	}

	.link {
		color: $xd-color-base;
	}

	.personContent {
		/* padding:12rpx 0; */
		padding: 10rpx 30rpx 30rpx;
		background-color: rgb(235, 244, 255);
		display: flex;
		justify-content: flex-start;

		.personHead {
			padding: 6rpx;

			.imgHead {
				height: 104rpx;
				width: 104rpx;
				display: inline-block;
				border-radius: 100%;
			}
		}

		.personInfo {
			margin: 0 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.subInfo {
				font-size: 24rpx;
				color: #888;
			}
		}

		.personOpt {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			padding: 0;

			.pay {
				display: block;
				font-size: 26rpx;
				height: 66rpx;
				background: $xd-color-base;
				width: 200rpx;
				margin: 0;
			}
		}
	}

	.moreInfoIn {
		.address {
			width: 30rpx;
			height: 30rpx;
		}

		.province {
			font-size: 28rpx;
			margin-left: 6rpx;
		}
	}

	.moreInfo {
		padding: 6rpx 0;
		/* border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #d9d9d9; */
		font-size: 26rpx;

		.user_column_item_image {
			width: 30rpx;
			height: 30rpx;
		}

		.gender {
			background: #fd5107;
			color: #fff;
			display: inline-block;
			padding: 0 6rpx;
			border-radius: 100%;
			font-size: 22rpx;
			margin-right: 2rpx;
			// height: 24rpx;
			// line-height: 24rpx;
		}

		.boy {
			background: #66CCFF;
			color: #fff;
			display: inline-block;
			padding: 0 6rpx;
			border-radius: 100%;
			font-size: 22rpx;
			margin: 0 14rpx;
		}

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

		.user_column_item .user_column_item_image {
			background-color: rgb(255, 98, 0);
			vertical-align: middle;
		}

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
