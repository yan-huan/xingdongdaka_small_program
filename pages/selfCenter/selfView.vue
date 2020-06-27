<template>
	<view class="selfCenter">
		
		<view class="personContent">
			<view class="personHead" >
				<image class="imgHead" :src="userInfo.userHead" ></image>
				
			</view>
			<view class="personInfo"  >
				<view class="xd-list-title-text name ">
					<text>{{userInfo.userName}}</text>
				</view>
				
			</view>
			<view class="personOpt">
				
			</view>
		</view>
		<view class="moreInfo">
			<view class="moreInfoRow">
				<view class="moreInfoIn">
					<text>{{userInfo.province}}.{{userInfo.city}}</text>
				</view>
		
				<view class="moreInfoIn" >
					<text v-if="userInfo.sex==1" class="boy">♂</text>
					<text v-else-if="userInfo.sex==0" class="gender">♀</text>
					<text v-else class="boy">密</text>
					
				</view>
			
				<view class="moreInfoIn flex1" v-if="userInfo.schoolName">
					<text>{{userInfo.schoolName}}</text>
				</view>
			
			</view>
		
		</view>
		
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0" >
					<text>行动 ({{total}})</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=1">
					<text v-if="userId==user">围观的行动({{lookTotal}})</text>
					<text v-else>TA围观的行动({{lookTotal}})</text>
				</view>
				->
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in list" :key="index" :tab="tab" :showBut='1' :item='item'></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<block v-for="(attention, index) in lookerList" :key="index" >
						<view class="actionLi" >
							<view class="ali-main" @tap="goPush(attention.pushId)">
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
							</view>
						</view>
					</block>
				</view>
				<view class="actionFavorite" v-show="tab===2">
					<actionlist v-for="(item,index) in [1,2]" :key="index" :tab="tab"  :showBut='1' v-on:lookerClick="lookerClick"  :userId='userId'></actionlist>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import actionlist from "@/components/actionlist.vue"
	export default {
		data() {
			return {
				tab:0,//行动，围观，收藏
				list:[],
				userInfo:'',
				userId:'',
				user:uni.getStorageSync('id'),
				total:'',
				lookerList:[],
				pushId:'',
				lookTotal:0,
			}
		},
		onShow() {
			
		},
		onLoad(option) {
			this.userId = option.userId;
			this.getCardList();
			this.getLookerList();
			this.getUserInfo();
		},
		methods: {
			goPush(e){
				uni.navigateTo({
					url: '../index/action/action?pushId='+e
				});
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
				},true
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.list[index].onlooker=true
							   that.list[index].lookerCount++;
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
			getUserInfo(){
				this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId,{
					userId:this.userId,
				},true)
				.then(res=>{
					this.userInfo=res.obj;
				})
			},
			getCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,{
					token:uni.getStorageSync('token'),
					lookUserId:uni.getStorageSync('id'),
					userId:this.userId,
				},true)
				.then(res=>{
					this.list=this.timeStamp(res);
					
					this.total=res.obj.total;
				})
			},
			timeStamp(res){
				let dataList=res.obj.list;
				for(var i=0;i <res.obj.list.length;i++){
				   var  time=this.xdUniUtils.xd_timestampToTime(res.obj.list[i].createTime);
					dataList[i].createTime=time;
					dataList[i].challengeRmb=Math.floor(dataList[i].challengeRmb/100);
					
				}
				return dataList;
			},
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByUserId,{
					userId:this.userId,
					pageNum:1,
					pageSize:10,
				},true)
				.then(res=>{
					
					this.lookerList=res.obj.list;
					this.lookTotal=res.obj.total
				})
			},
			
			
		},
		components:{
			actionlist
		}
	}
</script>

<style  lang="scss">
	.selfCenter{
		padding:30rpx;
	}
.personContent{
	padding:12rpx 0;
	display: flex;
	justify-content: flex-start;
	.personHead{
		padding: 6rpx;
		.imgHead{
			height: 104rpx;
			width: 104rpx;
			display: inline-block;
			border-radius: 100%;
		}
	}
	.personInfo{
		margin:0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.subInfo{
			font-size: 24rpx;
			color:#888;
		}
	}
	.personOpt{
		flex: 1;
		display: flex;
		justify-content: flex-end;
		padding:0;
		.pay{
			display: block;
			font-size: 26rpx;
			height: 66rpx;
			background: $xd-color-base;
			width:200rpx;
			margin:0;
		}
	}
}
.moreInfo{
	padding:20rpx 0;
	border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #d9d9d9;
	font-size: 26rpx;
	.link{
		color:$xd-color-base;
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
	.moreInfoRow{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin:0 0 14rpx 0;
		&.rowaction{
			margin-top:18rpx;
		}
		.moreInfoIn{
			width: 170rpx;
			overflow: hidden;
			
			margin:0;
			padding:0;
			&.flex1{
				flex: 1;
			}
			text-align: left;
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
		}
	}
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
