<template>
	<view class="myonlookers">
		<!-- 关注 -->
		<view class="xd-list-info">
			<block v-for="(attention, index) in attentionList" :key="index">
				<view class="actionLi" >
					<view class="ali-main">
						<view class="ali-main-img">
							<image class='xd-mag xd-box-shadow' :src="attention.userHead" @tap="goPageImg(attention.userHead)"></image>
						</view>
						<view class="lli-main-content xd-list-body " @tap="goUser(attention.attentionUserId)">
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
						<view class="lli-main-content">
							<text class="lli-main-content-text">已关注</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import indexList from "@/components/indexList.vue";
	
	export default {
		data() {
			return {
				attentionList: [],
				pageNum: 1, //当前页数
				pageSize: 10, //每页条数
				userId: '',
				userInfo: '',
				token:uni.getStorageSync('token')
			}
		},
		onShow() {
			if (this.userInfo == '' || this.userInfo == undefined || this.userInfo == null) {
				try {
					this.userInfo = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};
		
			}
		},
		
		onLoad(options) {
			this.userId = options.userId
			try {
				this.userInfo = uni.getStorageSync('userInfo')
		
			} catch (e) {
				console.log(Error)
			};
			this.getShowFollow();
		},
		methods: {
			goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index)
			},
			goUser(e){
				uni.navigateTo({
					url:'selfView?userId='+e
				})
			},
			getShowFollow() {
				var that = this;
				if(that.userId == ''){
					that.userId = uni.getStorageSync('id');
				}
				this.xd_request_post(this.xdServerUrls.xd_getAttentionList, {
						userId: that.userId,
						pageNum: 1,
						pageSize: 10,
					},
					true
				).then((res) => {
					this.attentionList = res.obj.list;
					this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},
			getReachList(){
				var data={};
				let that=this;
				if(that.pageNum==0){
					uni.showLoading({
						title: '没有更多数据了'
					})
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					return false
				}
				uni.showLoading({
					title: '加载中..',
				})
				
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.xd_request_post(that.xdServerUrls.xd_getAttentionList,
				{
					userId:that.userId,
					pageNum:that.pageNum,
					pageSize:that.pageSize,
				},
				true).then(res=>{
					that.pageNum=res.obj.nextPage;						
					that.attentionList = that.attentionList.concat(res.obj.list);					
					setTimeout(function () {
						uni.hideLoading()
					}, 1000);
					
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getShowFollow(),
			this.pageNum = 1,
			uni.stopPullDownRefresh()
		},
		// 上拉加载
		onReachBottom() {
			this.getReachList()
		},
		components: {
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
	
	
	.ali-main{
		.ali-main-img .xd-mag{
			border-radius: 100%;
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
	
</style>
