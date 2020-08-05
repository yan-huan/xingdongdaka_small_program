<template>
	<view >
		<view class="cu-card dynamic " :class="pusCardLists.pictures!='' ?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item ">
						<view @tap="goUser(pusCardLists.userId)" class="cu-avatar round lg" :style="{backgroundImage: 'url(' +pusCardLists.userHead + ')'}" ></view>
						<view class="content flex-sub">
							<view @tap="goUser(pusCardLists.userId)">{{pusCardLists.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{pushCardCreateTime }} 
							</view>
						</view>
						<view >
							<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0" @tap="tags">
								{{guanzhu}}
							</view>
						</view>
					</view>
				</view>				
				<view class="text-contents margin-top-sm">
					<view class="cu-tag bg-pink radius sm" >第{{dakacishu}}次打卡</view>
					<text class="contentext" >{{showCardCommentlist.pushCard.content}}</text>			
				</view>	
				<view class="padding-lr" v-if="showCardCommentlist.pushCard.videos!=''&&showCardCommentlist.pushCard.videos!=undefined&&showCardCommentlist.pushCard.videos!=null">
					<video class="videoheit" :src="showCardCommentlist.pushCard.videos" controls></video>
				</view>
				<view class="grid flex-sub padding-lr" :class="showCardCommentlist.pushCard.pictures.length>1?'col-3 grid-square':'col-1'" >
					<view class="bg-img" :class="showCardCommentlist.pushCard.pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in showCardCommentlist.pushCard.pictures" :key="index" @tap="goPageImg(showCardCommentlist.pushCard.pictures,index)" >
					</view>
					<view class="" v-if="showCardCommentlist.pushCard.extendContent">	
					    <imt-audio continue :src="showCardCommentlist.pushCard.extendContent" :duration="8" @prev="next"
		 @next="next"></imt-audio>
		              </view>
					<image class="bg-img imgheit "  :src="showCardCommentlist.pushCard.pictures" v-if="showCardCommentlist.pushCard.pictures.length==0" mode="aspectFill"
					 @tap="goPageImg(showCardCommentlist.pushCard.pictures)"  >
					</image>
				</view>
				<view class="cu-list bg-blue menu-avatar">
					<view class="flex flex-wrap padding justify-between align-center">
						<view class="flex  flex-wrap " >
							<view class="">所属行动</view>
							<view class="text-gray text-sm  margincardlist ">
								{{pusCardLists.createTime }}  ({{pusCardLists.pushCardCount}}/{{pusCardLists.targetDay}})
							</view>
						</view>
						<view v-if="pusCardLists.challengeRmb>0">
							<view class="cu-tag light bg-red radius" >
								保证金￥{{pusCardLists.challengeRmb}}
							</view>
						</view>
					</view>
					<view class=" flex  padding">
						<image class="bg-img imgheit"  :src="pusCardLists.pictures" mode="aspectFill"
						 @tap="goPageImg(pusCardLists.pictures)" v-if="pusCardLists.pictures!=''">
						</image>
						<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
						 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
						</image>
						<view class="text-content textheit margin-left-sm" @tap="goAction(pusCardLists.id)">
							<text class="contentext" >{{pusCardLists.content}}</text>		
						</view>	
					</view>		
				</view>
				
				<view class="flex padding justify-between">
					<view class="text-xxl" @tap="showInputComent()">
						<text class="text-gray cuIcon-comment "></text>
						<text class="text-gray text-df">评论:({{showCardCommentlist.pushCommentList.length?showCardCommentlist.pushCommentList.length:0}})</text>
					</view>
					<view>
						<button class="cu-btn bg-light-blue sm round" v-if="pusCardLists.userId==userId"  :id="index" open-type="share">分享邀请</button>
						<button class="cu-btn bg-orange sm round  " v-else-if="pusCardLists.onlooker" open-type="share">为TA打Call</button>
						<button class="cu-btn bg-green sm round  " v-else-if="pusCardLists.userId!=userId && !pusCardLists.onlooker&&pusCardLists.challengeRmb<=0"  @tap="lookerClick(pusCardLists,index)">围观</button>
						<button class="cu-btn bg-green sm round  " v-else  @tap="lookerClick(pusCardLists,index)">围观分钱</button>
						<text class="text-gray text-df ">{{pusCardLists.onlookerCount}}</text>
					</view>
				</view>
				<view class="">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item" v-for="(item,index) in showCardCommentlist.pushCommentList" :key='index'>
							<view class="cu-avatar round" :style="{backgroundImage: 'url(' +item.userHead + ')'}" @tap="goUser(item.userId)"></view>
							<view class="content">
								<view class="flex flex-wrap align-center justify-around">
									<view class="text-grey" @tap="goUser(item.userId)">{{item.userName}}  
									</view>
									<view class=" ">
										<view class="text-gray text-df">{{item.createTimeStr}}</view>
									</view>
									<view class="text-grey" @tap="userRepaly(item,index)">回复</view>
								</view>
								<view class="text-content text-df commenttext">
									评论：{{item.content}}
								</view>
								<view class="bg-gray padding-sm radius margin-top-sm  text-sm" v-if="showCardCommentlist.pushCommentList[index].cardReplayCommentList.length>0">
									<view class="flex"  v-for="(items,index) in showCardCommentlist.pushCommentList[index].cardReplayCommentList" :key='index'>
										{{items.userName}} 回复
										<view @tap="goUser(items.replayUserId)"> {{ item.userName}}：</view>
										<view class="flex-sub">{{items.content}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box" v-if="showInput" >
				<view class="cu-barbox input">
					<view class="action">
						<text >评论</text>
					</view>
					<input  @input="InputBlur" :adjust-position="true" class="solid-bottom" :focus="showInput" :placeholder='conmmmenttext' maxlength="30" cursor-spacing="10"></input>

					<button class="cu-btn bg-green shadow-blur" @tap="inputComent">发送</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import imtAudio from 'components/imt-audio/imt-audio'
	const audio = uni.createInnerAudioContext(); //创建音频
	export default {
		components:{
			imtAudio
			
		},
		data() {
			return {
				audioPlaySrc:'../../../static/images/icon/img/ti.png',
				showInput:false,
				pusCardLists:undefined,
			
				value:'',
				id:uni.getStorageSync('id'),
				userId:uni.getStorageSync('id'),
				inputType:2,//2评论，1回复
				cardId:'',
				dataCardId:'',
				indexId:'',
				pushUserId:'',
				commentId:'',
				pushId:'',
				tolist:false,
				conmmmenttext:'请输入评论内容',
				showCardCommentlist:'',
				guanzhu:'关注',
				pushCardCreateTime:'',
				dakacishu:0
			}
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onShareAppMessage(res) {
			
			let that = this;
			if(!that.hasLogin){
				uni.navigateTo({
					url: '../../login/login' 
				});
				return false;
			}
			
			if(res.from=="menu"){
			return	that.xdUniUtils.xd_onShare();
			}else{
				that.setSaveShareInfo();
				let text=that.pusCardLists.userId==that.userId? '第'+that.dakacishu+'次打卡:'+that.pusCardLists.pushCardList[0].content:'我为@'+that.pusCardLists.userName+'打Call：'+that.pusCardLists.pushCardList[0].content;
				let pathText='/pages/index/action/action?pushId='+ that.pusCardLists.id+'&share='+that.id+'&isopen='+that.pusCardLists.isopen;
				let  img=that.showCardCommentlist.pushCard.pictures[0]?that.showCardCommentlist.pushCard.pictures[0]:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png';
			return	that.xdUniUtils.xd_onShare(text,pathText,img);
			}
		},
		onLoad(option) {		
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			this.pushId=option.pushId;
			this.cardId=option.cardId;
			if(option.show==1){
				this.showInput=true;
			}
			this.getshowCardComment();
			this.getpushList();
			
		},
		methods: {
			//围观
			
			lookerClick:function(list){
				var that=this ;
				if(!that.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				that.userId=uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
					
					pushId:list.id,
					lookUserId:that.userId,
				},false
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.pusCardLists.onlooker=true
							   that.pusCardLists.onlookerCount++;
							  if(uni.getStorageSync(new Date().toLocaleDateString()+"dycwgKey") != 1){
								   uni.showModal({
										 content: that.xdCommon.gzsm_wgglts,
										 showCancel: false,
										 buttonText: '知道了',
										 success: (res) => {
										   if (res.confirm) {
											 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
										   } else if (res.cancel) {
											 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
										   }
										 }
									})
							  }else{
								  uni.showToast({
										title:'围观成功',
										 duration: 1000,
										 icon:'none',
								  }) 
							  }
						   }else{
							   uni.showToast({
								title: res.msg,
								 duration: 1000,
								 icon:'none',
							   })
						   }
						   
					
				})
			},
			goAction(e){
				uni.navigateTo({
					url:'/pages/index/action/action?pushId='+e
				})
			},
			setSaveShareInfo(){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pusCardLists.id,
					shareUserId:uni.getStorageSync('id'),
				},true
				   ).then(res => {
					   console.log(res)
					   })
			},
			goUser(e){
				
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
			},
			goSteps(){
				
				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId='+this.pusCardLists.id
				});
			},
			 goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index);
			},
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg();
			            }  ,
			
			getshowCardComment(){
				this.xd_request_post(this.xdServerUrls.xd_showCardComment,{
					cardId:this.cardId,
				},true).then(res=>{	
					var data=res.obj;
					var imgs=[];
					if(data.pushCard.pictures!=''){
						imgs=data.pushCard.pictures.split(",");
						data.pushCard.pictures=imgs;
					}else{
						data.pushCard.pictures=[];
					}
					
					this.showCardCommentlist=data
					
				})
			},
			userRepaly(e,indexs){
				if(e.userId==this.id){
					uni.showToast({
						title:'无法回复自己',
						 duration: 1000,
						 icon:'none',
					})
					return false;
				}
				this.commentId=e.id;
				this.showInput=true;
				// this.indexId=indexs.pushCard.id;
				this.userId=e.userId,
				this.dataCardId=e.cardId;
				this.inputType=1;
				this.conmmmenttext='回复：'+e.userName
			},
			inputComent(e){			
				if(this.inputType==1){
					this.xdUniUtils.xd_request_text({content:this.value}).then(res=>{
						if(res.obj.errcode==0){
							this.xd_request_post(this.xdServerUrls.xd_saveCardReplayComment,{
								replayUserId:this.userId,
								commentId:this.commentId,
								cardId:this.dataCardId,
								userId:this.id,
								
								content:this.value,
							},true).then(res=>{
							
								this.showInput=false;
								this.value='';
								if (res.resultCode == 0) {
									var data=res.obj;
									this.showCardCommentlist=data
								}
							})
						}else{
							uni.showToast({
							    title: '内容包含敏感内容',
								mask:true,
							    duration: 2000,
								
							});
							return false
						}})
				}else if(this.inputType==2){
					this.xdUniUtils.xd_request_text({content:this.value}).then(res=>{
						if(res.obj.errcode==0){
							this.xd_request_post(this.xdServerUrls.xd_saveCardComment,{
								cardId:this.dataCardId?this.dataCardId:this.cardId,
								userId:this.id,
								content:this.value,
							},true).then(res=>{
								
								this.showInput=false;
								this.value='';
								/* uni.redirectTo({
									url:'../cardDetails/cardDetails?pushId='+this.pushId+'&cardId='+this.cardId+'&show=0'
								}) */
								 if (res.resultCode == 0) {
									var data=res.obj;
									this.showCardCommentlist=data
								} 
								
							})
						}else{
							uni.showToast({
							    title: '内容包含敏感内容',
								mask:true,
							    duration: 2000,
								
							});
							return false
						}})
						
					
				}
	
				
			},
			InputBlur(e){
				this.value=e.detail.value;
			},
			showInputComent(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				this.showInput=!this.showInput;
				this.inputType=2;
				this.conmmmenttext='请输入评论内容'
			},
			getpushList(){
				this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
					pushId:this.pushId,
					token:uni.getStorageSync('token')
				},true).then(res=>{	
					var data =res.obj;
					data.challengeRmb=res.obj.challengeRmb/100;
					var time=this.xdUniUtils.xd_timestampToTime(res.obj.createTime,false,false,true);
					data.createTime=time;
					this.pusCardLists=data;
					this.pushCardCreateTime=this.xdUniUtils.xd_timestampToTime(this.pusCardLists.pushCardList[0].createTime,false,true,false)
					if(data.userId == uni.getStorageSync('id')){
						this.guanzhu =''
					}else{
						this.xd_request_post(this.xdServerUrls.xd_iSAttention,{
							userId:uni.getStorageSync('id'),
							attentionUserId:data.userId,
						},true)
						.then(res=>{
							if(res.obj){
								this.guanzhu ='已关注'
							}else{
								this.guanzhu ='关注'
							}
							
						})
					}
					if(typeof data.pushCardList !== undefined){
						data.pushCardList.forEach(item =>{
							if(this.cardId == item.id){
								this.dakacishu = item.cardIndex
							}
						});
						if(this.dakacishu == 0){
							//兼容之前的数据
							this.dakacishu = this.pusCardLists.pushCardCishuCount
						}
					}
					
				})
			},
			strToArr(res){
				var dataList=res;
				for(var i=0;i <res.length;i++){
					if(res[i].pushCard.pictures){
						 dataList[i].pushCard.pictures=res[i].pushCard.pictures.split(",")
					}
				}
				
				return dataList;
			},
			tags(){
				if(this.guanzhu =='已关注'){
					return
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pusCardLists.userId,		
					
				},true).then(res=>{
					if(res.resultCode == 0){
						 this.guanzhu="已关注"
						 uni.showToast({
						 	icon:'none',
						   title: '关注成功',
						 })
					}else{
						uni.showToast({
							icon:'none',
						  title: res.msg,
						})
					}
				})
			},
			
		}
	}
</script>

<style  scoped lang="scss">
	.imgheit{
		width: 150upx;
		height: 80upx;
	}
	.textheit{
		width: 80%;
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; ; 
	}
	.cu-barbox{
		position: fixed;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 100rpx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		bottom: 0;
		background-color: #FFFFFF;
		width: 100%;
		padding: 0 20upx 0 20upx;

	}
	.margincardlist{
		margin-top: 10upx;
	}
	.commenttext{
		margin-left: 30upx;
	}
	.bg-light-blue{background-color: #007AFF;}
	.videoheit{
		width: 100%;
		height: 360upx;
	}
</style>
