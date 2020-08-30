<template>
	<view class="container">
		<view >
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in lookerList" :key="item.id">
					<view
						class="cart-item" 
						:class="{'b-b': index!==lookerList.length-1}"
					>
						<view class="image-wrapper">
							<image :src="item.userHead" 
								class="image-picUrl"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('lookerList', index)" 
								@error="onImageError('lookerList', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.userName}}</text>
							<text class="price">{{item.lookerCount}}</text>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import indexList from "@/components/indexList.vue";
	
	export default {
		data() {
			return {
				lookNextPageTwo:'',
				pushId:'',
				lookerList:'',
			}
		},
		onLoad(options) {
			this.pushId=options.pushId;
			this.getLookerList();
		},
		methods: {
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
					pushId:'771',
					pageNum: this.lookNextPageTwo,
					pageSize:10,
				},true)
				.then(res=>{
					this.lookerList=res.obj.list;
					this.looktotal=res.obj.total;
					this.lookNextPageTwo=res.obj.nextPage;	
				})
			}
		}
		
		
	}
</script>
<style lang="scss">
	.container{
		padding-bottom: 134upx;
		}
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		background: rgba(255, 255, 255, 0.9);
		.image-wrapper{
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position:relative;
			image{
				opacity:1;
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
		
		}
	}
	.action-section{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: 40upx;
			color: #fff;
			background: #FFFFFF;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: 40upx;
			
			}
			.coupon{
				font-size: 20upx;
				
				text{
					
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: 30upx;
		
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: #4CD964
	}
	.image-picUrl{
		width: 300upx;
		height: 300upx;
	}
</style>
