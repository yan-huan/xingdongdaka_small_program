<template>
	<view >
		<lookerCountInfo ref="lookerCountInfo"></lookerCountInfo>
		<view class="cu-card dynamic " :class="pushList.pictures!=''?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item ">
						<view @tap="goUser(pushList.userId)" class="cu-avatar round lg" :style="{backgroundImage: 'url(' +pushList.userHead + ')'}" ></view>
						<view class="content flex-sub">
							<view @tap="goUser(pushList.userId)">{{pushList.userName}}</view>
						</view>
						<view >
							<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0" @tap="tags">
								{{guanzhu}}
							</view>
						</view>
					</view>
					<view class="flex flex-wrap padding justify-between">
						<view class="widthtext " >
							<view class="flex flex-wrap justify-between">
								<view class="cu-tag bg-grey radio">{{pushList.label}}</view>
								<view class="text-xl" v-if="pushList.isopen==1">
									<text class="lg text-orange cuIcon-lock" ></text>
								</view>
							</view>
							
							<view class="text-gray text-sm ">
								阶段期限：{{pushList.createTime}}--{{pushList.endTime}}
							</view>
							<view class="text-gray text-sm  flex flex-wrap">
								<view class="">
									坚持天数：{{pushList.pushCardCount}}/{{pushList.targetDay}}
								</view>
								<view class="margin-left-sm"> 
								    休假天数：{{pushList.holidayDay}}天
								</view>
							</view>
						</view>
						<view v-if="pushList.challengeRmb>0">
							<view class="cu-tag light bg-red radius" >
								保证金￥{{pushList.challengeRmb}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="text-contents">
					<text class="contentext" >{{pushList.content}}
					</text>
				</view>
				<view class="grid flex-sub padding-lr"  >
					<image class="bg-img imgheit"  :src="pushList.pictures" mode="aspectFill"
					 @tap="goPageImg(pushList.pictures)" v-if="pushList.pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<view class="flex padding justify-between" >
					<view>
						<button class="cu-btn bg-light-blue sm round" v-if="pushList.userId==userId"  :id="index" open-type="share">分享邀请</button>
						<button class="cu-btn bg-orange sm round" v-else-if="pushList.onlooker"  :id="index" open-type="share">为TA打Call</button>
						<button class="cu-btn bg-green sm round  " v-else-if="pushList.userId!=userId && !pushList.onlooker&&pushList.challengeRmb<=0"  @tap="lookerClick(list,index)">围观</button>
						<button class="cu-btn bg-green sm round  " v-else  @tap="lookerClick(pushList,index)">围观分钱</button>
						<text class="text-gray text-df ">{{pushList.onlookerCount}}</text>
					</view>
					<view class="text-xxl"  >
						<button class="cu-btn line-green sm round  " @click="goSteps" v-if="userId==pushList.userId&&pushList.pushCardCount<pushList.targetDay" >立即打卡</button>
						<button class="cu-btn line-green sm round  " @click="gostep" v-else>一起行动</button>
					</view>
				
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['打卡内容','围观排行']" :key="index" @tap="tabSelect" :id="index" >
						{{items}}
					</view>
				</view>
			</scroll-view>
			<block v-for="(item,index) in pusCardList" :key="index" v-if="TabCur==0">
				<view class="cu-timeline">
					<view class="cu-time" v-if="index == 0 || compareDate(pusCardList[index-1],item)">{{xdUniUtils.xd_timestampToTime(item.createTime,false,false,false)}}</view>
					<view class="cu-item">
						<view class="content">
							<view class="">
								<view class="cu-tag line-green">第{{pusCardList.length-index}}次打卡</view>
							</view>
							<view  class="margin-top-sm margin-bottom-sm margin-left-lg textcon" @tap="gocardComentList(item,0)">{{item.content}}</view>
							<view class="videheit" v-if="item.videos!=''&&item.videos!=undefined &&item.videos!=null ">
								<video class="videos"  :src="item.videos" controls></video>
							</view>
							<view v-else class="grid flex-sub padding-lr"   >
								<image class="bg-img imgheit"  :src="item.pictures[0]" mode="aspectFill"
								 @tap="goPageImg(item.pictures)" v-if="item.pictures.length!=''">
								</image>
							</view>
							<view class="text-xxl flex flex-wrap justify-end " @tap="gocardComentList(item,1)">
								<text class="text-gray cuIcon-comment  "></text>
								<text class="text-gray text-df">{{item.commentCount}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
			<block v-for="(attention,index) in lookerList" :key="index" v-if="TabCur==1">
				<view class="actionLi">
					<view class="ali-main">
						<view class="ali-main-img" @tap="goUser(attention.lookUserId)">
							<image class='xd-mag xd-box-shadow' :src="attention.userHead"></image>
						</view>
						<view class="lli-main-content xd-list-body" @tap="goUser(attention.lookUserId)">
							<view class="xd-list-title-text">
								<text>{{attention.userName}}</text>
								<text v-if="attention.sex==1" class="boy">♂</text>
								<text v-else-if="attention.sex==0" class="boy">♀</text>
								<text v-else class="boy">密</text>
							</view>
							<view class="moreInfoIn">
								<image class='address' src="/static/images/icon/address.png"></image>
								<text class="province">{{attention.province}}.{{attention.city}}</text>
							</view>
						</view>
						<view class="ali-main-list" @tap="showBanner(attention.lookUserId,attention.pushId)">
							<view>{{attention.lookerCount}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import lookerCountInfo from "@/components/lookerCountInfo.vue"
	import{ mapState,mapMutations} from 'vuex'
	export default {
		components:{
			lookerCountInfo
		},
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
				
				lookerList:[],
				looktotal:'',
				lookNextPageTwo:'',
				pushId:'',
				isShare:0,
				guanzhu:'关注'
				
			};
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			if(option.pushList==undefined){
				this.pushId=option.pushId;
				this.isShare=option.isopen?option.isopen:0;
				if(option.share!=undefined){
					try{												
					 uni.setStorageSync('share',option.share);
					}catch(e){
						console.log(Error)
					};
				}
				this.getpushList();
				this.getLookerList();
				this.getPushCardList();
			}
			
		},
		watch: {
			hasLogin() {
				setTimeout(() => {
					this.clickSaveShareInfo();

				}, 100);
			},
		},
	
		onShareAppMessage(res) {
			let that = this;
			if(res.from=="menu"){
			return	that.xdUniUtils.xd_onShare();
			}else{
				if(that.pusCardList.length>0){
					that.setSaveShareInfo();
					return {
						title: that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'打Call：'+that.pusCardList[0].content,
						path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen,
						imageUrl:that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
					}
					
				}else{
					that.setSaveShareInfo();
					return {
						title: that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pushList.content:'我为@'+that.pushList.userName+'打Call：'+that.pushList.content,
						path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen,
						imageUrl:that.pushList.pictures?that.pushList.pictures:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
					}
					
				}
			}		
		},
		methods:{
		    showBanner(lookUserId,pushId){
				this.$refs.lookerCountInfo.showBanner(lookUserId,pushId);
			},
			compareDate (d1, d2) {
				if(typeof d1 == 'undefined'){
					return true
				}
				if(typeof d2 == 'undefined'){
					return true
				}
				return this.xdUniUtils.xd_timestampToTime(d1.createTime,false,false,false) > this.xdUniUtils.xd_timestampToTime(d2.createTime,false,false,false)
			},
			gostep(){
				uni.navigateTo({
					url:'../../action/step1'
				})
			},
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
				if(uni.getStorageSync('share')!=''){
					this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
						pushId:this.pushId,
						shareUserId:uni.getStorageSync('share'),
						clickUserId:uni.getStorageSync('id'),
					},true
					   ).then(res => {
						  this.getpushList();
						   })
				}
			},
			goUser(e){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
			},
			//围观
			lookerClick:function(list,index){
				var that=this ;
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				that.userId=uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
					
					pushId:list.id,
					lookUserId:that.userId,
				},true
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.pushList.onlooker=true
							   that.pushList.onlookerCount++;
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
								title:res.msg,
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
			goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index);
			},
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg();
			       }  ,
						
			gocardComentList(e,index){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushId='+e.pushId+'&cardId='+e.id+'&show='+index
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
		async	getpushList(){
				if(this.isShare==1){
					if(!uni.getStorageSync('token')){
						uni.navigateTo({
							url: '../../login/login' 
						});
						return false
					}
				}
			  	this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
			  		pushId:this.pushId,
					isShare:this.isShare,
					lookUserId:uni.getStorageSync('id'),
			  	},true).then(res=>{	
					if(res.resultCode==0){
						var data=res.obj;
						data.createTime=this.xdUniUtils.xd_timestampToTime(res.obj.createTime)
						data.endTime=this.xdUniUtils.xd_timestampToTime(res.obj.endTime)
						data.challengeRmb=res.obj.challengeRmb/100;
						this.pushList=data;
						if(this.pushList.userId == uni.getStorageSync('id')){
							this.guanzhu =''
						}else{
							this.xd_request_post(this.xdServerUrls.xd_iSAttention,{
								userId:uni.getStorageSync('id'),
								attentionUserId:this.pushList.userId,
							},true)
							.then(res=>{
								if(res.obj){
									this.guanzhu ='已关注'
								}else{
									this.guanzhu ='关注'
								}
								
							})
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
		async	getPushCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId,{
					pushId:this.pushId,		
					
				},true).then(res=>{
					var data=res.obj.list;
					for(let i=0;i<res.obj.list.length;i++){
						if(res.obj.list[i].pictures!=""){
							data[i].pictures=res.obj.list[i].pictures.split(',')
						}
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
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				if(this.guanzhu =='已关注'){
					return
				}
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
					pageNum: this.lookNextPageTwo,
					pageSize:10,
				},true)
				.then(res=>{
					this.lookerList=res.obj.list;
					this.looktotal=res.obj.total;
					this.lookNextPageTwo=res.obj.nextPage;
					this.lookerList.forEach(item =>{
						if(item.lookUserId == uni.getStorageSync('id')){
							this.guanzhu ='已关注'
						}
					})
					
				})
			}
		}
	}
	
</script>
<style scoped lang="scss">
	page{background: #fcfcfc;}
	.imgheit{
		height: 320upx;
		width: 100%;
	}
	.contentext{
		
	}
	.cu-timeline .cu-time{
		width: 160rpx;
	}
	.commentCount{
		right: 0;
	}
	
	.ali-main{
		display: flex;
		padding: 20rpx;
		border-bottom: 3px solid #fff;
		
		.ali-main-list{
			line-height: 130rpx;
			width: 140rpx;
		}
		.ali-main-img .xd-mag{
			border-radius: 100%;
			height: 125rpx;
			width: 125rpx;
		}
		.lli-main-content {
			.boy{
				background:#66CCFF;
				color:#fff;
				display: inline-block;
				padding:0 6rpx;
				border-radius: 100%;
				font-size: 22rpx;
				margin-left: 14rpx;
			}
			.lli-main-content-text{
				line-height: 90rpx;
				margin-right: 20rpx;
			}
			.moreInfoIn {
				.address {
					width: 30rpx;
					height: 30rpx;
				}
			
				.province {
					font-size: 28rpx;
					margin-left: 6rpx;
				}
			}
		}
	}

	.textcon{
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; ; 
	}

	.bg-light-blue{background-color: #007AFF;}
	
	.videos{
		width: 500upx;
		height: 325upx;
	}
	.widthtext{
		width: 100%;
	}

</style>
