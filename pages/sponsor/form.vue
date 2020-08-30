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
				<input v-model="rmb.challengeRmb" type="number" class="digit" name="challengeRmb" placeholder="请输入保障金数额" maxlength="5" />
			</view>
			<view>
				<view class="pricelis">
					<view class="priceli" @click="priceRmb(2)"><text>2元</text></view>
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
				<input v-model="location" placeholder="输入场地地址" name="input" /> 
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view  v-if="Number(pickedIndex) ===1" class="cu-form-group  align-start">
				<view class="title">
					<text>获取条件:</text>
				</view>
				<textarea v-model="sponsorCondition.location"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
			</view>
			<view  v-if="Number(pickedIndex)===1" class="cu-bar bg-white">
				<view class="action">
					场地图片
				</view>
				<view class="action">
					{{pictures.location.length}}/4
				</view>
			</view>
			<view  v-if="Number(pickedIndex)===1" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in pictures.location" :key="index" @tap="ViewImage(item,'location')" :data-url="pictures.location[index]">
					 <image :src="pictures.location[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg(index,'location')" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage('location')" v-if="pictures.location.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
			<view v-if="Number(pickedIndex)===2" class="cu-form-group  align-start">
				<view class="title">
					<text>代金券:</text>
				</view>
				
				<textarea  v-model="daiJinQuan" maxlength="-1"  placeholder="请输入折扣权"></textarea>
			</view>
			<view  v-if="Number(pickedIndex) ===2" class="cu-form-group  align-start">
				<view class="title">
					<text>获取条件:</text>
				</view>
				<textarea v-model="sponsorCondition.daiJinQuan"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
			</view>

			<view  v-if="Number(pickedIndex)===2" class="cu-bar bg-white">
				<view class="action">
					图片
				</view>
				<view class="action">
					{{pictures.daiJinQuan.length}}/4
				</view>
			</view>
			<view  v-if="Number(pickedIndex)===2" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in pictures.daiJinQuan" :key="index" @tap="ViewImage(item,'daiJinQuan')" :data-url="pictures.daiJinQuan[index]">
					 <image :src="pictures.daiJinQuan[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg(index,'daiJinQuan')" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage('daiJinQuan')" v-if="pictures.daiJinQuan.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			


			<view v-if="Number(pickedIndex)===3" class="cu-form-group align-start">
				<view class="title">
					<text>折扣权:</text>
				</view>
				
				<textarea  v-model="zheKouQuan" maxlength="-1"  placeholder="请输入折扣权"></textarea>
			</view>
			<view  v-if="Number(pickedIndex) ===3" class="cu-form-group align-start">
				<view class="title">
					<text>获取条件:</text>
				</view>
				<textarea v-model="sponsorCondition.zheKouQuan"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
			</view>
			<view  v-if="Number(pickedIndex)===3" class="cu-bar bg-white">
				<view class="action">
					图片
				</view>
				<view class="action">
					{{pictures.zheKouQuan.length}}/4
				</view>
			</view>
			<view  v-if="Number(pickedIndex)===3" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in pictures.zheKouQuan" :key="index" @tap="ViewImage(item,'zheKouQuan')" :data-url="pictures.zheKouQuan[index]">
					 <image :src="pictures.zheKouQuan[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg(index,'zheKouQuan')" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage('zheKouQuan')" v-if="pictures.zheKouQuan.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view v-if="Number(pickedIndex) ===4" class="cu-form-group  align-start">
				<view class="title">
					<text>其 他:</text>
				</view>
				<textarea  v-model="other" maxlength="-1"  placeholder=" "></textarea>
			</view>
			<view  v-if="Number(pickedIndex) ===4" class="cu-form-group align-start">
				<view class="title">
					<text>获取条件:</text>
				</view>
				
				<textarea v-model="sponsorCondition.other"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
			</view>
			<view  v-if="Number(pickedIndex)===4" class="cu-bar bg-white">
				<view class="action">
					图片
				</view>
				<view class="action">
					{{pictures.other.length}}/4
				</view>
			</view>
			<view  v-if="Number(pickedIndex)===4" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in pictures.other" :key="index" @tap="ViewImage(item,'other')" :data-url="pictures.other[index]">
					 <image :src="pictures.other[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg(index,'other')" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage('other')" v-if="pictures.other.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class=" margin-top padding-xl">
				<button class="cu-btn block bg-orange"  @tap="onCommit">提交</button>	
			</view>
			
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
				sponsorCondition:{
					location:'',
					daiJinQuan:'',
					zheKouQuan:'',
					other:''
				},
				pictures:{
					location:[],
					daiJinQuan:[],
					zheKouQuan:[],
					other:[]
				},
				location:'', //活动场地地址
				userInfo:uni.getStorageSync('userInfo'),
				imgList: [],
				switchA: false,
				discounts:'',     // openid
				daiJinQuan:'',     // 代金券
				zheKouQuan:'',     // 代金券
				userGroup:'',     // 用户群体，1围观者，2有效围观，多条件逗号分隔 ??从何处获取
				other:'',         // 其他奖励
				sponsorID:'',
				sponsorObj:null,
				
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
			},
			ChooseImage(p) {
				const that=this;	
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						let tempFilePaths = res.tempFilePaths;
						console.log("tempFilePaths----" ,tempFilePaths)
						that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res=>{
							if(res){
								uni.uploadFile({
									url: that.xdServerUrls.xd_uploadFile, 
									filePath: tempFilePaths[0],
									name: 'files',
									formData: {
										'userId': uni.getStorageSync('id'),
									},
									success: function(uploadFileRes){
										const arrPhotos = JSON.parse(uploadFileRes.data).obj
										console.log("uploadFileRes----" ,JSON.parse(uploadFileRes.data))
										that.pictures[p] = [...that.pictures[p],...arrPhotos]
									},
									fail: function (err) {
										console.log("uploadFileRes----",err)
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
					}
				});
			},
			ViewImage(url,p) {
				uni.previewImage({
					urls: this.pictures[p],
					current: url
				});
			},
			DelImg(index,p) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.pictures[p].splice(index, 1)
						}
					}
				})
			},
			

			validCondition(p){
				const xdToast = (msg)=>{
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 3000,
						success:function() {
							return false;
						}
					})
					return false
				}
				if(Number(p.rmb)===0 && !p.location && !p.daiJinQuan && !p.zheKouQuan  && !p.other){
					return xdToast('请输入大于0元的赞助金或填写赞助项目')
				}
				
				if(p.location && !this.sponsorCondition.location){
					return xdToast('请输入场地获取条件')
				}else if(p.daiJinQuan && !this.sponsorCondition.daiJinQuan){
					return xdToast('请输入代金券获取条件')
				}else if(p.zheKouQuan && !this.sponsorCondition.zheKouQuan){
					return xdToast('请输入折扣权获取条件')
				}else if(p.other && !this.sponsorCondition.other){
					return xdToast('请输入其他获取条件')
				}
				return true
			},

			async onCommit(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				const parm ={
					rmb:this.rmb.challengeRmb*100,  //赞助金
					sponsorCondition: JSON.stringify(this.sponsorCondition),
					location:this.location, //活动地址
					daiJinQuan:this.daiJinQuan,
					zheKouQuan:this.zheKouQuan,
					discounts:this.discounts,    //  抵扣券
					userGroup: '',     // 用户群体，1围观者，2有效围观，多条件逗号分隔 ??从何处获取
					other:this.other,         // 其他奖励
					finishCondition: '' ,  // 完成条件
					status: 0 ,           //   状态:0有效,1无效
					pushId: uni.getStorageSync('pushId') ,       // 行动项id
					cardId: uni.getStorageSync('cardId'),	     // 打卡id
					createTime: new Date()    , //	创建时间
					updateTime : new Date(),    //   更新时间
					pictures: JSON.stringify(this.pictures),
					// zanzhujinRmb: '1',
				} 
				if(this.validCondition(parm)){
					const {resultCode,obj,msg} = await this.xd_request_post(this.xdServerUrls.xd_saveSponsor,parm)
				
					if(resultCode==='0'){
						this.sponsorID=obj.id
						this.sponsorObj=obj
						if(this.rmb.challengeRmb>0){
							this.goPay()
						}else{
							uni.reLaunch({url: 'action'})
						}
					} else {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000,
							success:function() {
								return false;
							}
						})
					}
				}
				
			},
			
			
				
			priceRmb(e){
				this.rmb.challengeRmb=e
				console.log(this.rmb)
				// this.formSubmit();
			},
			
			//#ifdef MP-WEIXIN
			goPay(){
				console.log('goPay',this.rmb.challengeRmb);
				let that = this;
				const userInfo=uni.getStorageSync('userInfo');
				let data={
					payRmb:that.rmb.challengeRmb*100,   //必传 金额
					// payRmb:that.rmb.challengeRmb,
					pushId:uni.getStorageSync('pushId'), //必传 活动ID
					openid: userInfo.openId, //必传 用户ID
					type: '1', //必传 1赞助金，2感谢金
					outTradeNo: this.sponsorObj.payNo, // 必传 订单号从何处获取？？
					id: userInfo.id,
					token: uni.getStorageSync('token'),
					unionId: userInfo.unionId,
					city: userInfo.city,
					userName: userInfo.nickName,
					province: userInfo.province,
					
				};
				console.log('gopay',userInfo,data);
				
				wx.getSetting({
				  success: res => {
					console.log('wx.getSetting',res);
					console.log('wx.getSetting---',res);
				    if (res.authSetting['scope.userInfo']) {
						console.log('xd_request_--',data);
						
						// that.xd_request_post(that.xdServerUrls.xd_pay,lgdata,false).then(res=>{
						that.xd_request_post(that.xdServerUrls.xd_generalPay,data,false).then(res=>{
							console.log('xd_request_post-----wx.getSetting---',res);
							uni.requestPayment({
								'appId': res.obj.appId,
								'timeStamp': res.obj.timeStamp,
								'nonceStr': res.obj.nonceStr,
								'package': res.obj.packageAlias,
								'signType': 'MD5',
								'paySign': res.obj.paySign,
								success: function (re) {
									console.log('uni.requestPayment----xd_request_post-----wx.getSetting---',re);
									uni.showToast({
										title: '发布成功',
										icon: 'success',
										duration: 2000,
										success:function(){
											uni.reLaunch({
												url: 'action'
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
												uni.reLaunch({url: 'form'})
											}else if (ress.cancel) {
												uni.reLaunch({url: '../index/index'})
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
			}
			//#endif
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
