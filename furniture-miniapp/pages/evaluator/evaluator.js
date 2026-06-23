const categoryOptions = [
  { label: "家具 / 家居", value: "furniture", score: 24 },
  { label: "灯具 / 摆件 / 文创", value: "decor", score: 22 },
  { label: "潮玩 / 收藏品", value: "collectible", score: 21 },
  { label: "鞋包 / 配饰", value: "fashion", score: 17 },
  { label: "工业件 / 设备零件", value: "industrial", score: 19 },
  { label: "1688 / 工厂 SKU", value: "factory", score: 18 },
  { label: "空间 / 展厅 / 大件", value: "space", score: 16 },
  { label: "其他品类", value: "other", score: 10 }
];

const priceOptions = [
  { label: "100 元以下", value: "low", score: 5 },
  { label: "100-300 元", value: "mid_low", score: 11 },
  { label: "300-1000 元", value: "mid", score: 18 },
  { label: "1000 元以上", value: "high", score: 22 }
];

const materialOptions = [
  { label: "只有普通商品图", value: "photos", score: 13 },
  { label: "有手机环绕视频", value: "video", score: 21 },
  { label: "有 360 图 / 多角度图", value: "turntable", score: 20 },
  { label: "已有 3D 模型", value: "model", score: 18 },
  { label: "暂时没有可用素材", value: "none", score: 3 }
];

const storeOptions = [
  { label: "WordPress / WooCommerce", value: "woocommerce", score: 18 },
  { label: "独立站 / 品牌官网", value: "site", score: 17 },
  { label: "Shopify / SHOPLINE", value: "shopify", score: 16 },
  { label: "1688 / 工厂店", value: "factory", score: 15 },
  { label: "淘宝 / 天猫 / 京东", value: "marketplace", score: 10 },
  { label: "小红书 / 抖音 / 私域", value: "social", score: 11 }
];

const skuOptions = [
  { label: "1 个商品先试", value: "one", score: 6 },
  { label: "2-9 个 SKU", value: "several", score: 10 },
  { label: "10 个以上 SKU", value: "batch", score: 14 },
  { label: "长期上新 / 多店铺", value: "ongoing", score: 16 }
];

const goalOptions = [
  { label: "先做首件商品样板", value: "sample", score: 12 },
  { label: "提升商品页停留和转化", value: "conversion", score: 11 },
  { label: "给销售做可转发演示", value: "sales", score: 10 },
  { label: "评估批量 SKU 成本", value: "batch_quote", score: 12 },
  { label: "只是了解一下", value: "browse", score: 4 }
];

const materialUploadConfig = {
  photos: {
    title: "上传商品图片",
    copy: "建议上传 6-12 张清晰图片，覆盖正面、侧面、背面、顶部和细节。",
    action: "上传图片",
    type: "image",
    required: true
  },
  video: {
    title: "上传环绕视频",
    copy: "建议上传 15-30 秒手机环绕视频，保持光线稳定、商品完整入镜。",
    action: "上传视频",
    type: "video",
    required: true
  },
  turntable: {
    title: "上传 360 图 / 多角度图",
    copy: "建议上传一组连续角度图片，尽量保证背景、距离和光线一致。",
    action: "上传多角度图",
    type: "image",
    required: true
  },
  model: {
    title: "上传已有 3D 模型",
    copy: "可上传 glb、gltf、obj、fbx、zip 等模型文件，方便判断展示和嵌入方式。",
    action: "选择模型文件",
    type: "file",
    required: true
  },
  none: {
    title: "暂时没有可用素材",
    copy: "可以先提交评估结果，后续按拍摄 SOP 补齐图片或视频，再申请首件样板。",
    action: "",
    type: "none",
    required: false
  }
};

const RESULT_STORAGE_KEY = "metopEvaluatorResult";

const defaultForm = {
  categoryIndex: -1,
  priceIndex: -1,
  productUrl: "",
  materialIndex: -1,
  storeIndex: -1,
  skuIndex: -1,
  goalIndex: -1,
  contact: ""
};

function selected(options, index) {
  return index >= 0 ? options[index] : null;
}

function formatFileSize(size = 0) {
  if (!size) {
    return "";
  }

  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)}MB`;
  }

  return `${Math.max(1, Math.round(size / 1024))}KB`;
}

function getFileName(path = "", fallback) {
  const normalized = path.replace(/\\/g, "/");
  const name = normalized.split("/").filter(Boolean).pop();
  return name || fallback;
}

function normalizeFile(file, index) {
  const path = file.path || file.tempFilePath || "";
  return {
    id: `${Date.now()}-${index}`,
    name: file.name || getFileName(path, `素材 ${index + 1}`),
    path,
    sizeText: formatFileSize(file.size)
  };
}

function buildLevel(score) {
  if (score >= 82) {
    return {
      level: "高适配",
      levelClass: "level-high",
      verdict: "建议进入首件样板，优先验证商品页嵌入和分享转化。"
    };
  }

  if (score >= 58) {
    return {
      level: "中适配",
      levelClass: "level-mid",
      verdict: "建议先补齐素材，再选 1 个结构清楚的商品做测试。"
    };
  }

  return {
    level: "低适配",
    levelClass: "level-low",
    verdict: "暂不建议直接批量做，先确认素材、价格和展示场景。"
  };
}

function buildReasons(category, price, material, store, sku, goal) {
  const reasons = [];

  if (category?.score >= 18) {
    reasons.push(`${category.label}适合用 3D 展示结构、材质和比例。`);
  } else {
    reasons.push("品类需要先看实物复杂度，再判断是否值得做 3D 展示。");
  }

  if (price?.score >= 18) {
    reasons.push("客单价足够支撑首件样板和后续商品页嵌入。");
  } else {
    reasons.push("客单价偏低时，建议优先选择爆款或高利润 SKU 测试。");
  }

  if (material?.value === "none") {
    reasons.push("当前缺少素材，第一步应先按拍摄 SOP 补齐环绕视频或多角度图片。");
  } else {
    reasons.push("已有素材可以进入初步重建评估，重点检查角度覆盖和反光问题。");
  }

  if (store?.score >= 16) {
    reasons.push(`${store.label}适合验证 iframe / JS 嵌入效果。`);
  }

  if (sku?.score >= 14 || goal?.value === "batch_quote") {
    reasons.push("SKU 规模具备批量报价价值，首件样板完成后可以继续评估批量成本。");
  }

  return reasons.slice(0, 5);
}

function buildShootingTips(category, material) {
  const tips = ["环绕拍摄一圈", "补充顶部和底部角度", "保持背景干净", "避免强反光"];

  if (category?.value === "furniture" || category?.value === "space") {
    tips.push("保留空间比例参照");
  }

  if (category?.value === "fashion") {
    tips.push("补拍五金和纹理细节");
  }

  if (material?.value === "photos") {
    tips.push("补一段 15-30 秒手机视频");
  }

  if (material?.value === "none") {
    tips.push("先拍 40-80 张清晰图片");
  }

  return tips;
}

function buildDisplayModes(store, goal) {
  const modes = [
    { title: "分享链接", copy: "适合私聊、社群、朋友圈快速给客户看效果。" },
    { title: "小程序案例页", copy: "适合沉淀案例，销售可反复转发。" }
  ];

  if (store?.value === "woocommerce" || store?.value === "site" || store?.value === "shopify") {
    modes.unshift({
      title: "商品页嵌入",
      copy: "适合验证详情页停留、结构理解和咨询转化。"
    });
  }

  if (goal?.value === "sales") {
    modes.push({
      title: "销售演示页",
      copy: "适合把同类商品打包成可转发专题。"
    });
  }

  return modes;
}

function buildEmbedTips(store) {
  if (store?.value === "woocommerce") {
    return ["优先做 WooCommerce 商品页嵌入样板", "准备 iframe / JS 两种嵌入代码", "商品页按钮建议写“查看 3D 商品”"];
  }

  if (store?.value === "site" || store?.value === "shopify") {
    return ["先用通用 iframe 嵌入验证效果", "移动端优先使用弹窗或独立 3D 链接", "样板通过后再评估标准化插件方案"];
  }

  if (store?.value === "factory" || store?.value === "marketplace") {
    return ["优先生成可转发分享链接", "沉淀到小程序案例页", "后续按 SKU 批量报价"];
  }

  return ["优先使用分享链接和小程序案例页", "适合私域转发和销售演示", "客户确认后再做商品页嵌入"];
}

function buildNextActions(goal, sku) {
  if (goal?.value === "browse") {
    return ["先看同品类案例", "领取拍摄 SOP", "保留联系方式，后续有商品再提交素材"];
  }

  if (goal?.value === "batch_quote" || sku?.score >= 14) {
    return ["先选 1 个商品做首件样板", "样板通过后整理 SKU 清单", "给出批量重建和商品页嵌入报价"];
  }

  return ["添加企微继续沟通", "发送商品链接和素材", "申请首件商品 AI 3D 展示样板"];
}

Page({
  data: {
    categoryOptions,
    priceOptions,
    materialOptions,
    storeOptions,
    skuOptions,
    goalOptions,
    form: { ...defaultForm },
    materialUpload: null,
    materialFiles: []
  },

  onPickerChange(event) {
    console.log(event)
    const key = event.currentTarget.dataset.key;
    const value = Number(event.detail.value);
    const nextData = {
      [`form.${key}`]: value
    };

    if (key === "materialIndex") {
      const material = selected(materialOptions, value);
      nextData.materialUpload = materialUploadConfig[material.value] || null;
      nextData.materialFiles = [];
    }

    this.setData(nextData);
  },

  onTextInput(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [`form.${key}`]: event.detail.value
    });
  },

  generateResult() {
    const { form } = this.data;
    const requiredKeys = ["categoryIndex", "priceIndex", "materialIndex", "storeIndex", "skuIndex", "goalIndex"];
    const missing = requiredKeys.some((key) => form[key] < 0);

    if (missing) {
      wx.showToast({
        title: "请先补全选择项",
        icon: "none"
      });
      return;
    }

    const category = selected(categoryOptions, form.categoryIndex);
    const price = selected(priceOptions, form.priceIndex);
    const material = selected(materialOptions, form.materialIndex);
    const store = selected(storeOptions, form.storeIndex);
    const sku = selected(skuOptions, form.skuIndex);
    const goal = selected(goalOptions, form.goalIndex);
    const score = Math.min(
      100,
      category.score + price.score + material.score + store.score + sku.score + goal.score
    );
    const levelInfo = buildLevel(score);
    const canUploadMaterial = score >= 58 && material.value !== "none";

    const result = {
      score,
      ...levelInfo,
      contact: "",
      canUploadMaterial,
      reasons: buildReasons(category, price, material, store, sku, goal),
      shootingTips: buildShootingTips(category, material),
      displayModes: buildDisplayModes(store, goal),
      embedTips: buildEmbedTips(store),
      nextActions: buildNextActions(goal, sku),
      materialUpload: {
        ...(materialUploadConfig[material.value] || materialUploadConfig.none),
        count: this.data.materialFiles.length,
        files: this.data.materialFiles.map((file) => file.name)
      },
      summary: [
        { label: "商品品类", value: category.label },
        { label: "客单价", value: price.label },
        { label: "商品页链接", value: form.productUrl || "未填写" },
        { label: "素材类型", value: material.label },
        { label: "渠道类型", value: store.label },
        { label: "SKU 数量", value: sku.label },
        { label: "转化目标", value: goal.label }
      ]
    };

    wx.setStorageSync(RESULT_STORAGE_KEY, result);

    wx.navigateTo({
      url: "/pages/evaluator-result/evaluator-result"
    });
  },

  resetForm() {
    this.setData({
      form: { ...defaultForm },
      materialUpload: null,
      materialFiles: []
    });
  },

  chooseMaterialFiles() {
    const upload = this.data.materialUpload;

    if (!upload || upload.type === "none") {
      return;
    }

    if (upload.type === "file") {
      wx.chooseMessageFile({
        count: 1,
        type: "file",
        extension: ["glb", "gltf", "obj", "fbx", "zip"],
        success: (res) => {
          this.setData({
            materialFiles: res.tempFiles.map((file, index) => normalizeFile(file, index))
          });
        }
      });
      return;
    }

    wx.chooseMedia({
      count: upload.type === "video" ? 1 : 9,
      mediaType: [upload.type],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          materialFiles: res.tempFiles.map((file, index) => normalizeFile(file, index))
        });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: "测一测商品适不适合做 AI 3D 展示",
      path: "/pages/evaluator/evaluator"
    };
  },

  onShareTimeline() {
    return {
      title: "商品 AI 3D 展示适配评估"
    };
  }
});
