// 获取当前小程序信息（要求小程序版本2.10.0）
const accountInfo = uni.getAccountInfoSync();
// env类型
export const env = accountInfo.miniProgram.envVersion;
console.log(env)
const baseApi = {
  // 开发版
  develop: "http://testxingdongdaka.zhidashixun.com",
  // 体验版
  trial: "http://testxingdongdaka.zhidashixun.com",
  // 正式版
  release: "https://xingdongdaka.zhidashixun.com"
};
// 系统配置
const appConfig = {
	// 关于
	contractWebsite: "www.xxx.cn", // 联系网址
	contractTel: "010-xxxxxxxx", //  联系电话
	contractAddress: "xxxxxxxx", // 联系地址
	contractName: "北京xxxxxxxx公司", // 公司名称
	// 基本配置
	appName: "xingdongdaka", // 项目名字
	appLogTag: "xingdongdaka-log", // log tag
	enableDebug: true, // 设置是否打开调试开关。此开关对正式版也能生效。
	// server 配置
	serverName: 'xingdongdaka' ,// server项目名称
	
	serverProtocal: 'https', // server 协议
	serverIp: baseApi[env], // server IP
	
	//serverProtocaltest: 'http', // server 协议
	//serverIptest: baseApi[env],
}
export default {
	appConfig
}
