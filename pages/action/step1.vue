<template>
	<view class="flex bg-white contentspe">
		<form class="contentspe" @submit="formSubmit">
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-list "></text>
				</view>
				<text class="margin-left-xs">分类</text>
				<view class=" flex  align-center bg-gray label-left  radius " @tap="showradios" >					
					<text v-if="labeldata.length">{{labeldata}}</text>
					<text v-else>请选择(默认自动选择)</text>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				<view class="cu-modal  cu-modal-z" :class="modalNamecheckbox?'show':''" @tap="showradios">
					<view class="cu-dialog" @tap.stop="">
						<checkbox-group class="block" @change="RadioChange" name="label">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item,index) in pickerlabel" :key="item.id" :id="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{item.labelName}}</view>
										<checkbox  class="round" :class="item.checked?'checked':''" :checked="item.checked"
										 :value="item.id"></checkbox >
									</label>
								</view>
							</view>
						</checkbox-group>
						<view class="checkbox-text flex justify-around" >
							<text @tap="showradios"> 确定</text>
							<text @tap="showradios(1)" > 取消</text>
						</view>
					</view>
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
			<view class="" v-if="!modalNamecheckbox">
				<view class="cu-form-group align-start textare-heght">
					<textarea :value="content" name="content" maxlength="500" :disabled="modalName!=null" placeholder="减肥,锻炼意志力,提高耐性,提升魅力..."></textarea>
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
				<view class="title margin-left-xs">计划天数</view>
				<view class="flex flex-wrap  bg-gray radius align-center card-time-left ">
					<picker class="data-time-left-whint" @change="PickerChange"  :range="picker" >
						<view class="picker">
							{{picker[indextime]}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				<view class="" v-if="indextime==5">
					<input type="number" class="timeinput"   placeholder="输入天数" :focus="targetDayf" @input="targetDayinput" maxlength="50" step="1" min="1"></input>
				</view>
			</view>
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="margin-left-lg ">可休假天数</view>
				<view class="flex flex-wrap  bg-gray radius align-center data-time-left">
					<picker class="data-time-left-whint" @change="PickerChangeholiday" :value="holidayDay" :range="pickerdate">
						<view class="picker">
							{{pickerdate[indexholiday]}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
				</view>
				<view class="" v-if="indexholiday==8">
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
			<view class=" flex flex-wrap padding solid-top align-center pading-time" v-if="switchB==1">
				<view class="title margin-left-xs">选择提现时间</view>
				<view class="flex flex-wrap  bg-gray radius align-center card-time-left ">
					<picker mode="time" class="data-time-left-whint" @change="bindTimeChange"   >
						<view class="picker">
							{{time}}
						</view>
					</picker>
					<text class="lg text-gray cuIcon-triangledownfill"></text>
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
			indextime:0,
			time:'12:00',
			indexholiday:0,
			modalNamecheckbox:false,
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
				"两天",
				"三天",
				"四天",
				"五天",
				"六天",
				"一周",
				"一月",
				"自定义"
			],
			targetDay:7,
			holidayDay:1,
			labeldata:[],
		};
	},
	onLoad() {
		var data=uni.getStorageSync("pushData");
		if(data){
			this.content=data.content;
			this.punchCardWay=data.punchCardWay;
			this.param.pictures=data.pictures;
		}
		this.tabs();
	},
	methods: {
		showradios(e){
			if(e==1){
				for (var i = 0;i<this.pickerlabel.length;  ++i) {			
					this.pickerlabel[i].checked=false;		
				}
				this.labeldata=[];
				this.modalNamecheckbox=!this.modalNamecheckbox;
			}else{
				this.modalNamecheckbox=!this.modalNamecheckbox;
			}
			
			
		},
		bindTimeChange(e) {
		            this.time = e.target.value
		        },
				//选择标签
		RadioChange(e){
			
				var	values = e.detail.value;
				var labeldatas=[];
				for (var i = 0;i<this.pickerlabel.length;  ++i) {
					const item = this.pickerlabel[i]
					 if(values.toString().includes(item.id)){
						this.pickerlabel[i].checked=true;
						labeldatas.push(this.pickerlabel[i].labelName);
					}else{
						this.pickerlabel[i].checked=false;
						labeldatas.splice(i)
					}
					
				}
				this.labeldata=labeldatas
				
			
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
				this.holidayDay=2;
				break;
				case '2':
				this.indexholiday=2;
				this.holidayDay=3;
				break;
				case '3':
				this.indexholiday=3;
				this.holidayDay=4;
				break;
				case '4':
				this.indexholiday=4;
				this.holidayDay=5;
				break;
				case '5':
				this.indexholiday=5;
				this.holidayDay=6;
				break;
				case '6':
				this.indexholiday=6;
				this.holidayDay=7;
				break;
				case '7':
				this.indexholiday=7;
				this.holidayDay=30;
				break;
				case '8':
				this.indexholiday=8;
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
		
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '请输入行动内容',
					mask:true,
				    duration: 2000,
					icon:'none'
				});
				return false
			};
			if(this.holidayDay>this.targetDay){
				uni.showToast({
				    title: '休假天数不能大于计划天数',
					mask:true,
				    duration: 2000,
					icon:'none'
				});
				return false
			};
			
			if(this.targetDay==0||this.targetDay==''){
				uni.showToast({
				    title: '计划天数不能为0或不填',
					mask:true,
				    duration: 2000,
					icon:'none'
				});
				return false
			};
			if(e.detail.value.label==''){
				
				e.detail.value.label=1;
			};
			if(this.switchB==1){
				e.detail.value.openId=this.xdUniUtils.xd_getStorageSync('userInfo').openId;
				e.detail.value.templateId='xAoOfTDxRoot-lhO1dx5JfHQeCKiHFjuYqRHWRcnecw';
			}
			e.detail.value.isopen=this.switchA;
			e.detail.value.subscribeType=this.switchB;
			e.detail.value.targetDay=this.targetDay;
			e.detail.value.holidayDay=this.holidayDay==''?0:this.holidayDay;
			e.detail.value.pictures= this.param.pictures;
			this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
				if(res.obj.errcode==0){
					uni.navigateTo({
						url: '/pages/action/finish?data='+encodeURIComponent(JSON.stringify(e.detail.value))
					});
				}else{
					uni.showToast({
					    title: '内容包含敏感内容',
						mask:true,
					    duration: 2000,
						
					});
					return false
				}
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
					
			    }
			});
		},
		DelImg(){
			this.param.pictures='';
		},
		tabs(){
			this.xd_request_post(this.xdServerUrls.xd_label,{},false
				   ).then((res) => {
					  // var data=[];
				   //     res.obj.forEach(function(item){
						 //   data.push(item.labelName)
					  //  })
					  // res.obj[0].checked=true;
					   this.pickerlabel=res.obj;
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
	margin-left: 38%;
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
	position: fixed;
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
.pading-time{
	margin-bottom: 20%;
}
.checkbox-text{
	height: 90rpx;
	
	align-items: center;
	
	text{
		font-size: 45rpx;
	}
	
}
</style>