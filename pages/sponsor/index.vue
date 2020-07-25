<template>
	<view>
		<view scroll-x class="xd-bg nav text-center">
			<view class="cu-item" >
				赞助
			</view>
		</view>
		<view  class="margin-top">
			<view class="title flex-sub">
				<view class="xd-img-sponsor" style="background-image:https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg; background-repeat:no-repeat;">
					
				</view>
				
			</view>
			<view class="xd-border-color flex-twicee">	
				<view>
					
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:[{
						label:"赞助金",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"活动场地",
						val:"",
						placeholder:"",
						type:"addr"
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"抵扣券",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"折扣券",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
					{
						label:"其他",
						val:"",
						placeholder:""
					},
					{
						label:"获取条件",
						val:"",
						placeholder:""
					},
				]
			};
		},
		methods:{
			onCommit(){
				console.log('提交')
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
