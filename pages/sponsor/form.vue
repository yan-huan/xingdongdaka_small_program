<template>
	<view>
		<view scroll-x class="xd-bg nav text-center">
			<view class="cu-item" >
				赞助
			</view>
		</view>
		<form>
			<view v-for="(item,index) in form" :key="index" :class="index===0?'cu-form-group margin-top' :'cu-form-group'">
				<view class="title flex-sub">
					{{item.label}}
					<text v-if="item.type==='addr'" class='cuIcon-locationfill text-orange'></text>
				</view>
				<view class="xd-border-color flex-treble">	
					<input v-model="item.val"  :placeholder="item.placeholder" name="input"></input>
					
				</view>
			</view>
			<view class="cu-form-group xd-flex-center margin-top xd-pd-tb-10">
				<button class="cu-btn block line-orange lg"  @tap="onCommit">
					<text class="cuIcon-check"></text> 提交</button>	
			</view>
			
		</form>		
		
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
