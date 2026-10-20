# SleekFin 简体中文汉化 · SleekFin Simplified Chinese Localization

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

为 [SleekFin](https://github.com/varunaditya-plus/SleekFin) 插件的 Jellyfin 网页**设置界面**提供简体中文翻译，并改善部分 Chrome/Windows 原生下拉菜单的文字对比度。

> **非官方社区项目**，与 SleekFin 原作者或 Jellyfin 官方无关联。此脚本不安装 SleekFin，不负责汉化 Jellyfin 整体界面，也不改变影视元数据语言。

## 功能

- 翻译 SleekFin **Overview（概览）**、**UI Builder（界面设计器）**中的已收录设置名称、说明、标签和按钮。
- 翻译已知下拉菜单的可见选项，如 Square、Squircle、Circle 和 Basic native。
- 改善 `select.sleekfin-input` 在深色主题下可能出现的白底白字问题。
- 不修改选项内部 `value`、输入参数、保存逻辑或 Jellyfin 服务器文件。
- 使用本地翻译词典，不需要远程翻译接口；不主动发送网络请求。

**翻译范围提示：**当前版本按社区提供的 SleekFin 设置页面核对；上游新增或更名的选项可能仍显示英文。欢迎通过 [Issues](https://github.com/wu66chen/sleekfin-zh-cn/issues) 提交英文残留截图或原文。

## 安装要求

1. Jellyfin Web 和已安装、正常运行的 [SleekFin](https://github.com/varunaditya-plus/SleekFin)；SleekFin 按其官方说明依赖 File Transformation 插件。
2. 支持用户脚本的浏览器扩展，例如 [Tampermonkey](https://www.tampermonkey.net/)。

## 安装方法

**从 GitHub 安装**

1. 安装并启用 Tampermonkey。
2. 打开 [`sleekfin-zh-cn.user.js`](./sleekfin-zh-cn.user.js) 的 Raw 地址并按浏览器扩展提示安装：
   `https://raw.githubusercontent.com/wu66chen/sleekfin-zh-cn/main/sleekfin-zh-cn.user.js`
3. 重新打开 Jellyfin → 控制台 → SleekFin；如页面已打开，刷新一次。

**从 Greasy Fork 安装**

等待发布后补充 Greasy Fork 的正式安装链接。通过 Greasy Fork 安装的版本由该平台管理更新。

## 适用地址范围

支持典型的自建 Jellyfin Web 地址，如：

- `http://localhost:8096/web/index.html`
- `http://192.168.x.x:8096/web/index.html`
- `https://jellyfin.example.com/web/index.html`
- `https://example.com/jellyfin/web/index.html`（子路径反向代理）

脚本使用通用 `@match`，但**仅在识别到 SleekFin 设置控件及其标签时**执行翻译。由于自建 Jellyfin 可以使用任意域名，浏览器安装页面可能提示较广的网站匹配权限。脚本使用 `@grant none`，不请求特权 API；请先查看完整源码再安装。

其他定制部署路径可能需要手动调整匹配规则。

## 常见问题

**安装后没有变成中文？** 确认 SleekFin 插件与其设置页能正常打开、脚本已启用；刷新设置页。普通 Jellyfin 首页并不属于本脚本的翻译范围。

**下拉菜单仍有配色问题？** 操作系统或浏览器原生控件外观可能覆盖样式。请附浏览器版本、系统版本与截图到 Issues。

**选项更新后部分英文？** SleekFin 更新可能增加或修改设置项。请提交英文原文及对应界面截图供补充词典。

**旧版 v0.3 如何升级？** 先停用旧版脚本，再安装此通用发布版，避免多个版本同时运行；这不会清除 SleekFin 自己保存的设置。

## 版本与贡献

参见 [CHANGELOG.md](CHANGELOG.md)。反馈和翻译建议请提交 [Issues](https://github.com/wu66chen/sleekfin-zh-cn/issues)。

## 原项目及授权

- SleekFin 原项目：[varunaditya-plus/SleekFin](https://github.com/varunaditya-plus/SleekFin)
- 本项目维护：[wu66chen](https://github.com/wu66chen)
- 本项目脚本采用 [MIT License](LICENSE)。SleekFin 为独立上游项目，其版权归相应权利人所有。

---

**English:** This is an unofficial userscript that translates selected SleekFin Jellyfin *settings* text into Simplified Chinese and improves select-menu contrast. Install Tampermonkey, then install `sleekfin-zh-cn.user.js`. It does not modify the server, config values, or media metadata. See the Chinese instructions above and open an issue for missing translations.
