import Vue from 'vue';
import App from './App';
import store from './store';
import xdServerUrls from '@/common/xdServerUrls.js'; // 服务 url
import xdUniUtils from '@/common/xdUniUtils.js'; // 工具包

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false;
Vue.prototype.xdServerUrls = xdServerUrls.serverUrls; // 服务 url
Vue.prototype.xd_request = xdUniUtils.xd_request; // 网络请求
Vue.prototype.xd_request_get = xdUniUtils.xd_request_get; // 网络请求 GET
Vue.prototype.xd_request_post = xdUniUtils.xd_request_post; // 网络请求 POST
Vue.prototype.xdUniUtils = xdUniUtils; //


Vue.prototype.$store=store;
Vue.prototype.$api=prePage;


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()