(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selfCenter/editUserInfo"],{"1c41":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={data:function(){return{current:0,items:[{value:0,name:"女"},{value:1,name:"男"},{value:2,name:"保密"}],userMobile:"",schoolName:"",userName:"",province:"",city:"",img:"",openId:"",unionId:"",customItem:"全部",region:[]}},onLoad:function(){var t=e.getStorageSync("userInfo");this.userName=t.nickName,this.current=t.gender,this.img=t.avatarUrl,this.openId=t.openId,this.schoolName=t.schoolName,this.unionId=t.unionId,this.userMobile=t.userMobile},methods:i({},(0,o.mapMutations)(["uPuserInfo"]),{onConfirm:function(e){this.pickerText=e.label},bindPickerChange:function(e){this.region=e.detail.value},popUpImg:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(n){var o=n.tempFilePaths;t.xdUniUtils.xd_request_img(n.tempFilePaths[0]).then((function(n){n&&e.uploadFile({url:t.xdServerUrls.xd_uploadFile,filePath:o[0],name:"files",formData:{userId:e.getStorageSync("id")},success:function(e){t.img=JSON.parse(e.data).obj[0]}})}))}})},fromSubmit:function(t){var n=this,o={token:"",id:""};try{o.token=e.getStorageSync("token"),o.id=e.getStorageSync("id")}catch(t){}this.xdUniUtils.xd_request_text({content:t.detail.value}).then((function(r){if(0!=r.obj.errcode)return e.showToast({title:"内容包含敏感内容",mask:!0,duration:2e3}),!1;n.xd_request_post(n.xdServerUrls.xd_modifyUserInfo,{userMobile:t.detail.value.userMobile,schoolName:t.detail.value.schoolName,userName:t.detail.value.userName,province:n.region[1],city:n.region[2],token:o.token,sex:t.detail.value.sex,id:o.id,userHead:n.img,openId:n.openId},!0).then((function(t){0==t.resultCode?n.xd_request_post(n.xdServerUrls.xd_getUserInfoByUserId,{userId:t.obj.id},!0).then((function(t){if(0==t.resultCode){var o={nickName:"",avatarUrl:"",province:"",city:"",gender:"",schoolName:"",openId:n.openId,unionId:n.unionId};o.nickName=t.obj.userName,o.avatarUrl=t.obj.userHead,o.province=t.obj.province,o.city=t.obj.city,o.gender=t.obj.sex?t.obj.sex:"2",o.schoolName=t.obj.schoolName?t.obj.schoolName:"无",o.userMobile=t.obj.userMobile,n.uPuserInfo(o),e.showToast({title:"保存成功",mask:!0,duration:2e3}),e.navigateBack({delta:1})}})):(e.showToast({title:"保存失败",mask:!0,duration:2e3}),e.navigateBack({delta:1}))}))}))}})};t.default=u}).call(this,n("543d")["default"])},"2a70":function(e,t,n){"use strict";(function(e){n("4e6c"),n("921b");o(n("66fd"));var t=o(n("cac3"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"57d9":function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},c092:function(e,t,n){},cac3:function(e,t,n){"use strict";n.r(t);var o=n("57d9"),r=n("fb6d");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("d207");var a,u=n("f0c5"),c=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=c.exports},d207:function(e,t,n){"use strict";var o=n("c092"),r=n.n(o);r.a},fb6d:function(e,t,n){"use strict";n.r(t);var o=n("1c41"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a}},[["2a70","common/runtime","common/vendor"]]]);