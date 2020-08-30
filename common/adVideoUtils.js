let videoAd = null;
let adVideoUtils = {
  /**
   * @param {String} adUnitId 小程序广告视频id
   * videoAdInit 初始化广告
   */
  videoAdInit(adUnitId) {
    if (videoAd) {
      videoAd = null;
    }
    if (uni.createRewardedVideoAd) {
      videoAd = uni.createRewardedVideoAd({
        adUnitId: adUnitId,
      });
      if (videoAd) {
        videoAd.onError((err) => {
          console.log(err);
        });
      }
      // return videoAd;
    }
  },
  /* 显示广告 ture为播放完成 */
  videoAdShow() {
    return new Promise((resolve, reject) => {
      adVideoUtils._showAd().then((val) => {
        if (val) {
          videoAd.onClose((res) => {
            if (res.isEnded) {
              //成功 给予奖励
              resolve(true);
            } else {
              resolve(false);
            }
          });
          videoAd.onError((err) => {
            if (err.errCode == "1004") {
              reject("1004");
            } else {
              reject(err);
            }
          });
        } else {
          reject(err);
        }
      });
    });
  },
  _showAd() {
    return new Promise((resolve) => {
      videoAd
        .show()
        .then(() => {
          console.log("广告显示成功");
          resolve(true);
        })
        .catch((err) => {
          console.log("广告组件出现问题", err);
          // 可以手动加载一次
          videoAd
            .load()
            .then(() => {
              console.log("手动加载成功");
              resolve(true);
              // 加载成功后需要再显示广告
              return videoAd.show();
            })
            .catch((err) => {
              resolve(false);
              console.log("广告组件出现问题2次加载", err);
              // this.showUToast("加载失败啦，请稍后在试", "error");
            });
        });
    });
  },
};
export default adVideoUtils;