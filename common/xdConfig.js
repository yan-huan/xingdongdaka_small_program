// 获取当前小程序信息（要求小程序版本2.10.0）
const accountInfo = uni.getAccountInfoSync();
// env类型
export const env = accountInfo.miniProgram.envVersion;
 uni.setStorageSync("env",env);
const baseApi = {
  // 开发版
  develop: "http://testxingdongdaka.zhidashixun.com",
   // develop: "https://xingdongdaka.zhidashixun.com",
  // 体验版
  trial: "http://testxingdongdaka.zhidashixun.com",
  // 正式版
  release: "https://xingdongdaka.zhidashixun.com"
};
// 系统配置
const appConfig = {	
	enableDebug: true, // 设置是否打开调试开关。此开关对正式版也能生效。
	// server 配置
	serverIp: baseApi[env], // server IP
	
}
export default {
	appConfig
}
