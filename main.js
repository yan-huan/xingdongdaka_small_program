import Vue from 'vue';
import App from './App';
import store from './store';
import xdServerUrls from '@/common/xdServerUrls.js'; // 服务 url
import xdUniUtils from '@/common/xdUniUtils.js'; // 工具包
import moment from '@/common/moment.js'

Vue.config.productionTip = false;
Vue.prototype.xdServerUrls = xdServerUrls.serverUrls; // 服务 url
Vue.prototype.xd_request = xdUniUtils.xd_request; // 网络请求
Vue.prototype.xd_request_get = xdUniUtils.xd_request_get; // 网络请求 GET
Vue.prototype.xd_request_post = xdUniUtils.xd_request_post; // 网络请求 POST
Vue.prototype.xdUniUtils = xdUniUtils; //


Vue.prototype.$store=store;

moment.locale('zh-cn');
Vue.prototype.moment = moment;

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()