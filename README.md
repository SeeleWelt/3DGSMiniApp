# 实景 3D 家具展厅小程序

这是 MeTop 面向家具行业的 3D 展示样板项目，用于展示家具品牌、电商、展厅和软装公司如何通过 3D 展示让客户在线上 360 度了解家具产品。

当前项目包含两部分：

- `furniture-showroom`：3D 家具展厅 H5 页面，可作为网页端，也可作为小程序 web-view 页面。
- `furniture-miniapp`：微信小程序壳，主要负责承载线上 H5 展厅。

## 当前能力

- 默认展示沙发模型。
- 支持家具 3D 模型自动旋转、拖拽查看和缩放。
- 支持 2D / 3D 展示切换。
- 支持空间标尺，展示家具长宽高。
- 支持展厅列表，点击不同家具后回到首页并切换模型。
- 支持预约入口，展示微信二维码，方便客户长按添加联系。
- 3D 模型首次加载时有加载提示和动画。
- 小程序 H5 和网页端分开部署，避免互相覆盖。

## 目录结构

```text
.
├── furniture-showroom       # 家具展厅 H5 源码
│   ├── index.html
│   ├── public
│   │   ├── images           # 家具图片、二维码
│   │   └── models           # PLY / 3DGS 模型资源
│   ├── src
│   │   ├── data             # 家具案例数据
│   │   ├── gsplat-loader.js # 3DGS 加载逻辑
│   │   ├── main.js          # 页面交互和 PlayCanvas 渲染逻辑
│   │   └── styles           # 页面样式
│   └── vendor               # 前端运行所需的本地依赖文件
├── furniture-miniapp        # 微信小程序项目
│   ├── app.js
│   ├── app.json
│   ├── pages
│   └── project.config.json
├── package.json             # 本地开发和构建脚本
└── README.md
```

## 环境准备

建议环境：

- Node.js 18 或以上
- npm 9 或以上
- 微信开发者工具
- 已配置 HTTPS 的业务域名：`furniture.metop.com.cn`

安装依赖：

```bash
npm install
```

## 本地预览 H5

启动家具展厅本地服务：

```bash
npm run dev
```

网页端预览：

```text
http://127.0.0.1:4175/
```

小程序 H5 首页预览：

```text
http://127.0.0.1:4175/?miniapp=home&item=atelier-low-sofa&lang=zh
```

小程序 H5 展厅列表预览：

```text
http://127.0.0.1:4175/?miniapp=gallery&item=atelier-low-sofa&lang=zh
```

## 微信小程序本地预览

用微信开发者工具打开：

```text
furniture-miniapp
```

当前小程序 AppID：

```text
wx4ddbf19349d80796
```

开发者工具里建议勾选：

```text
不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书
```

注意：电脑开发者工具可以访问 `127.0.0.1`，但真机扫码不能访问电脑本机地址。真机预览建议先部署 H5 到线上 `/miniapp/`。

## 构建

构建网页端：

```bash
npm run build:web
```

构建小程序 H5：

```bash
npm run build:miniapp-h5
```

同时构建两套：

```bash
npm run build
```

构建后会生成：

```text
furniture-showroom/dist
furniture-showroom/dist-miniapp
```

## 宝塔部署建议

网页端部署到站点根目录：

```text
https://furniture.metop.com.cn/
```

小程序 H5 部署到：

```text
https://furniture.metop.com.cn/miniapp/
```

建议流程：

1. 运行 `npm run build:web`。
2. 将 `furniture-showroom/dist/` 内的文件上传到宝塔站点根目录。
3. 运行 `npm run build:miniapp-h5`。
4. 在宝塔站点根目录创建或更新 `miniapp/` 文件夹。
5. 将 `furniture-showroom/dist-miniapp/` 内的文件上传到 `miniapp/`。

不要把小程序 H5 的文件直接覆盖到站点根目录，否则会覆盖网页端。

## 小程序发布流程

1. 确认线上地址 `https://furniture.metop.com.cn/miniapp/` 可以访问。
2. 确认微信公众平台已配置业务域名 `furniture.metop.com.cn`。
3. 用微信开发者工具打开 `furniture-miniapp`。
4. 预览确认首页、展厅列表、预约二维码正常。
5. 点击上传，填写版本号和更新说明。
6. 到微信公众平台提交审核。

## 重要注意事项

- AppSecret 不要写入前端代码、README、配置文件或提交记录。
- `project.private.config.json` 是本地私有配置，不要提交。
- `dist/`、`dist-miniapp/`、压缩包和截图产物不进仓库，需要时本地重新构建。
- 当前模型文件在 `furniture-showroom/public/models/`，体积较大，后续如模型继续增加，建议评估对象存储或 CDN。
- 对外文案尽量讲“AI 重建”“3D 家具展示”，不要直接面向客户讲内部技术细节。

## 明天继续开发建议

- 优化首屏 3D 模型加载速度，考虑模型压缩、分批加载或 CDN。
- 给预约二维码增加企业微信或手机号兜底联系方式。
- 增加正式线索表单，收集公司名、联系方式、家具品类和素材情况。
- 增加英文版小程序页面文案。
- 增加更多家具案例和行业场景案例。
- 把构建后的部署压缩流程做成脚本，减少人工上传失误。

