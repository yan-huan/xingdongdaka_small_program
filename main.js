import Vue from 'vue';
import App from './App';
import store from './store';
import xdServerUrls from '@/common/xdServerUrls.js'; // 服务 url
import xdUniUtils from '@/common/xdUniUtils.js'; // 工具包
import xdCommon from '@/common/xdCommon.js'; //公共规则说明
import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);
import sponsor from './pages/sponsor/index';
Vue.component('sponsor',sponsor);
import AD from "@/common/adVideoUtils.js";

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
Vue.prototype.xdCommon = xdCommon; //

Vue.prototype.$store=store;
Vue.prototype.$api=prePage;
Vue.prototype.$AD=AD;

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()