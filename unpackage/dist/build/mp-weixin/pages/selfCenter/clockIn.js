(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selfCenter/clockIn"],{"29db":function(e,t,n){"use strict";n.r(t);var a=n("b3eb"),o=n("7f8a");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("60e2");var r,s=n("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=u.exports},"60e2":function(e,t,n){"use strict";var a=n("b2c7"),o=n.n(a);o.a},"7f8a":function(e,t,n){"use strict";n.r(t);var a=n("8a7b"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},"8a7b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("2f62");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=e.getRecorderManager(),u=e.createInnerAudioContext(),c={data:function(){return{plays:!0,showmp3:!1,popUp:!1,buttonStart:!1,param:{pictures:[]},audioPlaySrc:"../static/images/icon/img/title.png",loading:"",pushId:"",videodata:"",MP3data:"",progreessnum:"",tempFilePaths:[],j:0,isShare:1,pushList:"",voicePath:"",max:6e5,frame:50,maxTiming:!1,draw:void 0,timeminute:0}},computed:i({},(0,a.mapState)(["hasLogin"])),onLoad:function(e){this.pushId=e.pushId,this.getpushList()},methods:{stopplay:function(){u.stop,this.plays=!0},play:function(){u.setSrc=this.MP3data,u.play,this.plays=!1},popUpImgs:function(){this.popUp=!this.popUp},showmp:function(){this.popUp=!1,this.showmp3=!this.showmp3},ViewImage:function(e){console.log(e),this.param.pictures.splice(e,1)},error:function(){var e=Math.floor(8*Math.random()+1);this.audioPlaySrc="../../static/images/icon/img/title"+e+".png"},getpushList:function(){var t=this;if(!e.getStorageSync("token"))return e.navigateTo({url:"../../login/login"}),!1;this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{pushId:this.pushId,isShare:this.isShare,lookUserId:e.getStorageSync("id")},!0).then((function(n){if(0==n.resultCode){var a=n.obj;a.createTime=t.xdUniUtils.xd_timestampToTime(n.obj.createTime,!1,!1,!0),a.endTime=t.xdUniUtils.xd_timestampToTime(n.obj.endTime,!1,!1,!0),a.challengeRmb=n.obj.challengeRmb/100,t.pushList=a}else e.showToast({title:n.msg,icon:"none"})}))},submitFrom:function(t){var n=this;return this.hasLogin?""==t.detail.value.content?(e.showToast({title:"打卡不能为空",mask:!0,duration:1e3,image:"/static/images/icon/clock.png"}),!1):void this.xdUniUtils.xd_request_text({content:t.detail.value}).then((function(a){if(0!=a.obj.errcode)return e.showToast({title:"内容包含敏感内容",mask:!0,duration:2e3}),!1;n.xd_request_post(n.xdServerUrls.xd_savePushCard,{pushId:n.pushId,userId:e.getStorageSync("id"),content:t.detail.value.content,pictures:n.param.pictures,videos:n.videodata,extendContent:n.MP3data},!0).then((function(t){var a=n;e.showToast({title:"保存成功",icon:"success",duration:1500,success:function(){e.reLaunch({url:"../index/cardDetails/cardDetails?pushId="+a.pushId+"&cardId="+t.obj+"&show=0"})}})}))})):(e.navigateTo({url:"../login/login"}),!1)},popUpImg:function(){var t=this;t.popUp=!1,e.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t.tempFilePaths=e.tempFilePaths,t.j=0,t.getImg()}})},getImg:function(){var t=this;if(t.j>=t.tempFilePaths.length)return!1;t.xdUniUtils.xd_request_img(t.tempFilePaths[t.j]).then((function(n){if(n){var a=e.uploadFile({url:t.xdServerUrls.xd_uploadFile,filePath:t.tempFilePaths[t.j],name:"files",formData:{userId:e.getStorageSync("id")},success:function(e){0==JSON.parse(e.data).resultCode&&(t.param.pictures.push(JSON.parse(e.data).obj[0]),t.j++,t.getImg())}});a.onProgressUpdate((function(e){t.loading=e.progress,t.loading>=100&&setTimeout((function(){t.loading=0}),1e3)}))}}))},popUpVideo:function(){var t=this;t.popUp=!1,e.chooseVideo({maxDuration:60,count:1,compressed:!1,sourceType:["album"],success:function(n){var a=n.tempFilePath;if(!(n.size<104857600))return e.showToast({title:"视频应<20M",mask:!0,duration:2e3}),!1;var o=e.uploadFile({url:t.xdServerUrls.xd_uploadFile,method:"POST",formData:{userId:e.getStorageSync("id")},filePath:a,name:"files",success:function(e){t.videodata=JSON.parse(e.data).obj[0]}});o.onProgressUpdate((function(e){t.loading=e.progress,t.loading>=100&&setTimeout((function(){t.loading=0}),1e3)}))}})},startRecord:function(t){var n=this;s.start({duration:6e5,format:"mp3"}),n.maxTiming=setTimeout((function(){clearInterval(n.draw),console.log("时间到")}),n.max);var a=t.detail.x/2,o=t.detail.y/2;console.log(a),console.log(o);var i=-.5,r=0,u=e.createCanvasContext("canvas");n.draw=setInterval((function(){r+=50,r>=1e3&&(console.log(r),r=0,n.timeminute=n.timeminute+1),u.beginPath(),u.setStrokeStyle("#1296db"),u.setLineWidth(3),u.arc(30,30,25,-.5*Math.PI,(i+=2/(n.max/n.frame))*Math.PI,!1),u.stroke(),u.draw()}),n.frame)},endRecord:function(t){var n=this;clearInterval(n.draw),n.showmp3=!1,s.stop(),s.onStop((function(t){var a=t.tempFilePath,o=e.uploadFile({url:n.xdServerUrls.xd_uploadFile,method:"POST",header:{"Content-Type":"multipart/form-data"},formData:{userId:e.getStorageSync("id")},filePath:a,name:"files",success:function(e){n.MP3data=JSON.parse(e.data).obj[0]}});o.onProgressUpdate((function(e){n.loading=e.progress,n.loading>=100&&setTimeout((function(){n.loading=0}),1e3)}))}))}}};t.default=c}).call(this,n("543d")["default"])},b2c7:function(e,t,n){},b3eb:function(e,t,n){"use strict";var a,o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}))},d1aa:function(e,t,n){"use strict";(function(e){n("4e6c"),n("921b");a(n("66fd"));var t=a(n("29db"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["d1aa","common/runtime","common/vendor"]]]);