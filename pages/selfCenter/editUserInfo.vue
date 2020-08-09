<template>
	<view class="editUserInfo">
		<form @submit="fromSubmit">
			<view class="f-lists">
				<view class="f-list f-headInfo">
					<view class="h-userInfo">
						<view class="h-headInfo-imgbar" @click="popUpImg"><image class="h-headInfo-img" v-show="img" :src="img" ></image></view>				
						<view class="h-headInfo-imgTxt" @click="popUpImg">
							<text>点击头像更换</text>
						</view>
					</view>
				</view>
				<view class="f-list"><input class="uni-input" name="userName" placeholder="请输入您的昵称" maxlength="12" v-model="userName"/></view>
				
				<view class="f-list">
					<picker  mode="region" @change="bindPickerChange" :value="region" :custom-item="customItem">
					        <view class="uni-input" v-if="region.length>0">城市：{{region[1]}}，{{region[2]}}</view>
							<view class="uni-input" v-else>点击选择城市</view>
					 </picker>
					
				</view>
				
				<view class="f-list left">
					<text class="f-list-lb">性别：</text>
					<radio-group name='sex'>
						<label class="radio" v-for="(item, index) in items" :key="item.value" >
							<radio :value="item.value" :checked="index === current" color="#ffa700">{{item.name}}</radio>
						</label>
					</radio-group>
				</view>
				
				<view class="f-list"><input class="uni-input" type="number" name="userMobile" placeholder="请输入手机号" maxlength="80" v-model="userMobile"/></view>
				<view class="f-list"><input class="uni-input" name="schoolName" placeholder="请输入学校名称" maxlength="80" v-model="schoolName"/></view>
				<view class="f-btns"><button class="f-btn f-btn-b" form-type="submit">保存</button></view>
			</view>
		</form>
	</view>
</template>

<script>
import {		
		mapMutations
	} from 'vuex'
export default {
	data() {
		return {
			current:0,
			items:[{
				value:0,
				name:'女'
			},{
				value:1,
				name:'男'
			},{
				value:2,
				name:'保密'
			}
			],
			userMobile:'',
			schoolName:'',
			userName:'',
			province:'',
			city:'',
			img:'',
			openId:'',
			unionId:'',
			// customItem: '全部',
			region: [],
			
		};
	},
	onLoad() {
		let userInfo=uni.getStorageSync('userInfo');
		this.userName=userInfo.userName;
		this.current=userInfo.gender;
		this.img=userInfo.userHead;
		this.openId=userInfo.openId;
		this.schoolName=userInfo.schoolName;
		this.unionId=userInfo.unionId;
		this.userMobile=userInfo.userMobile;
		this.region.push('');
		this.region.push(userInfo.province);
		this.region.push(userInfo.city)
	},
	methods: {
			...mapMutations(['uPuserInfo']),
		onConfirm(e) {
			this.pickerText = e.label; //JSON.stringify(e);
			
		},
		
		 bindPickerChange: function (e) {
			this.region=e.detail.value
		    
		  },
		popUpImg(){
			const that = this;
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					let tempFilePaths = res.tempFilePaths;
					that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res=>{
						if(res){
							uni.uploadFile({
							           url: that.xdServerUrls.xd_uploadFile, 
							           filePath: tempFilePaths[0],
							           name: 'files',
							           formData: {
							               'userId': uni.getStorageSync('id'),
							           },
							           success: (uploadFileRes) => {
																
																 that.img=JSON.parse(uploadFileRes.data).obj[0];
																
							           }
							       });
						}
					});
			    }
			});
		},
		fromSubmit(e){
			
			let userData={
				token:'',
				id:'',
			};
			 if(this.img==''){
				 uni.showToast({
				     title: '请上传头像',
				 	icon:'none',
				     duration: 2000
				 });
				 return false
			 }
			try{
				userData.token=uni.getStorageSync('token');
				userData.id=uni.getStorageSync('id');
				
			}catch(e){
				//TODO handle the exception
			}
			this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
				if(res.obj.errcode==0){
					this.xd_request_post(this.xdServerUrls.xd_modifyUserInfo,
					{
						userMobile:e.detail.value.userMobile,
						schoolName:e.detail.value.schoolName,
						userName:e.detail.value.userName,
						province:this.region[1]?this.region[1]:'',
						city:this.region[2]?this.region[2]:'',
						token:userData.token,
						sex:e.detail.value.sex, 
						id:userData.id,
						userHead:this.img,
						openId:this.openId,
						
					},
					true).then(res=>{
						if(res.resultCode==0){
							this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId,
							{
							userId:	res.obj.id		
							}, true ).then(res=>{
								if(res.resultCode==0){
									let userInfo={
										userName:'',
										userHead:'',
										province:'',
										city:'',
										gender:'',
										schoolName:'',
										openId:this.openId,
										unionId:this.unionId,
									};
									userInfo.userName=res.obj.userName;
									userInfo.userHead=res.obj.userHead;
									userInfo.province=res.obj.province;
									userInfo.city=res.obj.city;
									userInfo.gender=res.obj.sex?res.obj.sex:'2';
									userInfo.schoolName=res.obj.schoolName?res.obj.schoolName:'无';
									userInfo.userMobile=res.obj.userMobile;
									
									this.uPuserInfo(userInfo);
									uni.showToast({
									    title: '保存成功',
										mask:true,
									    duration: 2000,
									});
									uni.navigateBack({
										delta:1,
									})
								}
							   })
							   
							
						}else{
							uni.showToast({
							    title: '保存失败',
								mask:true,
							    duration: 2000,
								
							});
							uni.navigateBack({
								delta:1,
							})
						}
						
					})
				  }else{
					uni.showToast({
					    title: '内容包含敏感内容',
						mask:true,
					    duration: 2000,
						
					});
					return false
				}
				
				});
			
			
		}
	},

	// components: {
	// 	simpleAddress
	// }
};
</script>

<style lang="scss">
	.radio{
		margin-right: 24rpx;
		radio{
			color:$xd-color-base;
			margin-right: 3rpx;
		}
		
	}
.f-lists {
	font-size: 26rpx;
	padding: 36rpx 25rpx;
	color: #666;
	.f-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid $xd-color-base;
		height: 68rpx;
		align-items: center;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		.f-list-lb{
			margin-right: 50rpx;
		}
		.uni-input {
			flex: 1;
		}
		.f-list-left {
			flex: 1;
		}
		.f-list-right {
			color: $xd-color-base;
		}
		&.left{
			justify-content: flex-start;
		}
		&.f-headInfo {
			display: flex;
			justify-content: space-between;
			height: 156rpx;
			align-items: center;
			// padding-right: 0;
			.h-userInfo {
				flex:1;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color:#999;
				
			}
			.h-headInfo-imgbar {
				// margin-right: 20rpx;
				.h-headInfo-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
				}
			}
			.user-contact {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.user-lis {
					height: 30rpx;
					line-height: 30rpx;
					margin-bottom: 5rpx;
				}
			}
			.h-headInfo-btn {
				border: 1px solid $xd-color-base;
				background: #fff;
				color: $xd-color-base;
				font-size: 20rpx;
			}
			
		}
		.pickdate {
			flex: 1;
			.uni-picker-action.uni-picker-action-confirm {
				color: #57dbd0 !important;
			}
		}
	}
	.f-btns {
		margin-top: 120rpx;
		.f-btn {
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 28rpx;
			&.f-btn-b {
				background: $xd-color-base;
				// color: #fff;
			}
		}
	}
}
</style>
