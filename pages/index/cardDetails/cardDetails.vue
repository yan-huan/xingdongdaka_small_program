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
								{{pusCardLists.createTime }} 
							</view>
						</view>
						<view >
							<view class="cu-tag line-orange radius"  @tap="tags">
								关注
							</view>
						</view>
					</view>
				</view>				
				<view class="text-content">
					<view class="cu-tag bg-pink radius sm" >第{{pusCardLists.pushCardCount}}次打卡</view>
					<text class="contentext" >{{showCardCommentlist.pushCard.content}}</text>			
				</view>			
				<view class="grid flex-sub padding-lr" :class="showCardCommentlist.pushCard.pictures.length>1?'col-3 grid-square':'col-1'" >
					<view class="bg-img" :class="showCardCommentlist.pushCard.pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in showCardCommentlist.pushCard.pictures" :key="index" @tap="goPageImg(showCardCommentlist.pushCard.pictures)" >
					</view>
					<image class="bg-img imgheit "  :src="showCardCommentlist.pushCard.pictures" v-if="showCardCommentlist.pushCard.pictures.length==0" mode="aspectFill"
					 @tap="goPageImg(showCardCommentlist.pushCard.pictures)"  >
					</image>
				</view>
				<view class="cu-list menu-avatar">
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
						<view class="text-content textheit">
							<text class="contentext" >{{pusCardLists.content}}</text>		
						</view>	
					</view>		
				</view>
				
				<view class="flex padding justify-between">
					<view class="text-xxl" @tap="showInputComent()">
						<text class="text-gray cuIcon-comment "></text>
						<text class="text-gray text-df">评论:({{showCardCommentlist.pushCommentList.length}})</text>
					</view>
					<view>
						<button class="cu-btn bg-pink sm round" v-if="pusCardLists.userId==userId || pusCardLists.onlooker "  :id="index" open-type="share">邀请围观</button>
						<button class="cu-btn bg-pink sm round  " v-else-if="pusCardLists.userId!=userId && !pusCardLists.onlooker&&pusCardLists.challengeRmb<=0"  @tap="lookerClick(list,index)">围观</button>
						<button class="cu-btn bg-pink sm round  " v-else  @tap="lookerClick(pusCardLists,index)">围观分钱</button>
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
								<view class="text-gray text-content text-df">
									评论：{{item.content}}
								</view>
								<view class="bg-gray padding-sm radius margin-top-sm  text-sm" v-for="(items,index) in showCardCommentlist.pushCommentList.cardReplayCommentList" :key='index' v-if="showCardCommentlist.pushCommentList.cardReplayCommentList">
									<view class="flex">
										{{items.userName}} 回复
										<view @tap="goUser(items.replayUserId)"> {{ items.userName}}：</view>
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
					<view class="action">
					</view>
					<button class="cu-btn bg-green shadow-blur" @tap="inputComent">发送</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				audioPlaySrc:'../../../static/images/icon/img/ti.png',
				showInput:false,
				pusCardLists:undefined,
			
				value:'',
				id:uni.getStorageSync('id'),
				userId:'',
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
				
				
			}
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onReady(e) {		
			// var that=this;
			// let int = setInterval(function() {
			// if (that.cardList&&that.tolist) {
			// 	uni.createSelectorQuery().in(that).select('#index'+that.cardId).boundingClientRect(data=>{//目标节点
			// 	　　uni.createSelectorQuery().select(".card-list").boundingClientRect((res)=>{//最外层盒子节点
			// 	　　　　uni.pageScrollTo({
			// 	　　　　　　duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
			// 	　　　　　　scrollTop:data.top-res.top ,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
			// 	　　　　})
			// 	　　}).exec()
			// 	}).exec(); 
			// 	clearInterval(int);
			// 	}else if(!that.tolist){
			// 		clearInterval(int);
			// 	}
			// }, 100); 
			
			
		},
		onShareAppMessage(res) {
			
			let that = this;
			if(!that.hasLogin){
				uni.navigateTo({
					url: '../../login/login' 
				});
				return false;
			}
			
			that.setSaveShareInfo(res);
			if(res.target.id<0){
				return {
					title: that.pusCardLists.content,
					path: '/pages/index/action/action?pushId='+ that.pusCardLists.id+'&share='+that.id+'&isopen='+that.pusCardLists.isopen,
					imageUrl:that.pusCardLists.pictures?that.pusCardLists.pictures:'../../../static/images/icon/img/title1.png',
				}
			}else {
				return {
					title: that.cardList[res.target.id].pushCard.content,
					path: '/pages/index/action/action?pushId='+ that.pusCardLists.id+'&share='+that.id+'&isopen='+that.pusCardLists.isopen,
					imageUrl:that.cardList[res.target.id].pushCard.pictures[0]?that.cardList[res.target.id].pushCard.pictures[0]:'../../../static/images/icon/img/title1.png',
				}
			}	
					
		},
		onLoad(option) {
			
			
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
							   that.pusCardLists.lookerCount++;
							   uni.showToast({
								title:'围观成功',
								 duration: 1000,
								 icon:'none',
							   })
						   }else if(res.resultCode==10015){
							   uni.showToast({
								title:'您已经围观了',
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
			setSaveShareInfo(res){
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
			 goPageImg(e){
				var imgs='';
				for(let i=0;i<this.cardList.length;i++){
					if(this.cardList[i].pushCard.pictures!=''){
						if(i==this.cardList.length-1){
							imgs=imgs.concat(this.cardList[i].pushCard.pictures)	
						}else{
							imgs=imgs.concat(this.cardList[i].pushCard.pictures+',')	
						}
					}
				}
				uni.navigateTo({
					url:'../../img/img?url='+encodeURIComponent(JSON.stringify(imgs))+'&indexs='+e
				})
			},
			error: function() {
				var num=Math.floor(Math.random()*8+1);
				
				this.audioPlaySrc='../../../static/images/icon/img/title'+num+'.png'
				
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
						this.xd_request_post(this.xdServerUrls.xd_saveCardReplayComment,{
							replayUserId:this.userId,
							commentId:this.commentId,
							cardId:this.dataCardId,
							userId:this.id,
							
							content:this.value,
						},true).then(res=>{
						
							this.showInput=false;
							this.value='';
							uni.redirectTo({
								url:'../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pusCardLists))
							})
						})
				}else if(this.inputType==2){	
						this.xd_request_post(this.xdServerUrls.xd_saveCardComment,{
							cardId:this.dataCardId?this.dataCardId:this.cardId,
							userId:this.id,
							content:this.value,
						},true).then(res=>{
							
							this.showInput=false;
							this.value='',
							uni.redirectTo({
								url:'../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pusCardLists))
							})
						})
					
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
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pusCardLists.userId,		
					
				},false).then(res=>{
					
					uni.showToast({
						icon:'none',
					  title: res.msg,
					})
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
		height: auto;
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

	}
	.margincardlist{
		margin-top: 10upx;
	}
</style>
