<template>
	<web-view :src="url" :progress="false">
		</web-view>
</template>

<script>
	export default {
			data() {
				return {
					url: '',
				};
			},
			onLoad(val) {
				console.log(val);
				this.url = decodeURIComponent(val.url) //解码网址
			},
		}
</script>

<style>
</style>
