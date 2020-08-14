<!-- xiaofang:20191226 -->
<script>
	import Vue from 'vue'
	import xdConfig from '@/common/xdConfig.js'; // 系统配置
	
	import{ mapState,mapMutations} from 'vuex';
	export default {

		methods: {
			...mapMutations(['IndexlogIn'])
		},

		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
					
			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]
			
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function(res) {
			    // 请求完新版本信息的回调
				console.log(res);
			    if (res.hasUpdate) {
			        updateManager.onUpdateReady(function(res2) {
			            uni.showModal({
			                title: '更新提示',
			                content: '发现新版本，是否重启应用?',
			                cancelColor:'#eeeeee',
			                confirmColor:'#FF0000',
			                success(res2) {
			                    if (res2.confirm) {
			                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			                        updateManager.applyUpdate();
			                    }
			                }
			            });
			        });
			    }
			});
					
			updateManager.onUpdateFailed(function(res) {
			    // 新的版本下载失败
			    uni.showModal({
			        title: '提示',
			        content: '检查到有新版本，但下载失败，请检查网络设置',
			        success(res) {
			            if (res.confirm) {
			                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			                updateManager.applyUpdate();
			            }
			        }
			    });
			});
			if(uni.getStorageSync('token')){
				this.IndexlogIn();
			}
		},
		onShow: function() {
			
		},
		
		onHide: function() {
			
		}
	}
</script>

	<style lang="scss">
		/* 引入 图标字体 */
		// @import './static/fonts/iconfont.css';
		/* 引入 自定义公共样式 */
		@import "./colorui/main.css";
		@import "./colorui/icon.css";
		@import './common/xdCommon.css';
		
	</style>
