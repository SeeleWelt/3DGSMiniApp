# Furniture Showroom

这个文件夹专门用于开发 **3DGS 家具展示网站**。

后续与这个网站相关的页面、组件、数据、模型资源、样式和部署说明，都优先放在这里，避免和主项目其他功能混在一起。

## 目录约定

- `src/`：网站页面、组件、交互逻辑
- `src/components/`：可复用界面组件
- `src/views/`：页面级文件
- `src/data/`：家具案例数据、展示配置
- `src/styles/`：这个展示站专用样式
- `public/`：可公开访问的静态资源
- `public/models/`：家具 3DGS / 3D 模型资源
- `public/images/`：家具缩略图、材质图、说明图片
- `docs/`：本展示站相关说明
- `deploy/`：云部署说明、配置草稿

## 部署思路

当前建议拆成两套发布内容：

- 网页端：部署到 `https://furniture.metop.com.cn/` 根目录。
- 小程序 H5：部署到 `https://furniture.metop.com.cn/miniapp/` 子目录。

这样小程序不会覆盖网页端，网页端也不会影响小程序展示。

宝塔上传时建议分别使用两个压缩包：

- `furniture-showroom-deploy.zip`：解压到站点根目录，作为网页端。
- `furniture-miniapp-h5-deploy.zip`：压缩包内自带 `miniapp/` 文件夹，解压到站点根目录后只新增或覆盖 `/miniapp/`，不会覆盖根目录网页端。

## 本地预览

开发预览可以在项目根目录使用 Vite 指向本文件夹：

```bash
npx vite --host 127.0.0.1 --port 4175 furniture-showroom
```

网页端打开：

```text
http://127.0.0.1:4175/
```

小程序 H5 模式打开：

```text
http://127.0.0.1:4175/?miniapp=home&item=atelier-low-sofa&lang=zh
http://127.0.0.1:4175/?miniapp=gallery&item=atelier-low-sofa&lang=zh
```

## 真实 3DGS 模型接入

当前版本先用家具产品图模拟展厅效果。后续可以把真实 3DGS / 3D 模型放到：

```text
public/models/
```

再在 `src/data/furniture.js` 中为每个家具补充模型地址。
