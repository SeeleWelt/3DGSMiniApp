const DEFAULT_ITEM = "atelier-low-sofa";
const SHARE_TITLE = "实景 3D 家具展厅，在线看清家具体量";
const SHARE_IMAGE = "/assets/atelier-low-sofa.png";

function buildShowroomPath(options = {}) {
  const item = options.item || DEFAULT_ITEM;
  return `/pages/index/index?item=${encodeURIComponent(item)}`;
}

Page({
  data: {
    item: DEFAULT_ITEM
  },

  onLoad(options = {}) {
    const item = options.item || DEFAULT_ITEM;

    this.setData({ item });

    wx.showShareMenu?.({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },

  enterShowroom() {
    wx.navigateTo({
      url: buildShowroomPath({ item: this.data.item })
    });
  },

  onShareAppMessage() {
    return {
      title: SHARE_TITLE,
      path: `/pages/share/share?item=${encodeURIComponent(this.data.item)}`,
      imageUrl: SHARE_IMAGE
    };
  },

  onShareTimeline() {
    return {
      title: SHARE_TITLE,
      query: `item=${encodeURIComponent(this.data.item)}`,
      imageUrl: SHARE_IMAGE
    };
  }
});
