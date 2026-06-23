import * as pc from "playcanvas";
import { loadGsplat } from "./gsplat-loader.js";
import { caseCategories, getCaseCategory } from "./data/case-categories.js";
import { showroomFurniture } from "./data/furniture.js";

const DEFAULT_FURNITURE_ID = "atelier-low-sofa";
const searchParams = new URLSearchParams(window.location.search);
const isMiniAppPath = /\/miniapp(?:\/|$)/.test(window.location.pathname);
const requestedMiniappMode = searchParams.get("miniapp") || (isMiniAppPath ? "home" : "");
const requestedCategoryId = searchParams.get("category") || (requestedMiniappMode ? "toys" : "home");
let activeCaseCategory = getCaseCategory(requestedCategoryId);
const getCategoryItems = (category) => (category.id === "home" ? showroomFurniture : category.products || []);
let rawShowroomItems = getCategoryItems(activeCaseCategory);
let DEFAULT_ITEM_ID = activeCaseCategory.defaultItemId || rawShowroomItems?.[0]?.id || DEFAULT_FURNITURE_ID;
const orderFurnitureItems = (items = [], defaultId = DEFAULT_ITEM_ID) => {
  const defaultItem = items.find((item) => item.id === defaultId);
  const otherItems = items.filter((item) => item.id !== defaultId);
  return defaultItem ? [defaultItem, ...otherItems] : otherItems;
};
let furniture = orderFurnitureItems(rawShowroomItems || []);
const DEG_TO_RAD = Math.PI / 180;
const DEFAULT_LANGUAGE = "en";
const supportedLanguages = new Set(["zh", "en"]);
const CONTACT_QR_URL = "./images/contact_me_qr.png";
const MINIAPP_CASE_HERO_COPY = {
  zh: {
    brand: "MeTop Cases",
    title: "3D 行业案例库",
    subtitle: "从行业入口进入案例封面，再查看可复用的 3D/2D 样板"
  },
  en: {
    brand: "MeTop Cases",
    title: "3D Case Library",
    subtitle: "Browse industry entries, case covers, and reusable 3D/2D samples"
  }
};
const MINIAPP_CASE_HERO_IMAGE = "./images/case-library-hero.png";
const MINIAPP_INDUSTRY_COPY = {
  home: {
    name: "家具",
    title: "家具 3D 展示案例库",
    subtitle: "把尺寸、材质和空间感做成可分享的在线样板。",
    audience: "家具品牌 / 展厅 / 电商详情页",
    problem: "客户看不清体量、材质和摆放关系，销售需要反复解释。",
    outcome: "用 3D 样板把产品讲清楚，让客户自己旋转、缩放、确认细节。",
    metric: "5 个家具样板",
    conversion: "适合官网案例、招商资料、门店导购和私域转发。"
  },
  toys: {
    name: "潮玩",
    title: "潮玩 3D 展示案例库",
    subtitle: "让涂装、姿态、底座和收藏细节被客户看见。",
    audience: "手办 / 盲盒 / IP 周边",
    problem: "限量款价值集中在细节里，平面图很难讲清收藏感。",
    outcome: "用统一视角展示系列角色，适合新品预热和社媒传播。",
    metric: "3 个潮玩样板",
    conversion: "适合新品预售、IP 活动页、社群传播和收藏级详情页。"
  },
  decor: {
    name: "文创",
    title: "文创摆件 3D 展示案例库",
    subtitle: "让小件商品也能讲清纹样、釉面和设计感。",
    audience: "摆件 / 器物 / 礼品 / 联名周边",
    problem: "小件商品细节密度高，照片容易丢失曲面和工艺质感。",
    outcome: "把器物轮廓、纹样连续性和材质反光集中在一个案例页里。",
    metric: "3 个文创样板",
    conversion: "适合文博周边、联名礼品、活动专题和线下展陈延展。"
  },
  fashion: {
    name: "鞋包",
    title: "鞋包精品 3D 展示案例库",
    subtitle: "把包型、走线、鞋底和五金细节变成购买理由。",
    audience: "包袋 / 鞋履 / 腕表 / 配饰",
    problem: "用户想看廓形、侧面比例、五金和材质反光，普通图组不够直观。",
    outcome: "用可旋转样板补足质感判断，适合精品 Lookbook 和买手店页面。",
    metric: "3 个鞋包样板",
    conversion: "适合新品 Lookbook、买手店页面、直播讲解和多 SKU 统一展示。"
  },
  industry: {
    name: "工业",
    title: "工业件 3D 展示案例库",
    subtitle: "把结构、接口、外壳比例和技术卖点讲清楚。",
    audience: "设备外壳 / 机械部件 / 无人机 / 精密零件",
    problem: "复杂结构靠几张图讲不清，售前沟通容易反复索要细节图。",
    outcome: "把接口、连接位和结构比例变成可在线确认的技术展示资产。",
    metric: "3 个工业样板",
    conversion: "适合技术目录、投标方案、渠道培训和售前远程讲解。"
  },
  factory: {
    name: "工厂",
    title: "智能工厂 3D 展示案例库",
    subtitle: "让产线节点、设备关系和参观路线一屏看懂。",
    audience: "产线 / 设备 / 园区 / 工厂展厅",
    problem: "工厂价值不只在单台设备，而在流程、空间和节点关系。",
    outcome: "用 3D 场景支持招商、汇报、远程参观和方案讲解。",
    metric: "3 个工厂样板",
    conversion: "适合招商路演、园区汇报、远程参观和客户接待前置沟通。"
  },
  space: {
    name: "空间",
    title: "空间场景 3D 展示案例库",
    subtitle: "让客户先在线进入房间、展厅或街区现场。",
    audience: "酒店 / 展馆 / 商业空间 / 文旅街区",
    problem: "空间体验靠照片很难建立尺度感和动线感。",
    outcome: "把真实尺度、路线和重点点位放到一个可进入的在线案例里。",
    metric: "3 个空间样板",
    conversion: "适合看房看场、展馆导览、文旅招商和商业空间预约。"
  }
};
const miniappMode = requestedMiniappMode;
const isMiniAppHome = miniappMode === "home";
const isMiniAppGallery = miniappMode === "gallery";
const isMiniAppMode = isMiniAppHome || isMiniAppGallery;
const requestedLanguage = searchParams.get("lang");
const savedLanguage = window.localStorage.getItem("showroom-lang");
const requestedFurnitureId = searchParams.get("item");
const hasDefaultFurniture = furniture.some((item) => item.id === DEFAULT_ITEM_ID);
const initialFurnitureId = furniture.some((item) => item.id === requestedFurnitureId)
  ? requestedFurnitureId
  : hasDefaultFurniture
    ? DEFAULT_ITEM_ID
    : furniture[0]?.id || "";
const initialLanguage = supportedLanguages.has(requestedLanguage)
  ? requestedLanguage
  : isMiniAppMode
    ? "zh"
    : supportedLanguages.has(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;

const state = {
  activeId: initialFurnitureId,
  activeFilter: "All",
  lang: initialLanguage,
  rotating: true,
  zoomed: false,
  viewMode: "3d",
  roomPreview: false,
  saved: false,
  activeViewPreset: "free",
  activeAnnotation: "",
  focusAnchor: null,
  immersive: false,
  cleanView: false,
  measuring: false,
  contactOpen: false,
  galleryOpen: false,
  measurePoints: [],
  measurePointCounter: 0,
  toastTimer: null,
  categoryScrollFrame: 0
};

if (isMiniAppHome) {
  state.viewMode = "grid";
}

const categoryNames = {
  zh: {
    All: "全部",
    Armchair: "扶手椅",
    Table: "边几",
    Sofa: "沙发",
    Cabinet: "柜类",
    Lamp: "灯具",
    潮玩: "潮玩",
    家居: "家居",
    文创摆件: "文创摆件",
    鞋包: "鞋包",
    工业件: "工业件",
    智能工厂: "智能工厂",
    空间场景: "空间场景"
  },
  en: {
    All: "All",
    Armchair: "Armchair",
    Table: "Table",
    Sofa: "Sofa",
    Cabinet: "Cabinet",
    Lamp: "Lamp",
    潮玩: "Toys",
    家居: "Home",
    文创摆件: "Decor",
    鞋包: "Fashion",
    工业件: "Industrial",
    智能工厂: "Factory",
    空间场景: "Space"
  }
};

const viewPresets = [
  { id: "front", yawOffset: 0, pitchOffset: 0 },
  { id: "side", yawOffset: 90, pitchOffset: 0 },
  { id: "back", yawOffset: 180, pitchOffset: 0 },
  { id: "top", yawOffset: 16, pitch: 54, distanceMultiplier: 1.08 }
];

const dimensionKeys = {
  height: ["Height", "高度"],
  width: ["Width", "宽度", "Diameter", "直径"],
  depth: ["Depth", "深度", "Diameter", "直径"]
};

const visualGuideEdge = 0.5;

const dimensionGuides = [
  {
    type: "width",
    start: { x: -visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge },
    end: { x: visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge }
  },
  {
    type: "height",
    start: { x: visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge },
    end: { x: visualGuideEdge, y: visualGuideEdge, z: visualGuideEdge }
  },
  {
    type: "depth",
    start: { x: -visualGuideEdge, y: -visualGuideEdge, z: -visualGuideEdge },
    end: { x: -visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge }
  }
];

const spaceRulerCorners = {
  leftBottomFront: { x: -visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge },
  rightBottomFront: { x: visualGuideEdge, y: -visualGuideEdge, z: visualGuideEdge },
  leftTopFront: { x: -visualGuideEdge, y: visualGuideEdge, z: visualGuideEdge },
  rightTopFront: { x: visualGuideEdge, y: visualGuideEdge, z: visualGuideEdge },
  leftBottomBack: { x: -visualGuideEdge, y: -visualGuideEdge, z: -visualGuideEdge },
  rightBottomBack: { x: visualGuideEdge, y: -visualGuideEdge, z: -visualGuideEdge },
  leftTopBack: { x: -visualGuideEdge, y: visualGuideEdge, z: -visualGuideEdge },
  rightTopBack: { x: visualGuideEdge, y: visualGuideEdge, z: -visualGuideEdge }
};

const spaceRulerEdges = [
  ["leftBottomFront", "rightBottomFront"],
  ["leftTopFront", "rightTopFront"],
  ["leftBottomBack", "rightBottomBack"],
  ["leftTopBack", "rightTopBack"],
  ["leftBottomFront", "leftTopFront"],
  ["rightBottomFront", "rightTopFront"],
  ["leftBottomBack", "leftTopBack"],
  ["rightBottomBack", "rightTopBack"],
  ["leftBottomFront", "leftBottomBack"],
  ["rightBottomFront", "rightBottomBack"],
  ["leftTopFront", "leftTopBack"],
  ["rightTopFront", "rightTopBack"]
];

const spaceRulerFaces = [
  ["leftTopFront", "rightTopFront", "rightBottomFront", "leftBottomFront"],
  ["rightTopFront", "rightTopBack", "rightBottomBack", "rightBottomFront"],
  ["leftTopBack", "rightTopBack", "rightTopFront", "leftTopFront"]
];

const detailAnnotations = {
  "lounge-armchair": [
    {
      id: "wood-arms",
      x: 34,
      y: 49,
      anchor: { x: -0.5, y: 0.1, z: 0.08 },
      copy: {
        zh: { title: "实木扶手", text: "突出木纹走向和扶手厚度，方便客户判断工艺质感。" },
        en: { title: "Solid wood arms", text: "Highlights wood grain direction and arm thickness for material review." }
      }
    },
    {
      id: "seat-cushion",
      x: 52,
      y: 57,
      anchor: { x: 0, y: -0.05, z: 0.28 },
      copy: {
        zh: { title: "坐垫厚度", text: "展示坐垫饱满度、座高和日常使用舒适度。" },
        en: { title: "Seat cushion", text: "Shows cushion volume, seat height, and everyday comfort cues." }
      }
    },
    {
      id: "back-profile",
      x: 65,
      y: 39,
      anchor: { x: 0.44, y: 0.34, z: -0.24 },
      copy: {
        zh: { title: "靠背轮廓", text: "让买家看清椅背角度和侧面线条。" },
        en: { title: "Back profile", text: "Makes the back angle and side silhouette easier to understand." }
      }
    }
  ],
  "serra-side-table": [
    {
      id: "stone-top",
      x: 50,
      y: 42,
      anchor: { x: 0, y: 0.34, z: 0.1 },
      copy: {
        zh: { title: "石材台面", text: "重点呈现石材纹理、圆形边缘和台面厚度。" },
        en: { title: "Stone top", text: "Shows stone texture, rounded edge, and tabletop thickness." }
      }
    },
    {
      id: "oak-base",
      x: 49,
      y: 61,
      anchor: { x: 0, y: -0.22, z: 0.02 },
      copy: {
        zh: { title: "橡木底座", text: "帮助客户理解底座体量和家具落地稳定感。" },
        en: { title: "Oak base", text: "Helps buyers read the base volume and grounded proportion." }
      }
    },
    {
      id: "edge-thickness",
      x: 67,
      y: 47,
      anchor: { x: 0.42, y: 0.22, z: 0.12 },
      copy: {
        zh: { title: "边缘厚度", text: "适合展示高客单价家具最容易被忽略的结构细节。" },
        en: { title: "Edge thickness", text: "Surfaces the structural detail that premium buyers often ask about." }
      }
    }
  ],
  "atelier-low-sofa": [
    {
      id: "seat-depth",
      x: 48,
      y: 58,
      anchor: { x: 0, y: -0.02, z: 0.36 },
      copy: {
        zh: { title: "坐深比例", text: "让客户提前理解大件沙发的坐深、座高和体量。" },
        en: { title: "Seat depth", text: "Clarifies sofa depth, seat height, and large-piece proportion before purchase." }
      }
    },
    {
      id: "textile-surface",
      x: 59,
      y: 45,
      anchor: { x: 0.24, y: 0.16, z: 0.16 },
      copy: {
        zh: { title: "织物质感", text: "用近距离 3D 视角展示面料纹理和柔软体积。" },
        en: { title: "Textured fabric", text: "Uses close 3D viewing to show textile grain and soft volume." }
      }
    },
    {
      id: "walnut-rail",
      x: 58,
      y: 72,
      anchor: { x: 0.2, y: -0.38, z: 0.04 },
      copy: {
        zh: { title: "胡桃木底座", text: "强化底部线条和结构，提升商品页的可信度。" },
        en: { title: "Walnut rail", text: "Emphasizes the base line and structure for a more trustworthy product page." }
      }
    }
  ],
  "archive-cabinet": [
    {
      id: "brass-hardware",
      x: 53,
      y: 50,
      anchor: { x: 0.18, y: 0.02, z: 0.36 },
      copy: {
        zh: { title: "黄铜五金", text: "展示拉手高光、材质反差和细节做工。" },
        en: { title: "Brass hardware", text: "Shows handle highlights, material contrast, and detail quality." }
      }
    },
    {
      id: "oak-grain",
      x: 39,
      y: 45,
      anchor: { x: -0.34, y: 0.1, z: 0.34 },
      copy: {
        zh: { title: "橡木纹理", text: "让客户在远程看样时也能确认木纹走向。" },
        en: { title: "Oak grain", text: "Lets remote buyers inspect the grain direction and finish." }
      }
    },
    {
      id: "door-alignment",
      x: 61,
      y: 62,
      anchor: { x: 0.34, y: -0.16, z: 0.34 },
      copy: {
        zh: { title: "门板对齐", text: "把门缝、比例和柜体线条讲清楚，减少额外问图。" },
        en: { title: "Door alignment", text: "Clarifies seams, proportion, and cabinet lines without extra photos." }
      }
    }
  ],
  "ceramic-table-lamp": [
    {
      id: "linen-shade",
      x: 50,
      y: 35,
      anchor: { x: 0, y: 0.38, z: 0.08 },
      copy: {
        zh: { title: "亚麻灯罩", text: "突出灯罩轮廓、材质柔和度和空间氛围。" },
        en: { title: "Linen shade", text: "Highlights shade silhouette, material softness, and room mood." }
      }
    },
    {
      id: "ceramic-base",
      x: 50,
      y: 63,
      anchor: { x: 0, y: -0.22, z: 0.08 },
      copy: {
        zh: { title: "陶瓷底座", text: "让客户看清底座比例、表面起伏和手作质感。" },
        en: { title: "Ceramic base", text: "Shows base proportion, surface variation, and crafted character." }
      }
    },
    {
      id: "soft-silhouette",
      x: 62,
      y: 51,
      anchor: { x: 0.34, y: 0.05, z: 0.16 },
      copy: {
        zh: { title: "柔和轮廓", text: "适合用在小件家居饰品的线上质感表达。" },
        en: { title: "Soft silhouette", text: "Supports a premium online presentation for smaller decor pieces." }
      }
    }
  ]
};

const itemLocales = {
  zh: {
    "lounge-armchair": {
      category: "扶手椅",
      countLabel: "12 款家具",
      title: "Lounge Armchair",
      style: "斯堪的纳维亚现代",
      origin: "丹麦 哥本哈根",
      description: "一把带有木质扶手和织物坐垫的休闲椅，用来展示家具的轮廓、材质和细节如何在线上被清楚理解。",
      dimensions: { 高度: "81 cm", 宽度: "72 cm", 深度: "78 cm", 座高: "42 cm" },
      materials: [
        { name: "实木框架", role: "结构", color: "#9b5f29" },
        { name: "羊毛混纺织物", role: "坐垫", color: "#c9bca6" },
        { name: "自然蜡油", role: "表面", color: "#e6ded0" }
      ],
      condition: {
        grade: "可展示",
        detail: "适合用于家具商品页、销售跟进和远程看样场景。"
      },
      captureNote: "通过低角度环绕视角展示扶手、坐垫厚度、木纹和织物质感，让客户更接近真实看样。",
      insights: [
        { title: "商品页展示", text: "把 3D 模型嵌入电商商品页，让客户下单前先 360° 看清产品。" },
        { title: "细节确认", text: "材质、边角、比例和使用痕迹都可以直接观察，减少反复咨询。" },
        { title: "销售跟进", text: "销售可以把同一个 3D 链接发给客户，用它完成远程讲解和确认。" }
      ]
    },
    "serra-side-table": {
      category: "边几",
      countLabel: "24 款家具",
      title: "Serra Side Table",
      style: "洞石与橡木",
      origin: "法国",
      description: "一张圆形边几，适合展示石材厚度、木质底座和家具体量在网页中的真实感。",
      dimensions: { 高度: "48 cm", 直径: "55 cm", 重量: "28 kg", 台面厚度: "7 cm" },
      materials: [
        { name: "洞石", role: "台面", color: "#d8cbb9" },
        { name: "实木橡木", role: "底座", color: "#a5642c" },
        { name: "哑光保护层", role: "表面", color: "#ede6d8" }
      ],
      condition: {
        grade: "适合展示",
        detail: "适合让客户确认石材纹理、边缘厚度和底座比例。"
      },
      captureNote: "重点展示台面厚度、圆柱体体量和底部阴影，让客户判断放进空间后的比例。",
      insights: [
        { title: "比例判断", text: "客户能更直观理解高度、直径和空间占比。" },
        { title: "材质信任", text: "石材和木材的纹理不再只靠图片描述。" },
        { title: "搭配决策", text: "适合用于软装搭配、设计师选品和组合销售。" }
      ]
    },
    "atelier-low-sofa": {
      category: "沙发",
      countLabel: "18 款家具",
      title: "Atelier Low Sofa",
      style: "低矮织物沙发",
      origin: "意大利 米兰",
      description: "一张低矮宽大的沙发，用来展示大件家具的体量、坐深、靠背角度和织物质感。",
      dimensions: { 高度: "72 cm", 宽度: "218 cm", 深度: "92 cm", 座高: "39 cm" },
      materials: [
        { name: "纹理棉麻", role: "面料", color: "#cfc3ae" },
        { name: "胡桃木底座", role: "底部结构", color: "#8b5528" },
        { name: "羽绒混合填充", role: "坐垫", color: "#e3d8c8" }
      ],
      condition: {
        grade: "适合展示",
        detail: "适合高客单价大件家具的远程看样和售前确认。"
      },
      captureNote: "通过较宽的环绕视角展示坐垫深度、靠背角度和底部木质线条。",
      insights: [
        { title: "减少尺寸误判", text: "大件家具更需要让客户提前理解真实体量。" },
        { title: "降低退货风险", text: "客户看清坐深、靠背和比例后，下单预期更稳定。" },
        { title: "组合销售", text: "可以和椅子、边几、灯具组成完整的线上展厅。" }
      ]
    },
    "archive-cabinet": {
      category: "柜类",
      countLabel: "16 款家具",
      title: "Archive Cabinet",
      style: "橡木与黄铜",
      origin: "英国 伦敦",
      description: "一个橡木柜，用来展示平面家具、门板细节、五金和表面质感如何通过 3D 被确认。",
      dimensions: { 高度: "88 cm", 宽度: "92 cm", 深度: "42 cm", 门板数量: "2" },
      materials: [
        { name: "橡木饰面", role: "柜体", color: "#995d2a" },
        { name: "黄铜拉手", role: "五金", color: "#c9a15a" },
        { name: "清油保护", role: "表面", color: "#eadfce" }
      ],
      condition: {
        grade: "适合展示",
        detail: "适合展示柜门对齐、五金质感和木纹走向。"
      },
      captureNote: "重点展示柜门线条、拉手高光和大面积木纹，让客户不用额外索要细节图。",
      insights: [
        { title: "细节复核", text: "客户可以自己检查门缝、五金和表面细节。" },
        { title: "提升目录页", text: "把普通产品卡片升级为可交互产品展示。" },
        { title: "建立信任", text: "比单张图片更适合展示工艺和修复质量。" }
      ]
    },
    "ceramic-table-lamp": {
      category: "灯具",
      countLabel: "15 款家具",
      title: "Ceramic Table Lamp",
      style: "亚麻与陶瓷",
      origin: "日本 京都",
      description: "一盏陶瓷台灯，用来展示小件家具和家居饰品也可以拥有高质感 3D 商品页。",
      dimensions: { 高度: "58 cm", 宽度: "34 cm", 深度: "34 cm", 线长: "160 cm" },
      materials: [
        { name: "亚麻灯罩", role: "灯罩", color: "#d8c8ad" },
        { name: "陶瓷底座", role: "底座", color: "#bca989" },
        { name: "做旧黄铜", role: "支架", color: "#b68a45" }
      ],
      condition: {
        grade: "适合展示",
        detail: "适合展示小件产品的轮廓、质感和搭配氛围。"
      },
      captureNote: "重点展示灯罩轮廓、陶瓷底座比例和材质柔和感。",
      insights: [
        { title: "小件也能看清", text: "家居饰品可以用更近的默认视角展示质感。" },
        { title: "氛围表达", text: "结合空间预览展示灯具的实际搭配效果。" },
        { title: "丰富选品库", text: "让配件类产品也能进入统一的 3D 家具展厅。" }
      ]
    }
  }
};

const pageCopy = {
  zh: {
    htmlLang: "zh-CN",
    title: "MeTop Furniture Lab | 实景 3D 家具展厅",
    description: "面向家具品牌、电商和展厅的实景 3D 家具展示方案，让客户在线上 360° 了解家具产品。",
    brandTagline: "实景 3D 家具展厅",
    navShowroom: "3D 展厅",
    navPain: "行业痛点",
    navScenarios: "应用场景",
    navContact: "预约演示",
    searchLabel: "案例",
    savedLabel: "收藏",
    topCtaLabel: "预约演示",
    browseLabel: "精选家具",
    viewAllLabel: "查看全部",
    statusLabel: "展厅状态",
    viewModeLabel: "查看方式",
    environmentLabel: "空间预览",
    storyButton: "查看展示细节",
    rotateLabel: "自转",
    zoomLabel: "放大",
    resetLabel: "重置",
    fullscreenLabel: "沉浸",
    cleanLabel: "清屏",
    measureLabel: "测量",
    shareLabel: "分享",
    roomPreviewLabel: "空间预览",
    sampleCtaLabel: "预约样板",
    closeImmersiveLabel: "退出沉浸查看",
    viewPresetLabel: "视角",
    frontViewLabel: "正面",
    sideViewLabel: "侧面",
    backViewLabel: "背面",
    topViewLabel: "俯视",
    frontViewTooltip: "切换到正面视角",
    sideViewTooltip: "切换到侧面视角",
    backViewTooltip: "切换到背面视角",
    topViewTooltip: "切换到俯视视角",
    heightLabel: "高度",
    widthLabel: "宽度",
    depthLabel: "深度",
    diameterLabel: "直径",
    searchTooltip: "查看家具案例",
    saveTooltip: "收藏当前家具",
    mode3dTooltip: "查看 3D 展示",
    modeProductTooltip: "查看商品图",
    modeGridTooltip: "显示空间标尺",
    rotateTooltip: "开启或暂停自转",
    zoomTooltip: "放大或还原视角",
    resetTooltip: "重置观看角度",
    fullscreenTooltip: "进入沉浸式查看",
    exitFullscreenTooltip: "退出沉浸式查看",
    cleanTooltip: "隐藏标注和标尺",
    exitCleanTooltip: "显示标注和标尺",
    measureTooltip: "打开自由测量尺",
    exitMeasureTooltip: "关闭测量尺",
    measureStartHint: "点击家具设置起点",
    measureSecondHint: "点击另一个位置查看距离",
    measureResultLabel: "距离",
    measureMissHint: "请点击家具可见区域设置测量点",
    shareTooltip: "复制当前家具链接",
    shareCopiedTooltip: "链接已复制",
    roomPreviewTooltip: "切换空间预览",
    sampleTooltip: "用当前家具预约一个 3D 样板",
    samplePreparedToast: (item) => `已为 ${item.title} 准备预约信息`,
    shareCopiedToast: (item) => `${item.title} 链接已复制`,
    shareFailedToast: "链接复制失败，请手动复制浏览器地址",
    sampleMessage: (item) => `我想先用 ${item.title} 做一个实景 3D 家具展示样板，请帮我判断需要准备哪些素材。`,
    modelLoading: "3D 模型加载中，首次打开请稍候",
    modelReady: "3D 展示已就绪",
    modelUnavailable: "3D 展示暂时无法加载",
    insightHeroEyebrow: "3D 家具展示",
    insightHeroTitle: "让客户在线上看清家具，而不是猜家具。",
    insightHeroText: "用 360° 交互展示家具的材质、体量、细节和比例，帮助客户更快做决定。",
    dimensionsLabel: "尺寸",
    materialsLabel: "材质",
    conditionLabel: "状态",
    captureLabel: "展示细节",
    painEyebrow: "家具行业痛点",
    painTitle: "家具不是不好卖，是客户在线上看不清。",
    painTitleLines: ["家具不是不好卖，", "是客户在线上看不清。"],
    painCopy: "高客单价家具最怕“看起来不错，收到不对”。实景 3D 展示把客户最担心的比例、材质和细节提前讲清楚。",
    workflowEyebrow: "如何赋能家具企业",
    workflowTitle: "从一件家具，到一个可嵌入官网和电商页的 3D 展厅。",
    workflowCopy: "我们把家具产品做成可交互的网页展示，让销售、运营和品牌团队都能直接使用。",
    scenariosEyebrow: "使用场景",
    scenariosTitle: "把 3D 家具展示放到真正影响成交的位置。",
    scenariosCopy: "不只是一个展示链接，而是可以进入商品页、销售跟进和品牌内容里的成交工具。",
    casesEyebrow: "家具案例",
    casesTitle: "可交互家具展品",
    casesCopy: "通过椅子、沙发、边几、柜类和灯具，展示客户在线上查看家具时最关心的比例、材质和细节。",
    contactEyebrow: "预约实景 3D 家具演示",
    contactTitle: "先拿一件家具试试看。",
    contactCopy: "你可以提供一件家具产品的图片、视频、3D 文件或采集需求，我们帮你判断适合的展示方式，并准备一版可给客户查看的 3D 展示页面。",
    needLabel: "你的需求",
    contactMethodLabel: "联系方式",
    contactPlaceholder: "邮箱 / 手机 / 微信",
    messageLabel: "备注",
    submitLabel: "预约 3D 家具展示演示",
    contactMessage: (item) => `我想了解 ${item.title} 这种实景 3D 家具展示。`,
    formNote: (item) => `已收到你关于 ${item.title} 的展示需求，我们会尽快与你联系。`,
    options: {
      showcase: "我想展示家具产品",
      scan: "我想采集/生成家具 3D",
      quote: "我想了解报价",
      cases: "我想看更多案例"
    },
    painItems: [
      { title: "图片很美，但看不出真实体量", text: "客户很难通过几张平面图判断沙发高度、椅背角度、桌面厚度和空间占比。" },
      { title: "细节不清楚，咨询成本就会上升", text: "材质纹理、边角做工、五金细节和使用痕迹都需要反复解释。" },
      { title: "客户想象不准，就容易退货", text: "很多退货不是质量问题，而是客户收到后发现和想象不一样。" },
      { title: "高客单价家具，更需要信任感", text: "越贵的家具，客户越不敢只凭图片下单。360° 展示能降低决策压力。" }
    ],
    workflowItems: [
      { step: "01", title: "准备家具资料", text: "使用已有图片、视频、扫描数据或生成好的 3D 文件作为起点。" },
      { step: "02", title: "生成实景 3D 展示", text: "把家具做成可在网页中交互查看的 3D 展示，保留体量、轮廓和材质信息。" },
      { step: "03", title: "嵌入销售页面", text: "放到官网、电商商品页、独立展厅或销售跟进链接里。" },
      { step: "04", title: "服务真实成交", text: "让客户提前确认细节，减少咨询、犹豫和错误预期。" }
    ],
    scenarioItems: [
      "家具品牌官网的产品展示页",
      "电商平台详情页和独立站商品页",
      "设计师选品、软装方案和远程看样",
      "销售顾问给客户发送的跟进链接",
      "海外客户无法到店时的线上展厅"
    ]
  },
  en: {
    htmlLang: "en",
    title: "MeTop Furniture Lab | Interactive 3D Furniture Showroom",
    description: "An interactive 3D furniture showroom for brands, ecommerce teams, and showrooms that want buyers to inspect products from every angle.",
    brandTagline: "Interactive 3D Furniture Showroom",
    navShowroom: "3D Showroom",
    navPain: "Pain Points",
    navScenarios: "Use Cases",
    navContact: "Book a Demo",
    searchLabel: "Cases",
    savedLabel: "Saved",
    topCtaLabel: "Book a Demo",
    browseLabel: "Featured furniture",
    viewAllLabel: "View all",
    statusLabel: "Showroom status",
    viewModeLabel: "View mode",
    environmentLabel: "Show environment",
    storyButton: "View showroom details",
    rotateLabel: "Rotate",
    zoomLabel: "Zoom",
    resetLabel: "Reset",
    fullscreenLabel: "Immersive",
    cleanLabel: "Clean",
    measureLabel: "Measure",
    shareLabel: "Share",
    roomPreviewLabel: "View in room",
    sampleCtaLabel: "Request Sample",
    closeImmersiveLabel: "Exit immersive view",
    viewPresetLabel: "Views",
    frontViewLabel: "Front",
    sideViewLabel: "Side",
    backViewLabel: "Back",
    topViewLabel: "Top",
    frontViewTooltip: "Switch to front view",
    sideViewTooltip: "Switch to side view",
    backViewTooltip: "Switch to back view",
    topViewTooltip: "Switch to top view",
    heightLabel: "Height",
    widthLabel: "Width",
    depthLabel: "Depth",
    diameterLabel: "Diameter",
    searchTooltip: "View furniture cases",
    saveTooltip: "Save this furniture",
    mode3dTooltip: "View interactive 3D",
    modeProductTooltip: "View product image",
    modeGridTooltip: "Show spatial ruler",
    rotateTooltip: "Start or pause rotation",
    zoomTooltip: "Zoom in or restore view",
    resetTooltip: "Reset viewing angle",
    fullscreenTooltip: "Enter immersive viewing",
    exitFullscreenTooltip: "Exit immersive viewing",
    cleanTooltip: "Hide markers and rulers",
    exitCleanTooltip: "Show markers and rulers",
    measureTooltip: "Click two points to measure distance",
    exitMeasureTooltip: "Close ruler",
    measureStartHint: "Click the furniture to set a start point",
    measureSecondHint: "Click another point to measure distance",
    measureResultLabel: "Distance",
    measureMissHint: "Click on the visible furniture area to set a point",
    shareTooltip: "Copy this furniture link",
    shareCopiedTooltip: "Link copied",
    roomPreviewTooltip: "Toggle room preview",
    sampleTooltip: "Request a 3D sample with this furniture",
    samplePreparedToast: (item) => `Sample request prepared for ${item.title}`,
    shareCopiedToast: (item) => `${item.title} link copied`,
    shareFailedToast: "Copy failed. Please copy the browser URL manually.",
    sampleMessage: (item) => `I would like to create a 3D furniture showroom sample with ${item.title}. Please help me understand what materials I should prepare.`,
    modelLoading: "Loading the 3D model. First view may take a moment.",
    modelReady: "3D view ready",
    modelUnavailable: "3D view unavailable",
    insightHeroEyebrow: "3D furniture display",
    insightHeroTitle: "Help buyers inspect furniture instead of guessing from photos.",
    insightHeroText: "Show material, scale, details, and proportion in an interactive 360° web view.",
    dimensionsLabel: "Dimensions",
    materialsLabel: "Materials",
    conditionLabel: "Status",
    captureLabel: "Showroom details",
    painEyebrow: "Furniture sales pain points",
    painTitle: "Beyond better photos. Build buyer certainty.",
    painTitleLines: ["Beyond better photos.", "Build buyer certainty."],
    painCopy: "Premium furniture loses momentum when buyers cannot judge scale, texture, and detail online. Interactive 3D makes the decision clearer before purchase.",
    workflowEyebrow: "How it helps furniture teams",
    workflowTitle: "From one furniture piece to an embeddable 3D showroom.",
    workflowCopy: "We turn furniture products into interactive web displays that sales, ecommerce, and brand teams can use directly.",
    scenariosEyebrow: "Use cases",
    scenariosTitle: "Place 3D product understanding where buying decisions happen.",
    scenariosCopy: "Use it beyond a showcase link: product pages, sales follow-ups, ecommerce campaigns, and brand storytelling.",
    casesEyebrow: "Furniture cases",
    casesTitle: "Interactive furniture showcases",
    casesCopy: "Explore chairs, sofas, tables, cabinets, and lamps through the details buyers care about most: scale, material, profile, and finish.",
    contactEyebrow: "Book a 3D furniture demo",
    contactTitle: "Start with one furniture piece.",
    contactCopy: "Send us product photos, videos, an existing 3D file, or a scan request. We can help evaluate the right display path and prepare a customer-ready 3D showroom page.",
    needLabel: "Need",
    contactMethodLabel: "Contact",
    contactPlaceholder: "Email / phone / WeChat",
    messageLabel: "Message",
    submitLabel: "Book a 3D furniture demo",
    contactMessage: (item) => `I am interested in an interactive 3D furniture showcase like ${item.title}.`,
    formNote: (item) => `Thanks. We received your request about ${item.title} and will contact you soon.`,
    options: {
      showcase: "I want to showcase furniture",
      scan: "I want to scan or generate 3D furniture",
      quote: "I want pricing",
      cases: "I want to see more cases"
    },
    painItems: [
      { title: "Photos look good, but scale is hard to judge", text: "Buyers need to understand height, depth, profile, and proportion before they commit." },
      { title: "Unclear details create more sales questions", text: "Materials, edges, hardware, texture, and condition often need repeated explanation." },
      { title: "Wrong expectations lead to returns", text: "Many returns happen because the delivered piece feels different from what buyers imagined." },
      { title: "High-value furniture needs stronger trust", text: "For premium pieces, 360° product understanding can shorten decision time." }
    ],
    workflowItems: [
      { step: "01", title: "Prepare furniture materials", text: "Start from photos, videos, scan data, or an existing 3D file." },
      { step: "02", title: "Create the 3D showroom view", text: "Turn the furniture into an interactive web display with scale, shape, and material cues." },
      { step: "03", title: "Embed into sales pages", text: "Use it on brand sites, ecommerce product pages, showroom links, or follow-up pages." },
      { step: "04", title: "Support real purchase decisions", text: "Help buyers confirm details earlier and reduce avoidable uncertainty." }
    ],
    scenarioItems: [
      "Product pages for furniture brand websites",
      "Ecommerce detail pages and independent stores",
      "Designer sourcing and remote room planning",
      "Sales follow-up links sent to buyers",
      "Online showrooms for overseas customers"
    ]
  }
};

const $ = (selector) => document.querySelector(selector);

const categoryList = $("#categoryList");
const insightList = $("#insightList");
const dimensionList = $("#dimensionList");
const materialList = $("#materialList");
const captureThumbs = $("#captureThumbs");
const caseGrid = $("#caseGrid");
const filterRow = $("#filterRow");
const modelStage = $("#modelStage");
const viewerPanel = $("#viewerPanel");
const modelViewer = $("#modelViewer");
const modelStatus = $("#modelStatus");
const modelObject = $("#modelObject");
const modelImage = $("#modelImage");
const viewPresetBar = $("#viewPresetBar");
const dimensionOverlay = $("#dimensionOverlay");
const annotationLayer = $("#annotationLayer");
const measurementLayer = $("#measurementLayer");
const saveButton = $("#saveButton");
const roomPreviewButton = $("#roomPreviewButton");
const sampleRequestButton = $("#sampleRequestButton");
const immersiveCloseButton = $("#immersiveCloseButton");
const actionToast = $("#actionToast");
const contactMessage = $("#contactMessage");
const contactForm = $("#contactForm");
const formNote = $("#formNote");
const contactInput = contactForm?.querySelector("input[name='contact']");

const viewer3d = {
  app: null,
  assetCache: new Map(),
  assetPromiseCache: new Map(),
  cameraEntity: null,
  canvas: null,
  currentEntity: null,
  currentId: "",
  currentBounds: null,
  dragging: false,
  focusPoint: null,
  lastPointer: { x: 0, y: 0 },
  loadTimer: null,
  orbit: {
    baseDistance: 2.4,
    distance: 2.4,
    maxDistance: 5.5,
    minDistance: 0.8,
    pitch: 8,
    target: null,
    yaw: 28
  },
  resizeObserver: null,
  setupPromise: null,
  localPoint: null,
  screenPoint: null,
  preloadStarted: false,
  preloadPromise: null,
  prefetchedUrls: new Set(),
  warmupUrls: new Set(),
  worldPoint: null,
  token: 0
};

const getActiveItem = () => furniture.find((item) => item.id === state.activeId) || furniture[0];

function getCopy() {
  const baseCopy = pageCopy[state.lang] || pageCopy.zh;
  const categoryCopy = activeCaseCategory.page?.[state.lang] || activeCaseCategory.page?.zh || {};

  return {
    ...baseCopy,
    ...categoryCopy
  };
}

function applyCaseTheme() {
  const root = document.documentElement;
  root.style.setProperty("--accent", activeCaseCategory.accent);
  root.style.setProperty("--accent-strong", activeCaseCategory.accentStrong || activeCaseCategory.accent);
  root.style.setProperty("--accent-soft", activeCaseCategory.accentSoft || activeCaseCategory.surface);
  root.style.setProperty("--bg", activeCaseCategory.bg || "#f6f1e8");
  root.style.setProperty("--bg-soft", activeCaseCategory.surface || "#fbf7ef");
  root.style.setProperty("--surface-muted", activeCaseCategory.accentSoft || "#efe7da");
  root.style.setProperty("--line-strong", activeCaseCategory.accentSoft || "#cbbba8");
  document.body.dataset.caseCategory = activeCaseCategory.id;
}

function getLocalizedItem(item) {
  return {
    ...item,
    ...(itemLocales[state.lang]?.[item.id] || {})
  };
}

function translateCategory(category) {
  return categoryNames[state.lang]?.[category] || category;
}

const uniqueCategories = () => ["All", ...new Set(furniture.map((item) => item.category))];

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function setTooltip(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.dataset.tooltip = text;
    element.title = text;
    element.setAttribute("aria-label", text);
  }
}

function fileNameFromUrl(url) {
  return decodeURIComponent((url || "model.ply").split("/").pop() || "model.ply");
}

function waitForIdle(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, Math.min(timeout, 600));
}

function canPreload3DModels() {
  const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;

  return !(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || ""));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getViewPreset(item, presetId = state.activeViewPreset) {
  const config = item.viewerModel || {};
  const baseYaw = config.cameraYaw ?? 28;
  const basePitch = config.cameraPitch ?? 8;
  const preset = viewPresets.find((entry) => entry.id === presetId) || viewPresets[0];

  return {
    ...preset,
    yaw: baseYaw + preset.yawOffset,
    pitch: preset.pitch ?? clamp(basePitch + preset.pitchOffset, -10, 28)
  };
}

function getDimensionValue(item, type) {
  const dimensions = item.dimensions || {};
  const key = dimensionKeys[type].find((candidate) => dimensions[candidate]);

  return {
    key,
    value: key ? dimensions[key] : "-"
  };
}

function getDimensionLabel(type, dimensionKey) {
  const copy = getCopy();

  if (type === "width" && (dimensionKey === "Diameter" || dimensionKey === "直径")) {
    return copy.diameterLabel;
  }

  return {
    height: copy.heightLabel,
    width: copy.widthLabel,
    depth: copy.depthLabel
  }[type];
}

function parseCmValue(value) {
  const match = String(value || "").match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function getDimensionMetric(item, type) {
  const dimension = getDimensionValue(item, type);

  return {
    ...dimension,
    label: getDimensionLabel(type, dimension.key),
    cm: parseCmValue(dimension.value)
  };
}

function getMeasurementMetrics(item) {
  return {
    x: getDimensionMetric(item, "width").cm || 100,
    y: getDimensionMetric(item, "height").cm || 100,
    z: getDimensionMetric(item, "depth").cm || 100
  };
}

function getMeasureDistance(item, startAnchor, endAnchor) {
  const metrics = getMeasurementMetrics(item);
  const visualSpan = visualGuideEdge * 2;
  const dx = ((endAnchor.x - startAnchor.x) / visualSpan) * metrics.x;
  const dy = ((endAnchor.y - startAnchor.y) / visualSpan) * metrics.y;
  const dz = ((endAnchor.z - startAnchor.z) / visualSpan) * metrics.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function getScreenMeasurementScale(item, layerElement) {
  if (!layerElement) {
    return 1;
  }

  const candidates = dimensionGuides
    .map((guide) => {
      const start = projectVisibleModelAnchor(guide.start, layerElement);
      const end = projectVisibleModelAnchor(guide.end, layerElement);
      const dimension = getDimensionMetric(item, guide.type);
      const pixelLength = start && end ? Math.hypot(end.x - start.x, end.y - start.y) : 0;

      return pixelLength > 12 && dimension.cm > 0 ? dimension.cm / pixelLength : 0;
    })
    .filter((value) => value > 0 && Number.isFinite(value))
    .sort((a, b) => a - b);

  if (candidates.length > 0) {
    return candidates[Math.floor(candidates.length / 2)];
  }

  const rect = layerElement.getBoundingClientRect();
  const widthCm = getDimensionMetric(item, "width").cm || 100;
  return widthCm / Math.max(rect.width * 0.42, 1);
}

function getScreenMeasurementPointFromPointer(event) {
  if (!event || !measurementLayer) {
    return null;
  }

  const layerRect = measurementLayer.getBoundingClientRect();
  const x = event.clientX - layerRect.left;
  const y = event.clientY - layerRect.top;

  if (x < 0 || x > layerRect.width || y < 0 || y > layerRect.height) {
    return null;
  }

  return {
    screen: {
      x: x / Math.max(layerRect.width, 1),
      y: y / Math.max(layerRect.height, 1)
    }
  };
}

function projectMeasurementPoint(point, layerElement) {
  if (!point || !layerElement) {
    return null;
  }

  if (point.anchor) {
    return projectModelAnchor(point.anchor, layerElement);
  }

  if (!point.screen) {
    return null;
  }

  const layerRect = layerElement.getBoundingClientRect();
  return {
    x: point.screen.x * layerRect.width,
    y: point.screen.y * layerRect.height,
    visible: true,
    layerWidth: layerRect.width,
    layerHeight: layerRect.height
  };
}

function getFreeMeasureDistance(item, startPoint, endPoint) {
  if (!startPoint || !endPoint) {
    return 0;
  }

  if (startPoint.anchor && endPoint.anchor) {
    return getMeasureDistance(item, startPoint.anchor, endPoint.anchor);
  }

  const start = projectMeasurementPoint(startPoint, measurementLayer);
  const end = projectMeasurementPoint(endPoint, measurementLayer);

  if (!start || !end) {
    return 0;
  }

  return Math.hypot(end.x - start.x, end.y - start.y) * getScreenMeasurementScale(item, measurementLayer);
}

function intersectRayWithLocalBounds(start, end, halfExtents) {
  const direction = {
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z
  };
  let tMin = 0;
  let tMax = 1;

  for (const axis of ["x", "y", "z"]) {
    const extent = Math.max(Math.abs(halfExtents[axis] || 0), 0.0001);
    const min = -extent;
    const max = extent;
    const startValue = start[axis];
    const directionValue = direction[axis];

    if (Math.abs(directionValue) < 0.000001) {
      if (startValue < min || startValue > max) {
        return null;
      }
      continue;
    }

    let t1 = (min - startValue) / directionValue;
    let t2 = (max - startValue) / directionValue;

    if (t1 > t2) {
      [t1, t2] = [t2, t1];
    }

    tMin = Math.max(tMin, t1);
    tMax = Math.min(tMax, t2);

    if (tMin > tMax) {
      return null;
    }
  }

  return {
    x: start.x + direction.x * tMin,
    y: start.y + direction.y * tMin,
    z: start.z + direction.z * tMin
  };
}

function normalizeLocalPointToAnchor(point, halfExtents) {
  const normalizeAxis = (value, extent) => {
    const span = Math.max(Math.abs(extent || 0) * 2, 0.0001);
    return clamp(value / span, -visualGuideEdge, visualGuideEdge);
  };

  return {
    x: normalizeAxis(point.x, halfExtents.x),
    y: normalizeAxis(point.y, halfExtents.y),
    z: normalizeAxis(point.z, halfExtents.z)
  };
}

function getFallbackMeasurementAnchor(localStart, localEnd, localCameraTarget, halfExtents) {
  const rayDirection = {
    x: localEnd.x - localStart.x,
    y: localEnd.y - localStart.y,
    z: localEnd.z - localStart.z
  };
  const planeNormal = {
    x: localCameraTarget.x - localStart.x,
    y: localCameraTarget.y - localStart.y,
    z: localCameraTarget.z - localStart.z
  };
  const denominator =
    rayDirection.x * planeNormal.x + rayDirection.y * planeNormal.y + rayDirection.z * planeNormal.z;

  if (Math.abs(denominator) < 0.000001) {
    return null;
  }

  const t =
    -(
      localStart.x * planeNormal.x +
      localStart.y * planeNormal.y +
      localStart.z * planeNormal.z
    ) / denominator;

  if (t < 0 || t > 1) {
    return null;
  }

  const planePoint = {
    x: localStart.x + rayDirection.x * t,
    y: localStart.y + rayDirection.y * t,
    z: localStart.z + rayDirection.z * t
  };
  const rawAnchor = {
    x: planePoint.x / Math.max(Math.abs(halfExtents.x || 0) * 2, 0.0001),
    y: planePoint.y / Math.max(Math.abs(halfExtents.y || 0) * 2, 0.0001),
    z: planePoint.z / Math.max(Math.abs(halfExtents.z || 0) * 2, 0.0001)
  };
  const tolerance = visualGuideEdge * 1.45;

  if (Math.abs(rawAnchor.x) > tolerance || Math.abs(rawAnchor.y) > tolerance || Math.abs(rawAnchor.z) > tolerance) {
    return null;
  }

  return {
    x: clamp(rawAnchor.x, -visualGuideEdge, visualGuideEdge),
    y: clamp(rawAnchor.y, -visualGuideEdge, visualGuideEdge),
    z: clamp(rawAnchor.z, -visualGuideEdge, visualGuideEdge)
  };
}

function getMeasurementAnchorFromPointer(event) {
  if (
    !event ||
    !modelViewer ||
    !viewer3d.currentEntity ||
    !viewer3d.currentBounds ||
    !viewer3d.cameraEntity?.camera
  ) {
    return null;
  }

  const viewerRect = modelViewer.getBoundingClientRect();
  const screenX = event.clientX - viewerRect.left;
  const screenY = event.clientY - viewerRect.top;

  if (screenX < 0 || screenX > viewerRect.width || screenY < 0 || screenY > viewerRect.height) {
    return null;
  }

  const camera = viewer3d.cameraEntity.camera;
  const cameraPosition = viewer3d.cameraEntity.getPosition();
  const farDistance = Math.max(viewer3d.orbit.distance * 10, camera.farClip || 20, 20);
  const worldFar = new pc.Vec3();
  const worldTarget = viewer3d.orbit.target?.clone?.() || new pc.Vec3();

  if (typeof camera.screenToWorld !== "function" || !cameraPosition) {
    return null;
  }

  camera.screenToWorld(screenX, screenY, farDistance, worldFar);

  const inverseTransform = new pc.Mat4().copy(viewer3d.currentEntity.getWorldTransform()).invert();
  const localStart = new pc.Vec3();
  const localEnd = new pc.Vec3();
  const localCameraTarget = new pc.Vec3();

  inverseTransform.transformPoint(cameraPosition, localStart);
  inverseTransform.transformPoint(worldFar, localEnd);
  inverseTransform.transformPoint(worldTarget, localCameraTarget);

  const hitPoint = intersectRayWithLocalBounds(localStart, localEnd, viewer3d.currentBounds.halfExtents);

  return hitPoint
    ? normalizeLocalPointToAnchor(hitPoint, viewer3d.currentBounds.halfExtents)
    : getFallbackMeasurementAnchor(localStart, localEnd, localCameraTarget, viewer3d.currentBounds.halfExtents);
}

function getMeasurementPointFromPointer(event) {
  const anchor = getMeasurementAnchorFromPointer(event);

  return anchor ? { anchor } : getScreenMeasurementPointFromPointer(event);
}

function getAnnotations(item) {
  return [];
}

function getFurnitureShareUrl(item = getActiveItem()) {
  const url = new URL(window.location.href);
  url.searchParams.set("category", activeCaseCategory.id);
  url.searchParams.set("item", item.id);
  url.hash = "";
  return url.href;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMiniAppUrl(mode, itemId = state.activeId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("miniapp", mode);
  url.searchParams.set("category", activeCaseCategory.id);
  url.searchParams.set("item", itemId);
  url.searchParams.set("lang", state.lang);
  return url.href;
}

function scrollMiniAppCategorySwitch(target, behavior = "auto") {
  const rail = document.querySelector(".miniapp-category-switch");
  const activeTarget = target || rail?.querySelector("[data-case-category].active");

  if (!rail || !activeTarget) {
    return;
  }

  const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 0);
  const targetCenter = activeTarget.offsetLeft + activeTarget.offsetWidth / 2;
  const nextScrollLeft = Math.min(Math.max(targetCenter - rail.clientWidth / 2, 0), maxScroll);

  if (behavior !== "smooth") {
    window.cancelAnimationFrame(state.categoryScrollFrame);
    rail.scrollLeft = nextScrollLeft;
    return;
  }

  const startScrollLeft = rail.scrollLeft;
  const distance = nextScrollLeft - startScrollLeft;

  if (Math.abs(distance) < 1) {
    return;
  }

  window.cancelAnimationFrame(state.categoryScrollFrame);

  let current = startScrollLeft;
  let velocity = 0;
  let frame = 0;
  const stiffness = Math.min(Math.max(Math.abs(distance) / 1800, 0.055), 0.09);
  const damping = 0.76;
  const maxFrames = 54;

  const animate = () => {
    const remaining = nextScrollLeft - current;
    velocity = (velocity + remaining * stiffness) * damping;
    current += velocity;

    if (current < 0 || current > maxScroll) {
      current = Math.min(Math.max(current, 0), maxScroll);
      velocity *= 0.35;
    }

    rail.scrollLeft = current;
    frame += 1;

    if ((Math.abs(remaining) > 0.45 || Math.abs(velocity) > 0.35) && frame < maxFrames) {
      state.categoryScrollFrame = window.requestAnimationFrame(animate);
      return;
    }

    rail.scrollLeft = nextScrollLeft;
  };

  state.categoryScrollFrame = window.requestAnimationFrame(animate);
}

function updateMiniAppCategoryTabs(options = {}) {
  const rail = document.querySelector(".miniapp-category-switch");

  if (!rail) {
    return;
  }

  rail.querySelectorAll("[data-case-category]").forEach((tab) => {
    const isActive = tab.dataset.caseCategory === activeCaseCategory.id;
    tab.classList.toggle("active", isActive);

    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });

  if (options.scroll) {
    scrollMiniAppCategorySwitch(rail.querySelector("[data-case-category].active"), options.behavior || "smooth");
  }
}

function updateMiniAppContactCopy() {
  if (!isMiniAppHome) {
    return;
  }

  const copy = getCopy();
  const contactPanel = document.querySelector(".miniapp-contact-panel");

  contactPanel?.querySelector("h2")?.replaceChildren(copy.miniappContactTitle || "添加微信，预约 3D 样板");
  contactPanel?.querySelector("p")?.replaceChildren(
    copy.miniappContactHint || "长按识别二维码，发送产品图片或模型文件，我们先帮你判断适合的 3D 展示方式。"
  );
  contactPanel?.querySelector("small")?.replaceChildren(copy.miniappContactNote || "建议备注：3D 展示");
}

function getMiniAppIndustryCopy(category = activeCaseCategory) {
  return MINIAPP_INDUSTRY_COPY[category.id] || {
    name: category.shortName || category.name,
    audience: category.origin || "行业案例",
    subtitle: category.page?.zh?.miniappSubtitle || "查看可复用的 3D/2D 案例样板。",
    problem: category.page?.zh?.casesCopy || "客户需要更直观地理解产品价值。",
    outcome: "用 3D/2D 样板把产品、卖点和转化动作放进同一个页面。",
    metric: category.countLabel || "案例样板",
    conversion: "适合官网、小程序、销售资料和客户转发。"
  };
}

function updateMiniAppCategoryProfile(item = getActiveItem()) {
  if (!isMiniAppHome) {
    return;
  }

  const copy = getMiniAppIndustryCopy();
  const localizedItem = getLocalizedItem(item);
  const categoryName = copy.name || activeCaseCategory.shortName || activeCaseCategory.name;

  document.getElementById("miniappProfileAudience")?.replaceChildren(copy.audience || "行业案例");
  document.getElementById("miniappProfileTitle")?.replaceChildren(`${categoryName}案例入口`);
  document.getElementById("miniappProfileText")?.replaceChildren(copy.subtitle || "查看可复用的 3D/2D 案例样板。");
  document.getElementById("miniappProfileProblem")?.replaceChildren(copy.problem || "客户需要更直观地理解产品价值。");
  document.getElementById("miniappProfileOutcome")?.replaceChildren(copy.outcome || "用 3D/2D 样板把产品、卖点和转化动作放进同一个页面。");
  document.getElementById("miniappProfileMetric")?.replaceChildren(copy.metric || activeCaseCategory.countLabel || "案例样板");
  document.getElementById("miniappProfileSample")?.replaceChildren(`当前样板：${localizedItem.title}`);
}

const DEFAULT_MINIAPP_BENEFITS = [
  { title: "细节更清楚", text: "3D 与 2D 视图结合，帮助客户快速理解样板价值" },
  { title: "案例易复用", text: "同一套展示结构可以覆盖多个品类和多个样板" },
  { title: "沟通更直接", text: "把产品、卖点和预约动作放在同一个页面里" }
];

function getMiniAppCaseCopy(item = getActiveItem()) {
  const copy = getCopy();
  const benefits = Array.isArray(copy.miniappBenefits) && copy.miniappBenefits.length
    ? copy.miniappBenefits
    : DEFAULT_MINIAPP_BENEFITS;

  return {
    benefits
  };
}

function updateMiniAppBenefitCopy(item = getActiveItem()) {
  if (!isMiniAppHome) {
    return;
  }

  const { benefits } = getMiniAppCaseCopy(item);

  document.querySelectorAll(".miniapp-benefit-row").forEach((row, index) => {
    const benefit = benefits[index] || DEFAULT_MINIAPP_BENEFITS[index] || DEFAULT_MINIAPP_BENEFITS[0];
    row.querySelector("strong")?.replaceChildren(benefit.title);
    row.querySelector("small")?.replaceChildren(benefit.text);
  });
}

function updateMiniAppCaseHeroCopy() {
  if (!isMiniAppHome) {
    return;
  }

  const hero = document.querySelector(".miniapp-hero-copy");
  const heroCopy = MINIAPP_CASE_HERO_COPY[state.lang] || MINIAPP_CASE_HERO_COPY.zh;

  if (!hero) {
    return;
  }

  const [brand, title, subtitle] = hero.children;
  if (brand) brand.textContent = heroCopy.brand;
  if (title) title.textContent = heroCopy.title;
  if (subtitle) subtitle.textContent = heroCopy.subtitle;
}

function setActiveCaseCategory(categoryId) {
  const nextCategory = getCaseCategory(categoryId);

  if (!nextCategory || nextCategory.id === activeCaseCategory.id) {
    updateMiniAppCategoryTabs();
    return;
  }

  const applyNextCategory = () => {
    activeCaseCategory = nextCategory;
    rawShowroomItems = getCategoryItems(activeCaseCategory);
    DEFAULT_ITEM_ID = activeCaseCategory.defaultItemId || rawShowroomItems?.[0]?.id || DEFAULT_FURNITURE_ID;
    furniture = orderFurnitureItems(rawShowroomItems || [], DEFAULT_ITEM_ID);
    state.activeId = furniture[0]?.id || "";
    state.activeFilter = "All";
    state.zoomed = false;
    state.activeViewPreset = "free";
    state.activeAnnotation = "";
    state.focusAnchor = null;
    state.measurePoints = [];
    state.saved = false;

    applyCaseTheme();
    updateMiniAppCategoryTabs();
    updateMiniAppContactCopy();
    applyLanguageContent();
    renderFilters();
    updateSelectedItem(state.activeId);
  };

  applyNextCategory();
}

function getFullShowroomUrl(target = "") {
  const url = new URL(window.location.href);
  url.pathname = "/";
  url.search = "";
  url.hash = target;
  url.searchParams.set("category", activeCaseCategory.id);
  url.searchParams.set("item", state.activeId);
  return url.href;
}

function setupMiniAppHomeShell() {
  if (!isMiniAppHome || document.getElementById("miniappHeroHeader")) {
    return;
  }

  const copy = getCopy();
  const heroCopy = MINIAPP_CASE_HERO_COPY[state.lang] || MINIAPP_CASE_HERO_COPY.zh;
  document.body.classList.add("miniapp-mode", "miniapp-home-mode");
  viewerPanel?.insertAdjacentHTML(
    "afterbegin",
    `
      <section class="miniapp-hero-header" id="miniappHeroHeader">
        <span class="miniapp-hero-mark" aria-hidden="true">M</span>
        <div class="miniapp-hero-copy">
          <span>${escapeHtml(heroCopy.brand)}</span>
          <strong>${escapeHtml(heroCopy.title)}</strong>
          <p>${escapeHtml(heroCopy.subtitle)}</p>
        </div>
      </section>
      <section class="miniapp-case-cover" aria-label="3D 行业案例库封面">
        <img src="${MINIAPP_CASE_HERO_IMAGE}" alt="多行业 3D 案例库封面图" loading="eager">
        <div class="miniapp-case-cover-copy">
          <span>INDUSTRY CASE LIBRARY</span>
          <strong>7 类行业案例，一套移动端展示入口</strong>
          <p>先用行业封面建立商业场景，再进入当前品类的真实产品样板。</p>
        </div>
        <div class="miniapp-case-cover-stats" aria-label="案例库数据">
          <strong>7 类品类</strong>
          <strong>3D/2D 切换</strong>
          <strong>可转发案例</strong>
        </div>
      </section>
      <nav class="miniapp-category-switch" aria-label="切换案例品类">
        ${caseCategories
          .map((category) => {
            const isActive = category.id === activeCaseCategory.id;

            return `
              <button
                class="${isActive ? "active" : ""}"
                type="button"
                role="tab"
                data-case-category="${escapeHtml(category.id)}"
                style="--category-accent: ${escapeHtml(category.accent)}; --category-surface: ${escapeHtml(category.surface || category.bg)};"
                ${isActive ? 'aria-current="page"' : ""}
              >
                <span aria-hidden="true"></span>
                <strong>${escapeHtml(category.shortName || category.name)}</strong>
              </button>
            `;
          })
          .join("")}
      </nav>
      <section class="miniapp-category-profile" id="miniappCategoryProfile" aria-label="当前品类案例说明">
        <span id="miniappProfileAudience">${escapeHtml(getMiniAppIndustryCopy().audience || "行业案例")}</span>
        <h2 id="miniappProfileTitle">${escapeHtml(getMiniAppIndustryCopy().name || activeCaseCategory.shortName)}案例入口</h2>
        <p id="miniappProfileText">${escapeHtml(getMiniAppIndustryCopy().subtitle || "查看可复用的 3D/2D 案例样板。")}</p>
        <div class="miniapp-profile-grid">
          <article>
            <small>客户痛点</small>
            <strong id="miniappProfileProblem">${escapeHtml(getMiniAppIndustryCopy().problem || "客户需要更直观地理解产品价值。")}</strong>
          </article>
          <article>
            <small>案例结果</small>
            <strong id="miniappProfileOutcome">${escapeHtml(getMiniAppIndustryCopy().outcome || "用 3D/2D 样板把产品、卖点和转化动作放进同一个页面。")}</strong>
          </article>
        </div>
        <div class="miniapp-profile-tags">
          <b id="miniappProfileMetric">${escapeHtml(getMiniAppIndustryCopy().metric || activeCaseCategory.countLabel || "案例样板")}</b>
          <b id="miniappProfileSample">当前样板：${escapeHtml(getLocalizedItem(getActiveItem()).title)}</b>
        </div>
      </section>
    `
  );
  requestAnimationFrame(() => scrollMiniAppCategorySwitch());

  const viewerCopy = viewerPanel?.querySelector(".viewer-copy");

  if (viewerPanel && viewerCopy && modelStage && !document.getElementById("miniappShowcaseCard")) {
    const showcaseCard = document.createElement("section");
    showcaseCard.className = "miniapp-showcase-card";
    showcaseCard.id = "miniappShowcaseCard";
    showcaseCard.setAttribute("aria-label", "当前案例 3D 展示");
    viewerPanel.insertBefore(showcaseCard, viewerCopy);
    showcaseCard.appendChild(viewerCopy);
    showcaseCard.appendChild(modelStage);
    showcaseCard.insertAdjacentHTML(
      "afterbegin",
      `<div class="miniapp-showcase-controls" aria-label="展示控制">
        <div class="miniapp-view-switch" role="group" aria-label="展示模式切换">
          <button class="active" type="button" data-view-mode="grid" aria-label="查看 3D 案例" title="查看 3D 案例" aria-pressed="true">3D</button>
          <button type="button" data-view-mode="product" aria-label="查看案例图" title="查看案例图" aria-pressed="false">2D</button>
        </div>
        <button class="miniapp-rotate-toggle active" type="button" id="miniappRotateToggle" data-control="rotate" aria-label="暂停自动旋转" aria-pressed="true">
          <span aria-hidden="true"></span>
        </button>
      </div>`
    );
  }

  document.getElementById("miniappShowcaseCard")?.insertAdjacentHTML(
    "afterend",
    `
      <div class="miniapp-home-actions" id="miniappHomeActions">
        <button class="miniapp-primary-action" type="button" id="miniappGalleryButton">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"></path>
            <path d="M12 12 4 7.5"></path>
            <path d="m12 12 8-4.5"></path>
            <path d="M12 12v9"></path>
          </svg>
          <span>查看案例</span>
        </button>
        <button class="miniapp-secondary-action" type="button" id="miniappSampleButton">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="5" width="14" height="15" rx="2"></rect>
            <path d="M8 3v4"></path>
            <path d="M16 3v4"></path>
            <path d="M8 11h8"></path>
            <path d="M8 15h5"></path>
          </svg>
          <span>预约样板</span>
        </button>
      </div>

      <section class="miniapp-benefit-list" aria-label="3D 案例展示能力">
        <article class="miniapp-benefit-row">
          <span class="miniapp-benefit-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.8 9A7.5 7.5 0 0 1 18 6.2"></path>
              <path d="M18 3v3.4h-3.4"></path>
              <path d="M19.2 15A7.5 7.5 0 0 1 6 17.8"></path>
              <path d="M6 21v-3.4h3.4"></path>
              <text x="12" y="14.4" text-anchor="middle">360</text>
            </svg>
          </span>
          <span>
            <strong>360° 看清细节</strong>
            <small>旋转、缩放、标尺，真实还原外观与结构</small>
          </span>
          <i aria-hidden="true">›</i>
        </article>
        <article class="miniapp-benefit-row">
          <span class="miniapp-benefit-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <path d="m8.6 10.6 6.8-4.2"></path>
              <path d="m8.6 13.4 6.8 4.2"></path>
            </svg>
          </span>
          <span>
            <strong>销售一键分享</strong>
            <small>生成链接或页面，客户轻松查看与转发</small>
          </span>
          <i aria-hidden="true">›</i>
        </article>
        <article class="miniapp-benefit-row">
          <span class="miniapp-benefit-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 5 6v5c0 4.4 2.8 8.5 7 10 4.2-1.5 7-5.6 7-10V6l-7-3Z"></path>
              <path d="m8.8 12.2 2.1 2.1 4.5-5"></path>
            </svg>
          </span>
          <span>
            <strong>减少来回沟通</strong>
            <small>提前展示材质、尺度与卖点，减少预期差异</small>
          </span>
          <i aria-hidden="true">›</i>
        </article>
      </section>

      <section class="miniapp-workflow-card" aria-label="3 步快速生成展厅">
        <h2><span></span>3 步生成展示页<span></span></h2>
        <div class="miniapp-workflow-steps">
          <article>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 17V7"></path>
                <path d="m8 11 4-4 4 4"></path>
                <path d="M5 17a4 4 0 0 1 3.8-4 5 5 0 0 1 9.4 1.7A3.2 3.2 0 0 1 17 21H7.2A4.2 4.2 0 0 1 5 17Z"></path>
              </svg>
            </span>
            <strong>上传素材</strong>
            <small>产品图 / 尺寸 / 说明</small>
          </article>
          <article>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4H4v3"></path>
                <path d="M17 4h3v3"></path>
                <path d="M7 20H4v-3"></path>
                <path d="M17 20h3v-3"></path>
                <path d="M9 15h1.6l.4-1.4h2l.4 1.4H15l-2.1-6h-1.8L9 15Z"></path>
              </svg>
            </span>
            <strong>AI 重建</strong>
            <small>智能建模 / 尺寸标注</small>
          </article>
          <article>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 12c0-3.3 2.2-6 5-6 2.1 0 3.8 1.5 3.8 3.5S14.1 13 12 13H9.5v5"></path>
                <path d="M17 12c0 3.3-2.2 6-5 6"></path>
              </svg>
            </span>
            <strong>案例页展示</strong>
            <small>3D 样板 / 分享 / 留资</small>
          </article>
        </div>
      </section>

      <nav class="miniapp-tabbar" aria-label="小程序底部导航">
        <button class="active" type="button" id="miniappHomeTab">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 11 8-7 8 7"></path>
            <path d="M6 10v10h12V10"></path>
          </svg>
          <span>首页</span>
        </button>
        <button type="button" id="miniappContactTab">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path>
          </svg>
          <span>联系我们</span>
        </button>
      </nav>

      <div class="miniapp-gallery-sheet" id="miniappGallerySheet" aria-hidden="true">
        <button class="miniapp-gallery-backdrop" type="button" id="miniappGalleryBackdrop" aria-label="关闭案例列表"></button>
        <main class="miniapp-gallery-shell" aria-label="案例列表">
          <header class="miniapp-gallery-header">
            <button class="miniapp-back-button" type="button" id="miniappGalleryBack">返回</button>
            <div>
              <span>MeTop Cases</span>
              <h1 id="miniappGalleryTitle"></h1>
              <p id="miniappGallerySubtitle"></p>
            </div>
          </header>
          <section class="miniapp-card-grid" id="miniappGalleryGrid" aria-label="案例模型列表"></section>
        </main>
      </div>

      <div class="miniapp-contact-sheet" id="miniappContactSheet" aria-hidden="true">
        <button class="miniapp-contact-backdrop" type="button" id="miniappContactBackdrop" aria-label="关闭二维码"></button>
        <section class="miniapp-contact-panel" role="dialog" aria-modal="true" aria-labelledby="miniappContactTitle">
          <button class="miniapp-contact-close" type="button" id="miniappContactClose" aria-label="关闭">×</button>
          <h2 id="miniappContactTitle">${escapeHtml(copy.miniappContactTitle || "添加微信，预约 3D 样板")}</h2>
          <p>${escapeHtml(copy.miniappContactHint || "长按识别二维码，发送产品图片或模型文件，我们先帮你判断适合的 3D 展示方式。")}</p>
          <img src="${CONTACT_QR_URL}" alt="微信联系二维码">
          <small>${escapeHtml(copy.miniappContactNote || "建议备注：3D 展示")}</small>
        </section>
      </div>
    `
  );
}

function updateMiniAppHomeShell(item = getActiveItem()) {
  if (!isMiniAppHome) {
    return;
  }

  const localizedItem = getLocalizedItem(item);
  const industryCopy = getMiniAppIndustryCopy();
  const categoryName = industryCopy.name || activeCaseCategory.shortName || activeCaseCategory.name;
  const currentLabel = document.getElementById("eraLabel");
  const title = document.getElementById("showroomTitle");
  const styleLine = document.getElementById("styleLine");
  const description = document.getElementById("showroomDescription");

  document.title = `MeTop Cases | ${categoryName}案例 · ${localizedItem.title}`;
  document.querySelector("meta[name='description']")?.setAttribute("content", industryCopy.subtitle || localizedItem.description);

  if (currentLabel) {
    currentLabel.textContent = `${categoryName}案例 · ${item.era}`;
  }

  if (title) {
    title.textContent = localizedItem.title;
  }

  if (styleLine) {
    styleLine.textContent = localizedItem.style;
  }

  if (description) {
    description.textContent = localizedItem.description;
  }

  updateMiniAppCategoryProfile(item);
  updateMiniAppBenefitCopy(item);
}

function getMiniAppGalleryCopy() {
  const copy = getCopy();
  const title =
    copy.miniappGalleryTitle ||
    (state.lang === "en" ? `Select a ${activeCaseCategory.shortName} sample` : `选择一个${activeCaseCategory.shortName}样板`);
  const subtitle =
    copy.miniappGallerySubtitle ||
    (state.lang === "en"
      ? "Tap any card to return to the home view with that sample loaded."
      : "点击任意卡片切换为当前展示样板。");

  return { title, subtitle };
}

function renderMiniAppGallerySheet() {
  if (!isMiniAppHome) {
    return;
  }

  const title = document.getElementById("miniappGalleryTitle");
  const subtitle = document.getElementById("miniappGallerySubtitle");
  const grid = document.getElementById("miniappGalleryGrid");
  const activeItem = getActiveItem();
  const galleryCopy = getMiniAppGalleryCopy();

  if (title) title.textContent = galleryCopy.title;
  if (subtitle) subtitle.textContent = galleryCopy.subtitle;

  if (!grid) {
    return;
  }

  grid.innerHTML = furniture
    .map((item) => {
      const localizedItem = getLocalizedItem(item);
      const dimensions = getMeasurementMetrics(localizedItem);

      return `
        <button class="miniapp-furniture-card ${item.id === activeItem.id ? "active" : ""}" type="button" data-gallery-id="${escapeHtml(item.id)}">
          <span class="miniapp-card-image">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(localizedItem.title)}" loading="lazy">
          </span>
          <span class="miniapp-card-copy">
            <span class="miniapp-card-kicker">${escapeHtml(localizedItem.category)} · ${escapeHtml(item.era)}</span>
            <strong>${escapeHtml(localizedItem.title)}</strong>
            <small>${escapeHtml(localizedItem.style)}</small>
          </span>
          <span class="miniapp-card-specs">
            <span>W ${Math.round(dimensions.x)} cm</span>
            <span>D ${Math.round(dimensions.z)} cm</span>
            <span>H ${Math.round(dimensions.y)} cm</span>
          </span>
        </button>
      `;
    })
    .join("");

  grid.querySelectorAll("[data-gallery-id]").forEach((card) => {
    card.addEventListener("click", () => {
      updateSelectedItem(card.dataset.galleryId);
      setMiniAppGallerySheet(false);
    });
  });
}

function setMiniAppGallerySheet(isOpen) {
  if (!isMiniAppHome) {
    return;
  }

  state.galleryOpen = isOpen;
  const sheet = document.getElementById("miniappGallerySheet");

  if (isOpen) {
    renderMiniAppGallerySheet();
    furniture.forEach((item) => prefetch3DModel(item.viewerModel?.url));
    setMiniAppContactSheet(false);
  }

  sheet?.classList.toggle("open", isOpen);
  sheet?.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("miniapp-gallery-open", isOpen);
}

function setMiniAppContactSheet(isOpen) {
  if (!isMiniAppHome) {
    return;
  }

  state.contactOpen = isOpen;
  const sheet = document.getElementById("miniappContactSheet");

  if (isOpen) {
    setMiniAppGallerySheet(false);
  }

  sheet?.classList.toggle("open", isOpen);
  sheet?.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("miniapp-contact-open", isOpen);
}

function bindMiniAppHomeEvents() {
  if (!isMiniAppHome) {
    return;
  }

  const categoryRail = document.querySelector(".miniapp-category-switch");
  const categoryLinks = [...(categoryRail?.querySelectorAll("[data-case-category]") || [])];
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (link.classList.contains("active")) {
        scrollMiniAppCategorySwitch(link, "smooth");
        return;
      }

      scrollMiniAppCategorySwitch(link, "smooth");
      setActiveCaseCategory(link.dataset.caseCategory);
    });
  });

  document.getElementById("miniappGalleryButton")?.addEventListener("click", () => {
    setMiniAppGallerySheet(true);
  });

  document.getElementById("miniappGalleryBack")?.addEventListener("click", () => {
    setMiniAppGallerySheet(false);
  });

  document.getElementById("miniappGalleryBackdrop")?.addEventListener("click", () => {
    setMiniAppGallerySheet(false);
  });

  document.getElementById("miniappSampleButton")?.addEventListener("click", () => {
    setMiniAppContactSheet(true);
  });

  document.getElementById("miniappContactTab")?.addEventListener("click", () => {
    setMiniAppContactSheet(true);
  });

  document.getElementById("miniappContactBackdrop")?.addEventListener("click", () => {
    setMiniAppContactSheet(false);
  });

  document.getElementById("miniappContactClose")?.addEventListener("click", () => {
    setMiniAppContactSheet(false);
  });
}

function initMiniAppGallery() {
  document.body.className = "miniapp-mode miniapp-gallery-mode";
  document.body.dataset.caseCategory = activeCaseCategory.id;
  const activeItem = getActiveItem();
  const copy = getCopy();
  const copyTitle =
    copy.miniappGalleryTitle ||
    (state.lang === "en" ? `Select a ${activeCaseCategory.shortName} sample` : `选择一个${activeCaseCategory.shortName}样板`);
  const copySubtitle =
    copy.miniappGallerySubtitle ||
    (state.lang === "en"
      ? "Tap any card to return to the home view with that sample loaded."
      : "点击任意卡片回到首页，并直接切换为当前展示样板。");

  document.documentElement.lang = state.lang === "en" ? "en" : "zh-CN";
  document.title = copyTitle;
  document.body.innerHTML = `
    <main class="miniapp-gallery-shell">
      <header class="miniapp-gallery-header">
        <button class="miniapp-back-button" type="button" id="miniappGalleryBack">返回</button>
        <div>
          <span>MeTop Furniture Lab</span>
          <h1>${copyTitle}</h1>
          <p>${copySubtitle}</p>
        </div>
      </header>
      <section class="miniapp-card-grid" aria-label="家具模型列表">
        ${furniture
          .map((item) => {
            const localizedItem = getLocalizedItem(item);
            const dimensions = getMeasurementMetrics(localizedItem);

            return `
              <button class="miniapp-furniture-card ${item.id === activeItem.id ? "active" : ""}" type="button" data-gallery-id="${item.id}">
                <span class="miniapp-card-image">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(localizedItem.title)}" loading="lazy">
                </span>
                <span class="miniapp-card-copy">
                  <span class="miniapp-card-kicker">${escapeHtml(localizedItem.category)} · ${escapeHtml(item.era)}</span>
                  <strong>${escapeHtml(localizedItem.title)}</strong>
                  <small>${escapeHtml(localizedItem.style)}</small>
                </span>
                <span class="miniapp-card-specs">
                  <span>W ${Math.round(dimensions.x)} cm</span>
                  <span>D ${Math.round(dimensions.z)} cm</span>
                  <span>H ${Math.round(dimensions.y)} cm</span>
                </span>
              </button>
            `;
          })
          .join("")}
      </section>
    </main>
  `;

  document.getElementById("miniappGalleryBack")?.addEventListener("click", () => {
    window.location.href = getMiniAppUrl("home", activeItem.id);
  });

  furniture.forEach((item) => prefetch3DModel(item.viewerModel?.url));

  document.querySelectorAll("[data-gallery-id]").forEach((card) => {
    card.addEventListener("click", () => {
      window.location.href = getMiniAppUrl("home", card.dataset.galleryId);
    });
  });
}

function showToast(message) {
  if (!actionToast) {
    return;
  }

  actionToast.textContent = message;
  actionToast.classList.add("visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    actionToast.classList.remove("visible");
  }, 2600);
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.warn("Navigator clipboard failed, using fallback", error);
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();

  if (!copied) {
    throw new Error("Fallback clipboard copy failed");
  }
}

function refresh3DLayout() {
  window.requestAnimationFrame(() => {
    resize3DViewer();

    if (viewer3d.currentBounds) {
      configureOrbit(getActiveItem(), viewer3d.currentBounds, false);
    }
  });
}

function centerModelStageInViewport() {
  window.requestAnimationFrame(() => {
    if (!modelStage) {
      return;
    }

    const rect = modelStage.getBoundingClientRect();
    const topbarHeight = document.querySelector(".topbar")?.getBoundingClientRect().height || 0;
    const availableSpace = Math.max(window.innerHeight - rect.height, topbarHeight + 24);
    const targetTop = window.scrollY + rect.top - Math.max(topbarHeight + 18, availableSpace * 0.42);

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
}

function rotateVector(point, xDegrees = 0, yDegrees = 0, zDegrees = 0) {
  let { x, y, z } = point;

  const rx = xDegrees * DEG_TO_RAD;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  let nextY = y * cx - z * sx;
  let nextZ = y * sx + z * cx;
  y = nextY;
  z = nextZ;

  const ry = yDegrees * DEG_TO_RAD;
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  let nextX = x * cy + z * sy;
  nextZ = -x * sy + z * cy;
  x = nextX;
  z = nextZ;

  const rz = zDegrees * DEG_TO_RAD;
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  nextX = x * cz - y * sz;
  nextY = x * sz + y * cz;

  return { x: nextX, y: nextY, z };
}

function getRobustAxisBounds(values, count) {
  const sampleLimit = 50000;
  const step = Math.max(1, Math.floor(count / sampleLimit));
  const sample = [];

  for (let index = 0; index < count; index += step) {
    const value = values[index];

    if (Number.isFinite(value)) {
      sample.push(value);
    }
  }

  if (sample.length < 4) {
    const value = sample[0] || 0;
    return { min: value, max: value };
  }

  sample.sort((a, b) => a - b);

  return {
    min: sample[Math.floor(sample.length * 0.01)],
    max: sample[Math.max(Math.ceil(sample.length * 0.99) - 1, 0)]
  };
}

function getGsplatBounds(asset) {
  const splatData = asset?.resource?.gsplatData;
  const x = splatData?.getProp?.("x");
  const y = splatData?.getProp?.("y");
  const z = splatData?.getProp?.("z");
  const count = splatData?.numSplats || 0;

  if (!x || !y || !z || !count) {
    return {
      center: { x: 0, y: 0, z: 0 },
      halfExtents: { x: 0.5, y: 0.5, z: 0.5 }
    };
  }

  const xBounds = getRobustAxisBounds(x, count);
  const yBounds = getRobustAxisBounds(y, count);
  const zBounds = getRobustAxisBounds(z, count);
  const minX = xBounds.min;
  const maxX = xBounds.max;
  const minY = yBounds.min;
  const maxY = yBounds.max;
  const minZ = zBounds.min;
  const maxZ = zBounds.max;

  return {
    center: {
      x: (minX + maxX) * 0.5,
      y: (minY + maxY) * 0.5,
      z: (minZ + maxZ) * 0.5
    },
    halfExtents: {
      x: (maxX - minX) * 0.5,
      y: (maxY - minY) * 0.5,
      z: (maxZ - minZ) * 0.5
    }
  };
}

function transformBounds(bounds, config) {
  const { center, halfExtents } = bounds;
  const corners = [
    { x: center.x - halfExtents.x, y: center.y - halfExtents.y, z: center.z - halfExtents.z },
    { x: center.x - halfExtents.x, y: center.y - halfExtents.y, z: center.z + halfExtents.z },
    { x: center.x - halfExtents.x, y: center.y + halfExtents.y, z: center.z - halfExtents.z },
    { x: center.x - halfExtents.x, y: center.y + halfExtents.y, z: center.z + halfExtents.z },
    { x: center.x + halfExtents.x, y: center.y - halfExtents.y, z: center.z - halfExtents.z },
    { x: center.x + halfExtents.x, y: center.y - halfExtents.y, z: center.z + halfExtents.z },
    { x: center.x + halfExtents.x, y: center.y + halfExtents.y, z: center.z - halfExtents.z },
    { x: center.x + halfExtents.x, y: center.y + halfExtents.y, z: center.z + halfExtents.z }
  ].map((corner) =>
    rotateVector(corner, config.rotateX ?? -90, config.modelYaw ?? config.yaw ?? 0, config.roll ?? 0)
  );

  const min = { x: Infinity, y: Infinity, z: Infinity };
  const max = { x: -Infinity, y: -Infinity, z: -Infinity };

  corners.forEach((corner) => {
    min.x = Math.min(min.x, corner.x);
    min.y = Math.min(min.y, corner.y);
    min.z = Math.min(min.z, corner.z);
    max.x = Math.max(max.x, corner.x);
    max.y = Math.max(max.y, corner.y);
    max.z = Math.max(max.z, corner.z);
  });

  return {
    center: {
      x: (min.x + max.x) * 0.5,
      y: (min.y + max.y) * 0.5,
      z: (min.z + max.z) * 0.5
    },
    halfExtents: {
      x: (max.x - min.x) * 0.5,
      y: (max.y - min.y) * 0.5,
      z: (max.z - min.z) * 0.5
    }
  };
}

function resize3DViewer() {
  if (!viewer3d.app || !viewer3d.canvas || !viewer3d.cameraEntity || !modelViewer) {
    return;
  }

  const rect = modelViewer.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  viewer3d.app.graphicsDevice.setResolution(width, height);
  viewer3d.cameraEntity.camera.aspectRatio = width / height;
  updateAnnotationProjection();
  updateDimensionProjection();
  updateMeasurementProjection();
}

function applyCameraOrbit() {
  if (!viewer3d.cameraEntity || !viewer3d.orbit.target) {
    return;
  }

  const yaw = viewer3d.orbit.yaw * DEG_TO_RAD;
  const pitch = viewer3d.orbit.pitch * DEG_TO_RAD;
  const distance = viewer3d.orbit.distance;
  const radiusXz = Math.cos(pitch) * distance;
  const target = viewer3d.orbit.target;
  const x = target.x + Math.sin(yaw) * radiusXz;
  const y = target.y + Math.sin(pitch) * distance;
  const z = target.z + Math.cos(yaw) * radiusXz;

  viewer3d.cameraEntity.setPosition(x, y, z);
  viewer3d.cameraEntity.lookAt(target);
  updateAnnotationProjection();
  updateDimensionProjection();
  updateMeasurementProjection();
}

function writeWorldModelAnchor(anchor, targetPoint) {
  if (!anchor || !targetPoint || !viewer3d.currentEntity || !viewer3d.currentBounds || !viewer3d.localPoint) {
    return null;
  }

  const transform = viewer3d.currentEntity.getWorldTransform();
  const halfExtents = viewer3d.currentBounds.halfExtents;
  const xExtent = Number.isFinite(halfExtents.x) ? halfExtents.x : 0;
  const yExtent = Number.isFinite(halfExtents.y) ? halfExtents.y : 0;
  const zExtent = Number.isFinite(halfExtents.z) ? halfExtents.z : 0;

  viewer3d.localPoint.set(
    anchor.x * xExtent * 2,
    anchor.y * yExtent * 2,
    anchor.z * zExtent * 2
  );
  transform.transformPoint(viewer3d.localPoint, targetPoint);
  return targetPoint;
}

function getOrbitTargetForCurrentState(config) {
  const target = {
    x: config.targetX || 0,
    y: config.targetY || 0,
    z: config.targetZ || 0
  };

  if (!state.focusAnchor || !viewer3d.focusPoint) {
    return target;
  }

  const focusPoint = writeWorldModelAnchor(state.focusAnchor, viewer3d.focusPoint);

  if (!focusPoint) {
    return target;
  }

  const focusStrength = 0.58;

  return {
    x: target.x + (focusPoint.x - target.x) * focusStrength,
    y: target.y + (focusPoint.y - target.y) * focusStrength,
    z: target.z + (focusPoint.z - target.z) * focusStrength
  };
}

function projectModelAnchor(anchor, layerElement) {
  if (
    !viewer3d.currentEntity ||
    !viewer3d.currentBounds ||
    !viewer3d.cameraEntity ||
    !viewer3d.localPoint ||
    !viewer3d.worldPoint ||
    !viewer3d.screenPoint ||
    !modelViewer ||
    !layerElement
  ) {
    return null;
  }

  const viewerRect = modelViewer.getBoundingClientRect();
  const layerRect = layerElement.getBoundingClientRect();
  const worldPoint = writeWorldModelAnchor(anchor, viewer3d.worldPoint);

  if (!worldPoint) {
    return null;
  }

  viewer3d.cameraEntity.camera.worldToScreen(viewer3d.worldPoint, viewer3d.screenPoint);

  const x = viewerRect.left - layerRect.left + viewer3d.screenPoint.x;
  const y = viewerRect.top - layerRect.top + viewer3d.screenPoint.y;

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }

  return {
    x,
    y,
    visible: x >= -24 && x <= layerRect.width + 24 && y >= -24 && y <= layerRect.height + 24,
    layerWidth: layerRect.width,
    layerHeight: layerRect.height
  };
}

function projectFallbackAnchor(anchor, layerElement) {
  const layerRect = layerElement.getBoundingClientRect();
  const yaw = (viewer3d.orbit.yaw || 0) * DEG_TO_RAD;
  const orbitX = anchor.x * Math.cos(yaw) + anchor.z * Math.sin(yaw);
  const orbitZ = -anchor.x * Math.sin(yaw) + anchor.z * Math.cos(yaw);
  const x = layerRect.width * 0.5 + orbitX * layerRect.width * 0.72;
  const y = layerRect.height * 0.55 - anchor.y * layerRect.height * 0.62 + orbitZ * layerRect.height * 0.08;

  return {
    x: clamp(x, 28, Math.max(layerRect.width - 28, 28)),
    y: clamp(y, 28, Math.max(layerRect.height - 28, 28)),
    visible: true,
    layerWidth: layerRect.width,
    layerHeight: layerRect.height
  };
}

function scaleAnchor(anchor, scale) {
  return {
    x: anchor.x * scale,
    y: anchor.y * scale,
    z: anchor.z * scale
  };
}

function projectVisibleModelAnchor(anchor, layerElement) {
  const scaleSteps = [
    1, 0.5, 0.25, 0.12, 0.06, 0.03, 0.015, 0.008, 0.004, 0.002, 0.001, 0.0005, 0.0002, 0.0001,
    0.00005, 0.00002, 0.00001, 0.000005, 0.000002, 0.000001, 0.0000005, 0.0000002, 0.0000001, 0
  ];
  let fallback = null;

  for (const scale of scaleSteps) {
    const projected = projectModelAnchor(scaleAnchor(anchor, scale), layerElement);

    if (!projected) {
      continue;
    }

    fallback = projected;

    if (projected.visible) {
      return projected;
    }
  }

  return fallback?.visible ? fallback : projectFallbackAnchor(anchor, layerElement);
}

function applyProjectedLine(element, start, end) {
  if (!element || !start || !end) {
    return;
  }

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const isVisible = start.visible && end.visible;

  element.style.setProperty("--line-x", `${start.x}px`);
  element.style.setProperty("--line-y", `${start.y}px`);
  element.style.setProperty("--line-length", `${length}px`);
  element.style.setProperty("--line-angle", `${angle}deg`);
  element.style.setProperty("--label-rotate", `${-angle}deg`);
  element.classList.toggle("is-outside-view", !isVisible);
}

function projectSpaceRulerPoint(anchor, layerElement) {
  return projectModelAnchor(anchor, layerElement) || projectFallbackAnchor(anchor, layerElement);
}

function updateSpaceRulerProjection() {
  if (!dimensionOverlay) {
    return;
  }

  const cube = dimensionOverlay.querySelector(".space-ruler-cube");

  if (!cube) {
    return;
  }

  const projectedCorners = Object.fromEntries(
    Object.entries(spaceRulerCorners).map(([key, anchor]) => [key, projectSpaceRulerPoint(anchor, dimensionOverlay)])
  );

  spaceRulerEdges.forEach(([startKey, endKey], index) => {
    const edge = cube.querySelector(`[data-ruler-edge="${index}"]`);
    applyProjectedLine(edge, projectedCorners[startKey], projectedCorners[endKey]);
  });

  spaceRulerFaces.forEach((cornerKeys, index) => {
    const face = cube.querySelector(`[data-ruler-face="${index}"]`);
    const points = cornerKeys.map((key) => projectedCorners[key]);
    const isVisible = points.every((point) => point?.visible);

    if (!face || points.some((point) => !point)) {
      return;
    }

    face.style.setProperty("--face-points", points.map((point) => `${point.x}px ${point.y}px`).join(", "));
    face.classList.toggle("is-outside-view", !isVisible);
  });
}

function updateAnnotationProjection() {
  if (!annotationLayer) {
    return;
  }

  const annotations = getAnnotations(getActiveItem());

  annotations.forEach((annotation) => {
    const anchor = annotation.anchor;
    const pin = annotationLayer.querySelector(`[data-annotation-id="${annotation.id}"]`);

    if (!anchor || !pin) {
      return;
    }

    const projected = projectModelAnchor(anchor, annotationLayer);

    if (!projected) {
      return;
    }

    const cardShift =
      projected.x > projected.layerWidth * 0.68 ? "-82%" : projected.x < projected.layerWidth * 0.32 ? "-18%" : "-50%";

    pin.style.setProperty("--screen-x", `${projected.x}px`);
    pin.style.setProperty("--screen-y", `${projected.y}px`);
    pin.style.setProperty("--card-shift", cardShift);
    pin.classList.toggle("is-outside-view", !projected.visible);
  });
}

function updateDimensionProjection() {
  if (!dimensionOverlay) {
    return;
  }

  dimensionGuides.forEach((guide) => {
    const line = dimensionOverlay.querySelector(`[data-dimension-axis="${guide.type}"]`);
    applyProjectedLine(line, projectVisibleModelAnchor(guide.start, dimensionOverlay), projectVisibleModelAnchor(guide.end, dimensionOverlay));
  });

  updateSpaceRulerProjection();
}

function updateMeasurementProjection() {
  if (!measurementLayer || !state.measuring) {
    return;
  }

  state.measurePoints.forEach((point) => {
    const marker = measurementLayer.querySelector(`[data-measure-marker="${point.id}"]`);
    const projected = projectMeasurementPoint(point, measurementLayer);

    if (!marker || !projected) {
      return;
    }

    marker.style.setProperty("--screen-x", `${projected.x}px`);
    marker.style.setProperty("--screen-y", `${projected.y}px`);
    marker.classList.toggle("is-outside-view", !projected.visible);
  });

  const [startPoint, endPoint] = state.measurePoints;
  const line = measurementLayer.querySelector(".measurement-line");
  const readout = measurementLayer.querySelector(".measurement-readout");
  const start = projectMeasurementPoint(startPoint, measurementLayer);
  const end = projectMeasurementPoint(endPoint, measurementLayer);

  if (!line || !start || !end) {
    line?.classList.remove("visible");

    if (readout && start?.visible) {
      readout.style.setProperty("--readout-x", `${start.x}px`);
      readout.style.setProperty("--readout-y", `${start.y}px`);
      readout.classList.add("anchored");
    } else {
      readout?.classList.remove("anchored");
    }

    return;
  }

  const isVisible = start?.visible && end?.visible;

  applyProjectedLine(line, start, end);
  line.classList.toggle("visible", Boolean(isVisible));

  if (readout && start && end && isVisible) {
    readout.style.setProperty("--readout-x", `${(start.x + end.x) / 2}px`);
    readout.style.setProperty("--readout-y", `${(start.y + end.y) / 2}px`);
    readout.classList.add("anchored");
  } else {
    readout?.classList.remove("anchored");
  }
}

function resolveCameraDistance(bounds, config) {
  const rect = modelViewer?.getBoundingClientRect();
  const aspect = rect?.width && rect?.height ? rect.width / rect.height : 1.45;
  const fov = (viewer3d.cameraEntity?.camera?.fov || 38) * DEG_TO_RAD;
  const hFov = 2 * Math.atan(Math.tan(fov * 0.5) * aspect);
  const scale = config.modelScale || 1;
  const sizeX = Math.max(bounds.halfExtents.x * 2 * scale, 0.1);
  const sizeY = Math.max(bounds.halfExtents.y * 2 * scale, 0.1);
  const sizeZ = Math.max(bounds.halfExtents.z * 2 * scale, 0.1);
  const verticalDistance = sizeY * 0.5 / Math.tan(fov * 0.5);
  const horizontalDistance = sizeX * 0.5 / Math.tan(hFov * 0.5);
  const depthDistance = sizeZ * 1.1;
  const padding = (config.cameraPadding || 1.7) * (isMiniAppHome ? 0.84 : 1);

  return Math.max(verticalDistance, horizontalDistance, depthDistance, 1.05) * padding;
}

function configureOrbit(item, bounds, resetAngles = true) {
  if (!item.viewerModel || !viewer3d.orbit.target) {
    return;
  }

  const config = item.viewerModel;
  const target = getOrbitTargetForCurrentState(config);
  viewer3d.orbit.baseDistance = config.cameraDistance || resolveCameraDistance(bounds, config);
  viewer3d.orbit.minDistance = viewer3d.orbit.baseDistance * 0.45;
  viewer3d.orbit.maxDistance = viewer3d.orbit.baseDistance * 2.35;
  viewer3d.orbit.target.set(target.x, target.y, target.z);

  if (resetAngles) {
    const preset = getViewPreset(item);
    viewer3d.orbit.yaw = preset.yaw;
    viewer3d.orbit.pitch = preset.pitch;
  }

  sync3DZoom(item);
}

function reset3DOrbit(item) {
  if (!item?.viewerModel || !viewer3d.currentBounds) {
    return;
  }

  configureOrbit(item, viewer3d.currentBounds, true);
}

function sync3DZoom(item) {
  if (!item?.viewerModel || !viewer3d.cameraEntity) {
    return;
  }

  if (viewer3d.orbit.target) {
    const target = getOrbitTargetForCurrentState(item.viewerModel);
    viewer3d.orbit.target.set(target.x, target.y, target.z);
  }

  const hasPreset = viewPresets.some((preset) => preset.id === state.activeViewPreset);
  const preset = hasPreset ? getViewPreset(item) : null;
  const zoomMultiplier = state.zoomed ? 0.68 : preset?.distanceMultiplier || 1;
  viewer3d.orbit.distance = clamp(
    viewer3d.orbit.baseDistance * (state.focusAnchor ? 0.56 : zoomMultiplier),
    viewer3d.orbit.minDistance,
    viewer3d.orbit.maxDistance
  );
  applyCameraOrbit();
}

function syncControlButtons() {
  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    const isActive = button.dataset.viewMode === state.viewMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    if (button.closest(".miniapp-view-switch")) {
      const is3dCaseMode = button.dataset.viewMode === "grid";
      const label = is3dCaseMode ? "查看 3D 案例" : "查看案例图";
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  });

  document.querySelectorAll("[data-control]").forEach((button) => {
    const control = button.dataset.control;
    const isMiniAppRotate = button.id === "miniappRotateToggle";
    const rotateDisabled = isMiniAppRotate && state.viewMode === "product";
    const isActive =
      (control === "rotate" && state.rotating) ||
      (control === "zoom" && state.zoomed) ||
      (control === "fullscreen" && state.immersive) ||
      (control === "clean" && state.cleanView) ||
      (control === "measure" && state.measuring);
    const isPressed = isActive && !rotateDisabled;

    button.classList.toggle("active", isPressed);
    button.setAttribute("aria-pressed", String(isPressed));

    if (isMiniAppRotate) {
      button.disabled = rotateDisabled;
      button.classList.toggle("is-paused", !isPressed);
      button.setAttribute(
        "aria-label",
        rotateDisabled ? "2D 模式不可自动旋转" : state.rotating ? "暂停自动旋转" : "开启自动旋转"
      );
      button.title = rotateDisabled ? "2D 模式不可自动旋转" : state.rotating ? "暂停自动旋转" : "开启自动旋转";
    }
  });

  document.querySelectorAll("[data-view-preset]").forEach((button) => {
    const isActive = button.dataset.viewPreset === state.activeViewPreset;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  roomPreviewButton.classList.toggle("active", state.roomPreview);
}

function bind3DViewerEvents() {
  const canvas = viewer3d.canvas;

  canvas.addEventListener("pointerdown", (event) => {
    viewer3d.dragging = true;
    viewer3d.lastPointer.x = event.clientX;
    viewer3d.lastPointer.y = event.clientY;
    state.rotating = false;
    state.activeViewPreset = "free";
    syncControlButtons();
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!viewer3d.dragging) {
      return;
    }

    const dx = event.clientX - viewer3d.lastPointer.x;
    const dy = event.clientY - viewer3d.lastPointer.y;
    viewer3d.lastPointer.x = event.clientX;
    viewer3d.lastPointer.y = event.clientY;
    viewer3d.orbit.yaw -= dx * 0.18;
    viewer3d.orbit.pitch = clamp(viewer3d.orbit.pitch + dy * 0.12, -12, 24);
    applyCameraOrbit();
  });

  const finishDrag = (event) => {
    viewer3d.dragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
  };

  canvas.addEventListener("pointerup", finishDrag);
  canvas.addEventListener("pointercancel", finishDrag);
  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      state.zoomed = false;
      state.activeViewPreset = "free";
      viewer3d.orbit.distance = clamp(
        viewer3d.orbit.distance + event.deltaY * 0.0016,
        viewer3d.orbit.minDistance,
        viewer3d.orbit.maxDistance
      );
      applyCameraOrbit();
      syncControlButtons();
    },
    { passive: false }
  );
}

async function setup3DViewer() {
  if (viewer3d.setupPromise) {
    return viewer3d.setupPromise;
  }

  viewer3d.setupPromise = (async () => {
    const canvas = document.createElement("canvas");
    canvas.className = "gsplat-canvas";
    canvas.setAttribute("aria-label", "Interactive 3D furniture model");
    canvas.tabIndex = 0;
    modelViewer.appendChild(canvas);
    viewer3d.canvas = canvas;
    viewer3d.orbit.target = new pc.Vec3(0, 0.02, 0);
    viewer3d.localPoint = new pc.Vec3();
    viewer3d.focusPoint = new pc.Vec3();
    viewer3d.worldPoint = new pc.Vec3();
    viewer3d.screenPoint = new pc.Vec3();

    const device = await pc.createGraphicsDevice(canvas, {
      deviceTypes: ["webgl2"],
      antialias: true
    });
    device.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const createOptions = new pc.AppOptions();
    createOptions.graphicsDevice = device;
    createOptions.mouse = new pc.Mouse(canvas);
    createOptions.touch = new pc.TouchDevice(canvas);
    createOptions.componentSystems = [
      pc.RenderComponentSystem,
      pc.CameraComponentSystem,
      pc.LightComponentSystem,
      pc.GSplatComponentSystem,
      pc.ModelComponentSystem
    ];
    createOptions.resourceHandlers = [pc.TextureHandler, pc.GSplatHandler, pc.ContainerHandler];

    viewer3d.app = new pc.AppBase(canvas);
    viewer3d.app.init(createOptions);
    viewer3d.app.onLibrariesLoaded?.();
    viewer3d.app.setCanvasFillMode?.(pc.FILLMODE_NONE);
    viewer3d.app.setCanvasResolution?.(pc.RESOLUTION_FIXED);
    viewer3d.app.scene.ambientLight = new pc.Color(1, 0.97, 0.9);

    viewer3d.cameraEntity = new pc.Entity("showroom-camera");
    viewer3d.cameraEntity.addComponent("camera", {
      clearColor: new pc.Color(0, 0, 0, 0),
      farClip: 100,
      fov: 38,
      nearClip: 0.01
    });
    viewer3d.app.root.addChild(viewer3d.cameraEntity);

    const keyLight = new pc.Entity("showroom-key-light");
    keyLight.addComponent("light", {
      castShadows: false,
      intensity: 1.4,
      type: "directional"
    });
    keyLight.setEulerAngles(48, 34, 0);
    viewer3d.app.root.addChild(keyLight);

    viewer3d.app.on("update", (dt) => {
      if (state.rotating && modelStage.classList.contains("using-3d-model")) {
        viewer3d.orbit.yaw = (viewer3d.orbit.yaw + dt * 18) % 360;
        applyCameraOrbit();
      }
    });

    viewer3d.resizeObserver = new ResizeObserver(() => {
      resize3DViewer();
      if (viewer3d.currentBounds) {
        configureOrbit(getActiveItem(), viewer3d.currentBounds, false);
      }
    });
    viewer3d.resizeObserver.observe(modelViewer);
    window.addEventListener("resize", resize3DViewer);
    bind3DViewerEvents();
    resize3DViewer();
    viewer3d.app.start();
  })();

  return viewer3d.setupPromise;
}

async function getGsplatAsset(config) {
  if (viewer3d.assetCache.has(config.url)) {
    return viewer3d.assetCache.get(config.url);
  }

  if (viewer3d.assetPromiseCache.has(config.url)) {
    return viewer3d.assetPromiseCache.get(config.url);
  }

  const assetPromise = loadGsplat(viewer3d.app.assets, {
    filename: fileNameFromUrl(config.url),
    url: config.url
  })
    .then((asset) => {
      viewer3d.assetCache.set(config.url, asset);
      return asset;
    })
    .finally(() => {
      viewer3d.assetPromiseCache.delete(config.url);
    });

  viewer3d.assetPromiseCache.set(config.url, assetPromise);
  return assetPromise;
}

function getPreload3DItems(activeId) {
  const activeIndex = Math.max(
    furniture.findIndex((item) => item.id === activeId),
    0
  );
  const orderedItems = [...furniture.slice(activeIndex + 1), ...furniture.slice(0, activeIndex)];

  return orderedItems.filter(
    (item) =>
      item.viewerModel?.url &&
      !viewer3d.assetCache.has(item.viewerModel.url) &&
      !viewer3d.assetPromiseCache.has(item.viewerModel.url)
  );
}

function prefetch3DModel(url) {
  if (!url || viewer3d.prefetchedUrls.has(url)) {
    return;
  }

  viewer3d.prefetchedUrls.add(url);

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "fetch";
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

function getAssetWarmupLimit() {
  return isMiniAppMode ? 1 : 2;
}

async function warmup3DAsset(item) {
  const config = item?.viewerModel;

  if (
    !config?.url ||
    viewer3d.assetCache.has(config.url) ||
    viewer3d.assetPromiseCache.has(config.url) ||
    viewer3d.warmupUrls.has(config.url)
  ) {
    return;
  }

  viewer3d.warmupUrls.add(config.url);

  try {
    await setup3DViewer();
    await getGsplatAsset(config);
  } catch (error) {
    console.warn("3DGS model warmup failed", error);
  }
}

function warmupFurnitureById(id) {
  const item = furniture.find((entry) => entry.id === id);

  if (!item || item.id === state.activeId || !canPreload3DModels()) {
    return;
  }

  waitForIdle(() => warmup3DAsset(item), 900);
}

function schedule3DModelPreload(activeId) {
  if (viewer3d.preloadStarted || !canPreload3DModels()) {
    return;
  }

  viewer3d.preloadStarted = true;
  viewer3d.preloadPromise = Promise.resolve();

  waitForIdle(() => {
    const preloadItems = getPreload3DItems(activeId);

    preloadItems.slice(0, getAssetWarmupLimit()).forEach((item, index) => {
      window.setTimeout(() => {
        waitForIdle(() => warmup3DAsset(item), 1400);
      }, 1800 + index * 3600);
    });

    preloadItems.forEach((item, index) => {
      window.setTimeout(() => {
        waitForIdle(() => prefetch3DModel(item.viewerModel.url), 900);
      }, 8000 + index * 6000);
    });
  }, 3000);
}

function clear3DObject() {
  if (!viewer3d.currentEntity) {
    return;
  }

  viewer3d.currentEntity.destroy();
  viewer3d.currentEntity = null;
  viewer3d.currentId = "";
  viewer3d.currentBounds = null;
}

function createGsplatModel(asset, config) {
  const root = new pc.Entity("showroom-model-root");
  const splat = new pc.Entity("showroom-gsplat-model");
  const rawBounds = getGsplatBounds(asset);
  const orientedBounds = transformBounds(rawBounds, config);

  splat.addComponent("gsplat", { asset });
  splat.setLocalEulerAngles(config.rotateX ?? -90, config.modelYaw ?? config.yaw ?? 0, config.roll ?? 0);
  splat.setLocalPosition(-orientedBounds.center.x, -orientedBounds.center.y, -orientedBounds.center.z);
  root.addChild(splat);
  root.setLocalScale(config.modelScale || 1, config.modelScale || 1, config.modelScale || 1);
  root.setLocalPosition(config.offsetX || 0, config.offsetY || 0, config.offsetZ || 0);

  return { entity: root, bounds: orientedBounds };
}

async function load3DModel(item) {
  const config = item.viewerModel;
  const requestToken = (viewer3d.token += 1);
  const hasCachedAsset = Boolean(config?.url && viewer3d.assetCache.has(config.url));

  if (viewer3d.currentId === item.id && viewer3d.currentEntity) {
    modelStage.classList.remove("model-loading", "model-error");
    modelStage.classList.add("using-3d-model", "model-loaded");
    modelViewer.setAttribute("aria-hidden", "false");
    modelStatus.textContent = getCopy().modelReady;
    configureOrbit(item, viewer3d.currentBounds, false);
    schedule3DModelPreload(item.id);
    return;
  }

  modelStage.classList.add("using-3d-model");
  modelStage.classList.toggle("model-loading", !hasCachedAsset);
  modelStage.classList.remove("model-error");

  if (!hasCachedAsset) {
    modelStage.classList.remove("model-loaded");
  }

  modelViewer.setAttribute("aria-hidden", "false");
  modelStatus.textContent = hasCachedAsset ? getCopy().modelReady : getCopy().modelLoading;

  try {
    await setup3DViewer();

    if (requestToken !== viewer3d.token) {
      return;
    }

    if (viewer3d.currentId === item.id && viewer3d.currentEntity) {
      modelStage.classList.remove("model-loading");
      modelStage.classList.add("model-loaded");
      modelStatus.textContent = getCopy().modelReady;
      configureOrbit(item, viewer3d.currentBounds, false);
      return;
    }

    const asset = await getGsplatAsset(config);

    if (requestToken !== viewer3d.token) {
      return;
    }

    clear3DObject();
    const model = createGsplatModel(asset, config);
    viewer3d.currentEntity = model.entity;
    viewer3d.currentBounds = model.bounds;
    viewer3d.currentId = item.id;
    viewer3d.app.root.addChild(viewer3d.currentEntity);
    resize3DViewer();
    configureOrbit(item, model.bounds, true);
    modelStage.classList.remove("model-loading", "model-error");
    modelStage.classList.add("model-loaded");
    modelStatus.textContent = getCopy().modelReady;
    schedule3DModelPreload(item.id);
  } catch (error) {
    console.warn("3DGS model failed to load", error);

    if (requestToken !== viewer3d.token) {
      return;
    }

    modelStage.classList.remove("using-3d-model", "model-loading", "model-loaded");
    modelStage.classList.add("model-error");
    modelViewer.setAttribute("aria-hidden", "true");
    modelStatus.textContent = getCopy().modelUnavailable;
  }
}

function sync3DViewer(item) {
  const shouldUse3DModel = Boolean(item.viewerModel) && state.viewMode !== "product";

  window.clearTimeout(viewer3d.loadTimer);
  modelStage.classList.toggle("using-3d-model", shouldUse3DModel);
  modelViewer.setAttribute("aria-hidden", String(!shouldUse3DModel));

  if (!shouldUse3DModel) {
    viewer3d.token += 1;
    modelStage.classList.remove("model-loading", "model-loaded", "model-error");
    return;
  }

  if (viewer3d.currentId === item.id && viewer3d.currentEntity) {
    load3DModel(item);
    return;
  }

  const hasCachedAsset = viewer3d.assetCache.has(item.viewerModel.url);

  if (!hasCachedAsset) {
    modelStage.classList.add("model-loading");
    modelStage.classList.remove("model-loaded", "model-error");
    modelStatus.textContent = getCopy().modelLoading;
  }

  viewer3d.loadTimer = window.setTimeout(() => {
    if (state.activeId === item.id && state.viewMode !== "product") {
      load3DModel(item);
    }
  }, hasCachedAsset ? 0 : 220);
}

function renderCategoryList() {
  categoryList.innerHTML = furniture
    .map(
      (item) => {
        const localizedItem = getLocalizedItem(item);
        const primaryLabel = activeCaseCategory.id === "home" ? localizedItem.category : localizedItem.title;
        const secondaryLabel = activeCaseCategory.id === "home" ? localizedItem.countLabel : localizedItem.style;

        return `
        <button class="category-item ${item.id === state.activeId ? "active" : ""}" type="button" data-id="${item.id}">
          <span class="category-thumb"><img src="${item.image}" alt="${localizedItem.title}" loading="lazy"></span>
          <span>
            <span class="category-name">${primaryLabel}</span>
            <span class="category-count">${secondaryLabel}</span>
          </span>
          <span class="category-arrow" aria-hidden="true">›</span>
        </button>
      `;
      }
    )
    .join("");
}

function renderInsights(item) {
  insightList.innerHTML = item.insights
    .map(
      (insight) => `
        <article class="insight-item">
          <h3>${insight.title}</h3>
          <p>${insight.text}</p>
        </article>
      `
    )
    .join("");
}

function renderDimensions(item) {
  dimensionList.innerHTML = Object.entries(item.dimensions)
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>
      `
    )
    .join("");
}

function renderViewPresets() {
  const copy = getCopy();
  const labels = {
    front: copy.frontViewLabel,
    side: copy.sideViewLabel,
    back: copy.backViewLabel,
    top: copy.topViewLabel
  };
  const tooltips = {
    front: copy.frontViewTooltip,
    side: copy.sideViewTooltip,
    back: copy.backViewTooltip,
    top: copy.topViewTooltip
  };

  viewPresetBar.setAttribute("aria-label", copy.viewPresetLabel);
  viewPresetBar.innerHTML = viewPresets
    .map(
      (preset) => `
        <button class="view-preset-button has-tooltip ${preset.id === state.activeViewPreset ? "active" : ""}" type="button" data-view-preset="${preset.id}" aria-pressed="${preset.id === state.activeViewPreset}" aria-label="${tooltips[preset.id]}" title="${tooltips[preset.id]}" data-tooltip="${tooltips[preset.id]}">
          ${labels[preset.id]}
        </button>
      `
    )
    .join("");
}

function renderDimensionOverlay(item) {
  const dimensionItems = ["width", "height", "depth"].map((type) => {
    const dimension = getDimensionMetric(item, type);

    return {
      type,
      label: dimension.label,
      value: dimension.value
    };
  });
  const rulerEdgeLabels = {
    0: dimensionItems.find((dimension) => dimension.type === "width"),
    5: dimensionItems.find((dimension) => dimension.type === "height"),
    9: dimensionItems.find((dimension) => dimension.type === "depth")
  };

  dimensionOverlay.classList.add("is-projected");
  dimensionOverlay.innerHTML = `
    <span class="space-ruler-cube" aria-hidden="true">
      ${spaceRulerFaces.map((_, index) => `<span class="space-ruler-face" data-ruler-face="${index}"></span>`).join("")}
      ${spaceRulerEdges
        .map((_, index) => {
          const dimension = rulerEdgeLabels[index];
          const label = dimension ? `<span class="space-ruler-label">${dimension.label} ${dimension.value}</span>` : "";

          return `<span class="space-ruler-edge ${label ? "has-label" : ""}" data-ruler-edge="${index}">${label}</span>`;
        })
        .join("")}
    </span>
    ${dimensionItems
      .map(
        (dimension) => `
        <span class="dimension-line dimension-${dimension.type}" data-dimension-axis="${dimension.type}">
          <span>${dimension.label} ${dimension.value}</span>
        </span>
      `
      )
      .join("")}
  `;
  updateDimensionProjection();
}

function renderAnnotations(item) {
  annotationLayer.innerHTML = "";
  state.activeAnnotation = "";
  state.focusAnchor = null;
  return;
}

function renderMeasurementLayer(item) {
  if (!measurementLayer) {
    return;
  }

  if (!state.measuring) {
    measurementLayer.classList.remove("active");
    measurementLayer.innerHTML = "";
    return;
  }

  const copy = getCopy();
  const [startPoint, endPoint] = state.measurePoints;
  const resultText =
    startPoint && endPoint
      ? `${copy.measureResultLabel} ${Math.round(getFreeMeasureDistance(item, startPoint, endPoint))} cm`
      : startPoint
        ? copy.measureSecondHint
        : copy.measureStartHint;

  measurementLayer.classList.add("active");
  measurementLayer.innerHTML = `
    <span class="measurement-line" aria-hidden="true"></span>
    <span class="measurement-readout">${resultText}</span>
    ${state.measurePoints
      .map(
        (point, index) => `
          <span class="measurement-point active ${index === 0 ? "is-start" : "is-end"}" data-measure-marker="${point.id}" aria-hidden="true">
            <span>${index + 1}</span>
          </span>
        `
      )
      .join("")}
  `;
  updateMeasurementProjection();
}

function renderMaterials(item) {
  materialList.innerHTML = item.materials
    .map(
      (material) => `
        <div class="material-item">
          <span class="swatch" style="--swatch: ${material.color}"></span>
          <span>
            <span class="material-name">${material.name}</span>
            <span class="material-role">${material.role}</span>
          </span>
        </div>
      `
    )
    .join("");
}

function renderCaptureThumbs(item) {
  captureThumbs.innerHTML = item.materials
    .map(
      (material, index) => `
        <span style="--thumb: linear-gradient(135deg, ${material.color}, ${index % 2 ? "#fff8ec" : "#c9bca6"})"></span>
      `
    )
    .join("");
}

function renderFilters() {
  filterRow.innerHTML = uniqueCategories()
    .map(
      (category) => `
        <button class="filter-button ${category === state.activeFilter ? "active" : ""}" type="button" data-filter="${category}">
          ${translateCategory(category)}
        </button>
      `
    )
    .join("");
}

function renderCases() {
  const filtered =
    state.activeFilter === "All" ? furniture : furniture.filter((item) => item.category === state.activeFilter);

  caseGrid.innerHTML = filtered
    .map(
      (item) => {
        const localizedItem = getLocalizedItem(item);

        return `
        <button class="case-card ${item.id === state.activeId ? "active" : ""}" type="button" data-id="${item.id}">
          <span class="case-image"><img src="${item.image}" alt="${localizedItem.title}" loading="lazy"></span>
          <span>
            <h3>${localizedItem.title}</h3>
            <p>${localizedItem.style}</p>
          </span>
          <span class="case-price">
            <span>${localizedItem.category}</span>
            <span>${item.era}</span>
          </span>
        </button>
      `;
      }
    )
    .join("");
}

function renderPainPoints() {
  const copy = getCopy();
  const painGrid = $("#painGrid");

  if (!painGrid) {
    return;
  }

  painGrid.innerHTML = copy.painItems
    .map(
      (item, index) => `
        <article class="pain-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderWorkflow() {
  const copy = getCopy();
  const workflowGrid = $("#workflowGrid");

  if (!workflowGrid) {
    return;
  }

  workflowGrid.innerHTML = copy.workflowItems
    .map(
      (item) => `
        <article class="workflow-card">
          <span>${item.step}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderScenarios() {
  const copy = getCopy();
  const scenarioList = $("#scenarioList");

  if (!scenarioList) {
    return;
  }

  scenarioList.innerHTML = copy.scenarioItems
    .map(
      (item) => `
        <article class="scenario-item">
          <span aria-hidden="true"></span>
          <p>${item}</p>
        </article>
      `
    )
    .join("");
}

function applyLanguageContent() {
  const copy = getCopy();
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  document.querySelector("meta[name='description']")?.setAttribute("content", copy.description);
  updateMiniAppCaseHeroCopy();

  [
    "brandTagline",
    "navShowroom",
    "navPain",
    "navScenarios",
    "navContact",
    "searchLabel",
    "savedLabel",
    "topCtaLabel",
    "browseLabel",
    "viewAllLabel",
    "statusLabel",
    "insightHeroEyebrow",
    "insightHeroTitle",
    "insightHeroText",
    "dimensionsLabel",
    "materialsLabel",
    "conditionLabel",
    "captureLabel",
    "painEyebrow",
    "painCopy",
    "workflowEyebrow",
    "workflowTitle",
    "workflowCopy",
    "scenariosEyebrow",
    "scenariosTitle",
    "scenariosCopy",
    "casesEyebrow",
    "casesTitle",
    "casesCopy",
    "contactEyebrow",
    "contactTitle",
    "contactCopy",
    "needLabel",
    "contactMethodLabel",
    "messageLabel",
    "submitLabel"
  ].forEach((id) => setText(id, copy[id]));

  const painTitle = document.getElementById("painTitle");
  if (painTitle) {
    painTitle.innerHTML = copy.painTitleLines.map((line) => `<span>${line}</span>`).join("");
  }

  setText("storyButtonLabel", copy.storyButton);
  setText("viewModeLabel", copy.viewModeLabel);
  setText("environmentLabel", copy.environmentLabel);

  document.querySelector("[data-control='rotate'] .control-label").textContent = copy.rotateLabel;
  document.querySelector("[data-control='zoom'] .control-label").textContent = copy.zoomLabel;
  document.querySelector("[data-control='reset'] .control-label").textContent = copy.resetLabel;
  document.querySelector("[data-control='fullscreen'] .control-label").textContent = copy.fullscreenLabel;
  document.querySelector("[data-control='clean'] .control-label").textContent = copy.cleanLabel;
  document.querySelector("[data-control='measure'] .control-label").textContent = copy.measureLabel;
  document.querySelector("[data-control='share'] .control-label").textContent = copy.shareLabel;
  roomPreviewButton.querySelector(".control-label").textContent = copy.roomPreviewLabel;
  setText("sampleCtaLabel", copy.sampleCtaLabel);

  setTooltip("[data-scroll-target='cases'].icon-action", copy.searchTooltip);
  setTooltip("#saveButton", copy.saveTooltip);
  setTooltip("[data-view-mode='3d']", copy.mode3dTooltip);
  setTooltip("[data-view-mode='product']", copy.modeProductTooltip);
  setTooltip("[data-view-mode='grid']", copy.modeGridTooltip);
  setTooltip("[data-control='rotate']", copy.rotateTooltip);
  setTooltip("[data-control='zoom']", copy.zoomTooltip);
  setTooltip("[data-control='reset']", copy.resetTooltip);
  setTooltip("[data-control='fullscreen']", state.immersive ? copy.exitFullscreenTooltip : copy.fullscreenTooltip);
  setTooltip("[data-control='clean']", state.cleanView ? copy.exitCleanTooltip : copy.cleanTooltip);
  setTooltip("[data-control='measure']", state.measuring ? copy.exitMeasureTooltip : copy.measureTooltip);
  setTooltip("[data-control='share']", copy.shareTooltip);
  setTooltip("#roomPreviewButton", copy.roomPreviewTooltip);
  setTooltip("#sampleRequestButton", copy.sampleTooltip);
  setTooltip("#immersiveCloseButton", copy.closeImmersiveLabel);
  renderViewPresets();

  if (contactInput) {
    contactInput.placeholder = copy.contactPlaceholder;
  }

  document.querySelectorAll("[data-option-key]").forEach((option) => {
    option.textContent = copy.options[option.dataset.optionKey] || option.textContent;
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === state.lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderPainPoints();
  renderWorkflow();
  renderScenarios();

  if (modelStage.classList.contains("model-loading")) {
    modelStatus.textContent = copy.modelLoading;
  }

  if (modelStage.classList.contains("model-loaded")) {
    modelStatus.textContent = copy.modelReady;
  }

  if (modelStage.classList.contains("model-error")) {
    modelStatus.textContent = copy.modelUnavailable;
  }
}

function applyViewerState(item) {
  modelObject.style.setProperty("--tilt", item.model.tilt);
  modelObject.style.setProperty("--model-scale", item.model.scale);
  modelObject.style.setProperty("--model-shadow", item.model.shadow);
  modelObject.classList.toggle("is-rotating", state.rotating);
  modelObject.classList.toggle("zoomed", state.zoomed);
  modelStage.classList.toggle("environment-on", state.roomPreview);
  modelStage.classList.toggle("ruler-mode", state.viewMode === "grid");
  modelStage.classList.toggle("product-mode", state.viewMode === "product");
  viewerPanel?.classList.toggle("clean-view", state.cleanView);
  viewerPanel?.classList.toggle("measuring-view", state.measuring);
  document.body.classList.toggle("viewer-immersive", state.immersive);
  document.body.classList.toggle("viewer-clean", state.cleanView);
  viewerPanel?.setAttribute("aria-modal", String(state.immersive));

  syncControlButtons();
  sync3DViewer(item);
  sync3DZoom(item);
  updateMiniAppHomeShell(item);
}

function updateSelectedItem(id, options = {}) {
  state.activeId = id;
  const item = getActiveItem();
  const localizedItem = getLocalizedItem(item);
  const copy = getCopy();

  $("#eraLabel").textContent = item.era;
  $("#showroomTitle").textContent = localizedItem.title;
  $("#styleLine").textContent = localizedItem.style;
  $("#showroomDescription").textContent = localizedItem.description;
  $("#conditionTitle").textContent = localizedItem.condition.grade;
  $("#conditionCopy").textContent = `${localizedItem.category} · ${localizedItem.origin}`;
  $("#conditionGrade").textContent = localizedItem.condition.grade;
  $("#conditionDetail").textContent = localizedItem.condition.detail;
  $("#captureNote").textContent = localizedItem.captureNote;

  modelImage.src = item.image;
  modelImage.alt = localizedItem.title;

  if (!options.keepZoom) {
    state.zoomed = false;
    state.activeViewPreset = "free";
    state.activeAnnotation = "";
    state.focusAnchor = null;
    state.measurePoints = [];
  }

  renderCategoryList();
  renderInsights(localizedItem);
  renderDimensions(localizedItem);
  renderViewPresets();
  renderDimensionOverlay(localizedItem);
  renderAnnotations(item);
  renderMeasurementLayer(localizedItem);
  renderMaterials(localizedItem);
  renderCaptureThumbs(localizedItem);
  renderCases();
  applyViewerState(item);

  contactMessage.value = copy.contactMessage(localizedItem);
}

function setViewMode(mode) {
  state.viewMode = mode;
  applyViewerState(getActiveItem());
}

function setImmersiveView(isImmersive) {
  state.immersive = isImmersive;
  applyLanguageContent();
  applyViewerState(getActiveItem());
  refresh3DLayout();
}

function setCleanView(isClean) {
  state.cleanView = isClean;
  state.activeAnnotation = "";
  state.focusAnchor = null;

  if (isClean) {
    state.measuring = false;
    state.measurePoints = [];
  }

  applyLanguageContent();
  renderAnnotations(getActiveItem());
  renderMeasurementLayer(getLocalizedItem(getActiveItem()));
  applyViewerState(getActiveItem());
}

function getCurrentOrbitSnapshot() {
  if (!viewer3d.orbit) {
    return null;
  }

  const target = viewer3d.orbit.target;

  return {
    distance: viewer3d.orbit.distance,
    pitch: viewer3d.orbit.pitch,
    target: target ? { x: target.x, y: target.y, z: target.z } : null,
    yaw: viewer3d.orbit.yaw
  };
}

function restoreOrbitSnapshot(snapshot) {
  if (!snapshot || !viewer3d.orbit) {
    return;
  }

  viewer3d.orbit.yaw = snapshot.yaw;
  viewer3d.orbit.pitch = snapshot.pitch;
  viewer3d.orbit.distance = snapshot.distance;

  if (snapshot.target && viewer3d.orbit.target) {
    viewer3d.orbit.target.set(snapshot.target.x, snapshot.target.y, snapshot.target.z);
  }

  applyCameraOrbit();
}

function setMeasuring(isMeasuring) {
  const orbitSnapshot = getCurrentOrbitSnapshot();

  state.measuring = isMeasuring;
  state.measurePoints = [];
  state.activeAnnotation = "";
  state.focusAnchor = null;

  if (isMeasuring) {
    state.cleanView = false;
    state.viewMode = "3d";
    state.rotating = false;
  }

  applyLanguageContent();
  renderAnnotations(getActiveItem());
  renderMeasurementLayer(getLocalizedItem(getActiveItem()));
  applyViewerState(getActiveItem());

  if (isMeasuring) {
    restoreOrbitSnapshot(orbitSnapshot);
  }
}

function applyOrbitPreset(presetId) {
  const item = getActiveItem();

  if (!item?.viewerModel) {
    return false;
  }

  const preset = getViewPreset(item, presetId);

  if (viewer3d.currentBounds && viewer3d.orbit.target) {
    configureOrbit(item, viewer3d.currentBounds, false);
    viewer3d.orbit.yaw = preset.yaw;
    viewer3d.orbit.pitch = preset.pitch;
    viewer3d.orbit.distance = clamp(
      viewer3d.orbit.baseDistance * (preset.distanceMultiplier || 1),
      viewer3d.orbit.minDistance,
      viewer3d.orbit.maxDistance
    );
    applyCameraOrbit();
  }

  return true;
}

function applyViewPreset(presetId) {
  if (!applyOrbitPreset(presetId)) {
    return;
  }

  const item = getActiveItem();
  state.activeViewPreset = presetId;
  state.rotating = false;
  state.zoomed = false;
  state.viewMode = "3d";
  state.focusAnchor = null;
  applyViewerState(item);
}

function toggleAnnotation(annotationId) {
  const nextAnnotationId = state.activeAnnotation === annotationId ? "" : annotationId;
  const annotation = getAnnotations(getActiveItem()).find((entry) => entry.id === nextAnnotationId);

  state.activeAnnotation = nextAnnotationId;
  state.rotating = false;
  state.zoomed = Boolean(annotation);
  state.viewMode = "3d";
  state.activeViewPreset = "free";
  state.focusAnchor = annotation?.anchor || null;
  state.measuring = false;
  state.measurePoints = [];

  if (annotation) {
    centerModelStageInViewport();
  }

  renderAnnotations(getActiveItem());
  renderMeasurementLayer(getLocalizedItem(getActiveItem()));
  applyViewerState(getActiveItem());
}

async function shareActiveFurniture() {
  const item = getLocalizedItem(getActiveItem());
  const copy = getCopy();
  const shareButton = document.querySelector("[data-control='share']");

  try {
    await copyTextToClipboard(getFurnitureShareUrl(getActiveItem()));
    showToast(copy.shareCopiedToast(item));

    if (shareButton) {
      shareButton.classList.add("copied");
      setTooltip("[data-control='share']", copy.shareCopiedTooltip);
      window.setTimeout(() => {
        shareButton.classList.remove("copied");
        setTooltip("[data-control='share']", getCopy().shareTooltip);
      }, 2200);
    }
  } catch (error) {
    console.warn("Share link copy failed", error);
    showToast(copy.shareFailedToast);
  }
}

function prepareSampleRequest() {
  const item = getLocalizedItem(getActiveItem());
  const copy = getCopy();
  const needSelect = $("#contactNeed");

  if (needSelect) {
    needSelect.selectedIndex = 0;
  }

  contactMessage.value = copy.sampleMessage(item);
  showToast(copy.samplePreparedToast(item));
  scrollToId("contact");
  window.setTimeout(() => contactInput?.focus(), 450);
}

function selectMeasurePoint(pointData) {
  if (!pointData) {
    showToast(getCopy().measureMissHint);
    return;
  }

  state.rotating = false;
  state.activeAnnotation = "";
  state.focusAnchor = null;

  if (!state.measuring) {
    setMeasuring(true);
  }

  const point = {
    id: `measure-${(state.measurePointCounter += 1)}`,
    ...pointData
  };

  if (state.measurePoints.length >= 2) {
    state.measurePoints = [point];
  } else {
    state.measurePoints = [...state.measurePoints, point];
  }

  renderAnnotations(getActiveItem());
  renderMeasurementLayer(getLocalizedItem(getActiveItem()));
  applyViewerState(getActiveItem());
}

function handleMeasurementLayerClick(event) {
  if (!state.measuring || !measurementLayer?.classList.contains("active")) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  if (event.target.closest(".measurement-readout")) {
    return;
  }

  selectMeasurePoint(getMeasurementPointFromPointer(event));
}

function setLanguage(lang) {
  if (!supportedLanguages.has(lang) || state.lang === lang) {
    return;
  }

  state.lang = lang;
  window.localStorage.setItem("showroom-lang", lang);
  applyLanguageContent();
  renderFilters();
  updateSelectedItem(state.activeId, { keepZoom: true });
}

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bindEvents() {
  document.addEventListener("pointerover", (event) => {
    const previewTarget = event.target.closest("[data-id]");

    if (previewTarget) {
      warmupFurnitureById(previewTarget.dataset.id);
    }
  });

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-lang]");
    if (languageButton) {
      setLanguage(languageButton.dataset.lang);
      return;
    }

    const presetButton = event.target.closest("[data-view-preset]");
    if (presetButton) {
      applyViewPreset(presetButton.dataset.viewPreset);
      return;
    }

    const annotationButton = event.target.closest("[data-annotation-id]");
    if (annotationButton) {
      toggleAnnotation(annotationButton.dataset.annotationId);
      return;
    }

    const categoryButton = event.target.closest("[data-id]");
    if (categoryButton) {
      updateSelectedItem(categoryButton.dataset.id);
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.activeFilter = filterButton.dataset.filter;
      renderFilters();
      renderCases();
      return;
    }

    const scrollButton = event.target.closest("[data-scroll-target]");
    if (scrollButton) {
      scrollToId(scrollButton.dataset.scrollTarget);
      return;
    }

    const modeButton = event.target.closest("[data-view-mode]");
    if (modeButton) {
      setViewMode(modeButton.dataset.viewMode);
    }
  });

  measurementLayer?.addEventListener("click", handleMeasurementLayerClick);

  document.querySelectorAll("[data-control]").forEach((button) => {
    button.addEventListener("click", () => {
      const control = button.dataset.control;

      if (control === "rotate") {
        if (state.viewMode === "product") {
          return;
        }

        state.rotating = !state.rotating;
        state.activeViewPreset = state.rotating ? "free" : state.activeViewPreset;
      }

      if (control === "zoom") {
        state.zoomed = !state.zoomed;
      }

      if (control === "reset") {
        state.rotating = true;
        state.zoomed = false;
        state.viewMode = "3d";
        state.roomPreview = false;
        state.cleanView = false;
        state.measuring = false;
        state.measurePoints = [];
        state.focusAnchor = null;
        state.activeViewPreset = "free";
        state.activeAnnotation = "";
        $("#environmentToggle").checked = false;
        reset3DOrbit(getActiveItem());
      }

      if (control === "fullscreen") {
        setImmersiveView(!state.immersive);
        return;
      }

      if (control === "clean") {
        setCleanView(!state.cleanView);
        return;
      }

      if (control === "measure") {
        setMeasuring(!state.measuring);
        return;
      }

      if (control === "share") {
        shareActiveFurniture();
        return;
      }

      applyViewerState(getActiveItem());
    });
  });

  immersiveCloseButton.addEventListener("click", () => {
    setImmersiveView(false);
  });

  sampleRequestButton.addEventListener("click", () => {
    prepareSampleRequest();
  });

  roomPreviewButton.addEventListener("click", () => {
    state.roomPreview = !state.roomPreview;
    $("#environmentToggle").checked = state.roomPreview;
    applyViewerState(getActiveItem());
  });

  $("#environmentToggle").addEventListener("change", (event) => {
    state.roomPreview = event.target.checked;
    applyViewerState(getActiveItem());
  });

  saveButton.addEventListener("click", () => {
    state.saved = !state.saved;
    saveButton.classList.toggle("is-saved", state.saved);
  });

  $("#storyButton").addEventListener("click", () => {
    $("#captureNote").closest(".spec-card").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = getLocalizedItem(getActiveItem());
    formNote.textContent = getCopy().formNote(item);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.immersive) {
      setImmersiveView(false);
    }
  });
}

function bindTooltipEvents() {
  document.querySelectorAll(".has-tooltip").forEach((button) => {
    const showTooltip = () => button.classList.add("tooltip-visible");
    const hideTooltip = () => button.classList.remove("tooltip-visible");

    button.addEventListener("pointerenter", showTooltip);
    button.addEventListener("pointerleave", hideTooltip);
    button.addEventListener("focus", showTooltip);
    button.addEventListener("blur", hideTooltip);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideTooltip();
      }
    });
  });
}

function init() {
  applyCaseTheme();

  if (!furniture.length) {
    document.body.innerHTML = "<main class='empty-state'>No showroom furniture data found.</main>";
    return;
  }

  if (isMiniAppGallery) {
    initMiniAppGallery();
    return;
  }

  setupMiniAppHomeShell();
  applyLanguageContent();
  renderFilters();
  updateSelectedItem(state.activeId);
  bindEvents();
  bindMiniAppHomeEvents();
  bindTooltipEvents();
}

init();
