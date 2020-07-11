<template name='actionlist'>
	<view class="">
		<view class="cu-item shadow margin-bottom-sm bg-white">
			<view class="cu-list menu-avatar">
				<view class="cu-item " v-if="tab==1">
					<view @tap="goUser(item.userId)" class="cu-avatar round lg" :style="{backgroundImage: 'url(' +item.userHead + ')'}" ></view>
					<view class="content flex-sub">
						<view @tap="goUser(item.userId)">{{item.userName}}</view>
					</view>
					<view  v-if="tab>1">
						<view class="cu-tag line-orange radius"  @tap="tags">
							关注
						</view>
					</view>
				</view>
				<view class="flex flex-wrap padding justify-between">
					<view class=" " >
						<view class="flex flex-wrap">
							<view class="cu-tag bg-grey radio">{{item.label}}</view>
							<view class="margin-left-sm" v-if="tab==0||tab==1">
								<text class="text-orange" v-if="item.btn==0">进行中...</text>
								<text class="text-gray" v-else-if="item.btn==1">未完成</text>
								<text class="text-green" v-else-if="item.btn==2">已完成</text>
							</view>
						</view>
						<view class="text-gray text-sm ">
							{{xdUniUtils.xd_timestampToTime(item.createTime,false,true,false) }}  ({{item.pushCardCount}}/{{item.targetDay}})
						</view>
					</view>
					<view v-if="item.challengeRmb>0">
						<view class="cu-tag light bg-red radius" >
							保证金￥{{item.challengeRmb}}
						</view>
					</view>
					<view class="ali_right" @click="toggleMask(item.id,index)" v-if="tab==0&&item.btn!=2">
						<text class="cuIcon-moreandroid" ></text>
					</view>
					
				</view>
			</view>
			
			<view class="text-content padding-lr textcen">
				<text class="contentext" @tap="goPageCard(item)" >{{item.content}}</text>
			</view>
			<view class="grid flex-sub padding-lr"  >
				<image class="bg-img imgheit"  :src="item.pictures" mode="aspectFill"
				 @tap="goPageImg(item.pictures)" v-if="item.pictures!=''">
				</image>
				<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
				 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
				</image>
			</view>
			<view class="flex padding justify-between" >
				<view>
					<button class="cu-btn bg-light-blue sm round" v-if="item.userId==userId "  :id="index" open-type="share">分享邀请</button>
					<button class="cu-btn bg-orange sm round  " v-else-if="item.onlooker" :id="index" open-type="share">为TA打Call</button>
					<button class="cu-btn bg-green sm round  " v-else-if="item.userId!=userId && !item.onlooker&&item.challengeRmb<=0"  @tap="lookerClick(item,index)">围观</button>
					<button class="cu-btn bg-green sm round  " v-else  @tap="lookerClick(item,index)">围观分钱</button>
					<text class="text-gray text-df ">{{item.onlookerCount}}</text>
				</view>
				<view class="text-xxl" @click="goPage(item.id)" v-if="userId==item.userId&&item.pushCardCount<item.targetDay" >
					<button class="cu-btn line-green sm round  "  >立即打卡</button>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['tab','item','showBut','index','userId'],
		
		data(){
			return {
				audioPlaySrc:'../static/images/icon/img/title.png',
			}
		},
		methods:{
			error: function(index) {
				
				var num=Math.floor(Math.random()*8+1);
				this.audioPlaySrc='../static/images/icon/img/title'+num+'.png'
			            }  ,
			goPage(item){
				
				uni.navigateTo({
					url:'/pages/selfCenter/clockIn?pushId='+item
				});
			},
			goPageCard(e){
				
				uni.navigateTo({
					url:'../index/action/action?pushId='+e.id
				})
			},
			goUser(e){
				uni.navigateTo({
					url:'../selfCenter/selfView?userId='+e
				})
			},
			goPageImg(e){
				
				uni.navigateTo({
					url:'../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			},
			lookerClick(list,index){
				
				this.$emit('lookerClick',list,index);
			},
			toggleMask(e,index){
				this.$emit('toggleMask',e,index);
			}
		}
	}
</script>

<style  lang="scss">

	.imgheit{
		height: 320upx;
		width: 100%;
	}
	.textcen{
		max-height: 6.4em;
		overflow: hidden;
		font-size: 30rpx;
		margin-bottom: 20rpx;

	}
	.bg-light-blue{background-color: #007AFF;}
</style>
