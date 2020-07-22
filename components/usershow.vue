<template name='usershow'>
	
		<view class="cu-list  bg-blue ">
			<view class="cu-item flex padding flex-wrap align-center solid-bottom">
				<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPage(list)">
					<view v-if="list.sex==2" class="cu-tag badge cuIcon-female bg-pink"></view>
					<view v-if="list.sex==1" class="cu-tag badge cuIcon-male bg-cyan"></view>
				</view>
				<view class="content flex-sub margin-left-sm" @tap="goPage(list)">
					<view>{{list.userName}}</view>
					<view class=" text-lg flex align-center">
						<text class="lg text-orange cuIcon-location"></text>
						<text class="text-gray text-sm ">{{list.province}}{{list.city}}</text>
					</view>
				</view>
				<view >
					<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0"  @tap="clidtags(list)" >
						{{guanzhu}}
					</view>
				</view>
			</view>
			<!-- <view class=" flex flex-wrap justify-around padding-sm">
				<view class="">
					关注
				</view>
				<view class="">
					粉丝
				</view>
			</view> -->
		</view>
	
</template>

<script>
	export default {
		name:"usershow",
		props:['list','looktotals','guanzhu'],
		data() {
			return {
				
			}
		},
		methods: {
			clidtags(e){
				this.$emit("clidtags",e);
			}
		}
	}
</script>

<style  lang="scss">
</style>
