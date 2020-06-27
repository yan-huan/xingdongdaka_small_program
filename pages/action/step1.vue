<template>
	<view class="flex bg-white contentspe">
		<form class="contentspe" @submit="formSubmit">
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-list "></text>
				</view>
				<text class="margin-left-xs">分类</text>
				<view class=" flex  align-center bg-gray label-left  radius " >		
					<picker class="label-left" @change="PickerChangelabel" :value="labeldata" :range="pickerlabel" name="label"  >
						<view class="picker">
							{{indexlabel>-1?pickerlabel[indexlabel]:'请选择(默认自动选择)'}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
					
				</view>
			</view>
			<view class=" flex flex-wrap padding solid-top align-center justify-between">
				<view class="flex flex-wrap">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-activity"></text>
					</view>
					<text class="margin-left-xs">行动内容</text>
				</view>
				<view class="flex flex-wrap align-center">
					<text class="margin-right-xs">公开</text>
					<switch  :class="switchA==0?'checked':''" :checked="switchA==0?true:false" @change="isOpenswitch"></switch>
				</view>
			</view>
			<view class="">
				<view class="cu-form-group align-start textare-heght">
					<textarea :value="content" name="content" maxlength="-1" :disabled="modalName!=null" placeholder="减肥,锻炼意志力,提高耐性,提升魅力..."></textarea>
				</view>
			</view>
			<view class="padding solid-top">
				<view class="flex flex-wrap">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-camera"></text>
					</view>
					<text class=" margin-left-xs">上传封面</text>
				</view>
				<view class="">
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img"  @tap="ViewImage" :data-url="param.pictures" v-if="param.pictures!=''">
							 <image :src="param.pictures" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="popUpImg" v-if="param.pictures==''">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class=" flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-calendar"></text>
				</view>
				<view class="title margin-left-xs">行动时间(打卡时间)</view>
				<view class="flex flex-wrap  bg-gray radius align-center card-time-left ">
					<picker class="data-time-left-whint" @change="PickerChange"  :range="picker" >
						<view class="picker">
							{{picker[indextime]}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				<view class="" v-if="indextime==5">
					<input class="timeinput"   placeholder="输入天数" :focus="targetDayf" @input="targetDayinput" maxlength="50" step="1" min="1"></input>
				</view>
			</view>
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="margin-left-lg ">休息天数</view>
				<view class="flex flex-wrap  bg-gray radius align-center data-time-left">
					<picker class="data-time-left-whint" @change="PickerChangeholiday" :value="holidayDay" :range="pickerdate">
						<view class="picker">
							{{pickerdate[indexholiday]}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				<view class="" v-if="indexholiday==2">
					<input class="timeinput"  placeholder="输入天数" :value="holidayDay" :focus="holidayf" @input="holidayDayinput" maxlength="50" step="1" min="0"></input>
				</view>
			</view>
			<view class=" flex flex-wrap padding solid-top align-center justify-between">
				<view class="flex flex-wrap">
					<view class="text-xxl">
						<text class="lg text-orange cuIcon-noticefill"></text>
					</view>
					<text class="margin-left-xs">提醒</text>
				</view>
				<view class=" ">
					<switch @change="SwitchB"  :class="switchB==1?'checked':''" :checked="switchB==1?true:false"  ></switch>
				</view>
			</view>
			<view class="btn_bar">
				<button class="bg-orange " form-type="submit">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			switchA:0,
			switchB:0,
			content:'',
			holidayf:false,
			targetDayf:false,
			extendContent:'',
			punchCardWay:'',
			indexlabel:-1,
			indextime:0,
			indexholiday:0,
			param:{
				pictures:""
			},
			pickerlabel:[],
			picker:[
				"一周"	,
				"一个月",
				"三个月",
				"半年",
				"一年",
				"自定义"
			],
			pickerdate:[
				"一天",
				"一周",
				"自定义"
			],
			targetDay:7,
			holidayDay:1,
			labeldata:'',
		};
	},
	onLoad() {
		var data=uni.getStorageSync("pushData");
		if(data){
			this.content=data.content;
			this.extendContent=data.extendContent;
			this.punchCardWay=data.punchCardWay;
			this.param.pictures=data.pictures;
		}
		this.tabs();
	},
	methods: {
		PickerChangelabel(e){
			this.labeldata=Number(e.detail.value)+1;
			this.indexlabel=e.detail.value;
		},
		holidayDayinput(e){
			this.holidayDay=e.detail.value;
		},
		//休息天数
		PickerChangeholiday(e){
			switch(e.detail.value){
				case '0':
				this.indexholiday=0;
				this.holidayDay=1;
				break;
				case '1':
				this.indexholiday=1;
				this.holidayDay=7;
				break;
				case '2':
				this.indexholiday=2;
				this.holidayDay='';
				this.holidayf=true;
				break;
				}
		},
		//打卡天数
		targetDayinput(e){
			this.targetDay=e.detail.value;
		},
		PickerChange(e){
			console.log(e)
			var that=this;
			switch(e.detail.value){
				case '0':
				that.indextime=0;
				that.targetDay=7;
				break;
				case '1':
				that.indextime=1;
				that.targetDay=30;
				break;
				case '2':
				that.indextime=2;
				that.targetDay=90;
				break;
				case '3':
				that.indextime=3;
				that.targetDay=180;
				break;
				case '4':
				that.indextime=4;
				that.targetDay=365;
				break;
				case '5':
				that.indextime=5;
				that.targetDay='';
				that.targetDayf=true;
				break;
			}
		},
		isOpenswitch(e){
			if(e.detail.value){
				this.switchA=0;
			}else{
				this.switchA=1;
			}
		},
		SwitchB(e){
			if(e.detail.value){
				this.switchB=1;
				uni.requestSubscribeMessage({
				    tmplIds: ['xAoOfTDxRoot-lhO1dx5JfHQeCKiHFjuYqRHWRcnecw'],
				    success (res) {
				      
				      console.info(res);
				     }
				  })
			}else{
				this.switchB=0;
			}
		},
		formSubmit(e){
		 console.log(e)
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '请输入行动内容',
					mask:true,
				    duration: 1000,
					image:'/static/images/icon/clock.png'
				});
				return false
			};
			if(e.detail.value.label==''){
				
				e.detail.value.label=1;
			};
			if(e.detail.value.subscribeType==1){
				e.detail.value.openId=this.xdUniUtils.xd_getStorageSync('userInfo').openId;
				e.detail.value.templateId='xAoOfTDxRoot-lhO1dx5JfHQeCKiHFjuYqRHWRcnecw';
			}
			e.detail.value.isopen=this.switchA;
			e.detail.value.subscribeType=this.switchB;
			e.detail.value.targetDay=this.targetDay;
			e.detail.value.holidayDay=this.holidayDay;
			e.detail.value.pictures= this.param.pictures;
			this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
				if(res.obj.errcode==0)
				uni.navigateTo({
					url: '/pages/action/finish?data='+encodeURIComponent(JSON.stringify(e.detail.value))
				});
			})
				
		},
		popUpImg(){
			const that=this;
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
																
																 that.param.pictures=JSON.parse(uploadFileRes.data).obj[0];
																
							           }
							       });
						}
					});
					
			    }
			});
		},
		DelImg(){
			this.param.pictures='';
		},
		tabs(){
			this.xd_request_post(this.xdServerUrls.xd_label,{},false
				   ).then((res) => {
					  var data=[];
				       res.obj.forEach(function(item){
						   data.push(item.labelName)
					   })
					   this.pickerlabel=data;
				   }).catch(err => {
				
			});
		},
		
	}
};
</script>

<style lang="scss">
	.contentspe{
		width: 100%;
	}
.label-left{
	margin-left: 15%;
	width: 390rpx;
}
.card-time-left{
	margin-left: 15%;
	width: 150upx;
}
.data-time-left{
	margin-left: 34.5%;
	width: 150upx;
}
.timeinput{
	width: 115upx;
}
.btn_bar{
	position: absolute;
	bottom: 0;
	width: 100%;
	margin-bottom: 10upx;
}
.textare-heght{
	height: 300upx;
}
.data-time-left-whint{
	width: 115upx;
}
</style>