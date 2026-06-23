# 实景 3D 家具展厅小程序

这是 `furniture.metop.com.cn` 的微信小程序外壳版本。当前方案采用「微信小程序 web-view + 独立小程序 H5 页面」。

注意：小程序 H5 不和网页端共用根目录。网页端继续部署在 `https://furniture.metop.com.cn/`，小程序 H5 部署在 `https://furniture.metop.com.cn/miniapp/`。

## 当前配置

- AppID: `wx4ddbf19349d80796`
- 业务域名: `https://furniture.metop.com.cn/`
- 小程序 H5 地址: `https://furniture.metop.com.cn/miniapp/`
- 项目目录: `furniture-miniapp`

## 注意事项

- AppSecret 不要写入小程序代码、仓库文件或前端配置。
- 需要在微信公众平台小程序后台配置业务域名 `furniture.metop.com.cn`。
- 微信会要求下载校验文件，把它上传到宝塔网站根目录。
- 真机预览前，需要确认 HTTPS、备案、业务域名校验都已完成。

## 本地打开

可以用微信开发者工具打开本目录。

```bash
/Applications/wechatwebdevtools.app/Contents/MacOS/cli open --project /Users/lakerman/Desktop/MeTop-3DGSweb/furniture-miniapp
```

## 本地 H5 预览

开发时先启动家具展厅本地服务：

```bash
npx vite --host 127.0.0.1 --port 4176 furniture-showroom
```

再打开微信开发者工具。本项目在开发者工具环境中会自动把 web-view 指向：

```text
http://127.0.0.1:4176/miniapp
```

需要在微信开发者工具右上角「详情 / 本地设置」里勾选：

```text
不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书
```

注意：这种方式只适合电脑上的微信开发者工具预览。扫码到真机时，手机不会访问电脑的 `127.0.0.1`，真机预览建议走线上 `https://furniture.metop.com.cn/miniapp/` 或改成电脑局域网 IP。

## 页面结构

- `pages/index/index`: 小程序入口，打开 `/miniapp`
- `pages/showroom/showroom`: 备用 web-view 展厅页

## 发布关系

- 修改小程序壳代码后，用微信开发者工具预览或上传。
- 修改 3D 展示页面后，先在 `furniture-showroom` 构建小程序 H5 包，再把生成的 `/miniapp/` 内容上传到宝塔站点根目录。
- 不要把小程序 H5 解压到网站根目录替换网页端文件。
