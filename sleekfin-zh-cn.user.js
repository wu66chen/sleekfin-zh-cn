// ==UserScript==
// @name              SleekFin 简体中文汉化
// @name:zh-CN        SleekFin 简体中文汉化
// @name:en           SleekFin Simplified Chinese Localization
// @namespace         https://github.com/wu66chen/sleekfin-zh-cn
// @version           0.4.1
// @description       汉化 Jellyfin SleekFin 设置页（概览、界面设计器和下拉选项），并改善原生下拉选项的对比度。
// @description:zh-CN 汉化 Jellyfin SleekFin 设置页（概览、界面设计器和下拉选项），并改善原生下拉选项的对比度。
// @description:en    Translate SleekFin's Jellyfin settings UI into Simplified Chinese and improve native dropdown contrast.
// @author            wu66chen
// @homepageURL       https://github.com/wu66chen/sleekfin-zh-cn
// @supportURL        https://github.com/wu66chen/sleekfin-zh-cn/issues
// @license           MIT
// @match             *://*/web/*
// @match             *://*/*/web/*
// @run-at            document-idle
// @grant             none
// ==/UserScript==

(() => {
  'use strict';

  // 翻译仅作用于可见文案。请勿在此添加配置项的内部 ID、选项 value 或 CSS 选择器。
  // 来源：社区测试的 SleekFin Overview、UI Builder 与 HTML 选项界面。
  // 本脚本仅在检测到 SleekFin 设置页后生效，不修改 Jellyfin 插件文件。
  const DICTIONARY = Object.freeze({
    // 通用、页签
    'Help': '帮助',
    'Overview': '概览',
    'UI Builder': '界面设计器',
    'Dependencies': '依赖项',
    'File transformation': 'File Transformation（文件转换）',
    'General options': '常规选项',
    'Cards': '媒体卡片',
    'Save': '保存',
    'Cancel': '取消',
    'Reset': '重置',
    'Apply': '应用',
    'Default': '默认',
    'None': '无',
    'On': '开启',
    'Off': '关闭',

    // Overview · 常规选项
    'Enable SleekFin header': '启用 SleekFin 顶部导航栏',
    "Adds a custom skin over Jellyfin's header bar with navigation, search, etc.":
      '为 Jellyfin 顶部栏应用自定义外观，包括导航、搜索等功能。',
    'Enable hero': '启用首页主视觉横幅',
    'Adds a full-width hero carousel to the main Jellyfin home tab above media rows.':
      '在 Jellyfin 首页的媒体内容行上方添加全宽轮播横幅。',
    'Use SleekFin detail pages': '使用 SleekFin 详情页',
    "Turn this off to keep Jellyfin's original Movie, Series, Season, and Episode pages while keeping the SleekFin header and hero.":
      '关闭后保留 Jellyfin 原版电影、剧集、季和单集详情页，同时继续使用 SleekFin 顶部导航栏和首页横幅。',
    'Use season posters': '使用剧季海报',
    'Show season posters instead of an episode carousel on series pages. Season and episode pages still show episodes.':
      '在剧集详情页显示各季海报，替代单集轮播；剧季及单集页面仍会显示单集内容。',
    'Use compact episode grid cards': '使用紧凑型单集网格卡片',
    'Use the more compact version of episode cards which were default before v1.5.3.0':
      '使用更紧凑的单集卡片样式（v1.5.3.0 之前的默认样式）。',
    'Dropdown style': '下拉菜单样式',
    'Choose Jellyfin, SeerrFin, or basic browser dropdowns for season and media selectors.':
      '为剧季与媒体选项选择 Jellyfin、SeerrFin 或浏览器原生下拉菜单。',
    'SleekFin accent color': 'SleekFin 强调色',

    // Overview · 下拉列表里的可见选项（仅翻译有显式 value 的 option 文案）
    'Square (slightly rounded)': '方形（微圆角）',
    'Basic native': '浏览器原生',
    'SeerrFin': 'SeerrFin',

    // Overview · 媒体卡片
    'Card buttons': '卡片按钮',
    'Watched, favorite, more, and status badges on media cards.':
      '媒体卡片上的已观看、收藏、更多操作按钮及状态徽标。',
    'Play button': '播放按钮',
    'The large Play button centered on media cards.':
      '位于媒体卡片中央的大号播放按钮。',
    'Posters and thumbnails': '海报与缩略图',
    'Movie, series, episode, Next Up, Continue Watching, music, and Live TV artwork. Circle turns rectangular artwork into capsules.':
      '适用于电影、剧集、单集、接下来播放、继续观看、音乐及直播电视封面。圆形选项会将矩形图片处理成胶囊形。',
    'Cast and crew': '演员与演职人员',
    'Person images on detail pages and people libraries. Circle uses square avatars.':
      '详情页和人物媒体库中的人物图片。圆形选项会将头像裁切为正圆形。',

    // UI Builder · 标题与预览
    'Detail pages (coming soon)': '详情页设置（即将推出）',
    'Header bar': '顶部导航栏',
    'Hero carousel': '主视觉轮播横幅',
    'THIS IS A PREVIEW OF THE TOP OF YOUR HOME SCREEN': '这是首页顶部区域的预览',
    'THIS IS A LIVE PREVIEW OF YOUR HERO CAROUSEL': '这是主视觉轮播横幅的实时预览',
    'Drag your favorite things into the header bar': '将常用功能拖入顶部导航栏',
    '*Visit Home once to load native Jellyfin and plugin header items':
      '*请先访问一次首页，以加载 Jellyfin 与其他插件提供的导航项目',
    'Visit Home once to load native Jellyfin and plugin header items':
      '请先访问一次首页，以加载 Jellyfin 与其他插件提供的导航项目',

    // UI Builder · 导航组件
    'Space': '空白间隔',
    'Separator': '分隔线',
    'Favorites': '收藏',
    'SyncPlay': '同步播放',
    'Cast to device': '投屏到设备',
    'Search': '搜索',
    'User Menu': '用户菜单',
    'Audio player': '音频播放器',
    'Home': '首页',
    'More': '更多',
    'Back': '返回',
    'Random': '随机播放',
    'Active Streams': '当前播放流',
    'Bookmarks': '书签',
    'Hidden Content': '隐藏内容',
    'Requests': '点播请求',
    'Calendar': '日历',
    'Recommendations': '推荐',
    'Activity': '活动',
    'Movies': '电影',
    'TV Shows': '电视剧',
    'Letterboxd': 'Letterboxd',
    'IF Bookmarks': 'IF 书签',
    'IF Hidden Content': 'IF 隐藏内容',
    'IF Requests': 'IF 点播请求',
    'IF Calendar': 'IF 日历',
    'IF Recommendations': 'IF 推荐',
    'IF Activity': 'IF 活动',
    'IF Movies': 'IF 电影',
    'IF TV Shows': 'IF 电视剧',

    // UI Builder · 顶部导航栏布局
    'Show logo/server name': '显示 Logo／服务器名称',
    'Logo': 'Logo',
    'Server name': '服务器名称',
    'Both': '同时显示',
    'Logo/server position': 'Logo／服务器名称位置',
    'Left': '左侧',
    'Center': '居中',
    'Right': '右侧',
    'Header bar position': '导航栏位置',
    'Header height': '导航栏高度',
    'Total height of the header area.': '顶部导航区域的总高度。',
    'Logo height': 'Logo 高度',
    'Display height of the server logo.': '服务器 Logo 的显示高度。',
    'Server name text color': '服务器名称文字颜色',
    'Color used for the server name.': '服务器名称使用的文字颜色。',
    'Logo/server name spacing': 'Logo 与服务器名称间距',
    'Space between the logo and server name.': 'Logo 与服务器名称之间的间距。',
    'Header item spacing': '导航项目间距',
    'Space between items in the header bar.': '顶部导航栏中各项目之间的间距。',
    'Header item height': '导航项目高度',
    'Header bar padding': '导航栏内边距',
    'Space inside the header bar.': '导航栏内部的留白间距。',
    'Item background color': '未选中项目背景色',
    'Background color for inactive items.': '未选中导航项目的背景颜色。',
    'Item text color': '未选中项目文字颜色',
    'Text and icon color for inactive items.': '未选中导航项目的文字与图标颜色。',
    'Active item background color': '选中项目背景色',
    'Background color for the active item.': '当前选中导航项目的背景颜色。',
    'Active item text color': '选中项目文字颜色',
    'Text and icon color for the active item.': '当前选中导航项目的文字与图标颜色。',
    'Hover opacity': '悬停时不透明度',
    'Opacity used while hovering over an item.': '鼠标悬停于导航项目时的不透明度。',
    'Opacity used while hovering over item.': '鼠标悬停于导航项目时的不透明度。',
    'Active item opacity': '选中项目不透明度',
    'Opacity used for the active item.': '当前选中导航项目的不透明度。',

    // UI Builder · 主视觉横幅折叠面板
    'Content rules': '内容展示规则',
    'Layout': '布局',
    'Artwork + Trailer': '图片与预告片',
    'Type & metadata': '内容类型与元数据',
    'Actions': '操作按钮',
    'Motion & blending': '动画与混合效果',
    'Reset hero defaults': '恢复横幅默认设置',
    'Reset to defaults': '恢复默认设置',

    // 已知设置项常见短语（对应版本中出现时翻译）
    'Include movies': '包含电影',
    'Include series': '包含剧集',
    'Randomize hero content': '随机展示横幅内容',
    'Autoplay': '自动播放',
    'Autoplay trailers': '自动播放预告片',
    'Muted': '静音',
    'Show logo': '显示 Logo',
    'Show title': '显示标题',
    'Show overview': '显示简介',
    'Show rating': '显示评分',
    'Show metadata': '显示元数据',
    'Play': '播放',
    'More info': '更多信息',
    'Previous': '上一项',
    'Next': '下一项',
    'Background opacity': '背景不透明度',
    'Overlay opacity': '覆盖层不透明度',
    'Animation duration': '动画时长',
    'Transition duration': '过渡时长',
    'Enabled': '已启用',
    'Disabled': '已禁用',

    // v0.2 · 根据 2026-10-20 已展开 UI Builder 截图补充
    '↑ THIS IS A PREVIEW OF THE TOP OF YOUR HOME SCREEN': '↑ 这是首页顶部区域的预览',
    '↑ THIS IS A LIVE PREVIEW OF YOUR HERO CAROUSEL': '↑ 这是主视觉轮播横幅的实时预览',
    'If an item is': '如果某个项目显示为',
    'red': '红色',
    'that means it is not enabled in the plugin its from (and will not show)': '表示提供该项目的插件尚未启用此功能（不会显示）',
    'If an item is red, that means it is not enabled in the plugin its from (and will not show)': '如果某个项目显示为红色，表示它在对应插件中尚未启用（不会显示）。',
    '↑If an item is red, that means it is not enabled in the plugin its from (and will not show)': '↑ 红色项目表示对应插件尚未启用该功能（不会显示）。',
    'Height of each item in the header bar.': '顶部导航栏中每个项目的高度。',
    'Randomize order': '随机排列顺序',
    'Randomly selects items from the enabled content sources.': '从已启用的内容来源中随机选择媒体项目。',
    'Content sources': '内容来源',
    'Choose which Jellyfin content appears. The first enabled source has the highest priority.': '选择横幅展示哪些 Jellyfin 内容；排在最前的已启用来源优先级最高。',
    'Continue watching': '继续观看',
    'Next up': '接下来播放',
    'Latest movies': '最新电影',
    'Latest shows': '最新剧集',
    'Slides shown': '展示轮播数量',
    'Content alignment': '内容水平对齐',
    'Vertical alignment': '内容垂直对齐',
    'Mobile height (vh)': '移动端高度（vh）',
    'Desktop height (vh)': '桌面端高度（vh）',
    'Content max width (px)': '内容最大宽度（px）',
    'Top': '顶部',
    'Bottom': '底部',
    'Play trailers in detail backgrounds': '在详情页背景播放预告片',
    'Play available local, remote-video, or YouTube trailers muted on detail pages. Keep static artwork when none can play.': '在详情页静音播放可用的本地、远程视频或 YouTube 预告片；不可播放时保留静态背景图。',
    'Title treatment': '标题显示方式',
    'Auto': '自动',
    'Text': '文字',
    'Backdrop fit': '背景图适配方式',
    'Cover': '铺满裁切',
    'Contain': '完整显示',
    'Horizontal focus (%)': '背景水平焦点（%）',
    'Vertical focus (%)': '背景垂直焦点（%）',
    'Backdrop opacity (%)': '背景图不透明度（%）',
    'Title size (px)': '标题字号（px）',
    'Title weight': '标题字重',
    'Title case': '标题大小写',
    'Title color': '标题文字颜色',
    'Original': '原样显示',
    'Uppercase': '全部大写',
    'Description size (px)': '简介字号（px）',
    'Description weight': '简介字重',
    'Description color': '简介文字颜色',
    'Description lines': '简介显示行数',
    'Primary text': '主要按钮文字颜色',
    'Primary background': '主要按钮背景颜色',
    'Primary opacity (%)': '主要按钮不透明度（%）',
    'Secondary text': '次要按钮文字颜色',
    'Secondary background': '次要按钮背景颜色',
    'Secondary opacity (%)': '次要按钮不透明度（%）',
    'Button height (px)': '按钮高度（px）',
    'Corner radius': '按钮圆角形状',
    'Square': '直角',
    'Squircle': '圆角方形',
    'Rounded': '圆角',
    'Pill': '胶囊形',
    'Circle': '圆形',
    'Jellyfin': 'Jellyfin 原生',
    'Browser': '浏览器原生',
    'Change every (s)': '轮播切换间隔（秒）',
    'Transition': '切换效果',
    'Transition time (ms)': '切换动画时长（毫秒）',
    'Slide': '滑动',
    'Fade': '淡入淡出',
    'Slide + fade': '滑动＋淡入淡出',
    'Swipe navigation': '滑动手势切换',
    'Vignette strength (%)': '暗角效果强度（%）',
    'Source': '来源',
    'Choose content sources': '选择内容来源',
    'Use home preview': '使用首页预览',
    'Mobile': '移动端',
    'Desktop': '桌面端',
    'Action buttons': '操作按钮',
    'Horizontal': '水平',
    'Vertical': '垂直',
    'Browse': '浏览',
    'Use': '使用',
  });

  // 带显式 value 的 option 可以翻译显示文字，但绝不触碰实际 value。
  const ignoreSelector = 'script,style,noscript,textarea,pre,code,[contenteditable="true"]';
  let queued = false;
  let lastPageActive = false;

  function possiblySleekFinSettings() {
    // 自建 Jellyfin 使用任意域名/端口；只在页面中发现 SleekFin 设置控件时进一步检测。
    // 这些 ID / 类名来自 SleekFin 的真实设置页面。
    return Boolean(document.querySelector(
      '#sleekFinCardButtonShape, #sleekFinPlayButtonShape, #sleekFinDropdownStyle, .sleekfin-toggle-actions, select.sleekfin-input'
    )) || window.location.hash.toLowerCase().includes('sleekfin');
  }

  function isSleekFinSettingsOpen() {
    if (!possiblySleekFinSettings()) return false;
    // 避免错误地翻译 Jellyfin 首页或其他插件页面。
    const text = document.body?.innerText || '';
    return text.includes('SleekFin') &&
      (text.includes('UI Builder') || text.includes('界面设计器')) &&
      (text.includes('Overview') || text.includes('概览'));
  }

  function translatedString(value) {
    const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(value);
    if (!match) return null;
    const content = match[2];
    let translation = DICTIONARY[content];
    if (translation === undefined) {
      // 预览文字前可能有箭头或星号：只翻译后面的完整已知短句。
      const prefixMatch = /^([↑↓*]+\s*)(.+)$/s.exec(content);
      if (prefixMatch) {
        const translatedBody = DICTIONARY[prefixMatch[2]];
        if (translatedBody !== undefined) translation = prefixMatch[1] + translatedBody;
      }
    }
    return translation === undefined ? null : `${match[1]}${translation}${match[3]}`;
  }

  function updateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || parent.closest(ignoreSelector)) return;
    // 没有显式 value 的 option 会以文字作为实际配置值，不做替换。
    const option = parent.closest('option');
    if (option && !option.hasAttribute('value')) return;
    const current = node.nodeValue;
    if (!current || !/[A-Za-z]/.test(current)) return;
    const translated = translatedString(current);
    if (translated !== null && translated !== current) node.nodeValue = translated;
  }

  function updateAttributes(element) {
    if (!element || element.closest(ignoreSelector)) return;
    // 不修改 value、name、id、data-*、checked，避免破坏配置保存及组件逻辑。
    for (const key of ['title', 'aria-label', 'placeholder']) {
      if (!element.hasAttribute(key)) continue;
      const current = element.getAttribute(key);
      const translated = translatedString(current);
      if (translated !== null && translated !== current) element.setAttribute(key, translated);
    }
  }

  function translateVisiblePage() {
    queued = false;
    if (!document.body || !isSleekFinSettingsOpen()) {
      lastPageActive = false;
      return;
    }
    lastPageActive = true;
    installDropdownContrastFix();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) updateTextNode(node);
    // 输入框的 value 和下拉选项的 value 不会被修改，仅翻译其显示文案和提示属性。
    const elements = document.body.querySelectorAll('[title],[aria-label],[placeholder]');
    for (const element of elements) updateAttributes(element);
  }

  // 仅作用于 SleekFin 的 select 控件。Chrome/Windows 的原生下拉框有时
  // 会继承深色主题的白字，却使用操作系统的白底，造成“白底白字”。
  // color-scheme:dark 交由浏览器选择深色原生控件，并为 option 设置兜底配色。
  // 不修改任何 option.value、select.value、selectedIndex，也不触发 change 事件。
  function installDropdownContrastFix() {
    if (document.getElementById('sleekfin-zh-cn-dropdown-contrast')) return;
    const style = document.createElement('style');
    style.id = 'sleekfin-zh-cn-dropdown-contrast';
    style.textContent = `
      select.sleekfin-input {
        color-scheme: dark !important;
        color: #f0f0f0 !important;
        background-color: #242424 !important;
      }
      select.sleekfin-input option,
      select.sleekfin-input optgroup {
        color: #f0f0f0 !important;
        background-color: #242424 !important;
      }
      select.sleekfin-input option:disabled {
        color: #999999 !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  function queueTranslation() {
    if (queued) return;
    // 防止在不相关站点 / 普通影视页面频繁扫描整页文字。
    if (!lastPageActive && !possiblySleekFinSettings()) return;
    queued = true;
    // 批量处理动态 UI 更新，避免多次反复遍历 DOM。
    setTimeout(translateVisiblePage, 120);
  }

  const observer = new MutationObserver((mutations) => {
    // 当前页面即使动态重绘，也只修改可见文字；离开设置页时自动停止翻译。
    if (mutations.length > 0 || lastPageActive) queueTranslation();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  window.addEventListener('hashchange', queueTranslation);
  window.addEventListener('popstate', queueTranslation);
  queueTranslation();
})();
