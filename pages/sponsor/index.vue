<template>
	<view>
		<!-- <cu-custom bgColor="xd-bg nav text-center" :isBack="true"><block slot="backText">返回</block><block slot="content">赞助</block></cu-custom>
		 -->
		<view v-for=" (item,index) in listsTab" :key="index" class="cu-card margin-top xd-bg-white padding-bottom" >
			<view class="xd-grids  xd-sponsor-content">
				<view class="xd-img-shadow xd-br-30">
					<view class="xd-img-sponsor xd-br-30"  :style="'background-image: url('+ getFirstPic(item.pushCardList[0].pictures) +');'"></view>
				</view >
				<view class="cu-item xd-grids">
					<view class="xd-avatar cu-avatar round lg" :style="'background-image:url('+item.userHead+');'"></view>
					
					<view class="content flex-sub" style="position: relative;">
						<view class="xd-grids">
							<view class="text-grey">{{item.userName}}</view>
							<button class="cu-btn line-orange xd-btn-follow">关注</button>
						</view>
						<view class="xd-act-title">
							{{item.userName}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-list grid" style="display: flex;" >
				<view class="cu-item xd-btn-tips-three"  v-for="(it,ind) in item.cuIconList" :key="ind" style=" display: flex; flex-direction: row; padding:0 30upx; border: 0;">
					<view style="margin: 0; width: auto;" >
						<button v-if="ind==2" :id="index"  open-type="share" :style="'background-color: '+it.color" class="cu-btn">{{it.name}} <text v-if="it.money" class="xd-btn-money">￥{{it.money}}</text> </button>
						<button v-else @tap="goTOSponsor(ind,it.pushId,it.cardId)"  :style="'background-color: '+it.color" class="cu-btn">{{it.name}} <text v-if="it.money" class="xd-btn-money">￥{{it.money}}</text> </button>
						<view class="cu-tag badge" v-if="it.badge">
							<block>{{it.badge>99?'99+':it.badge}}</block>
						</view>
					</view>
				</view>
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
				pageNum:1,
				pageSize:10,
				listsTab:[],
				isCard: false,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'yellow',
					badge: 120,
					name: '赞助',
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					name: '保证金',
					money:888
				}, {
					cuIcon: 'picfill',
					color: 'orange',
					badge: 10,
					name: '邀请围观'
				}]
			};
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onShareAppMessage(res) {
			let that = this;
			if(res.from=="menu"){
			return	that.xdUniUtils.xd_onShare();
			}else{
				that.setSaveShareInfo(res);
				return {
					title:'我为'+that.listsTab[res.target.id].userName+'拉赞助：'+ that.listsTab[res.target.id].pushCardList[0].content,
					path: '/pages/index/action/action?pushId='+that.listsTab[res.target.id].id+'&share='+uni.getStorageSync('id')+'&isopen='+that.listsTab[res.target.id].isopen,
					imageUrl:that.listsTab[res.target.id].pictures?that.listsTab[res.target.id].pictures:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
				}
			}		
		},
		watch:{
			hasLogin(){
				setTimeout(() => {
					this.getActList()
					
				
				}, 100);
				
			}
			
		},
		mounted(){
			if(!this.hasLogin){
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			this.getActList()
		},
		methods: {
			setSaveShareInfo(res){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.listsTab[res.target.id].id,
					shareUserId:uni.getStorageSync('id'),
				},true
				   ).then(res => {
					 
					   })
			},
			getFirstPic(str){
				return str.indexOf(',')===-1?str:str.slice(0,str.indexOf(','))
			},
			getActList(){
				this.xd_request_post(this.xdServerUrls.xd_pushByHighGradeList,
				{
					pageNum:this.pageNum,
					pageSize:this.pageSize,
				},true).then(res=>{
					if(res.obj.hasNextPage){
						this.pageNum=res.obj.nextPage;
					}
					if(res.obj.list && res.obj.list.length>0){
						this.listsTab = [...this.listsTab,...res.obj.list.map(item=>{
							let arr =[]
							arr.push({
									cuIcon: 'cardboardfill',
									color: 'yellow',
									badge: 12,
									name: '赞助',
									pushId: item.id,      
									cardId: item.pushCardList[0].id,
								})
							arr.push({
									cuIcon: 'recordfill',
									color: 'orange',
									name: '保证金',
									money: Math.floor(item.challengeRmb/100)
								})
							arr.push({
									cuIcon: 'picfill',
									color: 'orange',
									badge: item.onlookerCount,
									name: '邀请围观'
								})
							return {...item,...{cuIconList:arr}}
						})] 
					}
					
					console.log('getActList',this.listsTab)
					uni.hideLoading()
				})
			},
			
			IsCard(e) {
				this.isCard = e.detail.value
			},
			goTOSponsor(index,pushId,cardId){
				if(index === 0){
					uni.setStorageSync("pushId",pushId);
					uni.setStorageSync("cardId",cardId);
					uni.navigateTo({
						url:'form'
					})
				}
				
			},
		}
	}
</script>

