const imageUrl = (name) => `./images/${name}`;
const modelUrl = (name) => `./models/${name}`;

const CASE_SAMPLE_VIEWER_MODEL = {
  url: modelUrl("atelier-low-sofa.ply"),
  type: "gsplat-ply",
  rotateX: -90,
  modelYaw: -12,
  cameraYaw: 30,
  cameraPitch: 8,
  cameraPadding: 1.58,
  targetY: 0.02
};

function makeItem(category, item) {
  return {
    category: category.name,
    countLabel: category.countLabel,
    era: category.index,
    origin: category.origin,
    model: {
      tilt: item.tilt || "-1deg",
      scale: item.scale || 1,
      shadow: category.shadow
    },
    viewerModel: item.viewerModel || category.viewerModel || CASE_SAMPLE_VIEWER_MODEL,
    condition: {
      grade: "适合展示",
      detail: `${category.name}商品可用于小程序、官网案例和销售资料。`
    },
    insights: category.insights,
    ...item
  };
}

const categories = [
  {
    id: "home",
    index: "02",
    name: "家居",
    shortName: "家具",
    countLabel: "家具样板",
    accent: "#8f7157",
    accentStrong: "#5d3f2b",
    accentSoft: "#eadfce",
    bg: "#f6f0e8",
    surface: "#f6f0e8",
    shadow: "rgba(78, 48, 28, 0.18)",
    defaultItemId: "atelier-low-sofa",
    origin: "家具展厅",
    page: {
      zh: {
        title: "MeTop Furniture Lab | 实景 3D 家具展厅",
        description: "面向家具品牌、电商和展厅的实景 3D 家具展示方案，让客户在线上 360° 了解家具产品。",
        brandTagline: "实景 3D 家具展厅",
        navShowroom: "3D 展厅",
        navPain: "行业痛点",
        navScenarios: "应用场景",
        navContact: "预约演示",
        browseLabel: "精选家具",
        statusLabel: "展厅状态",
        miniappBrand: "MeTop Furniture Lab",
        miniappTitle: "3D 家具展厅",
        miniappSubtitle: "让客户 360° 了解你的产品",
        miniappBenefits: [
          { title: "体量可感知", text: "尺寸、比例和摆放关系比平面图更直观" },
          { title: "材质更直观", text: "面料、木纹和细节可以围绕产品连续查看" },
          { title: "销售易转发", text: "一个链接承载讲解、展示和客户二次传播" }
        ],
        miniappGalleryTitle: "选择一个家具样板",
        miniappGallerySubtitle: "点击卡片查看对应家具 3D 展示案例。",
        miniappContactTitle: "添加微信，预约 3D 家具样板",
        miniappContactHint: "长按识别二维码，发送家具图片或模型文件，我们先帮你判断适合的 3D 展示方式。",
        miniappContactNote: "建议备注：3D 家具展厅"
      },
      en: {
        title: "MeTop Furniture Lab | Interactive 3D Furniture Showroom",
        description: "An interactive 3D furniture showroom for brands, ecommerce teams, and showrooms.",
        brandTagline: "Interactive 3D Furniture Showroom",
        browseLabel: "Featured Furniture",
        miniappBrand: "MeTop Furniture Lab",
        miniappTitle: "3D Furniture Showroom",
        miniappSubtitle: "Let buyers inspect your product from every angle",
        miniappBenefits: [
          { title: "Readable Scale", text: "Dimensions, proportions, and placement are easier to understand than flat images." },
          { title: "Material Clarity", text: "Fabric, wood grain, and details can be inspected continuously around the product." },
          { title: "Easy Sharing", text: "One link carries the pitch, the sample, and customer forwarding." }
        ],
        miniappGalleryTitle: "Select a furniture model",
        miniappGallerySubtitle: "Tap any card to return to the home view with that model loaded.",
        miniappContactTitle: "Book a 3D furniture sample",
        miniappContactHint: "Send product photos or model files and we will suggest the right 3D showcase format.",
        miniappContactNote: "Suggested note: 3D furniture showroom"
      }
    }
  },
  {
    id: "toys",
    index: "01",
    name: "潮玩",
    shortName: "潮玩",
    countLabel: "潮玩样板",
    accent: "#e83f8f",
    accentStrong: "#8c1f56",
    accentSoft: "#ffd9ef",
    bg: "#fff3fb",
    surface: "#fff3fb",
    shadow: "rgba(232, 63, 143, 0.2)",
    defaultItemId: "toys-figure",
    origin: "IP 角色发售",
    insights: [
      { title: "角色识别", text: "把姿态、表情、底座和编号集中在一个可分享页面里。" },
      { title: "限量预热", text: "适合新品发售、盲盒系列和社媒活动页。" },
      { title: "系列陈列", text: "多款角色保持统一展示秩序，方便用户横向比较。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 潮玩展示样板",
        description: "面向手办、盲盒、机甲模型和 IP 周边的 3D 商品展示页面。",
        brandTagline: "3D 潮玩展示样板",
        browseLabel: "潮玩样板",
        statusLabel: "发售展示",
        painEyebrow: "潮玩行业痛点",
        painTitleLines: ["限量款不只要好看，", "还要让收藏价值被看见。"],
        painCopy: "潮玩用户会反复确认涂装、结构、比例和编号。3D 页面能把这些信息收进同一套可分享展示里。",
        casesEyebrow: "潮玩案例",
        casesTitle: "可复用潮玩样板",
        casesCopy: "用于手办、盲盒、机甲模型和外设联名款的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 潮玩展厅",
        miniappSubtitle: "让收藏细节被客户看见",
        miniappBenefits: [
          { title: "角色细节放大", text: "表情、涂装、底座和编号都能近距离查看" },
          { title: "系列陈列统一", text: "多款角色保持一致视角，方便横向比较" },
          { title: "预售传播更强", text: "适合新品发售、盲盒系列和社媒活动页" }
        ],
        miniappGalleryTitle: "选择一个潮玩样板",
        miniappGallerySubtitle: "点击卡片查看对应潮玩商品展示页。",
        miniappContactTitle: "预约 3D 潮玩样板",
        miniappContactHint: "发送手办、盲盒或 IP 周边图片，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 潮玩展示"
      }
    }
  }
];

const toys = categories.find((category) => category.id === "toys");
toys.products = [
  makeItem(toys, {
    id: "toys-figure",
    title: "收藏级手办",
    style: "涂装、姿态、底座一屏看清",
    image: imageUrl("xiao8.png"),
    description: "适合把角色姿态、涂装细节和收藏编号同时放进商品详情页，增强限量款的陈列感。",
    dimensions: { 高度: "28 cm", 宽度: "14 cm", 深度: "14 cm", 编号: "限量款" },
    materials: [
      { name: "PVC 涂装", role: "角色主体", color: "#e83f8f" },
      { name: "亚克力底座", role: "展示支撑", color: "#8bd3ff" },
      { name: "收藏铭牌", role: "限定信息", color: "#f5c34b" }
    ],
    captureNote: "重点展示角色正面、侧面、底座和涂装层次，适合预售页和社媒传播。"
  }),
  makeItem(toys, {
    id: "toys-blindbox",
    title: "盲盒角色",
    style: "一组角色保持同一展柜秩序",
    image: imageUrl("polo.png"),
    description: "适合盲盒、潮玩小体积商品，方便用户快速对比角色轮廓和系列差异。",
    dimensions: { 高度: "9 cm", 宽度: "6 cm", 深度: "6 cm", 系列: "SKU 组" },
    materials: [
      { name: "哑光外壳", role: "角色表面", color: "#f9b4d2" },
      { name: "彩盒包装", role: "系列识别", color: "#5a7dff" },
      { name: "隐藏款标识", role: "玩法信息", color: "#ffdf7e" }
    ],
    captureNote: "用统一视角展示盲盒角色轮廓、配色和系列关系。"
  }),
  makeItem(toys, {
    id: "toys-controller",
    title: "游戏手柄收藏款",
    style: "按钮曲面和限定配色更突出",
    image: imageUrl("handle.png"),
    description: "适合消费电子与潮玩交叉品类，强调外壳曲面、按键布局和限定配色。",
    dimensions: { 宽度: "16 cm", 高度: "10 cm", 厚度: "6 cm", 版本: "联名限量" },
    materials: [
      { name: "磨砂壳体", role: "外壳", color: "#242b42" },
      { name: "高亮按键", role: "操作区", color: "#e83f8f" },
      { name: "防滑纹理", role: "握持区", color: "#9ca3af" }
    ],
    captureNote: "突出按钮、摇杆、握持曲面和联名配色。"
  })
];

const extraCategories = [
  {
    id: "decor",
    index: "03",
    name: "文创摆件",
    shortName: "文创",
    countLabel: "文创样板",
    accent: "#d24b2a",
    accentStrong: "#8f2f1a",
    accentSoft: "#ffe4d8",
    bg: "#fff9ef",
    surface: "#fff9ef",
    shadow: "rgba(210, 75, 42, 0.18)",
    defaultItemId: "decor-vase",
    origin: "文创商店",
    insights: [
      { title: "器物轮廓", text: "让小件商品也能看清曲面、釉面和边界。" },
      { title: "礼品质感", text: "适合博物馆周边、联名礼品和活动专题页。" },
      { title: "统一陈列", text: "系列摆件可以用同一套 3D 样板保持高级感。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 文创摆件展示样板",
        description: "面向摆件、器物、礼品和联名周边的 3D 商品展示页面。",
        brandTagline: "3D 文创摆件展示样板",
        browseLabel: "文创样板",
        statusLabel: "器物展示",
        painEyebrow: "文创行业痛点",
        painTitleLines: ["小件商品更需要，", "把材质和设计讲清楚。"],
        painCopy: "文创摆件常常体积小、细节多，3D 展示能让客户近距离查看纹样、釉面和摆放姿态。",
        casesEyebrow: "文创案例",
        casesTitle: "可复用文创样板",
        casesCopy: "用于摆件、器物、桌面灯具、礼品和联名周边的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 文创展厅",
        miniappSubtitle: "让小件商品更有设计感",
        miniappBenefits: [
          { title: "器物轮廓清楚", text: "曲面、口沿和摆放姿态都能被完整理解" },
          { title: "工艺质感突出", text: "釉面、纹样和反光细节不再只藏在平面图里" },
          { title: "活动页面可复用", text: "适合文创礼品、联名周边和专题活动页" }
        ],
        miniappGalleryTitle: "选择一个文创样板",
        miniappGallerySubtitle: "点击卡片查看对应文创商品展示页。",
        miniappContactTitle: "预约 3D 文创样板",
        miniappContactHint: "发送摆件、器物或礼品图片，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 文创展示"
      }
    }
  },
  {
    id: "fashion",
    index: "04",
    name: "鞋包",
    shortName: "鞋包",
    countLabel: "鞋包样板",
    accent: "#253048",
    accentStrong: "#17212f",
    accentSoft: "#d8c082",
    bg: "#f3efe7",
    surface: "#f3efe7",
    shadow: "rgba(37, 48, 72, 0.2)",
    defaultItemId: "fashion-bag",
    origin: "精品独立站",
    insights: [
      { title: "廓形细节", text: "包型、鞋底、走线和五金可在线检查。" },
      { title: "精品质感", text: "适合 Lookbook、新品专题和买手店页面。" },
      { title: "批量复用", text: "多色 SKU 保持统一展示节奏。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 鞋包展示样板",
        description: "面向包袋、鞋履、腕表和配饰的 3D 商品展示页面。",
        brandTagline: "3D 鞋包展示样板",
        browseLabel: "鞋包样板",
        statusLabel: "精品展示",
        painEyebrow: "鞋包行业痛点",
        painTitleLines: ["细节是购买理由，", "不该只藏在平面图里。"],
        painCopy: "鞋包用户会看包型、鞋底、五金、走线和材质反光，3D 展示能让单品自己讲清质感。",
        casesEyebrow: "鞋包案例",
        casesTitle: "可复用鞋包样板",
        casesCopy: "用于包袋、鞋履、腕表、小件配饰和潮流单品的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 鞋包展厅",
        miniappSubtitle: "让细节成为购买理由",
        miniappBenefits: [
          { title: "廓形更立体", text: "包型、鞋型和侧面比例能直接旋转确认" },
          { title: "细节可检查", text: "走线、五金、鞋底和材质反光更容易看清" },
          { title: "多 SKU 易统一", text: "多色多款保持同一展示节奏，便于批量复用" }
        ],
        miniappGalleryTitle: "选择一个鞋包样板",
        miniappGallerySubtitle: "点击卡片查看对应鞋包商品展示页。",
        miniappContactTitle: "预约 3D 鞋包样板",
        miniappContactHint: "发送鞋履、包袋或配饰图片，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 鞋包展示"
      }
    }
  },
  {
    id: "industry",
    index: "05",
    name: "工业件",
    shortName: "工业",
    countLabel: "工业样板",
    accent: "#00788a",
    accentStrong: "#005968",
    accentSoft: "#d9f3f6",
    bg: "#eef7f8",
    surface: "#eef7f8",
    shadow: "rgba(0, 120, 138, 0.18)",
    defaultItemId: "industry-drone",
    origin: "技术目录",
    insights: [
      { title: "结构说明", text: "把接口、连接位、外壳和比例讲清楚。" },
      { title: "售前沟通", text: "适合设备选型、技术目录和方案介绍。" },
      { title: "减少问图", text: "复杂零部件可用统一视角快速确认。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 工业件展示样板",
        description: "面向设备外壳、机械部件、无人机和精密零件的 3D 展示页面。",
        brandTagline: "3D 工业件展示样板",
        browseLabel: "工业样板",
        statusLabel: "技术展示",
        painEyebrow: "工业件行业痛点",
        painTitleLines: ["结构说不清，", "售前沟通就会变慢。"],
        painCopy: "工业件需要讲清连接位、外壳、尺度和使用方式，3D 展示能减少来回索要细节图。",
        casesEyebrow: "工业案例",
        casesTitle: "可复用工业样板",
        casesCopy: "用于设备外壳、机械部件、无人机和精密零件的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 工业件展厅",
        miniappSubtitle: "把结构和接口讲清楚",
        miniappBenefits: [
          { title: "结构说明更快", text: "接口、连接位、外壳比例和关键部件一屏说明" },
          { title: "售前沟通更少", text: "减少反复索要细节图和技术角度图的成本" },
          { title: "技术资料更直观", text: "适合设备选型、方案汇报和产品目录嵌入" }
        ],
        miniappGalleryTitle: "选择一个工业样板",
        miniappGallerySubtitle: "点击卡片查看对应工业件展示页。",
        miniappContactTitle: "预约 3D 工业件样板",
        miniappContactHint: "发送设备、零件或产品外壳图片，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 工业件展示"
      }
    }
  },
  {
    id: "factory",
    index: "06",
    name: "智能工厂",
    shortName: "工厂",
    countLabel: "工厂样板",
    accent: "#ef6f18",
    accentStrong: "#9b4211",
    accentSoft: "#ffe7d3",
    bg: "#fff7ef",
    surface: "#fff7ef",
    shadow: "rgba(239, 111, 24, 0.18)",
    defaultItemId: "factory-line",
    origin: "产线展示",
    insights: [
      { title: "流程说明", text: "把产线节点、设备位置和参观路线讲清楚。" },
      { title: "招商展示", text: "适合园区、工厂、设备商和展厅接待。" },
      { title: "方案汇报", text: "用可视化场景支撑售前和实施沟通。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 智能工厂展示样板",
        description: "面向产线、设备、园区和工厂展厅的 3D 场景展示页面。",
        brandTagline: "3D 智能工厂展示样板",
        browseLabel: "工厂样板",
        statusLabel: "产线展示",
        painEyebrow: "智能工厂痛点",
        painTitleLines: ["产线价值，", "需要被直观看见。"],
        painCopy: "工厂、设备和产线常常难以在线讲清，3D 展示能把空间、流程和设备关系放到同一页面。",
        casesEyebrow: "工厂案例",
        casesTitle: "可复用工厂样板",
        casesCopy: "用于产线、设备、园区和工厂展厅的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 智能工厂",
        miniappSubtitle: "让产线流程一眼看懂",
        miniappBenefits: [
          { title: "流程关系清楚", text: "产线节点、设备位置和参观路线能被统一展示" },
          { title: "招商汇报可视化", text: "把厂区价值、设备能力和流程优势讲得更直观" },
          { title: "远程参观更轻", text: "客户先在线理解现场，再决定是否深度沟通" }
        ],
        miniappGalleryTitle: "选择一个工厂样板",
        miniappGallerySubtitle: "点击卡片查看对应工厂展示页。",
        miniappContactTitle: "预约 3D 工厂样板",
        miniappContactHint: "发送产线、设备或园区资料，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 工厂展示"
      }
    }
  },
  {
    id: "space",
    index: "07",
    name: "空间场景",
    shortName: "空间",
    countLabel: "空间样板",
    accent: "#1d48ce",
    accentStrong: "#12308f",
    accentSoft: "#dfe8ff",
    bg: "#eef3ff",
    surface: "#eef3ff",
    shadow: "rgba(29, 72, 206, 0.18)",
    defaultItemId: "space-room",
    origin: "空间漫游",
    insights: [
      { title: "真实尺度", text: "让用户理解房间、展厅和街区的空间关系。" },
      { title: "在线漫游", text: "适合酒店、展馆、商业空间和文旅项目。" },
      { title: "远程看场", text: "客户先在线浏览，再决定是否到现场。" }
    ],
    page: {
      zh: {
        title: "MeTop Cases | 3D 空间场景展示样板",
        description: "面向酒店房间、展馆、商业空间和文旅场景的 3D 展示页面。",
        brandTagline: "3D 空间场景展示样板",
        browseLabel: "空间样板",
        statusLabel: "空间展示",
        painEyebrow: "空间展示痛点",
        painTitleLines: ["空间不是几张图，", "而是一段可进入的体验。"],
        painCopy: "室内空间、展馆和文旅场景需要讲清尺度、路线和细节，3D 展示适合做在线预览和客户看场。",
        casesEyebrow: "空间案例",
        casesTitle: "可复用空间样板",
        casesCopy: "用于酒店房间、展馆、商业空间和文旅场景的线上展示。",
        miniappBrand: "MeTop Cases",
        miniappTitle: "3D 空间场景",
        miniappSubtitle: "让客户先在线进入现场",
        miniappBenefits: [
          { title: "尺度关系真实", text: "房间、展厅和街区的空间关系比照片更容易理解" },
          { title: "动线体验明确", text: "浏览路线、区域关系和重点点位可以连续呈现" },
          { title: "远程看场更有效", text: "客户先在线预览，再决定是否到现场或约方案" }
        ],
        miniappGalleryTitle: "选择一个空间样板",
        miniappGallerySubtitle: "点击卡片查看对应空间展示页。",
        miniappContactTitle: "预约 3D 空间样板",
        miniappContactHint: "发送房间、展厅或街区图片，我们先帮你判断展示方式。",
        miniappContactNote: "建议备注：3D 空间展示"
      }
    }
  }
];

categories.push(...extraCategories);

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));

categoryById.decor.products = [
  makeItem(categoryById.decor, {
    id: "decor-vase",
    title: "彩绘陶瓷花器",
    style: "纹样和曲面一眼可见",
    image: imageUrl("pottery.png"),
    description: "适合展示器物轮廓、釉面质感和纹样层次，让小件摆件也有清楚的视觉中心。",
    dimensions: { 高度: "32 cm", 宽度: "18 cm", 深度: "18 cm", 工艺: "釉面彩绘" },
    materials: [
      { name: "陶瓷胎体", role: "主体", color: "#d24b2a" },
      { name: "亮面釉层", role: "表面", color: "#fff1dc" },
      { name: "手绘纹样", role: "装饰", color: "#1d48ce" }
    ],
    captureNote: "重点展示器物曲面、口沿、釉面反光和纹样连续性。"
  }),
  makeItem(categoryById.decor, {
    id: "decor-lamp",
    title: "桌面氛围灯",
    style: "灯罩和支架结构更明确",
    image: imageUrl("boot.png"),
    description: "用于灯具类商品的结构和造型展示，便于活动页或详情页快速理解设计亮点。",
    dimensions: { 高度: "26 cm", 宽度: "15 cm", 深度: "15 cm", 光源: "暖光" },
    materials: [
      { name: "柔光灯罩", role: "发光面", color: "#ffe9ba" },
      { name: "金属支架", role: "结构", color: "#b36a3c" },
      { name: "磨砂底座", role: "底部", color: "#ead8c0" }
    ],
    captureNote: "突出灯罩轮廓、支架比例和桌面尺度。"
  }),
  makeItem(categoryById.decor, {
    id: "decor-craft",
    title: "联名文创摆件",
    style: "适合活动转发和收藏展示",
    image: imageUrl("gundam.png"),
    description: "适合社媒转发、活动页跳转和线下快闪延展，把联名对象做成可浏览资产。",
    dimensions: { 高度: "21 cm", 宽度: "12 cm", 深度: "10 cm", 场景: "联名活动" },
    materials: [
      { name: "树脂主体", role: "造型", color: "#f6f0e8" },
      { name: "金属涂装", role: "细节", color: "#d24b2a" },
      { name: "展示底座", role: "陈列", color: "#100e15" }
    ],
    captureNote: "把联名对象、底座和细节同时纳入展示。"
  })
];

categoryById.fashion.products = [
  makeItem(categoryById.fashion, {
    id: "fashion-bag",
    title: "斜挎包样品",
    style: "包型、走线、五金件一起呈现",
    image: imageUrl("mouse.png"),
    description: "适合展示包型轮廓、缝线和金属扣细节，补足平面图难以表达的立体感。",
    dimensions: { 高度: "18 cm", 宽度: "24 cm", 深度: "8 cm", 容量: "日常通勤" },
    materials: [
      { name: "细纹皮革", role: "包身", color: "#253048" },
      { name: "金属扣件", role: "五金", color: "#d8c082" },
      { name: "织带肩带", role: "肩带", color: "#6b7280" }
    ],
    captureNote: "重点展示包型、走线、边油和五金反光。"
  }),
  makeItem(categoryById.fashion, {
    id: "fashion-shoe",
    title: "运动鞋样品",
    style: "鞋底和鞋面层次更可读",
    image: imageUrl("boot.png"),
    description: "用于把普通鞋类详情图升级成可转动查看的展示，强调鞋底结构和鞋面层次。",
    dimensions: { 长度: "29 cm", 高度: "13 cm", 宽度: "11 cm", 尺码: "42" },
    materials: [
      { name: "织物鞋面", role: "鞋面", color: "#f3efe7" },
      { name: "橡胶大底", role: "鞋底", color: "#253048" },
      { name: "金属鞋扣", role: "细节", color: "#d8c082" }
    ],
    captureNote: "突出鞋底纹理、鞋面层次和侧面轮廓。"
  }),
  makeItem(categoryById.fashion, {
    id: "fashion-case",
    title: "耳机保护壳",
    style: "小件 SKU 可批量复用",
    image: imageUrl("bg_remove.png"),
    description: "适合多颜色、多款式商品的批量展示，让小件配饰保持统一但不单调。",
    dimensions: { 高度: "6 cm", 宽度: "5 cm", 深度: "3 cm", 颜色: "多色 SKU" },
    materials: [
      { name: "硅胶外壳", role: "主体", color: "#253048" },
      { name: "挂扣", role: "连接", color: "#d8c082" },
      { name: "内衬", role: "保护", color: "#e5e7eb" }
    ],
    captureNote: "适合多颜色小件配饰批量生成商品页样板。"
  })
];

categoryById.industry.products = [
  makeItem(categoryById.industry, {
    id: "industry-drone",
    title: "无人机设备样品",
    style: "结构、接口和旋翼布局清晰可见",
    image: imageUrl("scorpion.png"),
    description: "适合展示设备外壳、连接接口、旋翼结构和技术卖点，支持售前讲解和方案汇报。",
    dimensions: { 长度: "42 cm", 宽度: "42 cm", 高度: "12 cm", 重量: "1.2 kg" },
    materials: [
      { name: "碳纤维结构", role: "机架", color: "#00788a" },
      { name: "工程塑料", role: "外壳", color: "#d9f3f6" },
      { name: "金属接口", role: "连接件", color: "#6b7280" }
    ],
    captureNote: "重点展示设备结构、接口布局和外壳比例。"
  }),
  makeItem(categoryById.industry, {
    id: "industry-part",
    title: "精密零件",
    style: "连接位和加工面更容易说明",
    image: imageUrl("water1.png"),
    description: "适合机械零部件、结构件和样品件展示，用于技术目录和客户选型。",
    dimensions: { 长度: "18 cm", 宽度: "9 cm", 高度: "7 cm", 精度: "样品级" },
    materials: [
      { name: "阳极铝", role: "主体", color: "#9ca3af" },
      { name: "高亮倒角", role: "加工面", color: "#d9f3f6" },
      { name: "定位孔", role: "连接位", color: "#00788a" }
    ],
    captureNote: "突出孔位、倒角、连接边界和结构比例。"
  }),
  makeItem(categoryById.industry, {
    id: "industry-shell",
    title: "设备外壳",
    style: "外观评审和方案汇报都能用",
    image: imageUrl("upload.png"),
    description: "适合设备外观、外壳结构和方案样机展示，让客户在远程评审时更直观。",
    dimensions: { 高度: "38 cm", 宽度: "28 cm", 深度: "21 cm", 阶段: "方案样机" },
    materials: [
      { name: "ABS 外壳", role: "主体", color: "#e8f6f8" },
      { name: "透明视窗", role: "观察窗", color: "#b6e6ef" },
      { name: "金属支脚", role: "底部", color: "#6b7280" }
    ],
    captureNote: "用于外观评审、技术沟通和售前方案展示。"
  })
];

categoryById.factory.products = [
  makeItem(categoryById.factory, {
    id: "factory-line",
    title: "自动化产线",
    style: "产线节点和设备关系一眼看懂",
    image: imageUrl("room.png"),
    description: "适合把工厂产线、设备节点和参观路线做成可讲解展示，支持招商和售前汇报。",
    dimensions: { 长度: "36 m", 宽度: "8 m", 工位: "12 个", 节拍: "可配置" },
    materials: [
      { name: "设备阵列", role: "产线主体", color: "#ef6f18" },
      { name: "安全围栏", role: "动线", color: "#228d66" },
      { name: "地面标识", role: "区域", color: "#ffe7d3" }
    ],
    captureNote: "突出产线流程、设备关系和参观动线。"
  }),
  makeItem(categoryById.factory, {
    id: "factory-device",
    title: "核心设备展示",
    style: "设备外观与功能模块并列展示",
    image: imageUrl("viewer.png"),
    description: "用于设备商官网、展会资料和售前方案，让客户快速理解模块和价值。",
    dimensions: { 高度: "2.1 m", 宽度: "1.6 m", 深度: "1.2 m", 模块: "4 组" },
    materials: [
      { name: "钣金外壳", role: "设备外观", color: "#ef6f18" },
      { name: "玻璃视窗", role: "观察区", color: "#dbeafe" },
      { name: "控制面板", role: "交互区", color: "#162033" }
    ],
    captureNote: "突出设备外观、操作面板和功能模块。"
  }),
  makeItem(categoryById.factory, {
    id: "factory-park",
    title: "园区展厅",
    style: "空间、路线和展项统一呈现",
    image: imageUrl("city.png"),
    description: "适合园区招商、企业展厅和数字化参观，帮助客户先在线理解场地价值。",
    dimensions: { 面积: "1200 m²", 展项: "8 组", 路线: "3 条", 用途: "招商接待" },
    materials: [
      { name: "空间场景", role: "主体", color: "#fff7ef" },
      { name: "路线标识", role: "导览", color: "#ef6f18" },
      { name: "展项卡片", role: "内容", color: "#228d66" }
    ],
    captureNote: "用整体视角展示园区空间、路线和关键展项。"
  })
];

categoryById.space.products = [
  makeItem(categoryById.space, {
    id: "space-room",
    title: "酒店房间在线预览",
    style: "真实尺度、陈设细节与沉浸浏览",
    image: imageUrl("room.png"),
    description: "适合酒店房间、展厅和商业空间等室内场景，呈现真实尺度、陈设细节与沉浸式浏览体验。",
    dimensions: { 面积: "42 m²", 层高: "2.8 m", 房型: "大床房", 展示: "在线预览" },
    materials: [
      { name: "室内空间", role: "整体", color: "#dfe8ff" },
      { name: "家具陈设", role: "细节", color: "#8f7157" },
      { name: "灯光氛围", role: "体验", color: "#f5c34b" }
    ],
    captureNote: "突出房间尺度、动线、软装和真实陈设。"
  }),
  makeItem(categoryById.space, {
    id: "space-gallery",
    title: "室内展厅重建",
    style: "空间层次和材质细节保留完整",
    image: imageUrl("viewer.png"),
    description: "保留空间层次和材质细节，适合线上展厅、方案汇报和客户远程看场。",
    dimensions: { 面积: "320 m²", 展区: "5 组", 动线: "环形", 用途: "线上展厅" },
    materials: [
      { name: "展墙", role: "空间结构", color: "#f8fbff" },
      { name: "展品", role: "内容", color: "#1d48ce" },
      { name: "导视", role: "动线", color: "#5076e5" }
    ],
    captureNote: "用于展厅、样板间和方案汇报的在线浏览。"
  }),
  makeItem(categoryById.space, {
    id: "space-city",
    title: "文旅街区模型",
    style: "多视角城市模型适合网页嵌入",
    image: imageUrl("city.png"),
    description: "面向文旅展示、空间叙事和网页嵌入的多视角城市模型。",
    dimensions: { 范围: "街区级", 点位: "12 个", 视角: "多视角", 用途: "文旅展示" },
    materials: [
      { name: "街区建筑", role: "主体", color: "#dfe8ff" },
      { name: "道路动线", role: "浏览", color: "#1d48ce" },
      { name: "景观点位", role: "内容", color: "#ef6f18" }
    ],
    captureNote: "展示街区尺度、建筑关系和文旅点位。"
  })
];

export const caseCategories = categories;

export function getCaseCategory(id = "home") {
  return categoryById[id] || categoryById.home;
}
