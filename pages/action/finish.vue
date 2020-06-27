<template>
	<view class="formAction">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="form-item"><input :value="rmb.challengeRmb" type="number" class="digit" name="challengeRmb" placeholder="请输入保障金数额" maxlength="5" /></view>
				<view class="pricelis">
					<view class="priceli" @click="priceRmb(1)"><text>1元</text></view>
					<view class="priceli" @click="priceRmb(6)"><text>6元</text></view>
					<view class="priceli" @click="priceRmb(18)"><text>18元</text></view>
					<view class="priceli" @click="priceRmb(66)"><text>66元</text></view>
					<view class="priceli" @click="priceRmb(188)"><text>188元</text></view>
					<view class="priceli" @click="priceRmb(888)"><text>888元</text></view>
				</view>
			</view>
			<view class="uni-form-item uni-content">
				<text>说明：目标达成则原额退回。否则将全部扣除，分配30%给平台；剩余的70%平均分配给有效围观者，或在24小时内进行自定义特别感谢。</text>
			</view>
			<!--  #ifdef  MP-WEIXIN -->
			<view class="btn_bar">
				<button class="bg-orange " form-type="submit">提交</button>
			</view>
			<!--  #endif -->
		</form>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
export default {
	data() {
		return {
			rmb:{
				challengeRmb:'',
			},
			formData:{},
			saveData:{},
			pushData:'',
			payNum:0,
			j:0,
				
			
		};
	},
	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onLoad(option) {
		
		this.formData= JSON.parse(decodeURIComponent(option.data));
		
	},
	methods: {
		...mapMutations(['logOut'])  ,
		timeType(res){
			var data=res.obj;
			var  time=this.xdUniUtils.xd_timestampToTime(data.createTime);
			    data.createTime=time;
				data.challengeRmb=Math.trunc(data.challengeRmb/100);
				return data;
		},
		formSubmit(e) {
			if(!this.hasLogin){
				uni.navigateTo({
					url: '../login/login' 
				});
				return false;
			}
			var that = this;
			
			let userData={
				token:'',
				userId:'',
			}
			try{
				userData.token=uni.getStorageSync('token');
				userData.userId=uni.getStorageSync('id');
			}catch(e){
				//TODO handle the exception
			}
			if(that.rmb.challengeRmb!=''){
				that.saveData=Object.assign(that.formData,that.rmb,userData);	
			}else{
				that.saveData=Object.assign(that.formData,e.detail.value,userData);
				
			};
			if(that.rmb.challengeRmb==''){
				if(e.detail.value.challengeRmb==''||e.detail.value.challengeRmb<=0){
					that.saveData.challengeRmb=0;
					that.xd_request_post(that.xdServerUrls.xd_savePush,that.saveData,true).then( res=>{
						if(res.resultCode==0){
							uni.showToast({
								title: '发布成功',
								icon: 'success',
								duration: 2000,
								success:function(){
									 uni.setStorageSync('pushData','' );
									uni.reLaunch({
										url: '../index/action/action?pushId='+res.obj.id
										})
								}
							});
								
						}else{
							
							uni.showToast({
								title: res.obj,
								icon: 'none',
								duration: 3000,
								success:function(){
								
									return false;
								}
							});
							
						}
					})
				}else{
					that.saveData.challengeRmb=that.saveData.challengeRmb*100;
					
						that.getPushId();		  		
				}
			}
			else{
				that.saveData.challengeRmb=that.saveData.challengeRmb*100;
				
					that.getPushId();		
			
			}		
		},
		updataPushId(){
			var that=this;
			if( that.j>3){
				return false
			}
			that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId,{pushid:that.pushData.obj.id}
			,true).then( res=>{
				if(res.resultCode==0){
					that.saveData.challengeRmb=0;
				}else{
					that.j++;
					that.updataPushId();
				}		 	
			})
		},
		getPushId(){
			console.log(this.saveData)
			this.xd_request_post(this.xdServerUrls.xd_savePush,this.saveData,true).then( res=>{
				if(res.resultCode==0){
					this.pushData=res;
					this.goPay();
					
				}else{
					
					uni.showToast({
						title: res.obj,
						icon: 'none',
						duration: 3000,
						success:function(){
							return false;
						}
					});
					
				}
				
			})
		},
		priceRmb(e){	
			this.rmb.challengeRmb=e
			this.formSubmit();
		},
		//#ifdef MP-WEIXIN
		goPay(){
			var that = this;
			var data={
				id:'',
				userName:'',
				// userMobile:''
				token:'',
				unionId:'',
				openid:'',
				city:'',
				province:'',
				payRmb:'',
				pushId:'',
			};
			let userInfo={};
			try{
				userInfo=uni.getStorageSync('userInfo');
				
			}catch(e){
				//TODO handle the exception
			};
			data.id=that.saveData.userId;
			data.token=that.saveData.token;
			data.city=userInfo.city;
			data.userName=userInfo.nickName;
			data.province=userInfo.province;
			data.unionId=userInfo.unionId;
			data.openid=userInfo.openId;
			data.payRmb=that.saveData.challengeRmb
			data.pushId=that.pushData.obj.id;
			wx.getSetting({
			  success: res => {
			    if (res.authSetting['scope.userInfo']) {
					that.xd_request_post(that.xdServerUrls.xd_pay,data,false).then(res=>{
						uni.requestPayment({
							 'appId': res.obj.appId,
							'timeStamp': res.obj.timeStamp,
							'nonceStr': res.obj.nonceStr,
							'package': res.obj.packageAlias,
							'signType': 'MD5',
							'paySign': res.obj.paySign,
							success: function (re) {
								uni.showToast({
									title: '发布成功',
									icon: 'success',
									duration: 2000,
									success:function(){
										uni.setStorageSync('pushData','' );
										uni.reLaunch({
											url: '../index/action/action?pushId='+that.pushData.obj.id
										})
									}
								});
							},
							fail: function (err) {
								// 支付失败的回调中 用户未付款
								uni.showModal({
									content:'支付取消',
									confirmText:'重新填写',
									cancelText:'回到首页',
									image:'/static/images/icon/clock.png',
									success:function(ress) {
										 if (ress.confirm) {
											 uni.setStorageSync('pushData',that.pushData.obj );
											 that.updataPushId();
											 uni.reLaunch({
												url: 'step1'
												  })
														}else if (ress.cancel) {
											that.updataPushId();				
											uni.setStorageSync('pushData',that.pushData.obj );
											uni.reLaunch({
												url: '../index/index'
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
		//#endif
		}
	},
	
};
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #FFFFFF;
	}
.formAction {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		&:not(.nobtm) {
			border: 1px solid #ffa700;
		}
		margin-top: 50upx;
		height: 68rpx;
		line-height: 68rpx;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		.radio {
			margin-right: 20rpx;
		}
		.digit{
			height: 100%;
		}
	}
	
}
.btn_bar {
	position: absolute;
	bottom: 0;
	width: 92%;
	margin-bottom: 10upx;
}
.pricelis {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.priceli {
		width: 190rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 35rpx;
		text-align: center;
		border: 1px solid $xd-color-base;
	}
}
.sb-box {
	display: flex;
	height: 65rpx;
	line-height: 65rpx;
	border: 1px solid $xd-color-base;
	border-radius: 5px;
	overflow: hidden;
	position: relative;
	.select {
		flex: 1;
		.sb-input {
			padding: 0 20rpx;
			color: #666;
		}
	}
	.sb-icon {
		position: absolute;
		height: 65rpx;
		right: 0;
		z-index: -1;
		background: $xd-color-base;
		width: 55rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.triangle {
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 10rpx solid #fff;
		}
	}
}
.uni-content{
	margin-top:50rpx;
	color:#888;
	font-size: 26rpx;
	line-height: 45rpx;
}
</style>
