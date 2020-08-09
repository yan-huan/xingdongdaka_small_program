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
				<input v-model="rmb" placeholder="请输入赞助金" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><span class='form-label'>获取条件</span></view>
				<textarea v-model="sponsorCondition"  maxlength="-1"  placeholder="请输入获取条件"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">赞助其他</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view v-if="switchA" class="cu-form-group">
				<view class="title"><span class='form-label'>赞助场地</span></view>
				<input v-model="location" placeholder="输入场地地址" name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view  v-if="switchA" class="cu-bar bg-white">
				<view class="action">
					场地图片
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view  v-if="switchA" class="cu-form-group">
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
			
			
			<view v-if="switchA">
				<view class="cu-form-group ">
					<view class="title"><span class='form-label'>抵扣权</span></view>
					<textarea  v-model="discounts" maxlength="-1"  placeholder="请输入抵扣权"></textarea>
					
				</view>
				<view class="cu-form-group ">
					<view class="title"><span class='form-label'>折扣券</span></view>
					<textarea  v-model="discounts" maxlength="-1"  placeholder="请输入折扣券"></textarea>
				</view>
				<view class="cu-form-group">
					<view class="title"><span class='form-label'>其他</span></view>
					<textarea  v-model="other" maxlength="-1"  placeholder=" "></textarea>
				</view>
			</view>
			<view class=" margin-top padding-xl">
				<button class="cu-btn block bg-orange"  @tap="onCommit">
					 提交</button>	
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
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				rmb:'',
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
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
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
			onCommit(){
				console.log(this.userInfo)
				console.log(this.hasLogin)
				const arr =  this.form
				const parm ={
					rmb:this.rmb,  //赞助金
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
					console.log(res)
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
.form-label{
	display: inline-block;
	width: 160upx;
}
</style>
