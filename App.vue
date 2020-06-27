<!-- xiaofang:20191226 -->
<script>
	import xdConfig from '@/common/xdConfig.js'; // 系统配置
	import xdServerUrls from '@/common/xdServerUrls.js'; // 服务 url
	export default {
		onLaunch: function() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
			    // 请求完新版本信息的回调
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
		@import './common/xdCommon.css';
		@import "./colorui/main.css";
		@import "./colorui/icon.css";
		
	</style>
