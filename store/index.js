import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        
		hasLogin:false,
		real:false,
		infoRes:{},
		userInfo:{},
		
		
    },
    mutations: {
       
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
		},
		uPuserInfo(state,provider){
			state.userInfo=provider;
			uni.setStorageSync('userInfo',state.userInfo)
		}
    }
})
export default store;
