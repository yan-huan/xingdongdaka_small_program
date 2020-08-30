<template>
	<view class="selfCenter">
		<usershow  :list="userInfo"  :guanzhu="guanzhu" :lookerCount="lookerCount" :likeCount="likeCount" v-on:clidtags='clidtags' :userId="userId" ></usershow>
		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0" >
					<text>行动 ({{total}})</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=1">
					<text v-if="userId==user">围观的行动({{lookTotal}})</text>
					<text v-else>TA围观的行动({{lookTotal}})</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in list" :key="index" :tab="tab" :showBut='1' :item='item' :index='index' v-on:lookerClick="lookerClick" :userId="user"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<actionlist v-for="(item,index) in lookerList" :key="index" :tab="tab" :showBut='1' :item='item' :index='index' v-on:lookerClick="lookerClick" :userId="user"></actionlist>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import actionlist from "@/components/actionlist.vue"
	import usershow from "@/components/usershow.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{
			usershow,
			actionlist
		},
		data() {
			return {
				tab:0,//行动，围观，收藏
				list:[],
				userId:'',
				user:uni.getStorageSync('id'),
				total:'',
				userInfo:'',
				lookerList:[],
				pushId:'',
				lookTotal:0,
				lookerCount: 0,
				likeCount: 0,
				guanzhu:'关注'
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onShareAppMessage(res) {
			let that = this;
			if(res.from=="menu"){
			return	that.xdUniUtils.xd_onShare();
			}else{
				if(that.tab==0){
					return {
						
						title:that.list[res.target.id].userId==that.user? '第'+that.list[res.target.id].pushCardCishuCount+'次打卡:'+that.list[res.target.id].content:'我为@'+that.list[res.target.id].userName+'打Call：'+that.list[res.target.id].content,
						path: '/pages/index/action/action?pushId='+ that.list[res.target.id].id+'&share='+uni.getStorageSync('id')+'&isopen='+that.list[res.target.id].isopen,
						imageUrl:that.list[res.target.id].pictures?that.list[res.target.id].pictures:'../../static/images/icon/img/title1.png',
					}
				}else if(that.tab==1){
					return {
						
						title:that.lookerList[res.target.id].userId==that.user? '第'+that.lookerList[res.target.id].pushCardCishuCount+'次打卡:'+that.lookerList[res.target.id].content:'我为@'+that.lookerList[res.target.id].userName+'打Call：'+that.lookerList[res.target.id].content,
						path: '/pages/index/action/action?pushId='+ that.lookerList[res.target.id].id+'&share='+uni.getStorageSync('id')+'&isopen='+that.lookerList[res.target.id].isopen,
						imageUrl:that.lookerList[res.target.id].pictures?that.lookerList[res.target.id].pictures:'../../static/images/icon/img/title1.png',
					}
				}
			}		
		},
		onShow() {
			
		},
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			this.userId = option.userId;
			this.getCardList();
			this.getLookerList();
			this.getUserInfo();
			this.getIsAttention();
			this.lookerCountData();
		},
		methods: {
			lookerCountData() {
				var that = this;
				that.xd_request_post(that.xdServerUrls.xd_getLookerCountByUserId, {
					userId: that.userId
				}, true).then(res => {
					if (res.resultCode == 0) {
						that.lookerCount = res.obj.lookerCount
						that.likeCount = res.obj.likeCount
					} 
				})
			},
			clidtags(e){
				if(this.guanzhu=="已关注"){
					return
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:e.id,		
					
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
			goPush(e){
				uni.navigateTo({
					url: '../index/action/action?pushId='+e
				});
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
			getIsAttention(){
				if(this.userId == uni.getStorageSync('id')){
					this.guanzhu =''
				}else{
					this.xd_request_post(this.xdServerUrls.xd_iSAttention,{
						userId:uni.getStorageSync('id'),
						attentionUserId:this.userId,
					},true)
					.then(res=>{
						var data =res.obj;
						if(data){
							this.guanzhu ='已关注'
						}else{
							this.guanzhu ='关注'
						}
						
					})
				}
			},
			
			getUserInfo(){
				this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId,{
					userId:this.userId,
				},true)
				.then(res=>{
					this.userInfo=res.obj;
					// this.$set(this.userInfo,res.obj)
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
					dataList[i].challengeRmb=Math.floor(dataList[i].challengeRmb/100);
					
				}
				return dataList;
			},
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_lookerPushListByUserId,{
					userId:this.userId,
					pageNum:1,
					pageSize:10,
				},true)
				.then(res=>{
					this.lookerList=this.timeStamp(res);
					this.lookTotal=res.obj.total
					this.lookerList.forEach(function (item) {
						if(typeof item.pictures ==='undefined' || item.pictures == ''){
							item.pictures = '../../static/images/icon/img/title1.png'
						}else{
							if(item.pictures.indexOf(",")> -1){
								item.pictures = item.pictures.split(",")[0]
							}
						}
					})			
					
				})
			},
			
			
		},
	}
</script>

<style  lang="scss">
	.selfCenter{
		padding:0 20rpx;
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

</style>
