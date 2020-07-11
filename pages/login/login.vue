<template>
 <view class="bg-white">
	<!-- #ifdef MP-WEIXIN -->
	<view ><!--  -->
		<view class="bg-white">
			<view class='header bg-white' >
				<image src='../../static/images/icon/img/xddak.jpg'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>

			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				授权登录
			</button>
		</view>
	</view>
	<!-- #endif -->
 </view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
export default {
        data() {
            return {
                userInfo:{},
				code:'',
				iv:'',
				// city:'',
				// province:'',
				encryptedData:'',
				userid:'',
				
				
            };
        },
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
        methods: {
			...mapMutations(['logIn'])  ,
			
            //第一授权获取用户信息===》按钮触发
            wxGetUserInfo() {
                let _this = this;
				uni.login({
				   provider: 'weixin',
				   success: function(loginRes) {
					   _this.code=loginRes.code;
						uni.getUserInfo({
							   provider: 'weixin',
							   lang:'zh_CN',
							   success: function(infoRes) {
								     _this.iv=infoRes.iv
									 _this.encryptedData=encodeURIComponent(infoRes.encryptedData);
									 wx.getSetting({
									        success(res) {
												_this.xd_request_post(_this.xdServerUrls.xd_decodeUserInfo,
												{
												code:_this.code,
												encryptedData:_this.encryptedData,
												iv:_this.iv,							
												}, false ).then(res=>{
													_this.userInfo=res.userInfo;
												})
									 		   if(res.authSetting["scope.userInfo"]){
									 				_this.Login();
									 			
									 		   }else{
									 			   _this.isLogin();
									 		   }
									        },
									        fail() {
									         
									        }
									    }) 
							   },
							
						   });
						   },
					   });
            },
			
			isLogin(){
				let _this = this;
				uni.login({
				   provider: 'weixin',
				   success: function(loginRes) {
					   _this.xd_request(_this.xdServerUrls.xd_weiXinLogin,"POST",
					   {
					   userName: _this.userInfo.nickName,
					   userHead: _this.userInfo.avatarUrl,
					   city:_this.userInfo.city,
					   province:_this.userInfo.province,
						sex:_this.userInfo.gender,
					   encryptedData:_this.encryptedData,
					   iv:_this.iv,
					   code:loginRes.code,
					   },
					   {'content-type': 'application/x-www-form-urlencoded'} 
					   
						   ).then(res=>{
											   if(res.resultCode == 0){
												   try{
														 uni.setStorageSync('token',res.obj.token);
														 uni.setStorageSync('id',res.obj.id);
												   }catch(e){
																				   console.log(Error)
												   };
													_this.userid=res.obj.id;
													 _this.getuserInfodata(); 
													 let pages = getCurrentPages()
													 if(pages.length<=1){
													 						  uni.switchTab({
													 						  	url:'../index/index'
													 						  })
													  }else{
													 						   uni.navigateBack({
													 						   	delta:1
													 						   })
													  }
											   }
										 
						}).catch(Error=>{
							console.log(Error)
						})
						}
						}) 
				    
				},
			Login(){
				let _this = this;

				uni.login({
				   provider: 'weixin',
				   success: function(loginRes) {
				   
							_this.xd_request(_this.xdServerUrls.xd_weiXinLogin,"POST",
							{
							encryptedData:_this.encryptedData,
							iv:_this.iv,
							code:loginRes.code
							},
							{'content-type': 'application/x-www-form-urlencoded'} 
							
							    ).then(res=>{
										   if(res.resultCode == 0){
											   try{
													 uni.setStorageSync('token',res.obj.token);
													 uni.setStorageSync('id',res.obj.id);
											   }catch(e){
													 console.log(Error)
											   };
											   _this.userid=res.obj.id;
												 _this.getuserInfodata(); 
												 let pages = getCurrentPages()
												 if(pages.length<=1){
												 						  uni.switchTab({
												 						  	url:'../index/index'
												 						  })
												  }else{
												 						   uni.navigateBack({
												 						   	delta:1
												 						   })
												  }
										   }
												 
								}).catch(Error=>{
									console.log(Error)
								})
				}
				})
				   
				},
				//获取用户信息
				getuserInfodata(){
					let _this = this;
					_this.xd_request_post(_this.xdServerUrls.xd_getUserInfoByUserId,
					{
					userId:	_this.userid	
					}, true ).then(res=>{
						_this.userInfo.nickName=res.obj.userName;
						_this.userInfo.avatarUrl=res.obj.userHead;
						_this.userInfo.province=res.obj.province;
						_this.userInfo.city=res.obj.city;
						_this.userInfo.gender=res.obj.sex?res.obj.sex:'2';
						_this.userInfo.schoolName=res.obj.schoolName?res.obj.schoolName:'无';
						_this.userInfo.userMobile=res.obj.userMobile;
						 _this.logIn(_this.userInfo);
					   })
				}
			
        }
      
    }
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
  .header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
