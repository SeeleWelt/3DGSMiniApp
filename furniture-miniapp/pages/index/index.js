const DEFAULT_SHOWROOM_URL = "https://furniture.metop.com.cn/miniapp/";

function getMiniappCaseUrl() {
  const app = getApp();
  return app?.globalData?.showroomUrl || DEFAULT_SHOWROOM_URL;
}

Page({
  data: {
    homeUrl: getMiniappCaseUrl()
  },

  onLoad() {
    this.setData({
      homeUrl: getMiniappCaseUrl()
    });
  },

  onShareAppMessage() {
    return {
      title: "3D 行业案例展厅，在线查看多品类样板",
      path: "/pages/index/index"
    };
  },

  onShareTimeline() {
    return {
      title: "3D 行业案例展厅，在线查看多品类样板"
    };
  }
});
