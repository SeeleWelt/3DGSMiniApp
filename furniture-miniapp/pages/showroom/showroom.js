const DEFAULT_SHOWROOM_URL = "https://furniture.metop.com.cn/miniapp/";

function buildShowroomUrl(options = {}) {
  const app = getApp();
  const baseUrl = app?.globalData?.showroomUrl || DEFAULT_SHOWROOM_URL;
  const query = ["miniapp=home", "lang=zh"];

  if (options.item) {
    query.push(`item=${encodeURIComponent(options.item)}`);
  }

  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}${query.join("&")}`;
}

Page({
  data: {
    showroomUrl: DEFAULT_SHOWROOM_URL
  },

  onLoad(options) {
    this.setData({
      showroomUrl: buildShowroomUrl(options)
    });
  },

  onShareAppMessage() {
    return {
      title: "3D 家具展厅，在线看清家具体量",
      path: "/pages/showroom/showroom"
    };
  },

  onShareTimeline() {
    return {
      title: "3D 家具展厅，在线看清家具体量"
    };
  }
});
