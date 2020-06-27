 <template>
	<view class="clockIn">
		<form @submit="submitFrom">
			<view class="uni-form-item uni-column cl-time">
				<view class="form-item clockbar">
					<view class="clockImg"><img src="../../static/images/icon/clock.png" alt="" /></view>
					<view class="itembtns timeBtns">
						<button class="btn" hover-class='default' :loading='buttonStart' @tap="timingStart" :disabled='buttonStart'>开始</button>
						<button class="btn" hover-class='default' @tap="stop" :disabled='!buttonStart'>完成</button>
					</view>
				</view>
				<view class="form-item timetr">
					<text>记时：</text>
					<text >{{times}}</text>
					<text class="timesplit">-</text>
					<text class="timetxt" >{{startTime}}</text>
				</view>
				<view class="form-item timetr">
					<text>时长：</text>
					<text>{{dayData}}</text>
					<!-- <button class="toMore" type="default" @tap="toMore">更多事项记录</button> -->
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="form-item nobtm mediaList">
					<!-- <view class="section" >
						<audio style="text-align: left" :src="current.src" :name="current.name" :author="60" :action="audioAction" controls autoplay='true'></audio>
					</view> -->
					<view class="section" v-if="videodata">
						<video class="imagetip videotip"
							id="myVideo"
							:src="videodata"
							controls
						></video>
					</view>
					<view class="section">
						<block v-for="(pictures, index) in param.pictures" :key="index" >	
						 <image  class="imagetip" v-show="param.pictures[index]" :src="pictures" ></image>
						</block>
						<view class="imagetip"  v-show="!param.pictures[0]" >
							<view class="imagetipicon">
								<text>+</text>
							</view> 
						</view> 
						
					</view>
				</view>
				<view class="progress-box" v-if="progreessnum>0">
				      <progress :percent="progreessnum" show-info stroke-width="3" />
				</view>
				<view class="form-item nobtm itembtns">
					<button class="btn" @click="popUpImg">上传图片</button>
					<button class="btn"  @click="popUpVideo">上传视频</button>
					<button class="btn"  @click="popUpMP3">上传音频</button>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">描述</view>
				<view class="form-item nobtm"><textarea class="inputarea" name='content' placeholder="请输入描述" maxlength="250" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">概况</view>
				<view class="form-item nobtm"><textarea class="inputarea" name='extendContent' placeholder="请输入概况" maxlength="250" /></view>
			</view>
			<view class="btn_bar">
				<view class="btns"><button class="btn" form-type="submit" >提交打卡</button></view>
			</view>
		</form>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
export default {
	data() {
		return {
			buttonStart:false,
			times:'',
			startTime:'',
			endTime:'',
			duration:'',
			timeHour :'', // 小时
			timeMinute :  '',// 分钟
			timeSecond :'', // 秒
			hour:'', // 小时
			minute:'', // 分钟
			second:'', // 秒
			strtime : '2020-05-21 00:00:00:000',
			timeCount:'',
			dayData:'00:00:00',
			param:{
				'pictures':[],
			},
			pushId:'',
			startTimes:'',
			stTimes:'',
			endTimes:'',
			videodata:'',
			progreessnum:'',
			tempFilePaths:[],
			j:0,
			
		};
	},
	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onLoad(option) {
		this.pushId=option.pushId;
		this.getTime();
	},
	methods: {
		toMore(){
			uni.navigateToMiniProgram({
			  appId: 'wxf9286c35b3f9d0d0',
			  success(res) {
			    // 打开成功
			  }
			})
		},
		submitFrom(e){
			var start=undefined;
			var end=undefined;
			if(!this.hasLogin){
				uni.navigateTo({
					url: '../login/login' 
				});
				return false;
			}
			if(this.endTimes!=''){
				var start=this.stTimes;
				var end=this.endTimes;
				
			};
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '描述不能为空',
					mask:true,
				    duration: 1000,
					image:'/static/images/icon/clock.png'
				});
				return false
			};
			this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
				if(res.obj.errcode==0){
					this.xd_request_post(this.xdServerUrls.xd_savePushCard,{
						pushId:this.pushId,
						userId:uni.getStorageSync('id'),
						content:e.detail.value.content,
						extendContent:e.detail.value.extendContent,
						pictures:this.param.pictures,
						startTime:start,
						endTime:end,
					},true).then(res=>{
						var data ={
							pushId:this.pushId,
							cardId:res.obj
						}
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 1500,
							success() {
								uni.reLaunch({
									url: '../index/cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(data))
								})
							}
						});
						
					})
				}else{
					uni.showToast({
					    title: '内容包含敏感内容',
						mask:true,
					    duration: 2000,
						
					});
					return false
				}
				  
			})
			// if(this.param.pictures==''){
			// 	uni.showToast({
			// 	    title: '请上传图片',
			// 		mask:true,
			// 	    duration: 1000,
			// 		image:'/static/images/icon/clock.png'
			// 	});
			// 	return false
			// }
			// if(e.detail.value.extendContent==''){
			// 	uni.showToast({
			// 	    title: '概述不能为空',
			// 		mask:true,
			// 	    duration: 1000,
			// 		image:'/static/images/icon/clock.png'
			// 	});
			// 	return false
			// }			 
			 // var pictures=JSON.stringify( this.param.pictures);
			 // console.log(pictures)
			 
			
			
		},
		popUpImg(){
			const that = this;
			uni.chooseImage({
			    count: 4, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					 that.tempFilePaths = res.tempFilePaths;
					 that.j=0;
					  that.getImg();
			    }
			});
		},
		getImg(){
			const that = this;
			if(that.j>=that.tempFilePaths.length){
				return false
			}
			 that.xdUniUtils.xd_request_img(that.tempFilePaths[that.j]).then(res=>{
				if(res){
				const uploadTask =uni.uploadFile({
							   url: that.xdServerUrls.xd_uploadFile, 
							   filePath: that.tempFilePaths[that.j],
							   name: 'files',
							   formData: {
								   'userId': uni.getStorageSync('id'),
							   },
							   success: (uploadFileRes) => {							   
										if (JSON.parse(uploadFileRes.data).resultCode==0) {
											that.param.pictures.push(JSON.parse(uploadFileRes.data).obj[0]);
											 that.j++
									       that.getImg();
								 }	
							
							   }
						   });
						 uploadTask.onProgressUpdate((res) => {
									 that.progreessnum=res.progress
									 if(that.progreessnum>=100){
										 setTimeout(function(){
											  that.progreessnum=0
													},1000);
									 }
							
									 // 测试条件，取消上传任务。
									 // if (res.progress > 50) {
									 //     uploadTask.abort();
									 // }
								 });  
				}
			});
		},
		popUpVideo(){
			 // 上传视频
			                uni.chooseVideo({
			                    maxDuration:60,
			                    count: 1,
			                   compressed:false,
			                    success: (responent) => {
			                        let videoFile = responent.tempFilePath;
			                        uni.uploadFile({
			                            url:this.xdServerUrls.xd_uploadFile,
										formData: {
										    'userId': uni.getStorageSync('id'),
										},
			                            filePath:videoFile,
			                            name:'file',
			                            success: (res) => {                    
			                                // let videoUrls = JSON.parse(res.data) //微信和头条支持
											
			                              
			                                
			                            }
			                        })
			                    }
			                })
			
		},
		popUpMP3(){
			
		},
		getTime(){
			let _this = this;
		var date = new Date();
		var year = date.getFullYear();//当前年份 
		var month = date.getMonth()+1< 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1); //当前月份
		var day = date.getDate()< 10 ? "0" + date.getDate() : date.getDate();; //当前月份几号
		var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		  // _this.hour=hour;
		  //  _this.minute=minute;
		  //   _this.second=second;
		  _this.startTimes=date;
			_this.stTimes=year+'-'+month+'-'+day+' '+hour + ':' + minute + ':' + second;
		var timer = hour + ':' + minute + ':' + second;
		_this.times=timer;
		},
		timingStart() {
		    let _this = this;
			  _this.getTime();
		     _this.timeCount=setInterval(function() {
		        var nowTime = (Date.parse(new Date())) / 1000;
		      
		        var date = new Date(_this.strtime.replace(/-/g, '/'));
		        var time3 = (Date.parse(date)) / 1000;
		        var time4 = nowTime - time3;
		        var timeDay = Math.floor(time4 / 60 / 60 / 24);
		        var timeHour = Math.floor(time4 / 60 / 60) - timeDay * 24;
		        var timeMinute = Math.floor(time4 / 60) - timeDay * 24 * 60 - timeHour * 60;
		        var timeSecond = Math.floor(time4) - timeDay * 24 * 60 * 60 - timeHour * 60 * 60 - timeMinute * 60;
				if(timeHour<10){
								  timeHour='0'+timeHour
				}
				if(timeMinute<10){
						 timeMinute='0'+timeMinute		   
				}
				if(timeSecond<10){
						 timeSecond='0'+timeSecond		   
				}
		        // _this.timeHour = timeHour; // 小时
		        // _this.timeMinute = timeMinute; // 分钟
		        // _this.timeSecond = timeSecond; // 秒
				 _this.startTime = timeHour + ':' + timeMinute + ':' + timeSecond;
		    }, 1000);
			this.buttonStart=!this.buttonStart;
			},	
			stop(){
				var dd=new Date();
				clearInterval(this.timeCount); 
				var year = dd.getFullYear();//当前年份
				var month = dd.getMonth()+1< 10 ? "0" + (dd.getMonth()+1) : (dd.getMonth()+1); //当前月份
				var day = dd.getDate()< 10 ? "0" + dd.getDate() : dd.getDate();; //当前月份几号
				var hour = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
				var minute = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
				var second = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
				this.endTimes=year+'-'+month+'-'+day+' '+hour + ':' + minute + ':' + second;
				this.getDateCha(this.startTimes,dd);
				this.buttonStart=!this.buttonStart;
			},
			getDateCha(beginDate,endDate){  
			    var res={D:'00',H:'00',M:'00',S:'00',abs:true,error:false};  
			    //属性形式验证：第一次参数必须是Date类型，第二个参数可以为空，默认为new Date()  
			    if(typeof(endDate)=="undefined" || null== endDate||""==endDate ){endDate = new Date();}  
			    if( !(beginDate instanceof (Date)) ||  !(endDate instanceof (Date))){  
			        res.error=true;//"非法时间字符串";  
			        return res;  
			    }  
			  
			    //比较大小，保证差值一定是正数。  
			    if(beginDate>endDate){  
			        var tempDate = beginDate;  
			        beginDate = endDate;  
			        endDate=tempDate;  
			        res.abs=false;//表示beginDate大于endDate  
			    }  
			    var chaTime =(endDate.getTime()-beginDate.getTime());  
			      
			    var Day_Param  =1000*60*60*24;//一天等于毫秒数  
			    var Hour_Param = 1000*60*60;//一小时等于毫秒数  
			    res.D =Math.floor(chaTime/(Day_Param));//  
			  
			    chaTime = chaTime-res.D*Day_Param;//减去天的毫秒数。再求小时个数  
			    res.H = Math.floor(chaTime/(Hour_Param));  
			    chaTime = chaTime-res.H*Hour_Param;//减去小时的毫秒数。再求分钟个数  
			    res.M = Math.floor(chaTime/(1000*60));  
			    res.S=(chaTime-res.M*1000*60)/1000;//减去分钟的毫秒数。再求秒的个数  
			    //alert(res.S);  
			   if(res.H<10){
				   res.H='0'+res.H
			   }
			   if(res.M<10){
			   		 res.M='0'+res.M		   
			   }
			   if(Math.trunc(res.S)<10){
			   		 res.S='0'+Math.trunc(res.S)		   
			   }else{
				    res.S=Math.trunc(res.S)	
			   }
			   this.dayData= res.H+":"+res.M+":"+res.S;  
			   
			}  
			
	},
};
</script>

<style lang="scss">
.clockIn {
	padding: 30rpx 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.imagetip{
		border:4px solid #eee;
		color:#eee;
		position: relative;
		width:193rpx;
		height: 150rpx;
		// line-height: 100rpx;
		font-size: 100rpx;
		text-align: center;
		// margin-left: 35%;
	}
.clockbar {
	height: 100rpx;
	// line-height: 60rpx;

	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		display: block;
		height: 85rpx;
		width: 85rpx;
	}
}
.cl-time {
	.timetr {
		margin: 12rpx 0 0 0;
		.timesplit {
			margin: 0 15rpx;
		}
	}
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		&.mediaList {
			min-height: 200rpx;
			// border: 1px solid #dfdfdf;
			margin: 20rpx 10rpx;
			border-radius: 5px;
			display: flex;
			align-items: center;
			.section{
				margin-left: 15upx;
				margin-bottom: 12rpx;
				audio{
					width: 100%;
				}
				video{
					width: 100%;
				}
			}
		}
	}
}
.toMore{
	width: 220upx;
	height: 70upx;
	font-size: 26upx;
	margin-right: 10upx;
	padding-top: -40upx;
}
.inputarea {
	border: 1px solid #dfdfdf;
	border-radius: 5px;
	padding: 20rpx;
	height: 130rpx;
	width: auto;
}
.btn_bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	.btns {
		height: 120rpx;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-size: 28rpx;
		.btn {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffa700;
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
.itembtns {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.btn {
	display: block;
	font-size: 26rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: $xd-color-base;
	width: 200rpx;
	margin: 0 20rpx 0 0;
	&.other {
		background: #fd5107;
		color: #fff;
	}
	.videotip{
		height: 150upx;
		width: 150upx;
	}
}
</style>
