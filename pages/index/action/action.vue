<template>
	<view >
		<view class="cu-card dynamic " :class="pushList.pictures!=''?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="flex flex-wrap padding justify-between">
						<view class=" " >
							<view class="cu-tag bg-grey radio">标签</view>
							<view class="text-gray text-sm ">
								{{pushList.createTime }}  ({{pushList.pushCardCount}}/{{pushList.targetDay}})
							</view>
						</view>
						<view v-if="pushList.challengeRmb>0">
							<view class="cu-tag light bg-red radius" >
								保证金￥{{pushList.challengeRmb}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="text-content">
					<text class="contentext" >{{pushList.content}}</text>
				</view>
				<view class="grid flex-sub padding-lr"  >
					<image class="bg-img imgheit"  :src="pushList.pictures" mode="aspectFill"
					 @tap="goPageImg(pushList.pictures)" v-if="pushList.pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<view class="flex padding justify-between">
					<view class="text-xxl" @click="goSteps" v-if="pushList.pushCardCount<pushList.targetDay">
						<button class="cu-btn bg-pink sm round  " @click="goSteps" >立即打卡</button>
					</view>
					<view>
						<button class="cu-btn bg-pink sm round" v-if="pushList.userId==userId || pushList.onlooker "  :id="index" open-type="share">邀请围观</button>
						<button class="cu-btn bg-pink sm round  " v-else-if="pushList.userId!=userId && !pushList.onlooker&&pushList.challengeRmb<=0"  @tap="lookerClick(list,index)">围观</button>
						<button class="cu-btn bg-pink sm round  " v-else  @tap="lookerClick(pushList,index)">围观分钱</button>
						<text class="text-gray text-df ">{{pushList.onlookerCount}}</text>
					</view>
				
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['打卡内容','围观的人']" :key="index" @tap="tabSelect" :id="index" >
						{{items}}
					</view>
				</view>
			</scroll-view>
			<block v-for="(item,index) in pusCardList" :key="index" v-if="TabCur==0">
				<view class="cu-timeline">
					<view class="cu-time">{{index+1}}</view>
					<view class="cu-item">
						<view class="content">
							<view class="cu-capsule radius">
								<view class="cu-tag line-cyan">第{{index+1}}次打卡</view>
							</view>
							<view class="margin-top">{{item.content}}</view>
							<view class="grid flex-sub padding-lr"  >
								<image class="bg-img imgheit"  :src="item.pictures" mode="aspectFill"
								 @tap="goPageImg(item.pictures)" v-if="item.pictures!=''">
								</image>
							</view>
							<view class="text-xxl" @tap="goComent(list)">
								<text class="text-gray cuIcon-comment "></text>
								<text class="text-gray text-df">{{item.commentCount}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				TabCur: 0,
				pushComentList:[],
				pusCardList:[],
				pushList:{},
				modal: false,
				addrAnimation:'',
				audioPlaySrc:'../../../static/images/icon/img/titl.png',
				userId:uni.getStorageSync('id'),
				share:'',
				lookerList:[],
				pushId:'',
				isShare:0,
				
			};
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {
			if(option.pushList==undefined){
				this.pushId=option.pushId;
				if(option.share!=undefined){
					this.share=option.share;
					this.isShare=option.isopen;
					console.log(option.isopen)
				}
				this.getpushList();
			}
		},
		onShow() {	
			
		this.clickSaveShareInfo();
		if(this.pushList){
			this.getpushList();
		}
		},
		
		onShareAppMessage(res) {
			let that = this;
			
			if(that.pusCardList.length>0){
				that.setSaveShareInfo();
				return {
					title: that.pusCardList[0].content,
					path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.userId+'&isopen='+that.pushList.isopen,
					imageUrl:that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'../../../static/images/icon/img/title1.png',
				}
				
			}else{
				that.setSaveShareInfo();
				return {
					title: that.pushList.content,
					path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.userId+'&isopen='+that.pushList.isopen,
					imageUrl:that.pushList.pictures?that.pushList.pictures:'../../../static/images/icon/img/title1.png',
				}
				
			}
			
					
		},
		methods:{
			tabSelect(e){
				this.TabCur=e.target.id;
			},
			setSaveShareInfo(){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pushId,
					shareUserId:this.userId,
				},true
				   ).then(res => {
					  
					   })
			},
			clickSaveShareInfo(){
				if(this.share!=''){
					this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
						pushId:this.pushId,
						shareUserId:this.share,
						clickUserId:this.userId,
					},true
					   ).then(res => {
						 
						   })
				}
			},
			getShareInfo(){
				if(this.share==''||this.share==undefined){
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pushId,
					shareUserId:this.share,
					clickUserId:this.userId,
				},true
				   ).then(res => {
					  
					   })
			},
			goUser(e){
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
			},
			//围观
			lookerClick:function(list,index){
				var that=this ;
				that.userId=uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
					
					pushId:list.id,
					lookUserId:that.userId,
				},true
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.pushList.onlooker=true
							   that.pushList.lookerCount++;
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
			goSteps(){
				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId='+this.pushList.id
				});
			},
			goPageImg(e){
				uni.navigateTo({	
					url:'../../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			},
			error: function() {
				var num=Math.floor(Math.random()*8+1);
				
				this.audioPlaySrc='../../../static/images/icon/img/title'+num+'.png'
				
			            }  ,
						
			gocardComentList(e){
				if(this.pushList.pushCardList.length<=0){
					var da={
						id:e.id,
						userId:e.userId
					};
					this.pushList.pushCardList.push(da);
				}
				
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pushList))
				});
			},
			cardComentList(e){			
				var data=[];
				data.push(e);
				if(this.pushList.pushCardList.length<=0){
					var da={
						id:e.id,
						userId:e.userId
					};
					this.pushList.pushCardList.push(da);
				}
				
				var pushCard={
					pushList:this.pushList,
					pushCardList:data,
				};
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushCard='+encodeURIComponent(JSON.stringify(pushCard))
				});
			},
			loveClick:function(e,index){
				this.xd_request_post(this.xdServerUrls.xd_saveGiveLikeByPush,{
					
					pushId:this.pushList.id,
					initiatorUserId:uni.getStorageSync('id'),
					giveLikeUserId:this.pushList.userId,
					token:uni.getStorageSync('token'),
				},false
				   ).then(res => {		
						   if(!this.pushList.currentUserGiveLike){								   
												this.pushList.currentUserGiveLike=true;
												this.pushList.giveLike++;
						   }else{
						   uni.showToast({
														title:'已经赞过了',
														 duration: 1000,
														 icon:'none',
						   })}
					  }).catch(err => {
					  						   if(err=='操作失败'){
					  							   uni.showToast({
					  								title:'已经赞过了',
					  								 duration: 1000,
					  								 icon:'none',
					  							   })
					  						   }
					
				})
				
				
			},
			timeStamp(res){
				let dataList=res.obj;
				for(var i=0;i <res.obj.length;i++){
				   var  time=this.xdUniUtils.xd_timestampToTime(res.obj[i].createTime,true);
					dataList[i].createTime=time;
				}
				return dataList;
			},
			openAddr() {
			// 	this.getPushComenList();
			
			//       this.modal=!this.modal;
			uni.navigateTo({
				url: '../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pushList))
			});
			     
			  },
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
						// this.endTime(data);
						this.pushList=data;
						this.getPushCardList();
						if(this.share!=''){
							this.getShareInfo();
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
						})
					}
					
			  	})
			  },
			goStep(){
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},
			getPushComenList(){
				this.xd_request_post(this.xdServerUrls.xd_showCommentAndReplayCommtent,{
					pushId:this.pushId,
						token:uni.getStorageSync('token')
				},false).then(res=>{
					
					
					this.pushComentList=this.timeStamp(res);
				})
			},
			getPushCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId,{
					pushId:this.pushId,		
					
				},true).then(res=>{
					var data=res.obj.list;
					for(let i=0;i<res.obj.list.length;i++){
						data[i].pictures=res.obj.list[i].pictures.split(',')
					}
					this.pusCardList=data;
				})
			},
			// 打卡
			cardFn: function () {
				this.active = 0;
			},
			// 详情
			detailFn : function(){
				this.active = 1;
			},
			// 围观的人
			lookFn : function(){
				this.active = 2;
				this.getLookerList();
			},
			tags(){
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pushList.userId,		
					
				},false).then(res=>{
					
					uni.showToast({
						icon:'none',
					  title: res.msg,
					})
				})
			},
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
					pushId:this.pushId,
					pageNum:1,
					pageSize:10,
				},true)
				.then(res=>{
					
					this.lookerList=res.obj.list;
					this.lookTotal=res.obj.total
				})
			},
		}
	}
	
</script>
<style scoped lang="scss">
	page{background: #fcfcfc;}
	.imgheit{
		height: 320upx;
	}
	.contentext{
		
	}
</style>
