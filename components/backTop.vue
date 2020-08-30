<template>
	<view
		v-if="scrollTop > 2000"
		class="backTop"
		:class="{ 'mescroll-fade-in': isShowToTop }"
		@click="toTopClick"
	>
		<text class="iconfont  cuIcon-fold"></text>
	</view>
</template>
<script>

export default {
	name: 'backTop',
	props: {
		id: {
			type: String,
			default: ''
		},
		scrollTop: {
			type: Number,
			default: 0
		},
		tab: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isShowToTop: true
		};
	},
	methods: {
		toTopClick() {
			this.isShowToTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
			if (this.tab) {
				this.$emit('setScrollTop');
			} else {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
};
</script>
<style lang="scss">
.mescroll-lazy-in,
.mescroll-fade-in {
	-webkit-animation: mescrollFadeIn 0.3s linear forwards;
	animation: mescrollFadeIn 0.3s linear forwards;
}

.backTop {
	z-index: 90;
	position: fixed;
	// right: 40upx;
	// bottom: 130upx;
	
	// bottom: 140upx;
	
	// width: 72upx;
	// height: 72upx;
	bottom: 100upx; right:30upx;
	width: 100upx; height:100upx;
	border-radius: 50%;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
	background-color: rgba(255,230,111,1);
	border: 2px solid #ffa700;
	display: flex;
	justify-content: center;
	align-items: center;
	.iconfont {
		
		font-size: 70upx;
		color: #585858;
		font-weight: 600;
		z-index: 100;
	}
}
</style>
