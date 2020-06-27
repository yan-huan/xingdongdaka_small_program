<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="xd-search-box">
			<view class="xd-search">
				<view class="pageNav xd-flex-center">
					<view :class="[active == 0 ? 'active' : '']" @tap="showNew">最新</view>
					<view :class="[active == 1 || active ==3 ? 'active' : '']" @tap="showRecommend">推荐</view>
					<view :class="[active == 2 ? 'active' : '']" @tap="showFollow">关注</view>
				</view>
			</view>
		</view>
		<view class="xd-body">
			
			<!-- 最新 -->
			<view class="xd-list-info" :hidden="active == 1||active==2|| active ==3">				
				<block v-for="(list, index) in listsTab" :key="index" >								
				  <indexList :list="list" :index="index" v-on:loveclick='loveClick' :hasLogin="hasLogin" :userId='userId' v-on:lookerClick="lookerClick" :inimg='inimg'></indexList>
				</block>
			</view>
			<!-- 推荐 -->
			<view class="xd-list-info" :hidden="active == 0||active==2">
				<view class="swiper-banner">
				  <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-color="#aeaeae" indicator-active-color="#ffffff">
					<swiper-item v-for="(item , index) in bannerList" :key="index">
						<image :src="item.bannerImage" @tap="tonewurl(item.bannerUrl)" ></image>
					</swiper-item>
				  </swiper>
				</view>
				
				<!-- 推荐内容 -->
				<view class="xd-info-main">
					<!-- 推荐项 -->
					<view class="main-tabbar">
						<scroll-view
						:class="['xd-nav-bar', isCenter ? 'xd-nav-center' : '']" scroll-x="true" show-scrollbar="false" >
							<view :class="['nav-item', currentIndex == item.id ? 'nav-active' : '']" :id="'tab-'+index" 
								v-for="(item, index) in tabs" :key="index" :data-index="index" :data-id="item.id"
								@tap="navChange">
								<view class="nav-item-title">
									{{item.labelName}}
									<!-- <view class="nav-item-desc">{{item.id}}项</view> -->
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="xd-line"></view>
					<!-- 推荐项对应内容 -->					
					<block v-for="(list, index) in listsTab" :key="index" >								
					  <indexList :list="list" :index="index" v-on:loveclick='loveClick' v-on:lookerClick="lookerClick" :hasLogin="hasLogin" :userId='userId' :inimg='inimg' ></indexList>
					</block>
				</view>
			</view>
			
			<!-- 关注 -->
			<view class="xd-list-info" :hidden="active == 0||active==1 ||active == 3">
				<block v-for="(attention, index) in attentionList" :key="index" >	
					<view class="actionLi" @tap="goUser(attention.attentionUserId)">
						<view class="ali-main">
							<view class="ali-main-img">
								<image class='xd-mag xd-box-shadow' :src="attention.userHead"></image>
							</view>
							<view class="lli-main-content xd-list-body ">
								<view class="xd-list-title-text">
									<text>{{attention.userName}}</text>
								</view>
								<view  >
									<text v-if="attention.sex==1" class="boy">♂</text>
									<text v-else-if="attention.sex==0" class="gender">♀</text>
									<text v-else class="boy">密</text>
									<!-- <text>20</text> -->
								</view>
							</view>
							<view class="lli-main-content">
								<!-- <text>取消关注</text> -->
							</view>
						</view>
					</view>
				</block>
			</view>
			
		</view>
		<!-- 开始行动-加号 -->
		<view class="start-add" @tap="goPage('/pages/action/step1')">
			<image src="../../static/images/icon/add.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import indexList from "@/components/indexList.vue";
	
	export default {
		data() {
			return {
				// audioPlaySrc:'../static/images/icon/img/title1.png',
				inimg:'',
				active:1,
				currentIndex:-1,
				labelId:1,
				bannerList:[],
				tabs: [],
				listsTab:[],
				attentionList:[],
				token:uni.getStorageSync('token'),
				pageNum:1,//当前页数
				pageSize:10,//每页条数
				userId:'',
				searchValue:'请输入行动项·昵称',
					
			};
		},
		onShareAppMessage(res) {
			let that = this;
			 if(!that.hasLogin){
			 	uni.navigateTo({
			 		url: '../login/login' 
			 	});
			 	return false;
			 }
			that.setSaveShareInfo(res);
			return {
				title: that.listsTab[res.target.id].pushCardList[0].content,
				path: '/pages/index/action/action?pushId='+that.listsTab[res.target.id].id+'&share='+uni.getStorageSync('id')+'&isopen='+that.listsTab[res.target.id].isopen,
				imageUrl:that.listsTab[res.target.id].pushCardList[0].pictures[0]?that.listsTab[res.target.id].pushCardList[0].pictures[0]:'../../static/images/icon/img/title1.png',
			}
					
		},
		onLoad() {
		    this.indexData();
		},
		 computed: {  
		            ...mapState(['hasLogin'])  
		        },  
		methods:{
			...mapMutations(['logIn','logOut','IndexlogIn'])  ,
			goUser(e){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url:'../selfCenter/selfView?userId='+e
				})
			},
			//分享记录
			setSaveShareInfo(res){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.listsTab[res.target.id].id,
					shareUserId:uni.getStorageSync('id'),
				},true
				   ).then(res => {
					 
					   })
			},
			searchfocus(){
				this.searchValue='';
			},
			search(e){
			
				this.xd_request_post(this.xdServerUrls.xd_searchPushData,
				{
					pushName:e.detail.value ,
					
				},
				true
					   ).then((res) => {
						   this.listsTab=this.timeStamp(res);
						   this.pageNum=res.obj.nextPage==undefined? 1:res.obj.nextPage;
					   }).catch(err => {											
				                           });
				
			},
			goPage(url){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url
				});
			},
			//首页信息
			indexData:function(){
				var token=uni.getStorageSync('token');
				
				if(token!=''){
					this.IndexlogIn();
				}
				this.xd_request_post(this.xdServerUrls.xd_bannerList,{},true
				 ).then((res) => {
														   this.bannerList=res.obj
													   
													   }).catch(err => {						
													});
													this.getimg();
													this.xd_request_post(this.xdServerUrls.xd_label,{},false
														   ).then((res) => {
															   var da =[{
																   id:-1,
																   labelName:"全部"
															   },...res.obj];
															   this.tabs=da;										   
														   }).catch(err => {									
													});
													this.getShowRecommend();
				
			},
			//围观
			lookerClick:function(list,index){
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
							   that.listsTab[index].onlooker=true
							   that.listsTab[index].lookerCount++;
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
			//点赞
			loveClick:function(e,index){
				let list=e;
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveGiveLikeByPush,{
					
					pushId:list.id,
					initiatorUserId:uni.getStorageSync('id'),
					giveLikeUserId:list.userId,
				},true
				   ).then(res => {	
						   
						   if(!this.listsTab[index].currentUserGiveLike){								   
												this.listsTab[index].currentUserGiveLike=true;
												this.listsTab[index].giveLike++;
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
			// 最新
			showNew: function () {
				this.active = 0;	
				this.pageNum=1;
				this.listsTab=[];
				this.getShowNew();
			},
			getShowNew(){
				this.xd_request_post(this.xdServerUrls.xd_pushByCreateTimeList,
				{
					pageNum:1,
					pageSize:10,
				},
				true
					   ).then((res) => {
						  
						   this.listsTab=this.timeStamp(res);
						    this.pageNum=res.obj.nextPage; 
					   }).catch(err => {					
				                           });
				
			},
			// 推荐
			showRecommend : function(){
				this.active = 1;
				this.currentIndex=-1,
				this.pageNum=1;
				this.listsTab=[];
				this.indexData();
				
			},
			getShowRecommend(){
				this.xd_request_post(this.xdServerUrls.xd_pushByHighGradeList,
				{
					token:uni.getStorageSync('token') ,
					pageNum:1,
					pageSize:10,
				},
				true
					   ).then((res) => {
						   this.listsTab=this.timeStamp(res);
						   this.pageNum=res.obj.nextPage;
					   }).catch(err => {											
				                           });
				
			},
			getimg(){
				this.xd_request_get(this.xdServerUrls.xd_tacitlyPushPng,
				 ).then((res) => {
						   this.inimg=res.obj;
					   }).catch(err => {											
				                           });
				
			},
			timeStamp(res){
				let dataList=res.obj.list;
				for(var i=0;i <res.obj.list.length;i++){
				   var imgs=[];
				   var  time=this.xdUniUtils.xd_timestampToTime(res.obj.list[i].pushCardList[0].createTime,false,false,true);
				    if(dataList[i].pushCardList[0].pictures){
						imgs=dataList[i].pushCardList[0].pictures.split(",");
						dataList[i].pushCardList[0].pictures=imgs;
					}else{
						dataList[i].pushCardList[0].pictures=[];
					}
					dataList[i].pushCardList[0].createTime=time;
					dataList[i].challengeRmb=Math.floor(dataList[i].challengeRmb/100);
					
				}
				return dataList;
			},
			// 关注
			showFollow : function(){
				this.active = 2;
				this.pageNum=1;
				this.getShowFollow();
			},
			getShowFollow(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_getAttentionList,
				{
					userId:uni.getStorageSync('id'),
					pageNum:1,
					pageSize:10,
				},
				true
					   ).then((res) => {
						   this.attentionList=res.obj.list;
						   this.pageNum=res.obj.nextPage;
					   }).catch(err => {											
				                           });
				
				
			},
			//标签获取列表
			getPushByLabel(){
				this.xd_request_post(this.xdServerUrls.xd_pushByLabel,
				{
					token:uni.getStorageSync('token') ,
					pageNum:1,
					pageSize:10,
					labelId:this.labelId,
				},
				true
					   ).then((res) => {
						   this.listsTab=this.timeStamp(res);
						   this.pageNum=res.obj.nextPage==undefined? 1:res.obj.nextPage;
					   }).catch(err => {											
				                           });
				
			},
			
			// 推荐内容切换
			navChange: function (e) {
				
				this.pageNum=1;
				this.listsTab=[];
				this.active=3;
				this.currentIndex = e.currentTarget.dataset.index;
				if(e.currentTarget.dataset.id==-1){
					this.currentIndex=-1;
					 this.getShowRecommend()();
				}else{
					this.labelId=e.currentTarget.dataset.id;
					this.getPushByLabel();
				}
				
				
			},
			getNewList(){
			},
			 getReachList(){
				 var data={};
				 let that=this;
				if(that.pageNum==0){
					uni.showLoading(
					{
						title: '没有更多数据了'
					})
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					
					return false
				}
				uni.showLoading(
				{
					title: '加载中..',
				})
				switch(that.active){
					case 0:
					that.xd_request_post(that.xdServerUrls.xd_pushByCreateTimeList,
					{
						
						pageNum:that.pageNum,
						pageSize:that.pageSize,
					},
					true
						   ).then(res=>{
							 that.pageNum=res.obj.nextPage;
							 data =that.timeStamp(res);
							that.listsTab = that.listsTab.concat(data);					
							setTimeout(function () {
							    uni.hideLoading()
							}, 1000);	
						})
					
					break;
					case 1:
					that.xd_request_post(that.xdServerUrls.xd_pushByHighGradeList,
					{
						pageNum:that.pageNum,
						pageSize:that.pageSize,
					},
					true
						   ).then(res=>{
							   that.pageNum=res.obj.nextPage;
									   
								  data=that.timeStamp(res);
							that.listsTab = that.listsTab.concat(data);					
							setTimeout(function () {
							    uni.hideLoading()
							}, 1000);							
						})
					break;
					case 2:
					if(!that.hasLogin){
						uni.navigateTo({
							url: '../login/login' 
						});
						return false;
					}
					that.xd_request_post(that.xdServerUrls.xd_getAttentionList,
					{
						userId:uni.getStorageSync('id'),
						pageNum:that.pageNum,
						pageSize:that.pageSize,
					},
					true
						   ).then(res=>{
							that.pageNum=res.obj.nextPage;						
							that.attentionList = that.attentionList.concat(res.obj.list);					
							setTimeout(function () {
							    uni.hideLoading()
							}, 1000);
							
						})
					
					break;
					case 3:
					that.xd_request_post(that.xdServerUrls.xd_pushByLabel,
					{
						pageNum:that.pageNum,
						pageSize:that.pageSize,
						labelId:this.labelId,
					},
					true
						   ).then(res=>{
							   that.pageNum=res.obj.nextPage;
									   
								  data=that.timeStamp(res);
							that.listsTab = that.listsTab.concat(data);					
							setTimeout(function () {
							    uni.hideLoading()
							}, 1000);							
						})
					break;
				}
			},
			// 跳转外部链接
			tonewurl(e) {
				let url=e;
				// 判断链接是否为空
				if (url == null) {
					return false;
				}
				// 判断链接是否为https
				let notS = url.split(':')[0];
				let a = notS.indexOf('s') > -1;
				if (a == false) {
					uni.navigateTo({
						url: url
					});
					return false;
				}		
				//  链接拼接编码网址（同时用模板字符串放置所需要的数据）
				// url = encodeURIComponent(url + `?typefrom=${typefrom}&utoken=${utoken}&unionid=${unionid}&shopid=${shopId}`);
				url = encodeURIComponent(url);
				uni.navigateTo({
					url: '../web/webShow?url=' + url
				});
			},      
			
		},
		// onShow() {
		// 	this.currentIndex=-1;
		// 	this.active=1;
		// 	this.indexData();
		// },
		// 下拉刷新
		onPullDownRefresh() {
			switch(this.active){
				case 0:
				this.getShowNew(),
				this.pageNum=1,
				uni.stopPullDownRefresh();
				break;
				case 1:
				this.indexData(),
				this.pageNum=1,
				uni.stopPullDownRefresh();
				
				case 2:
				this.getShowFollow(),
				this.pageNum=1,
				uni.stopPullDownRefresh();
				break;
				case 3:
				this.indexData(),
				this.pageNum=1,
				uni.stopPullDownRefresh();
				this.currentIndex=-1;
				break;
			}
		},
		// 上拉加载
		onReachBottom() {
			this.getReachList()
		},
		components:{
			indexList
		}
		
		
	}
	
</script>

<style scoped lang="scss">
	.xd-body{
		box-sizing: border-box;
		padding:15% 15upx;
		width:100%;
	}	
	.pageNav{
		padding: 20upx 0;
		view{
			margin: 0 28upx; font-size: 34upx; line-height: 44upx;
			border-bottom: 3px solid #ffe66f;
		}
		view.active{
			border-color:#fd5107; font-weight:bold; color:#fd5107;
		}
	}
	
	.swiper-banner{
		width: 100%;
		
		.swiper{
			width: 100%; height: 208upx;
			swiper-item image{
				width: 100%; height: 208upx;
				border-radius: 10upx;
			}
		}
	}
	
	.xd-info-main{
		width: 100%;
		
		.main-tabbar{
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #efe5e8;
			padding: 10upx 0 16upx 0;
			margin-bottom: 12upx;
			background-color: #FFFFFF;
			margin-top: 10upx;
			height: 76upx;
			
			.xd-nav-bar{
				width:100%; display:flex; white-space:nowrap;
				
				.nav-item{
					width:25%; display:inline-flex; flex-direction:column;
					text-align: center;
					margin: 0 0.6%; padding: 8upx 0;
					background: #fbf3e6;
					border-radius: 10upx;
					
					.nav-item-title{
						font-size:26rpx; line-height:36rpx; width:100%; color:#fd5107;
					}
				}
				.nav-item.nav-active{
					background: #fd5107;
					
					.nav-item-title{
						color:#ffffff;
					}
				}
			}
		}
		
		.swiper-box{
			
			.swiper-item{
				display: none;
			}
			.swiper-item.box-active{
				display: block;
			}
			.infos-box{
				padding-top: 20upx;
			}
		}
	}
	.start-add{
		width: 100upx; height:100upx;
		display:flex; flex-direction:row; justify-content:center; align-items:center;
		background: #ffe66f;
		border: 2px solid #ffa700;
		border-radius: 50%;
		position: fixed; bottom: 100upx; right:30upx; z-index: 99;
	}
	.start-add image{
		width: 48upx; height:48upx;
	}
	.actionLi{
		padding-top: 20rpx;
		border-bottom: 1upx solid #ffa700;
		.ali-main{
			display: flex;
			}
			.xd-mag{
				height: 125rpx;
				width: 125rpx;
			}
		}
	.gender{
		background:#fd5107;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
		// height: 24rpx;
		// line-height: 24rpx;
	}
	.boy{
		background:#66CCFF;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
	}
		
</style>
