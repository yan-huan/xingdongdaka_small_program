<template>
	<view class="selfCenter">
		<!-- <button @click="clickMe">支付</button> -->
		<view class="personContent">
			<view class="personHead" @click="goPage('/pages/selfCenter/editUserInfo')">
				<img :src="userInfo.avatarUrl" alt="" class="imgHead">
			</view>
			<view class="personInfo"  @click="goPage('/pages/selfCenter/editUserInfo')">
				<view class="xd-list-title-text name moreInfo">
					<text>{{userInfo.nickName}}</text>
					<text v-if="userInfo.gender==1" class="boy">♂</text>
					<text v-else-if="userInfo.gender==2" class="boy">♀</text>
					<text v-else class="boy">密</text>
					<text>{{userInfo.schoolName == null ? '': userInfo.schoolName}}</text>
				</view>
				<view class="moreInfoIn">
					<text>{{userInfo.province}}.{{userInfo.city}}</text>
				</view>
				<view class="subInfo">
					<text></text>
				</view>
			</view>
			<view class="personOpt">
				<!-- <text class="viewself link"  @click="goPage('/pages/selfCenter/selfView')">个人主页</text> -->
				<button @click="clickMe" class="pay" v-if="onOff">支付</button>
			</view>
		</view>
		<view class="moreInfo">
			<view class="moreInfoRow">
				
				<view class="moreInfoIn" >
					<text>关注  1</text>
					<text class="moreInfoIn_text">粉丝  0</text>
				</view>
				
				<!-- <view class="moreInfoIn">
					<text>  &nbsp;</text>
				</view> -->
			</view>
			
			<view class="moreInfoRow2">
				<view class='user_column_item' bindtap='goFeedback'>
				      <view class='user_column_item_text'><image class='user_column_item_image' src='/static/images/icon/feedback.png'></image><text class="thin">意见反馈</text></view>
				    </view>
				    <view class='user_column_item'>
				      <button class="cu-btn bg-white" open-type="contact" ><image class='user_column_item_image' src='/static/images/icon/customer.png'></image><text class="thin">联系客服</text></button>
				    </view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	// import actionlist from "./selfCenterList.vue"
	// import actionlist from "@/components/actionlist.vue"
	export default {
		data() {
			return {
				tab:0,//行动，围观，收藏
				list:[1,2,3,4,5],
				userInfo:'',
				onOff:true,
			}
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       }, 
	   onShow() {
		if(this.userInfo==''||this.userInfo==undefined||this.userInfo==null){
			try{	
				this.userInfo=uni.getStorageSync('userInfo')
			}catch(e){
								   console.log(Error)
							   };
			
		}
	   },
	   
		onLoad() {
			if(!this.hasLogin){
				uni.redirectTo({
					url: '../login/login' 
				});
				return false;
			};
			try{
				
				this.userInfo=uni.getStorageSync('userInfo')
				
			}catch(e){
								   console.log(Error)
							   };
							   this.onToOff();
		},
		methods: {
			...mapMutations(['logOut'])  ,
			onToOff(){
				
				this.xd_request_post(this.xdServerUrls.xd_onOff,
				{
					versionCode:'2',
					
				},true).then(res=>{	
					this.onOff=res.obj
					})
			},
			goPage(url){
				uni.navigateTo({
					url
				});
			},
			
			clickMe: function () {
				let that=this;	
						
			              wx.getSetting({
			                success: res => {
								
			                  if (res.authSetting['scope.userInfo']) {
			                    that.xd_request_post(that.xdServerUrls.xd_pay,
								{
									unionId:that.userInfo.unionId,
									openid:that.userInfo.openId,
									userName:that.userInfo.nickName,
									id:uni.getStorageSync('id'),
									token:uni.getStorageSync('token'),
									userHead:that.userInfo.avatarUrl,
									city:that.userInfo.city,
									province:that.userInfo.province,
									payRmb:1,
									pushId:1,
									
								},true).then(res=>{	
									
			                    	uni.requestPayment({
			                    		 'appId': res.obj.appId,
			                    		'timeStamp': res.obj.timeStamp,
			                    		'nonceStr': res.obj.nonceStr,
			                    		'package': res.obj.packageAlias,
			                    		'signType': 'MD5',
			                    		'paySign': res.obj.paySign,
			                    		success: function (res) {
			                    			that.xd_request_post(that.xdServerUrls.xd_resultCallBack,{},false).then( res=>{
			                    			})
			                    			uni.showToast({
			                    				title: '微信支付成功',
			                    				icon: 'success',
			                    				duration: 1500
			                    			});
			                    			uni.reLaunch({
			                    				url: '../index/index'
			                    			})
			                    		},
			                    		fail: function (err) {
			                    			// 支付失败的回调中 用户未付款
			                    			uni.showModal({
			                    				content:'支付取消',
			                    				confirmText:'继续支付',
			                    				cancelText:'返回首页',
			                    				image:'/static/images/icon/clock.png',
			                    				success:function(res) {
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
			
			                      }else{
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

<style  lang="scss">
	.selfCenter{
		/* padding:10rpx 30rpx 30rpx; */
	}
	.viewself{
		font-size: 26rpx;
		margin-right: 24rpx;
	}
	.link{
		color:$xd-color-base;
	}
.personContent{
	/* padding:12rpx 0; */
	padding: 10rpx 30rpx 30rpx;
	background-color: rgb(235, 244, 255);
	display: flex;
	justify-content: flex-start;
	.personHead{
		padding: 6rpx;
		.imgHead{
			height: 104rpx;
			width: 104rpx;
			display: inline-block;
			border-radius: 100%;
		}
	}
	.personInfo{
		margin:0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.subInfo{
			font-size: 24rpx;
			color:#888;
		}
	}
	.personOpt{
		flex: 1;
		display: flex;
		justify-content: flex-end;
		padding:0;
		.pay{
			display: block;
			font-size: 26rpx;
			height: 66rpx;
			background: $xd-color-base;
			width:200rpx;
			margin:0;
		}
	}
}
.moreInfo{
	padding:6rpx 0;
	/* border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #d9d9d9; */
	font-size: 26rpx;
	.user_column_item_image{
		width: 30rpx;
		height: 30rpx;
	}
    

	.gender{
		background:#fd5107;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
		// height: 24rpx;
		// line-height: 24rpx;
	}
	.boy{
		background:#66CCFF;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin: 0 14rpx;
	}
	.user_column_item{
		background-color: #d7d7d7;
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 20px;
		margin: 10rpx 0;

	}
	.user_column_item .cu-btn{
		background-color: #d7d7d7;
		padding: 0;
	}
	.user_column_item .thin{
		padding: 0 16rpx;
	}
	.user_column_item .user_column_item_image{
		background-color: rgb(255, 98, 0);
		vertical-align: middle;
	}
	.moreInfoRow{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin:0 0 14rpx 0;
		&.rowaction{
			margin-top:18rpx;
		}
		.moreInfoIn{
			width: 100%;
			overflow: hidden;
			
			margin:0;
			&.flex1{
				flex: 1;
			}
			padding: 0;
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			background-color: rgb(235, 244, 255);
			border-bottom: 1px solid #d9d9d9;
			border-top: 1px solid #d9d9d9;
		}
		.moreInfoIn_text{
			margin-left: 300rpx;
		}
		.moreInfoIn .thin{
		padding: 0 16rpx;
		}
	}
}
.actionInfo{
	margin:24rpx 0;
	.tabbar{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
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


</style>
