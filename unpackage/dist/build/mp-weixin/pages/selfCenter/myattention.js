(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selfCenter/myattention"],{"53f0":function(t,e,n){},"94fd":function(t,e,n){"use strict";n.r(e);var o=n("df33"),i=n("ec5b");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("c951");var r,s=n("f0c5"),a=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"39f58e2e",null,!1,o["a"],r);e["default"]=a.exports},"9fb3":function(t,e,n){"use strict";(function(t){n("4e6c"),n("921b");o(n("66fd"));var e=o(n("94fd"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ba95:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("2f62");var o=function(){n.e("components/indexList").then(function(){return resolve(n("1294"))}.bind(null,n)).catch(n.oe)},i={data:function(){return{attentionList:[],pageNum:1,pageSize:10,userId:"",userInfo:"",token:t.getStorageSync("token")}},onShow:function(){if(""==this.userInfo||void 0==this.userInfo||null==this.userInfo)try{this.userInfo=t.getStorageSync("userInfo")}catch(e){console.log(Error)}},onLoad:function(e){this.userId=e.userId;try{this.userInfo=t.getStorageSync("userInfo")}catch(n){console.log(Error)}this.getShowFollow()},methods:{goUser:function(e){t.navigateTo({url:"selfView?userId="+e})},getShowFollow:function(){var e=this,n=this;""==n.userId&&(n.userId=t.getStorageSync("id")),this.xd_request_post(this.xdServerUrls.xd_getAttentionList,{userId:n.userId,pageNum:1,pageSize:10},!0).then((function(t){e.attentionList=t.obj.list,e.pageNum=t.obj.nextPage})).catch((function(t){}))},getReachList:function(){var e=this;return 0==e.pageNum?(t.showLoading({title:"没有更多数据了"}),setTimeout((function(){t.hideLoading()}),1e3),!1):(t.showLoading({title:"加载中.."}),e.hasLogin?void e.xd_request_post(e.xdServerUrls.xd_getAttentionList,{userId:e.userId,pageNum:e.pageNum,pageSize:e.pageSize},!0).then((function(n){e.pageNum=n.obj.nextPage,e.attentionList=e.attentionList.concat(n.obj.list),setTimeout((function(){t.hideLoading()}),1e3)})):(t.navigateTo({url:"../login/login"}),!1))}},onPullDownRefresh:function(){this.getShowFollow(),this.pageNum=1,t.stopPullDownRefresh()},onReachBottom:function(){this.getReachList()},components:{indexList:o}};e.default=i}).call(this,n("543d")["default"])},c951:function(t,e,n){"use strict";var o=n("53f0"),i=n.n(o);i.a},df33:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}))},ec5b:function(t,e,n){"use strict";n.r(e);var o=n("ba95"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a}},[["9fb3","common/runtime","common/vendor"]]]);