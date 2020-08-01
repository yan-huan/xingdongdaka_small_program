<template>
	<view>
		<cu-custom bgColor="xd-bg nav text-center" :isBack="true"><block slot="backText">返回</block><block slot="content">赞助</block></cu-custom>
		
		<view class="cu-card">
			<view class="xd-grids  xd-sponsor-content">
				<view class="xd-img-shadow xd-br-30">
					<view class="xd-img-sponsor xd-br-30"  style=" width: 300upx;height: 200upx; background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
				</view >
				<view class="cu-item xd-grids">
					<view class="xd-avatar cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
					<view class="content flex-sub" style="position: relative;">
						<view class="xd-grids">
							<view class="text-grey">暖暖</view>
							<button class="cu-btn line-orange xd-btn-follow">关注</button>
						</view>
						<view class="xd-act-title">
							世界上两个我一个吃货的我,一个减肥的我
							世界上两个我一个吃货的我,一个减肥的我
							世界上两个我一个吃货的我,一个减肥的我
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-list grid" style="display: flex;" >
				<view class="cu-item xd-btn-tips-three"  v-for="(item,index) in cuIconList" :key="index" style=" display: flex; flex-direction: row; padding:0 30upx; border: 0;">
					<view style="margin: 0; width: auto;" >
						<button :style="'background-color: '+item.color" class="cu-btn">{{item.name}} <text v-if="item.money" class="xd-btn-money">￥{{item.money}}</text> </button>
						<view class="cu-tag badge" v-if="item.badge">
							<block>{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
				</view>
			</view>
		</view>
			
			
			
		<view class="xd-sponsor-content">
			
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'yellow',
					badge: 120,
					name: '赞助'
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
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

