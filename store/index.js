import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 国际化相关代码
try {
    // 1. 分析用户已经选择的语言 
    var userLang = uni.getStorageSync("userLang");
    // 2. 如果用户没有选择过获取用户手机的语言
    if (!userLang) {
        const sys = uni.getSystemInfoSync();
        userLang = sys.language;
    }
    // 以中英文切换为例, 其他语言请使用 getSystemInfoSync 获取语言对应的字符串
    // 然后扩展语言包即可
    if (userLang.substring(0, 2) == 'zh') {
        var lang = require('../language/zh.js');
    } else {
        var lang = require('../language/en.js');
    }
} catch (e) {
    // error
}
const store = new Vuex.Store({
    state: {
        lang: lang,
		hasLogin:false,
		real:false,
		infoRes:{},
		userInfo:{},
		
		
    },
    mutations: {
        changeLang: function(state) {
            uni.showActionSheet({
                itemList: ['简体中文', 'English'],
                success: function(e) {
                    if (e.tapIndex == 0) {
                        lang = require('../language/zh.js');
                    } else {
                        lang = require('../language/en.js');
                    }
                    state.lang = lang;
                }
            })
        },
		logIn(state,provider){
			state.hasLogin=true;
			state.userInfo=provider;
			uni.setStorageSync('userInfo',state.userInfo)
			
		},
		IndexlogIn(state){
			state.hasLogin=true;	
		},
		logOut(state){
			state.hasLogin=false;
			uni.setStorageSync('userInfo','')
			uni.setStorageSync('token','')
		}
    }
})
export default store;
