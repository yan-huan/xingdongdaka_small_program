<template>
	<view class="talk">
		<view class="talkLis">
			<view class="talkli talkU">
				<view class="talkHead"><img src="" alt="" class="xd-list-head-img " /></view>
				<view class="talkInfo">
					<text>来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活</text>
					<img src="../../static/images/icon/left.png" class="arrow left" alt="">
					</view>
			</view>
			<view class="talkli talkMe">
				<view class="talkInfo">
					<text>来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活来一场强者的修行 成为更好的自己 人人都是小太阳 你的能量超出想象 践行动、有追求、爱生活</text>
					<img src="../../static/images/icon/right.png" class="arrow right" alt="">
					</view>
				<view class="talkHead"><img src="" alt="" class="xd-list-head-img " /></view>
			</view>
		</view>
		<view class="talkInput">
			<form action="">
				<input class="uni-input" focus placeholder="点击输入内容" />
			</form>
		</view>
	</view>
</template>

<script></script>

<style lang="scss">
	.talk{
		padding:12rpx 30rpx;
	}
	.talkInput{
		position: fixed;
		left:0;
		width:100%;
		bottom:30rpx;
		text-align: center;
		.uni-input{
			border:1px solid #d9d9d9;
			border-radius: 5px;
			height: 50rpx;
			width:90%;
			display:inline-block;
		}
	}
.talkli {
	font-size: 26rpx;
	display: flex;
	padding: 12rpx 0;
	align-items: center;
	.talkHead {
		padding: 12rpx;
	}
	.talkInfo{
		border:1px solid #d9d9d9;
		border-radius: 5px;
		padding:12rpx;
		position: relative;
		.arrow{
			position:absolute;
			top:50%;
			margin-top:-12rpx;
			width:19rpx;
			height: 24rpx;
			display: block;
			z-index: 10;
			background: #fff;
			&.left{
				left:-14rpx;
			}
			&.right{
				right:-14rpx;
			}
		}
	}
}
</style>
