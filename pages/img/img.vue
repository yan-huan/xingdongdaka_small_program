<template>
	<view>
		<!-- <view class="img-num"> {{nun}}-{{img.length}}</view> -->
		<view class="uni-padding-wrap uni-common-mt" @touchstart="start" @touchend="end">
				<movable-area scale-area>
					<block v-for="(item,index) in img " :key="index">
						<movable-view v-if="index+1==nun" direction="all" @scale="onScale" scale="true" scale-min="1" scale-max="4" :scale-value="scale">
							<image :src="img[index]" mode="widthFix"></image>
						</movable-view>
					</block>	
				</movable-area>
		</view>
		<view class="img-num"> {{nun}}-{{img.length}}</view>
	</view>	
</template>

<script>
export default { 
	data() {
		return {
			nun:1,
			   img:[],
			 scale:1,
			 indexs:'',
			 startData:{
				clientX:'',
				clientY:''
			},
			startTime:'',
			
		};
	},
	onLoad(option) {
		this.index(option);
	}, 
	methods: {
		index(option){
			var url=JSON.parse(decodeURIComponent(option.url)).toString();
			if(option.indexs){
			 this.indexs=option.indexs
			}
			var notS = url.split(':')[0];
			var a = notS.indexOf('ps') > -1;
			if(a){
				var ig=[];
				console.log(url)
				ig=url.split(",")
				this.img=ig;
			}else{
				var num=Math.floor(Math.random()*8+1);
				var imgs='../../static/images/icon/img/title'+num+'.png'
				this.img.push(imgs);
			}			
		},
		onScale(){
		                
		            },
		start(e){
			 
		                       
			this.startData.clientX=e.changedTouches[0].clientX;
						 
			this.startData.clientY=e.changedTouches[0].clientY;
			this.startTime=e.timeStamp;
		},
		end(e){
			 
			const subX=e.changedTouches[0].clientX-this.startData.clientX;
			const subY=e.changedTouches[0].clientY - this.startData.clientY;
			const  time=e.timeStamp-this.startTime;
			
			if(subY>50 || subY<-50){
			//上下
			}else{
				if(subX>100&&time<200){
					// 右滑动
					if(this.nun>1&&this.nun<=this.img.length){
						this.nun--;
					}
				}else if(subX<-100&&time<200){
					// 左滑
					if(this.nun<this.img.length){
						this.nun++;
					}
				}else{
					
				}
			}
			}
	}
};
</script>

<style lang="scss" scoped>
movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height:100%;
}

movable-area {
    height: 100%;
    width: 100%;
    position:fixed;
    overflow: hidden;
}
    
movable-view image{
    width:100%;
}
.img-num{
	position:absolute;
	 z-index: 1;
	 bottom: 40upx;
	 left: 46%;

}
</style>