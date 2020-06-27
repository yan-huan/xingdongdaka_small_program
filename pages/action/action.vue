<template>
	<view class="action">
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tabs(0)">
					<text>行动 ({{total}})</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tabs(1)">
					<text>我围观行动({{looktotal}})</text>
				</view>
				<view class="tab" :class="tab===2?'active':''"  v-show="false">
					<text>收藏 ({{0}})</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in cardList" :item="item" :key="index" :tab="tab" :index='index' v-on:toggleMask="toggleMask"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<block v-for="(attention, index) in lookerList" :key="index" >					
							<view class="ali-main">
								<view class="ali-main-img" >
									<image class='userhead xd-box-shadow' :src="attention.userHead" @tap="toAction(attention.pushId)"></image>
								</view>
								<view class="lli-main-content xd-list-body ">
									<view class="xd-list-title-text" @tap="toAction(attention.pushId)">
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
									
								</view>
							</view>
					</block>
				</view>
				<view class="actionFavorite" v-show="tab===2">
					<actionlist v-for="(item,index) in cardList" :item="item" :key="index" :tab="tab"></actionlist>
				</view>
			</view>
		</view>	
		<view class="btn_bar">
			<view class="btns"><button class="btn" @click="goStep">制定新的行动项</button></view>
		</view>
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" >
				<view class="mask_top">
					<view class="mask_top_text" @tap="creatXd(1)">
						<text class="mask_text">重新编辑行动</text>
					</view>
					<view class="mask_top_text" @tap="creatXd(2)">
						<text class="mask_text">删除行动</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
import actionlist from "@/components/actionlist.vue";
export default {
	data() {
		return {
			vi:1,
			tab:0,//行动，围观，收藏
			cardList:[],
			lookerList:[],
			maskState:0,
			nextPage:1,//当前页数
			pageSize:10,//每页条数
			nextPageTwo:'',
			total:'',
			looktotal:'',
			pushId:'',
			index:'',
		};
	},
	onShow() {	
		// this.inDada();
	},
	onLoad() {
		this.inDada();
	},
	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onShareAppMessage(res) {
		let that = this;
		that.setSaveShareInfo(res);
		return {
			title: that.cardList[res.target.id].content,
			path: '/pages/index/action/action?pushId='+ that.cardList[res.target.id].id+'&share='+uni.getStorageSync('id')+'&isopen='+that.cardList[res.target.id].isopen,
			imageUrl:that.cardList[res.target.id].pictures?that.cardList[res.target.id].pictures:'../../static/images/icon/img/title1.png',
		}
				
	},
	methods: {
		tabs(e){
			this.tab=e
			if(e==0){
				this.inDada();
			}else if(e==1){
				this.inDada();
			}
		},
		setSaveShareInfo(res){
			this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
				pushId:this.cardList[res.target.id].id,
				shareUserId:uni.getStorageSync('id'),
			},true
			   ).then(res => {
				 
				   })
		},
		creatXd(e){
			var that=this;
			var id=that.pushId;
			var i=that.index;
			if(e==1 && that.cardList[i].btn!=2){
				uni.showModal({
				    title: '重新编辑行动',
				    content: '将删除原行动及打卡信息，在重新发布新行动',
				    success: function (res) {
				        if (res.confirm) {
				           that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId,{pushid:id},true).then(res => {
				           	if (res.resultCode == 0) {
				           		uni.showToast({
				           		    title: '删除成功，将重新编辑',
									icon:'none',
				           		    duration: 1500,
									success() {
										try {
										    uni.setStorageSync('pushData',that.cardList[i] );
										} catch (e) {
										    // error
										}
										
										uni.navigateTo({
											url:'step1'
										})
									}
				           		});
				           	}
				           })
				        } else if (res.cancel) {
				           that.maskState=0;
				        }
				    }
				});
			}else if(e==2&& that.cardList[i].btn!=2){
				uni.showModal({
				    title: '删除行动',
				    content: '删除后无法恢复，相关打卡也会被删除',
				    success: function (res) {
				        if (res.confirm) {
				           that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId,{pushid:id},true).then(res => {
							  
				            	if (res.resultCode == 0) {
				            		uni.showToast({
				            		    title: '删除成功',
										icon:'none',
				            		    duration: 1500
				            		});
									that.cardList.splice(i,1);
				            	}
				            })
				        } else if (res.cancel) {
				            that.maskState=0;
				        }
				    }
				});
			}
		},
		toggleMask(type,index){
			let timer = type >=0 ? 10 : 300;
			let	state = type >=0 ? 1 : 0;
			this.maskState = 2;
			this.pushId=type;
			this.index=index
			setTimeout(()=>{
				this.maskState = state;
			}, timer)
		},
		toAction(e){
			uni.navigateTo({
				url: '../index/action/action?pushId='+e
			});
		},
		goStep(){
			uni.navigateTo({
				url: `/pages/action/step1`
			});
		},
		
		inDada(){		
			let token='';
			let id='';
			if(!this.hasLogin){
				uni.redirectTo
					({
					url: '../login/login' 
				});
				return false;
			}
			try{
				token=uni.getStorageSync('token');
				id=uni.getStorageSync('id');
			}catch(e){
				//TODO handle the exception
			}
			   this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,
			   {
			   token:token,
			   userId:id,
			   pageNum:1,
			   pageSize:10,
			   },
			   true
			   
			       ).then(res=>{
						 this.cardList=this.dataPaly(res);
						 this.nextPage=res.obj.nextPage;
						 this.total=res.obj.total;
			   	}).catch(Error=>{
			   		console.log(Error)
			   	})
				this.xd_request_post(this.xdServerUrls.xd_getLookerByUserId,
				{
				userId:uni.getStorageSync("id"),
				pageNum:1,
				pageSize:10,
				},
				true
				
				    ).then(res=>{
									  
										 this.lookerList=res.obj.list;
										 this.nextPageTwo=res.obj.nextPage;
										 this.looktotal=res.obj.total;
					}).catch(Error=>{
						console.log(Error)
					})
			},
			getReachList(){
				if(this.tab==0){
					if(this.nextPage==0){
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
						mask:true
					})
					this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,
					{
						token:uni.getStorageSync('token'),
						userId:uni.getStorageSync('id'),
						pageNum:this.nextPage,
						pageSize:this.pageSize,
					},
					false
						   ).then(res=>{
							   this.nextPage=res.obj.nextPage;
							 var data=this.dataPaly(res);		
							this.cardList = this.cardList.concat(data);					
							setTimeout(function () {
								uni.hideLoading()
							}, 1000);
							// uni.hideNavigationBarLoading();//关闭加载动画
							
						})	
				 }else if(this.tab==1){
					 if(this.nextPageTwo==0){
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
					 	mask:true
					 })
					 this.xd_request_post(this.xdServerUrls.xd_getLookerByUserId,
					 {
					 	userId:uni.getStorageSync("id"),
					 	pageNum:this.nextPageTwo,
					 	pageSize:10,
					 },
					 false
					 	   ).then(res=>{
					 		   this.nextPageTwo=res.obj.nextPage;
					 		this.cardList = this.lookerList.concat(res.obj.list);					
					 		setTimeout(function () {
					 			uni.hideLoading()
					 		}, 1000);	
					 	})	
				 }
				},
				dataPaly(res){
					let dataList=res.obj.list;
					var date=new Date();
					date=date.getTime();
					
					for(var i=0;i <dataList.length;i++){
						var num=dataList[i].targetDay-dataList[i].pushCardCount;
						var num2=dataList[i].targetDay;
						var num3=dataList[i].targetDay+dataList[i].holidayDay
						var num4=dataList[i].pushCardCount;
						let d = new Date(dataList[i].createTime);
						let newD = new Date(d.setDate(d.getDate() + num3));
						newD=newD.getTime()
						let dd=Math.round((date-newD) / (1000 * 60 * 60 * 24));
						if(num>0 && dd<=0 ){
							dataList[i].btn=0//立即打卡
						}else if(num2>num4 && dd>0){
							dataList[i].btn=1}//未达成
							else if(num==0&&num2==num4){
								dataList[i].btn=2}	//已完成    
						// var  time=this.xdUniUtils.xd_timestampToTime(res.obj.list[i].createTime);
						// dataList[i].createTime=time;
						dataList[i].challengeRmb=Math.floor(dataList[i].challengeRmb/100);		
						
					}
					
					return dataList;
				}
				
	},
	onReachBottom() {
		this.getReachList()
	},
	onPullDownRefresh() {
		this.inDada();
	},
	components:{
		actionlist
	}
};
</script>

<style lang="scss">
.action {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.actionInfo{
	margin:24rpx 0;
	.tabbar{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		.tab{
			flex: 1;
			text-align: center;
			border-bottom: 1px solid #d9d9d9;
			padding:16rpx;
			&.active{
				border-bottom: 1px solid #fd5107;
				color:#fd5107;
			}
		}
	}
}
.btn_bar{
	position: fixed;
	bottom: 0;
	left:0;
	width: 100%;
	.btns {
		height: 100rpx;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 200rpx;
		font-size: 28rpx;
		.btn {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffa700;
			// color: #fff;
			font-size: 28rpx;
			border-radius: 40rpx;

		}
	}
	}
	.ali-main{
		display: flex;
		flex-direction: row;
		padding-top: 10rpx;
		}
		.xd-mag{
			height: 125rpx;
			width: 125rpx;
		}
		.lli-main-content{
			padding-top: 20rpx;
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
	.userhead{
		height: 120rpx;
		width: 120rpx;
	}
	
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			// min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}
	.mask_top{
		display: flex;
		flex-direction: column;
	}
	.mask_top_text{
		margin-bottom: 5upx;
		background-color: #FFFFFF;
		width: 100%;
		height: 100upx;
		text-align: center;
	}
	.mask_text{
		font-size: 28upx;
		font-weight: bold;
		line-height: 100upx;

	}
	
</style>
