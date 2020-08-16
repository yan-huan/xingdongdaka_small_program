<template name='indexList'>
	<view >
		<view id="dynamic" class="cu-card dynamic " :class="list.pushCardList[0].pictures.length>1?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPageImg(list.userHead)"></view>
						<view class="content flex-sub" @tap="goPage(list)">
							<view>{{list.userName}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{list.pushCardList[0].createTime }}  ({{list.pushCardCount}}/{{list.targetDay}})
							</view>
						</view>
						<view v-if="list.challengeRmb>0">
							<view class="cu-tag light bg-red radius" >
								保证金￥{{list.challengeRmb}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="text-content margin-top-sm padding-bottom-sm" @tap="goComentConten(list)">				
					<view class="cu-tag bg-pink radius sm" >打卡</view>
					<text class="contentext" >{{list.pushCardList[0].content}}</text>
				</view>
				<view class="text-content margin-top-sm padding-bottom-sm"  @tap="goPageCard(list)" v-if="list.pushCardCount.length==0">
					<view class="cu-tag bg-green radius sm" >行动</view>
					<text class="contentext" >{{list.content}}</text>
				</view>
				
				<view class="grid flex-sub padding-lr " :class="list.pushCardList[0].videos!=''?'col-3 grid-square':'col-1'" v-if="list.pushCardList[0].videos!=undefined && list.pushCardList[0].videos!=null && list.pushCardList[0].videos!=''">
					<video  id="videowhind" class="videowhind" :src="list.pushCardList[0].videos" controls></video>
				</view>
				<view class="grid flex-sub padding-lr" :class="list.pushCardList[0].pictures.length>1?'col-3 grid-square':'col-1'" v-else-if="list.pushCardCount>0">
					<view class="bg-img" :class="list.pushCardList[0].pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in list.pushCardList[0].pictures" :key="index" @tap="goPageImg(list.pushCardList[0].pictures,index)" v-if="list.pushCardList[0].pictures.length>0">
					</view>
					<image class="bg-img imgheit "  :src="audioPlaySrc" v-if="list.pushCardList[0].pictures.length==0" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)"  @error="error">
					</image>
				</view>
				
				<view class="grid flex-sub padding-lr"  v-if="list.pushCardCount==0">
					<image class="bg-img imgheit"  :src="list.pictures" mode="aspectFill"
					 @tap="goPageImg(list.pictures)" v-if="list.pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<view class="flex padding justify-between">
					<view class="text-xxl" @tap="goComent(list)">
						<text class="text-gray cuIcon-comment "></text>
						<text class="text-gray text-df"></text>
					</view>
					<view>
						<button class="cu-btn bg-light-blue sm round" v-if="list.userId==userId"  :id="index" open-type="share">分享邀请</button>
						<button class="cu-btn bg-orange sm round  " v-else-if="list.onlooker"  :id="index"  open-type="share">为TA打Call</button>
						<button class="cu-btn bg-green sm round  " v-else-if="list.userId!=userId && !list.onlooker&&list.challengeRmb<=0" :id="index"  @tap="lookerClick(list,index)">围观</button>
						<button class="cu-btn bg-green sm round  " v-else  @tap="lookerClick(list,index)">围观分钱</button>
						<text class="text-gray text-df ">{{list.onlookerCount}}</text>
					</view>
				
				</view>
			</view>
			<view class="padding-top-xs padding-bottom-xs" v-if="index==4||index==7">
				<ad-custom unit-id="adunit-8354389cd1f86a3f" ad-intervals="31" ></ad-custom>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['list','index','hasLogin','userId'],
		data() {
			return {
				audioPlaySrc:'../static/images/icon/img/title.png',
			};
		},
		// watch:{
		// 	Off:function(){
		// 			console.log('1')
		// 			var query = uni.createSelectorQuery();
		// 			 query.selectAll('#videowhind').boundingClientRect()
		// 			 query.exec(res => {
		// 			       console.log(res)
		// 		 })
				
		// 	  },
		// },
		methods:{
			getcreat(){
				console.log('1')
				var query = uni.createSelectorQuery();
				 query.selectAll('#videowhind').boundingClientRect()
				 query.exec(res => {
				       console.log(res)
					    })
			},
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg();
			            }  ,
			lookerClick(list,index){
				
				this.$emit('lookerClick',list,index);
			},
			loveClick(e,index){
				
				this.$emit('loveclick',e,index);
			},
			goComent(e){
				if(!e.pushCardList||e.pushCardList.length==0){
					return false
				}
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushId='+e.id+'&cardId='+e.pushCardList[0].id+'&show=1'
				});
			},
			goComentConten(e){
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushId='+e.id+'&cardId='+e.pushCardList[0].id+'&show=0'
				});
			}
			,
			goPage(e){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url:'../selfCenter/selfView?userId='+e.userId
				})
			},
			goPageCard(e){
				
				uni.navigateTo({
					url:'../index/action/action?pushId='+e.id
				})
			},
			goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index)
			},
			
		}
	}
</script>

<style lang="scss">
			.imgheit{
				height: 320upx;
				width: 100%;
			}
			// .contentext{
			// 	margin-left: 50upx;
			// }
.bg-light-blue{background-color: #007AFF;}
.videowhind{
	width: 100%;
}
</style>
