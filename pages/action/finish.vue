<template>
	<view class="formAction">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="form-item"><input :value="rmb.challengeRmb" type="number" class="digit" name="challengeRmb" placeholder="请输入保障金数额" maxlength="5" /></view>
				<view class="pricelis">
					<view class="priceli" @click="priceRmb(2)"><text>2元</text></view>
					<view class="priceli" @click="priceRmb(6)"><text>6元</text></view>
					<view class="priceli" @click="priceRmb(18)"><text>18元</text></view>
					<view class="priceli" @click="priceRmb(66)"><text>66元</text></view>
					<view class="priceli" @click="priceRmb(188)"><text>188元</text></view>
					<view class="priceli" @click="priceRmb(888)"><text>888元</text></view>
				</view>
			</view>
			<view class="uni-form-item uni-content">
				<text>{{gzsm_wxfk}}</text>
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
				challengeRmb:5,
			},
			formData:{},
			saveData:{},
			pushData:'',
			payNum:0,
			mony:0,
			gzsm_wxfk: this.xdCommon.gzsm_wxfk
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
			
			var that = this;
			if(!that.hasLogin){
				return that.xdUniUtils.xd_login(that.hasLogin);
			}
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
			if(that.rmb.challengeRmb==5 ){
				if( e.detail.value.challengeRmb<0|| isNaN(e.detail.value.challengeRmb)){
					uni.showToast({
					    title: '输入保证金有误',
						mask:true,
					    duration: 2000,
						icon:'none'
					});
					return false
					
				}
				that.saveData=Object.assign(that.formData,e.detail.value,userData);
			}else{
				that.saveData=Object.assign(that.formData,that.rmb,userData);	
			}
			
			if(that.saveData.challengeRmb==0 ||that.saveData.challengeRmb=='' ){
				if(e.detail.value.challengeRmb==''||e.detail.value.challengeRmb<=0){
					that.saveData.challengeRmb=0;
					console.log('formSubmit------33333 that.saveData',that.saveData);
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
								title: res,
								icon: 'none',
								duration: 3000,
								success:function(){
								
									return false;
								}
							});
							
						}
					})
				}else{
					that.mony=that.saveData.challengeRmb*100;
					//that.saveData.challengeRmb=0;
					
						that.getPushId();		  		
				}
			}
			else{
				that.mony=that.saveData.challengeRmb*100;
				//that.saveData.challengeRmb=0;
				
				that.getPushId();		
			
			}		
		},
		updataPushId(){
			console.log('updataPushId------');
			//取消支付调用修改金额为0
			var that=this;
			that.xd_request_post(that.xdServerUrls.xd_updatePushDataByPushId,{
				id:that.pushData.obj.id,
				challengeRmb:0,
			}
			,true).then( res=>{
				
			})
		},
		getPushId(){
			
			var that=this;
			that.saveData.challengeRmb=that.saveData.challengeRmb*100;
			console.log('getPushId----------',that.saveData);
			this.xd_request_post(this.xdServerUrls.xd_savePush,this.saveData,true).then( res=>{
				console.log('xd_request_post----------',res);
				
				if(res.resultCode==0){
					this.pushData=res;
					if(res.obj.payWay != 1){
						this.goPay();
					}else{
						uni.showToast({
							title: '发布成功',
							icon: 'success',
							duration: 2000,
							success:function(){
								//that.updataPushId();
								uni.setStorageSync('pushData','' );
								uni.reLaunch({
									url: '../index/action/action?pushId='+res.obj.id
								})
							}
						});
					}
					
					
				}else{
					uni.showToast({
						title: res.status,
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
			// data.city=userInfo.city;
			// data.userName=userInfo.nickName;
			// data.province=userInfo.province;
			data.unionId=userInfo.unionId;
			data.openid=userInfo.openId;
			data.payRmb=that.mony;
			data.pushId=that.pushData.obj.id;
			wx.getSetting({
			  success: res => {
				  console.log('wx.getSetting----',res,data);
				  
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
										//that.updataPushId();
										uni.setStorageSync('pushData','' );
										uni.reLaunch({
											url: '../index/action/action?pushId='+that.pushData.obj.id
										})
									}
								});
							},
							fail: function (err) {
								// 支付失败的回调中 用户未付款
								that.updataPushId();
								uni.showModal({
									content:'支付取消',
									confirmText:'重新填写',
									cancelText:'回到首页',
									image:'/static/images/icon/clock.png',
									success:function(ress) {
										 if (ress.confirm) {
											 uni.setStorageSync('pushData',that.pushData.obj );
											
											 uni.reLaunch({
												url: 'step1'
												  })
														}else if (ress.cancel) {
										
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
