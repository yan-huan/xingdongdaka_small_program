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
	 </view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
export default {
	data() {
		return {
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
</style>
