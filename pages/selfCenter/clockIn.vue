 <template>
	 <view class="padding bg-white">
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
				<view class=" flex  padding">
					<image class="bg-img imgheit"  :src="pushList.pictures" mode="aspectFill"
					 @tap="goPageImg(pushList.pictures)" v-if="pushList.pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
					<view class="text-content textheit" @tap="goAction(pushList.id)">
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
					<text class=" margin-left-xs">上传图片</text>
				</view>
				<view class="padding bg-white" v-if="loading>1">
					<view class="cu-progress round sm striped active">
						<view class="bg-green" :style="[{ width:loading+'%'}]"></view>
					</view>
				</view>
				<view class="">
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img"  @tap="ViewImage" :data-url="param.pictures" v-if="param.pictures!=''">
							 <image :src="param.pictures" mode="aspectFill"></image>
								<view class="cu-tag bg-red">
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
			
			 <view class="btn_bar">
				<button class="bg-green " form-type="submit">提交</button>
			 </view>
		 </form>
		 <button type="default" @tap="showmp">12313213 </button>
		 <view class="cu-modal bottom-modal" :class="showmp3?'show':''">
		 	<view class="cu-dialog">
		 		<view class="padding-xl">
		 			<canvas canvas-id="canvas" style="width:100px;height:100px;">
		 				<span class="recording-button" @touchstart="startRecord" @touchmove="move" @touchend="endRecord"></span>
		 			</canvas>
		 		</view>
		 	</view>
		 </view>
	 </view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
export default {
	data() {
		return {
			showmp3:false,
			buttonStart:false,
			param:{
				'pictures':[],
			},
			audioPlaySrc:'../static/images/icon/img/title.png',
			loading:'',
			pushId:'',
			videodata:'',
			progreessnum:'',
			tempFilePaths:[],
			j:0,
			isShare:1,
			pushList:'',
			voicePath:'',
			
			max: 5000, // 录音最大时长，单位毫秒
			frame: 50, // 执行绘画的频率，单位毫秒
			longTag: false, // 判定长按和点击的标识
			maxTiming: false, // 最长录音时间的定时器
			draw: undefined,
			seconds: '00',
			ms: '00'
			
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
		showmp(){
			this.showmp3=!this.showmp3;
		},
		ViewImage(){
			
			this.param.pictures=[];
		},
		error: function() {
			
			var num=Math.floor(Math.random()*8+1);
			this.audioPlaySrc='../../static/images/icon/img/title'+num+'.png'
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
				uni.chooseVideo({
					maxDuration:60,
					count: 1,
				    compressed:false,
					sourceType: ['album'],
					success: (responent) => {
						let videoFile = responent.tempFilePath;
						console.log(videoFile)
						uni.uploadFile({
							url:this.xdServerUrls.xd_uploadFile,
							method:"POST",
							formData: {
								'userId': uni.getStorageSync('id'),
							},
							filePath:videoFile,
							name:'files',
							success: (res) => {                    
								let videoUrls = JSON.parse(res.data) //微信和头条支持
								console.log(videoUrls.obj[0])
							  
								
							}
						})
					}
				})
			
		},
		startRecord(e) {
			console.log(e)
		                console.log('开始录音');
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
						
						// 录音过程圆圈动画
						let angle = -0.5;
						let context = uni.createCanvasContext('canvas');
						that.draw = setInterval(function() {
							context.beginPath();
							context.setStrokeStyle("#1296db");
							context.setLineWidth(3);
							context.arc(50, 50, 25, -0.5 * Math.PI, (angle += 2 / (that.max / that.frame)) * Math.PI, false);
							context.stroke();
							context.draw();
						}, that.frame);
		            },
		endRecord(e) {
			console.log(e)
			let that=this;
			console.log('录音结束');
			recorderManager.stop();
	        recorderManager.onStop(function (res) {
				const	voicePath = res.tempFilePath;
					uni.uploadFile({
						url:that.xdServerUrls.xd_uploadFile,
						 header: {
						          "Content-Type": "multipart/form-data"
						        },
						formData: {
							'userId': uni.getStorageSync('id'),
						},
						filePath:voicePath,
						name:'files',
						success: (res) => {                    
							let videoUrls = JSON.parse(res.data) //微信和头条支持
							console.log(videoUrls.obj[0])
						  
							
						}
					})
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
	position: absolute;
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
		top: 50upx;
		left: 50upx;
		display: inline-block;
		width: 100upx;
		height: 100upx;
		border: 1px dashed #1296DB;
		border-radius: 100upx;
		background: url(../../static/images/icon/recording.png) no-repeat 50% 50%;
		background-size: 50% 50%;
		z-index: 100;
	}
</style>
