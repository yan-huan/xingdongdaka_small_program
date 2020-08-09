 <template>
	 <view class=" bg-white">
		 <view class="padding marginbottom">
			 <form @submit="submitFrom">
			 			 <view class="cu-list bg-blue menu-avatar">
			 				<view class="flex flex-wrap padding justify-between align-center">
			 					<view class="flex  flex-wrap " >
			 						<view class="text-xl">
			 							<text class="lg text-gray cuIcon-calendar"></text>
			 						</view>
			 						<view class="margin-left-xs">所属行动</view>
			 					</view>
			 					<view v-if="pushList.challengeRmb>0">
			 						<view class="cu-tag light bg-red radius" >
			 							保证金￥{{pushList.challengeRmb}}
			 						</view>
			 					</view>
			 				</view>
			 				<view class=" flex  p-xs padding mb-sm ">
			 					<image class="flex-sub bg-img imgheit"  :src="pushList.pictures" mode="aspectFill"
			 					 @tap="goPageImg(pushList.pictures)" v-if="pushList.pictures!=''">
			 					</image>
			 					<image class="flex-sub bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
			 					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
			 					</image>
			 					<view class="flex-twice text-content textheit" @tap="goAction(pushList.id)">
			 						<text class="contentext" >{{pushList.content}}</text>		
			 					</view>	
			 				</view>		
			 			 </view>
			 			 <view class=" flex flex-wrap padding solid-top align-center justify-between">
			 				<view class="flex flex-wrap">
			 					<view class="text-xl">
			 						<text class="lg text-gray cuIcon-activity"></text>
			 					</view>
			 					<text class="margin-left-xs">打卡内容</text>
			 				</view>
			 			 </view>
			 			 <view class="">
			 				<view class="cu-form-group align-start textare-heght">
			 					<textarea  class="textare-heght" :value="content" name="content" maxlength="500" :disabled="modalName!=null" placeholder="减肥,锻炼意志力,提高耐性,提升魅力..."></textarea>
			 				</view>
			 			 </view>
			 			 <view class="padding solid-top">
			 				<view class="flex flex-wrap">
			 					<view class="text-xl">
			 						<text class="lg text-gray cuIcon-camera"></text>
			 					</view>
			 					<text class=" margin-left-xs">上传图片、视频(视频小于100M)</text>
			 				</view>
			 				<view class="padding bg-white" v-if="loading>1">
			 					<view class="cu-progress round sm striped active">
			 						<view class="bg-green" :style="[{ width:loading+'%'}]"></view>
			 					</view>
			 				</view>
			 				<view class="">
			 					<view class="cu-form-group">
			 						<view class="grid col-4 grid-square flex-sub">
			 							<view class="bg-img" v-for="(item,index) in param.pictures" :key="index"  @tap="ViewImage(index)" :data-url="param.pictures" v-if="param.pictures.length>0">								
			 								<image :src="item" mode="aspectFill"></image>
			 								<view class="cu-tag bg-red">
			 									<text class='cuIcon-close'></text>
			 								</view>
			 							</view>
			 							<view class="solids" @tap="popUpImgs" v-if="param.pictures.length<9">
			 								<text class='cuIcon-cameraadd'></text>
			 							</view>
			 						</view>
			 					</view>
			 				</view>
			 				<view class="" v-if="videodata">
			 						<view class="flex flex-wrap " >	
			 							<video :src="videodata" controls></video>
										<view class="cu-tag bg-gray" @tap="Viewvideo">
											<text class='cuIcon-close'></text>
										</view>
			 						</view>
			 				</view>
							<view class="" v-if="MP3data">
								<view class="cu-form-group">	
										<view class="grid col-4 grid-square flex-sub">
											<view class="solids" >
												<text class=" cuIcon-playfill" v-if="plays" @tap="play"></text>
												<text class="cuIcon-stop" v-else @tap="stopplay"></text>
											</view>
										</view>
								</view>
							</view>
			 			 </view>
			 			
			 			 <view class="btn_bar">
			 				<button class="bg-green " form-type="submit">提交</button>
			 			 </view>
			 </form>
		 </view>
		 <view class="cu-modal bottom-modal" :class="popUp?'show':''">
		 	<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="popUpImgs">取消</view>
				</view>
		 		<view class="padding-xl">
		 			<view class="">
						<button type="default" @tap="popUpImg">上传图片</button>
					</view>
					<view class="">
						<button type="default"  @tap="popUpVideo">上传视频</button>
					</view>
					<!-- <view class="">
						<button type="default"  @tap="showmp">录音上传</button>
					</view> -->
		 		</view>
		 	</view>
		 </view>
		 <view class="cu-modal bottom-modal" :class="showmp3?'show':''">
		 	<view class="cu-dialog">
		 		<view class="padding-xl flex flex-direction justify-center">
					<view class="">
						<text>{{timeminute}}</text>
					</view>
					<view class="flex justify-center">
						<canvas canvas-id="canvas" style="width:60px;height:60px;">
							<span class="recording-button" @longtap="startRecord" @touchmove="move" @touchend="endRecord"></span>
						</canvas>
					</view>
					<view class="">
						<text>长安录音，放开保存</text>
					</view>
					
		 		</view>
		 	</view>
		 </view>
	 </view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import imtAudio from 'components/imt-audio/imt-audio'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
export default {
	components:{
		imtAudio
		
	},
	data() {
		return {
			plays:true,
			showmp3:false,
			popUp:false,
			buttonStart:false,
			param:{
				'pictures':[],
			},
			audioPlaySrc:'../static/images/icon/img/title.png',
			loading:'',
			pushId:'',
			videodata:'',
			MP3data:'',
			progreessnum:'',
			tempFilePaths:[],
			j:0,
			isShare:1,
			pushList:'',
			voicePath:'',
			
			max:120000, // 录音最大时长，单位毫秒
			frame: 50, // 执行绘画的频率，单位毫秒
			maxTiming: false, // 最长录音时间的定时器
			draw: undefined,
			timeminute:0, //显示秒数
			
			
		};
	},

	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onLoad(option) {
		this.pushId=option.pushId;
		this.getpushList();
	},
	methods: {
		stopplay(){
			innerAudioContext.stop;
			this.plays=true;
		},
		play(){
			innerAudioContext.setSrc=this.MP3data;
			innerAudioContext.play;
			this.plays=false;
		},
		popUpImgs(){
			this.popUp=!this.popUp;
		},
		showmp(){
			this.popUp=false;
			this.showmp3=!this.showmp3;
		},
		ViewImage(e){
			
			this.param.pictures.splice(e,1);
		},
		Viewvideo(){
			this.videodata='';
		},
		error: function() {	
			this.audioPlaySrc=this.xdUniUtils.xd_randomImg();
		            }  ,
		getpushList(){
						 if(!uni.getStorageSync('token')){
						 	uni.navigateTo({
						 		url: '../../login/login' 
						 	});
							return false
						 }
			this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
				            pushId:this.pushId,
							isShare:this.isShare,
							lookUserId:uni.getStorageSync('id'),
			},true).then(res=>{	
							if(res.resultCode==0){
								var data=res.obj;
								data.createTime=this.xdUniUtils.xd_timestampToTime(res.obj.createTime,false,false,true)
								data.endTime=this.xdUniUtils.xd_timestampToTime(res.obj.endTime,false,false,true)
								data.challengeRmb=res.obj.challengeRmb/100;
								this.pushList=data;
							}else{
								uni.showToast({
									title:res.msg,
									icon:'none',
								})
							}
							
			})
		},
		submitFrom(e){
			var end=undefined;
			if(!this.hasLogin){
				uni.navigateTo({
					url: '../login/login' 
				});
				return false;
			}
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '打卡不能为空',
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
						pictures:this.param.pictures,
						videos:this.videodata,
						extendContent:this.MP3data,
					},true).then(res=>{
						var that=this;
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 1500,
							
							success() {
								uni.reLaunch({
									url: '../index/cardDetails/cardDetails?pushId='+that.pushId+'&cardId='+res.obj+'&show=0'
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
			
			 
			
			
		},
		popUpImg(){
			const that = this;
			if(that.videodata!=''){
				uni.showToast({
				    title: '已上传视频无法上传图片',
					icon:'none',
				    duration: 2000
				});
				return false
			}
			that.popUp=false;
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
									 that.loading=res.progress
									 if(that.loading>=100){
										 setTimeout(function(){
											  that.loading=0;
													},1000);
									 }
							
								 });  
				}
			});
		},
		popUpVideo(){
			 // 上传视频
			 const that = this;
			 if(that.videodata!=''){
			 	uni.showToast({
			 	    title: '已上传视频',
			 		icon:'none',
			 	    duration: 2000
			 	});
			 	return false
			 }
			 that.popUp=false;
				uni.chooseVideo({
					maxDuration:60,
					count: 1,
				    compressed:false,
					sourceType: ['album'],
					success: (responent) => {
						let videoFile = responent.tempFilePath;
						if(responent.size<100*1024*1024){
							const uploadTask =uni.uploadFile({
								url:that.xdServerUrls.xd_uploadFile,
								method:"POST",
								formData: {
									'userId': uni.getStorageSync('id'),
								},
								filePath:videoFile,
								name:'files',
								success: (res) => {                    
									that.videodata = JSON.parse(res.data).obj[0] 
							
								}
							})
							uploadTask.onProgressUpdate((res) => {
								 that.loading=res.progress
								 if(that.loading>=100){
									 setTimeout(function(){
										  that.loading=0;
												},1000);
								 }
												
							 });  
						}else{
							uni.showToast({
							    title: '视频应<20M',
								mask:true,
							    duration: 2000,
								
							});
							return false
						}
						
					}
				})
			
		},
		startRecord(e) {
			
		     let that=this;
		                recorderManager.start({
							duration:600000,
							format:'mp3'
						}
						);
						that.maxTiming = setTimeout(function() {
							clearInterval(that.draw);
							console.log('时间到');
					
						}, that.max);
						let x=e.detail.x/2;
						let y=e.detail.y/2;
						
						// 录音过程圆圈动画
						let angle = -0.5;
						var millisecond = 0; //毫秒
						let context = uni.createCanvasContext('canvas');
						that.draw = setInterval(function() {
							millisecond = millisecond + 50;
							if (millisecond >= 1000) {
								console.log(millisecond)
								millisecond = 0;
								that.timeminute = that.timeminute+1;
											}
							context.beginPath();
							context.setStrokeStyle("#1296db");
							context.setLineWidth(3);
							context.arc(30, 30, 25,  -0.5 * Math.PI, (angle += 2 / (that.max / that.frame)) * Math.PI, false);
							context.stroke();
							context.draw(false);
						}, that.frame);
		            },
		endRecord(e) {
			let that=this;
			clearInterval(that.draw);
			that.showmp3=false;
			recorderManager.stop();
	        recorderManager.onStop(function (res) {
				const	voicePath = res.tempFilePath;
					const uploadTask =uni.uploadFile({
						url:that.xdServerUrls.xd_uploadFile,
						method:"POST",
						 header: {
						          "Content-Type": "multipart/form-data"
						        },
						formData: {
							'userId': uni.getStorageSync('id'),
						},
						filePath:voicePath,
						name:'files',
						success: (res) => {    
							that.timeminute=0;
							that.MP3data = JSON.parse(res.data).obj[0] 
						}
					})
					uploadTask.onProgressUpdate((res) => {
						 that.loading=res.progress
						 if(that.loading>=100){
							 setTimeout(function(){
								  that.loading=0;
										},1000);
						 }
										
					 });  
					
				});
		},
	},
};
</script>

<style lang="scss">
 .imgheit{
	width: 150upx;
	height: 180upx;
}
.btn_bar{
	position:fixed;
	bottom: 0;
	width: 92%;
	margin-bottom: 10upx;
}
.textare-heght{
	min-height: 250upx;
	max-height: 400upx;
}
.mp3img{
	position: absolute;
	width: 100%;
	height: 300upx;
	bottom: 0;
	z-index: 999;
}
#canvas {
		position: relative;
		width: 200upx;
		height: 200upx;
		z-index: 10;
	}

	.recording-button {
		position: absolute;
		box-sizing: border-box;
		display: inline-block;
		width: 90upx;
		height: 90upx;
		border: 1px dashed #1296DB;
		border-radius: 100upx;
		background: url(../../static/images/icon/recording.png) no-repeat 50% 50%;
		background-size: 50% 50%;
		z-index: 100;
		right: 10upx;
		top: 10upx;
	}
	.marginbottom{
		margin-bottom: 30upx;
	}
	.textheit{
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; ; 
	}
</style>
