const RESULT_STORAGE_KEY = "metopEvaluatorResult";

Page({
  data: {
    result: null,
    contact: "",
    materialFiles: []
  },

  onLoad() {
    const result = wx.getStorageSync(RESULT_STORAGE_KEY);

    if (result) {
      this.setData({
        result: {
          materialUpload: {
            title: "未记录素材提交方式",
            copy: "请返回评估页重新选择当前素材类型。",
            action: "",
            type: "none",
            count: 0,
            files: []
          },
          canUploadMaterial: false,
          ...result
        },
        contact: result.contact || "",
        materialFiles: result.materialUpload?.files?.map((name, index) => ({
          id: `cached-${index}`,
          name,
          sizeText: ""
        })) || []
      });
    }
  },

  onContactInput(event) {
    this.setData({
      contact: event.detail.value
    });
  },

  copyLeadMessage() {
    const { result } = this.data;

    if (!result) {
      return;
    }

    const message = [
      `商品 3D 展示适配评估：${result.score} 分，${result.level}`,
      `联系方式：${this.data.contact || "未填写"}`,
      `素材提交：${this.data.materialFiles.length} 个文件`,
      result.verdict,
      `建议下一步：${(result.nextActions || ["发送商品链接和素材，申请首件商品 AI 3D 展示样板"])[0]}。`
    ].join("\n");

    wx.setClipboardData({
      data: message
    });
  },

  backToEvaluator() {
    wx.navigateBack({
      delta: 1,
      fail() {
        wx.redirectTo({
          url: "/pages/evaluator/evaluator"
        });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: "商品 AI 3D 展示适配评估结果",
      path: "/pages/evaluator/evaluator"
    };
  }
});
