<template>
	<view class="formAction">
		<view class="padding-top-xl">
			<view class="grid col-3 padding-sm">
				<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
					<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox"
					 :data-value="item.value"> {{item.name}}元
					</button>
				</view>
			</view>
		</view>
		
		<view class="btn_bar">
			<button class="bg-orange " @tap="gopay">提交</button>
		</view>
	</view>
</template>

<script>
	import{ mapState} from 'vuex'
export default {
	data() {
		return {
			checkbox: [{
				value: 0,
				name: '1',
				checked: false,
				
			}, {
				value: 1,
				name: '6',
				checked: false,
				
			}, {
				value: 2,
				name: '18',
				checked: false,
				
			}, {
				value: 3,
				name: '66',
				checked: false,
				
			}, {
				value: 4,
				name: '188',
				checked: false,
				
			}, {
				value: 5,
				name: '888',
				checked: false,
				
			}],
			rmb:'',
			
		};
	},
	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onLoad(option) {
		
		
	},
	methods: {
		
		gopay(){
		   
			var that=this;
			 if(!that.hasLogin){
			 	return that.xdUniUtils.xd_login(that.hasLogin);
			 }
			that.xd_request_post(that.xdServerUrls.xd_balanceWithdrawal,{
				desc:'',
				rmb:Number(that.rmb)*100,
			}
			,true).then( res=>{
				if(res.resultCode==0){
					 this.xdUniUtils.xd_showToast('已成功提现到微信'+Number(that.rmb)+'元',2000,"none",function(){
						 setTimeout(function(){
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							 console.log("beforePage");
							 console.log(beforePage);
							uni.navigateBack({
								success: function() {
									beforePage.onLoad(); // 执行前一个页面的onLoad方法
								}
							});
						},2000)
					 })
				}else{
					this.xdUniUtils.xd_showToast(res.obj,5000,"none",function(){
						setTimeout(function(){
							 let pages = getCurrentPages(); // 当前页面
							 let beforePage = pages[pages.length - 2]; // 前一个页面
							  console.log("beforePage");
							  console.log(beforePage);
							 uni.navigateBack({
								 success: function() {
									 beforePage.onLoad(); // 执行前一个页面的onLoad方法
								 }
							 });
						},2000)
					})
				}
			})
		},
		ChooseCheckbox(e) {
			let items = this.checkbox;
			let values = e.currentTarget.dataset.value;
			for (let i = 0; i<items.length; ++i) {
				if (items[i].value == values) {
					this.rmb=items[i].name;
					items[i].checked = true;
				}else{
					items[i].checked = false;
					
				}
			}
		}
		
		
	},
	
};
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #FFFFFF;
	}
.formAction {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.btn_bar {
	position: absolute;
	bottom: 0;
	width: 92%;
	margin-bottom: 10upx;
}

</style>
