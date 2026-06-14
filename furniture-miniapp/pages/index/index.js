const DEFAULT_SHOWROOM_URL = "https://furniture.metop.com.cn/miniapp/";
const DEFAULT_ITEM = "atelier-low-sofa";

function buildMiniappHomeUrl(options = {}) {
  const app = getApp();
  const baseUrl = app?.globalData?.showroomUrl || DEFAULT_SHOWROOM_URL;
  const item = options.item || DEFAULT_ITEM;
  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}miniapp=home&item=${encodeURIComponent(item)}&lang=zh`;
}

Page({
  data: {
    homeUrl: buildMiniappHomeUrl()
  },

  onLoad(options) {
    this.setData({
      homeUrl: buildMiniappHomeUrl(options)
    });
  },

  onShareAppMessage() {
    return {
      title: "实景 3D 家具展厅，在线看清家具体量",
      path: "/pages/index/index"
    };
  },

  onShareTimeline() {
    return {
      title: "实景 3D 家具展厅，在线看清家具体量"
    };
  }
});
