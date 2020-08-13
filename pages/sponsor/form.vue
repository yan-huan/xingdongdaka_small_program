<template>
	<view>
		<view scroll-x class="xd-bg nav text-center">
			<view class="cu-item" >
				赞助
			</view>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title"><span class='form-label'>赞助金</span></view>
				<!-- <input v-model="rmb" placeholder="请输入赞助金" name="input"></input> -->
				<input :value="rmb.challengeRmb" type="number" class="digit" name="challengeRmb" placeholder="请输入保障金数额" maxlength="5" />
			</view>
			<view>
				<view class="pricelis">
					<view class="priceli" @click="priceRmb(1)"><text>1元</text></view>
					<view class="priceli" @click="priceRmb(6)"><text>6元</text></view>
					<view class="priceli" @click="priceRmb(18)"><text>18元</text></view>
					<view class="priceli" @click="priceRmb(66)"><text>66元</text></view>
					<view class="priceli" @click="priceRmb(188)"><text>188元</text></view>
					<view class="priceli" @click="priceRmb(888)"><text>888元</text></view>
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">赞助其他</view>
				<view class="flex flex-wrap  radius align-center data-time-left">
					<picker class="data-time-left-whint" @change="PickerChangeItem" :value="pickerdate[pickedIndex]" :range="pickerdate">
						<view class="picker">
							{{pickerdate[pickedIndex]}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				
			</view>
			
			<view v-if="Number(pickedIndex)===1" class="cu-form-group">
				<view class="title"><span class='form-label'>赞助场地</span></view>
				<input v-model="location" placeholder="输入场地地址" name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view  v-if="Number(pickedIndex)===1" class="cu-bar bg-white">
				<view class="action">
					场地图片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view  v-if="Number(pickedIndex)===1" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			
			
				<view v-if="Number(pickedIndex)===2" class="cu-form-group ">
					<view class="title"><span class='form-label'>代金券</span></view>
					<textarea  v-model="discounts" maxlength="-1"  placeholder="请输入代金券"></textarea>
					
				</view>
				<view v-if="Number(pickedIndex)===3" class="cu-form-group ">
					<view class="title"><span class='form-label'>折扣权</span></view>
					<textarea  v-model="discounts" maxlength="-1"  placeholder="请输入折扣权"></textarea>
				</view>
				<view v-if="Number(pickedIndex) ===4" class="cu-form-group">
					<view class="title"><span class='form-label'>其他</span></view>
					<textarea  v-model="other" maxlength="-1"  placeholder=" "></textarea>
				</view>
				
				<view  v-if="pickedIndex !==0" class="cu-form-group">
					<view class="title"><span class='form-label'>获取条件</span></view>
					<textarea v-model="sponsorCondition"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
				</view>
			
			
			<view class=" margin-top padding-xl">
				<button class="cu-btn block bg-orange"  @tap="onCommit">提交</button>	
			</view>
			
			
			<!-- <view v-for="(item,index) in form" :key="index" :class="index===0?'cu-form-group margin-top' :'cu-form-group'">
				<view :class="index===0?'cu-form-group margin-top':'cu-form-group'">
					<view class="title">{{item.label}}</view>
					<input v-model="item.val" :placeholder="item.placeholder" name="input"></input>
					<text v-if="item.type==='addr'" class='cuIcon-locationfill text-orange'></text>
				</view>
			</view> 
			<view class="cu-form-group xd-flex-center margin-top xd-pd-tb-10">
				<button class="cu-btn block line-orange lg"  @tap="onCommit">
					<text class="cuIcon-check"></text> 提交</button>	
			</view> -->
		</form>		
		
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				pickerdate:[
					"请选择",
					"活动场地",
					"代金券",
					"折扣权",
					"其他"
				],
				pickedIndex:0,
				rmb:{
					challengeRmb:5,
				},
				sponsorCondition:'',
				location:'', //活动场地地址
				userInfo:uni.getStorageSync('userInfo'),
				imgList: [],
				switchA: false,
				discounts:'',     // 抵扣券
				userGroup:'',     // 用户群体，1围观者，2有效围观，多条件逗号分隔 ??从何处获取
				other:'',         // 其他奖励
				
				form:[{
						label:"赞 助 金",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"活动场地",
						val:"",
						placeholder:"",
						type:"addr"
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"抵 扣 券",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"折 扣 券",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"其  他",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
				]
			};
		},
		
		computed: {
			...mapState(['hasLogin'])
		},
		methods:{
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			PickerChangeItem(e){
				this.pickedIndex = e.detail.value
				console.log(e)
				// this.indexholiday=0;
				// this.holidayDay=1;
			},
			ChooseImage() {
				const that=this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
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
																		
																		 that.param.pictures=JSON.parse(uploadFileRes.data).obj[0];
																		console.log(that.param.pictures)
									           }
									       });
								}else{
									uni.showToast({
									    title: '内容包含敏感内容',
										mask:true,
									    duration: 2000,
										
									});
									return false
								}
							});
							
						
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			async saveData2(){
				const arr =  this.form
				const parm ={
					rmb:this.rmb.challengeRmb,  //赞助金
					sponsorCondition:this.sponsorCondition,
					location:this.imgList.toString(), //活动地址
					discounts:this.discounts,    //  抵扣券
					userGroup:'',     // 用户群体，1围观者，2有效围观，多条件逗号分隔 ??从何处获取
					other:this.other,         // 其他奖励
					finishCondition: '' ,  // 完成条件
					status: 1 ,           //   状态:0有效,1无效
					pushId: uni.getStorageSync('pushId') ,       // 行动项id
					cardId: uni.getStorageSync('cardId'),	     // 打卡id
					createTime: new Date()    , //	创建时间
					updateTime : new Date()    //   更新时间
				} 
				this.xd_request_post(this.xdServerUrls.xd_saveSponsor,parm).then(res=>{
					if(res.resultCode==0){
						if(res.obj.payWay != 1){
							this.goPay();
						}else{
							uni.showToast({
								title: '赞助成功',
								icon: 'success',
								duration: 2000,
								success:function(){
									uni.setStorageSync('pushData','' );
									uni.reLaunch({
										url: '../index/action/action?pushId='+res.obj.id
									})
								}
							});
						}
					}else{
						uni.showToast({
							title: res.obj,
							icon: 'none',
							duration: 3000,
							success:function() {
								return false;
							}
						});
					}
				})
			},
			async onCommit(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				const that = this;
				
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
				that.saveData = userData
				that.saveData2()
				await this.goPay()
				
			},
			
			priceRmb(e){
				this.rmb.challengeRmb=e
				console.log(this.rmb)
				// this.formSubmit();
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
				data.payRmb=that.mony;
				data.pushId=uni.getStorageSync('pushId');
				wx.getSetting({
				  success: res => {
				    if (res.authSetting['scope.userInfo']) {
						// that.xd_request_post(that.xdServerUrls.xd_generalPay,data,false).then(res=>{
						that.xd_request_post(that.xdServerUrls.xd_Pay,data,false).then(res=>{
							uni.requestPayment({
								'appId': res.obj.appId,
								'timeStamp': res.obj.timeStamp,
								'nonceStr': res.obj.nonceStr,
								'package': res.obj.packageAlias,
								'signType': 'MD5',
								'paySign': res.obj.paySign,
								success: function (re) {
									uni.showToast({
										title: '支付成功',
										icon: 'success',
										duration: 2000,
										success:function(){
											that.saveData()
											// uni.reLaunch({url: '../index/index'})
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
												 uni.reLaunch({url: 'form'})
											}else if (ress.cancel) {
												uni.setStorageSync('pushData',that.pushData.obj );
												uni.reLaunch({url: '../index/index'})
											}
										}
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
}
</script>

<style scoped lang="scss">
.form-label{
	display: inline-block;
	width: 160upx;
}
.pricelis {
	display: flex;
	justify-content: space-around;
	padding-bottom: 30upx;
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
.cu-form-group picker::after{
	display: none;
}
</style>
