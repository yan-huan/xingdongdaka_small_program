<template>
	<view class="feedback">
		<picker @change="bindPickerChange" value="{{index}}" range="{{array}}">
			<view class="picker">
				<view class="fb-type">
					<view class="type-label">{{array[index]}}</view>
				</view>
			</view>
		</picker>
		<view class="fb-body">
			<textarea class="content" placeholder="对我们网站、服务，你还有什么建议吗？请告诉我们..." @input="contentInput" maxlength="500" auto-focus="true"
			 value="{{content}}" />
			<view class="weui-uploader__files" id="uploaderFiles">
      <block wx:for="{{files}}" wx:key="*this">
        <view class="weui-uploader__file" @tap="previewImage" id="{{item}}">
          <image class="weui-uploader__img" src="{{item}}" mode="aspectFill" />
        </view>
      </block>
      <view class="weui-uploader__input-box" wx:if="{{ files.length < 5 }}">
        <view class="weui-uploader__input" @tap="chooseImage"></view>
      </view>
    </view>
    <view class="text-count">{{contentLength}}/500</view>
  </view>
  <view class="fb-mobile">
    <view class="label">手机号码(选填)</view>
    <view class="mobile-box">
      <input class="mobile" maxlength="11" type="number" placeholder="方便我们与你联系" @input="mobileInput" value="{{mobile}}" />
      <image class="clear-icon" src="/static/images/icon/clear_input.png" wx:if="{{ mobile.length > 0 }}" catchtap="clearMobile"></image>
    </view>
  </view>

  <view class="fb-btn" @tap="submitFeedback">提交</view>
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
				array: ['请选择反馈类型', '商品相关', '功能异常', '优化建议', '其他'],
				index: 0,
				contentLength: 0,
				content: '',
				mobile:'',
				userInfo: '',
				onOff: true,
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
			
		},
		methods: {
			...mapMutations(['logOut']),
			
			goPage(url) {
				uni.navigateTo({
					url
				});
			},
			contentInput: function(e) {
				this.contentLength = e.target.value.length,
				this.content = e.target.value
			},
			mobileInput: function(e) {
				this.mobile = e.target.value
			},
			bindPickerChange: function(e) {
			    this.index = e.detail.value
			},
			isValidPhone(str) {
			  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			  return myreg.test(str)
			},
			submitFeedback: function(e) {
			  var that = this;
			  if (!that.hasLogin) {
			  	uni.navigateTo({
			  		url: '../login/login'
			  	});
			  	return false;
			  }
			  that.userId = uni.getStorageSync('id');
			   if (that.index == 0) {
					uni.showToast({
					    title: '请选择反馈类型',
						mask:true,
					    duration: 2000,
						image:'/static/images/icon/clock.png'
					});
					return false
			  } 
			
			  if (that.content == '') {
				  uni.showToast({
				      title: '请输入反馈内容',
					  mask:true,
				      duration: 2000,
				  	  image:'/static/images/icon/clock.png'
				  });
			    return false
			  }
			
			  if (that.mobile == '') {
			   // util.showErrorToast('请输入手机号码');
			    //return false;
			  }
				
			  if (that.mobile != '' && !that.isValidPhone(that.mobile)) {
				 uni.showToast({
				     title: '手机号码不正确',
				 	 mask:true,
				     duration: 2000,
				 	 image:'/static/images/icon/clock.png'
				 });
			    return false
			  }
				uni.showToast({
			      title: '提交成功',
			  	  mask:true,
			      duration: 2000,
			  	  icon: 'success'
			  });
			},
		},
		// components:{
		// 	actionlist
		// }
	}
</script>

<style lang="scss">
	page {
	  background: #f4f4f4;
	  min-height: 100%;
	}
	
	.feedback {
	  background: #f4f4f4;
	  min-height: 100%;
	  padding-top: 30rpx;
	}
	
	.fb-type {
	  height: 104rpx;
	  width: 100%;
	  background: #fff;
	  margin-bottom: 20rpx;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  padding-left: 30rpx;
	  padding-right: 30rpx;
	}
	
	.fb-type .type-label {
	  height: 36rpx;
	  flex: 1;
	  color: #333;
	  font-size: 28rpx;
	}
	
	.fb-type .type-icon {
	  height: 36rpx;
	  width: 36rpx;
	}
	
	.fb-body {
	  width: 100%;
	  background: #fff;
	  height: 600rpx;
	  padding: 18rpx 30rpx 64rpx 30rpx;
	}
	
	.fb-body .content {
	  padding-left:5rpx;
	  width: 100%;
	  height: 400rpx;
	  color: #333;
	  line-height: 40rpx;
	  font-size: 28rpx;
	}
	
	
	.fb-body .text-count {
	  line-height: 30rpx;
	  float: right;
	  color: #666;
	  font-size: 24rpx;
	}
	
	.fb-mobile {
	  padding-left:5rpx;
	  height: 162rpx;
	  width: 100%;
	}
	
	.fb-mobile .label {
	  height: 58rpx;
	  width: 100%;
	  padding-top: 14rpx;
	  padding-bottom: 11rpx;
	  color: #7f7f7f;
	  font-size: 24rpx;
	  padding-left: 30rpx;
	  padding-right: 30rpx;
	  line-height: 33rpx;
	}
	
	.fb-mobile .mobile-box {
	  height: 104rpx;
	  width: 100%;
	  color: #333;
	  padding-left: 30rpx;
	  padding-right: 30rpx;
	  font-size: 24rpx;
	  background: #fff;
	  position: relative;
	}
	
	.fb-mobile .mobile {
	  position: absolute;
	  top: 27rpx;
	  left: 30rpx;
	  height: 50rpx;
	  width: 100%;
	  color: #333;
	  line-height: 50rpx;
	  font-size: 24rpx;
	}
	
	.fb-mobile .clear-icon {
	  position: absolute;
	  top: 27rpx;
	  right: 30rpx;
	  width: 48rpx;
	  height: 48rpx;
	  z-index: 2;
	}
	
	.fb-btn {
	  right: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 80%;
	  height: 90rpx;
	  line-height: 98rpx;
	  position: absolute;
	  bottom: 24rpx;
	  left: 0;
	  border-radius: 0;
	  padding: 0;
	  margin: 0;
	  margin-left: 10%;
	  text-align: center;
	  /* padding-left: -5rpx; */
	  font-size: 25rpx;
	  color: #f4f4f4;
	  border-top-left-radius: 50rpx;
	  border-bottom-left-radius: 50rpx;
	  border-top-right-radius: 50rpx;
	  border-bottom-right-radius: 50rpx;
	  letter-spacing: 3rpx;
	  background-color: #ffbf2a;
	  /* background-image: linear-gradient(to right, #9a9ba1 0%, #9a9ba1 100%); */
	}
	</style>
