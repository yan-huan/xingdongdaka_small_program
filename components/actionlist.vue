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
							<view class="" v-if="tab==0||tab==1">
								<text class="text-orange" v-if="item.pushCardStatus==1">进行中...</text>
								<text class="text-gray" v-else-if="item.pushCardStatus==2">未达成</text>
								<text class="text-green" v-else-if="item.pushCardStatus==3">已达成</text>
							</view>
							<view class="cu-tag bg-grey radio margin-left-sm">{{item.label}}</view>
							
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
			<view class="grid flex-sub  padding-lr"  >
				<image class="imgheit"  :src="item.pictures" mode="aspectFill"
				 @tap="goPageImg(item.pictures)" v-if="item.pictures!=''" >
				</image>
				<image class="imgheit"  :src="audioPlaySrc" mode="aspectFill"
				 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
				</image>
			</view>
			<view class="flex padding justify-between" >
				<view>
					<button class="cu-btn bg-light-blue sm round" v-if="item.userId==userId "  :id="index" open-type="share">分享邀请</button>
					<button class="cu-btn bg-orange sm round  " v-else-if="item.onlooker" :id="index" open-type="share">为TA打Call</button>
					<button class="cu-btn bg-green sm round  " v-else-if="item.userId!=userId && !item.onlooker&&item.challengeRmb<=0" :id="index"  @tap="lookerClick(item,indexs)">围观</button>
					<button class="cu-btn bg-green sm round  " v-else  @tap="lookerClick(item,indexs)">围观分钱</button>
					<text class="text-gray text-df ">{{item.onlookerCount}}</text>
				</view>
				<!-- <view class="text-xxl" @click="gothank(item)" v-if="item.pushCardStatus!=1&&userId==item.userId" >
					<button class="cu-btn line-green sm round  "  >设置感谢金</button>
				</view> -->
				<view class="text-xxl" @click="goPage(item)" v-if="userId==item.userId" >
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
				audioPlaySrc:"1"
			}
		},
		methods:{
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg();	
			            } ,
			goPage(item){
				if(item.pushCardStatus==2||item.pushCardStatus==3){
					uni.showModal({
						 content: this.xdCommon.gzsm_clickCard,
						 confirmText: '新建',
						 success: (res) => {
						   if (res.confirm) {
							   uni.setStorageSync('pushData',item)
							 uni.navigateTo({
								 
							 	url:'/pages/action/step1'
							 });
						   } else if (res.cancel) {
							 
						   }
						 }
					})
				}else{
					uni.navigateTo({
						url:'/pages/selfCenter/clockIn?pushId='+item.id
					});
				}
			},
			gothank(item){
				uni.navigateTo({
					url:'/pages/pageA/thankmoney/thankmoney?pushId='+item.id
				});
			},
			goPageCard(e){
				
				uni.navigateTo({
					url:'../index/action/action?pushId='+e.id+'&isopen='+e.isopen
				})
			},
			goUser(e){
				uni.navigateTo({
					url:'../selfCenter/selfView?userId='+e
				})
			},
			goPageImg(e){
				this.xdUniUtils.xd_showImg(e)
			},
			lookerClick(list,indexs){
				
				this.$emit('lookerClick',list,indexs);
			},
			toggleMask(e,indexs){
				this.$emit('toggleMask',e,indexs);
			}
		}
	}
</script>

<style lang="scss">

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
