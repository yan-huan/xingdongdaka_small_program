<template name='indexList'>
	<view >
		<view class="cu-card dynamic " :class="list.pushCardList[0].pictures.length>1?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPage(list)"></view>
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
				
				<view class="text-content">
					<view class="cu-tag bg-green radius sm" v-if="list.pushCardCount==0">行动</view>
					<view class="cu-tag bg-pink radius sm" v-if="list.pushCardCount>0">打卡</view>
					<text class="contentext" v-if="list.pushCardCount>0" @tap="goComentConten(list)">{{list.pushCardList[0].content}}</text>
					<text class="contentext" v-if="list.pushCardCount==0" @tap="goPageCard(list)">{{list.content}}</text>
				</view>
				
				<view class="grid flex-sub padding-lr" :class="list.pushCardList[0].pictures.length>1?'col-3 grid-square':'col-1'" v-if="list.pushCardCount>0">
					<view class="bg-img" :class="list.pushCardList[0].pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in list.pushCardList[0].pictures" :key="index" @tap="goPageImg(list.pushCardList[0].pictures)" v-if="list.pushCardList[0].pictures.length>0">
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
						<button class="cu-btn bg-pink sm round" v-if="list.userId==userId || list.onlooker "  :id="index" open-type="share">邀请围观</button>
						<button class="cu-btn bg-pink sm round  " v-else-if="list.userId!=userId && !list.onlooker&&list.challengeRmb<=0"  @tap="lookerClick(list,index)">围观</button>
						<button class="cu-btn bg-pink sm round  " v-else  @tap="lookerClick(list,index)">围观分钱</button>
						<text class="text-gray text-df ">{{list.onlookerCount}}</text>
					</view>
				
				</view>
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
		methods:{
			error: function() {
				
				var num=Math.floor(Math.random()*8+1);
				this.audioPlaySrc='../static/images/icon/img/title'+num+'.png'
			            }  ,
			lookerClick(list,index){
				
				this.$emit('lookerClick',list,index);
			},
			loveClick(e,index){
				
				this.$emit('loveclick',e,index);
			},
			goComent(e){
				if(!e.pushCardList){
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
			goPageImg(e){
				uni.navigateTo({
					url:'../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			}
		}
	}
</script>

<style lang="scss">
			.imgheit{
				height: 320upx;
			}
			.contentext{
				margin-left: 50upx;
			}

</style>
