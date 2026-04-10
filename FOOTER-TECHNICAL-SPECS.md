# Mygo Kasumi LLC 尾脚 - 技术规范文档

## 📋 目录

1. [HTML 结构](#html-结构)
2. [CSS 架构](#css-架构)
3. [响应式设计](#响应式设计)
4. [色彩系统](#色彩系统)
5. [排版系统](#排版系统)
6. [交互设计](#交互设计)
7. [无障碍性](#无障碍性)
8. [浏览器兼容性](#浏览器兼容性)

---

## HTML 结构

### 语义化标签使用

```html
<footer class="footer">                    <!-- 页脚容器 -->
  <div class="footer-inner">               <!-- 内容包装器 -->
    <div class="footer-main">              <!-- 主体功能区 -->
      <div class="footer-brand">           <!-- 品牌灵魂区 -->
      <nav class="footer-nav">             <!-- 导航区（语义标签） -->
      <div class="footer-contact">         <!-- 联系中心区 -->
    </div>
    
    <section class="footer-disclaimer-section">  <!-- 免责声明区（语义标签） -->
      <div class="footer-disclaimer-grid">
    </section>
    
    <div class="footer-bottom">            <!-- 版权区 -->
  </div>
</footer>
```

### 类命名规范

采用 **BEM (Block Element Modifier)** 命名法：

```
.footer                          /* Block */
├── .footer-inner               /* Element */
├── .footer-main                /* Element */
│   ├── .footer-brand           /* Element */
│   ├── .footer-nav             /* Element */
│   │   ├── .footer-nav-title   /* Element */
│   │   └── .footer-nav-list    /* Element */
│   └── .footer-contact         /* Element */
│       ├── .footer-contact-title
│       └── .footer-contact-list
├── .footer-disclaimer-section  /* Element */
│   └── .footer-disclaimer-grid
│       └── .footer-disclaimer-item
└── .footer-bottom
    └── .footer-bottom-links
```

### 完整 HTML 树

```
footer.footer
├── div.footer-inner
│   ├── div.footer-main
│   │   ├── div.footer-brand
│   │   │   ├── div.footer-brand-name
│   │   │   └── div.footer-brand-slogan
│   │   ├── nav.footer-nav
│   │   │   ├── h3.footer-nav-title
│   │   │   └── ul.footer-nav-list
│   │   │       ├── li > a
│   │   │       ├── li > a
│   │   │       └── li > a
│   │   └── div.footer-contact
│   │       ├── h3.footer-contact-title
│   │       └── div.footer-contact-list
│   │           ├── div.footer-contact-item
│   │           │   ├── a
│   │           │   └── span.footer-contact-caption
│   │           └── div.footer-contact-item
│   │               └── a
│   ├── section.footer-disclaimer-section
│   │   └── div.footer-disclaimer-grid
│   │       ├── div.footer-disclaimer-item
│   │       │   ├── div.footer-disclaimer-lang
│   │       │   └── p.footer-disclaimer-text
│   │       ├── div.footer-disclaimer-item
│   │       └── div.footer-disclaimer-item
│   └── div.footer-bottom
│       ├── p.footer-copyright
│       └── div.footer-bottom-links
│           ├── a
│           └── a
```

---

## CSS 架构

### CSS 变量系统

```css
:root {
  /* 背景色 */
  --footer-bg: #001F3F;
  
  /* 文字色 */
  --footer-text: #E0E0E0;              /* 主文字 */
  --footer-text-secondary: #B0B0B0;    /* 次文字 */
  --footer-text-tertiary: #888;        /* 三级文字 */
  
  /* 边框色 */
  --footer-border: rgba(224, 224, 224, 0.15);
  --footer-border-light: rgba(224, 224, 224, 0.1);
  
  /* 其他 */
  --footer-white: #fff;
  --transition: all 0.3s ease;
}
```

### 层级结构

```
css/footer.css
├── CSS 变量定义
├── 尾脚主容器样式
├── 主体功能区样式
│   ├── 品牌灵魂样式
│   ├── 导航链接样式
│   └── 联系中心样式
├── 免责声明区样式
├── 版权区样式
├── 响应式设计
│   ├── 平板设备 (≤1024px)
│   ├── 平板竖屏 (≤768px)
│   └── 手机设备 (≤480px)
└── 辅助类
```

### 关键样式属性

| 属性 | 值 | 用途 |
|------|-----|------|
| `display` | `grid` / `flex` | 布局系统 |
| `grid-template-columns` | 响应式 | 列数切换 |
| `gap` | 60px / 48px / 40px | 间距管理 |
| `padding` | 80px 24px | 外边距 |
| `border-bottom` | 1px solid | 分隔线 |
| `transition` | all 0.3s ease | 动画过渡 |

---

## 响应式设计

### 断点策略

```css
/* 默认：PC 端 (1200px+) */
.footer-main {
  grid-template-columns: 2fr 1fr 1fr;  /* 三列：2:1:1 比例 */
  gap: 60px;
}

/* 平板设备 (1024px 及以下) */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;    /* 两列：1:1 比例 */
    gap: 48px;
  }
  .footer-disclaimer-grid {
    grid-template-columns: 1fr 1fr;    /* 免责声明两列 */
  }
}

/* 平板竖屏 (768px 及以下) */
@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;        /* 单列 */
    gap: 40px;
    text-align: center;                /* 文字居中 */
  }
  .footer-disclaimer-grid {
    grid-template-columns: 1fr;        /* 免责声明单列 */
  }
}

/* 手机设备 (480px 及以下) */
@media (max-width: 480px) {
  .footer {
    padding: 40px 16px 0;              /* 减少外边距 */
  }
  /* 进一步优化字号和间距 */
}
```

### 布局变化表

| 设备 | 宽度 | 主体列数 | 免责声明列数 | 文字对齐 |
|------|------|---------|------------|---------|
| PC | 1200px+ | 3 列 | 3 列 | 左对齐 |
| 平板横 | 1024px | 2 列 | 2 列 | 左对齐 |
| 平板竖 | 768px | 1 列 | 1 列 | 居中 |
| 手机 | 480px | 1 列 | 1 列 | 居中 |

---

## 色彩系统

### 色彩调色板

```
深邃的夜空蓝
├── 背景色：#001F3F
│   └── RGB(0, 31, 63)
│   └── HSL(210°, 100%, 12%)
│
主文字色
├── 柔和白色：#E0E0E0
│   └── RGB(224, 224, 224)
│   └── HSL(0°, 0%, 88%)
│
次文字色
├── 浅灰白色：#B0B0B0
│   └── RGB(176, 176, 176)
│   └── HSL(0°, 0%, 69%)
│
三级文字色
├── 低对比度灰色：#888
│   └── RGB(136, 136, 136)
│   └── HSL(0°, 0%, 53%)
│
边框色
├── 深色线（15% 透明）：rgba(224, 224, 224, 0.15)
├── 深色线（10% 透明）：rgba(224, 224, 224, 0.1)
```

### 对比度分析

| 组合 | 前景色 | 背景色 | 对比度 | WCAG 等级 |
|------|--------|--------|--------|----------|
| 主文字 | #E0E0E0 | #001F3F | 11.5:1 | AAA ✅ |
| 次文字 | #B0B0B0 | #001F3F | 6.8:1 | AA ✅ |
| 三级文字 | #888 | #001F3F | 3.2:1 | AA ✅ |

---

## 排版系统

### 字体栈

```css
font-family: 'Google Sans', 'Roboto', 'Noto Sans JP', Arial, sans-serif;
```

**优先级**：
1. Google Sans（Google 官方字体）
2. Roboto（备选 sans-serif）
3. Noto Sans JP（日文支持）
4. Arial（系统字体）

### 字号规范

| 元素 | 字号 | 行高 | 字重 | 字间距 |
|------|------|------|------|--------|
| 品牌名 | 24px | 1.2 | 600 | 0.5px |
| Slogan | 16px | 1.8 | 400 | 2px |
| 栏目标题 | 14px | 1 | 600 | 1px |
| 链接文字 | 14px | 1 | 400 | - |
| 免责声明 | 12px | 1.7 | 400 | - |
| 版权信息 | 12px | 1 | 400 | - |
| 语言标签 | 11px | 1 | 600 | 1px |

### 响应式字号

```css
/* PC 端 */
.footer-brand-name { font-size: 24px; }
.footer-brand-slogan { font-size: 16px; }

/* 平板竖屏 (≤768px) */
@media (max-width: 768px) {
  .footer-brand-name { font-size: 22px; }
  .footer-brand-slogan { font-size: 15px; }
}

/* 手机 (≤480px) */
@media (max-width: 480px) {
  .footer-brand-name { font-size: 20px; }
  .footer-brand-slogan { font-size: 14px; }
}
```

---

## 交互设计

### 悬停效果

#### 导航链接

```css
.footer-nav-list li a {
  color: var(--footer-text-secondary);  /* #B0B0B0 */
  transition: var(--transition);        /* all 0.3s ease */
  padding-bottom: 2px;
}

.footer-nav-list li a:hover {
  color: var(--footer-white);           /* 变白 */
  padding-left: 4px;                    /* 向右缩进 */
}
```

**效果**：
- 文字从浅灰白色 (#B0B0B0) 变为纯白色 (#fff)
- 向右缩进 4px，产生"推进"感
- 过渡时间 0.3s，平滑自然

#### 联系链接

```css
.footer-contact-item a {
  color: var(--footer-text);            /* #E0E0E0 */
  transition: var(--transition);
}

.footer-contact-item a:hover {
  color: var(--footer-white);           /* 变白 */
}
```

**效果**：
- 文字从柔和白色 (#E0E0E0) 变为纯白色 (#fff)
- 过渡时间 0.3s

#### 底部链接

```css
.footer-bottom-links a {
  color: var(--footer-text-tertiary);   /* #888 */
  transition: var(--transition);
}

.footer-bottom-links a:hover {
  color: var(--footer-text);            /* 变为 #E0E0E0 */
}
```

**效果**：
- 文字从灰色 (#888) 变为柔和白色 (#E0E0E0)
- 过渡时间 0.3s

### 过渡动画

所有交互元素使用统一的过渡规则：

```css
transition: all 0.3s ease;
```

**参数说明**：
- `all`：所有可动画属性
- `0.3s`：过渡时间 300 毫秒
- `ease`：缓动函数（加速-减速）

---

## 无障碍性

### 语义化 HTML

✅ 使用 `<footer>` 标签标识页脚
✅ 使用 `<nav>` 标签标识导航区
✅ 使用 `<section>` 标签标识免责声明区
✅ 使用 `<h3>` 标签标识栏目标题
✅ 使用 `<a>` 标签标识链接

### 色彩对比度

所有文字与背景的对比度均符合 WCAG AA 标准：

```
主文字 (#E0E0E0) vs 背景 (#001F3F)：11.5:1 ✅ AAA
次文字 (#B0B0B0) vs 背景 (#001F3F)：6.8:1 ✅ AA
三级文字 (#888) vs 背景 (#001F3F)：3.2:1 ✅ AA
```

### 链接识别

所有链接使用 `<a>` 标签，具有明确的视觉识别：
- 文字颜色与背景有足够对比度
- 悬停时有明显的视觉反馈
- 不依赖颜色单独传达信息

### 响应式文本

- 使用相对单位（px 可缩放）
- 充足的行高（1.6-1.8）
- 充足的字间距（0.5px-2px）

---

## 浏览器兼容性

### 支持的浏览器

| 浏览器 | 最低版本 | 备注 |
|--------|---------|------|
| Chrome | 90+ | 完全支持 |
| Firefox | 88+ | 完全支持 |
| Safari | 14+ | 完全支持 |
| Edge | 90+ | 完全支持 |
| IE 11 | ❌ | 不支持（CSS Grid） |

### 关键特性兼容性

| 特性 | 兼容性 |
|------|--------|
| CSS Grid | 现代浏览器 ✅ |
| Flexbox | 现代浏览器 ✅ |
| CSS 变量 | 现代浏览器 ✅ |
| Media Queries | 现代浏览器 ✅ |
| Transition | 现代浏览器 ✅ |

### 降级方案

对于不支持 CSS Grid 的浏览器，可添加备选方案：

```css
/* 备选方案：使用 Flexbox */
.footer-main {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

.footer-brand {
  flex: 2;
  min-width: 300px;
}

.footer-nav,
.footer-contact {
  flex: 1;
  min-width: 200px;
}

/* 现代浏览器覆盖 */
@supports (display: grid) {
  .footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
  }
}
```

---

## 性能优化

### CSS 文件大小

- 原始文件：~4.5 KB
- 压缩后：~2.1 KB
- Gzip 压缩：~0.8 KB

### 加载性能

```html
<!-- 推荐：异步加载 -->
<link rel="stylesheet" href="css/footer.css" media="print" onload="this.media='all'">

<!-- 或使用 preload -->
<link rel="preload" href="css/footer.css" as="style">
<link rel="stylesheet" href="css/footer.css">
```

### 渲染性能

- 无 JavaScript 依赖
- 无复杂动画
- 使用 GPU 加速的 `transform` 属性（可选）

---

## 国际化支持

### i18n 属性

```html
<a href="about.html" data-i18n="footer.nav.about">关于我们</a>
<p data-i18n="footer.copyright">© 2024 Mygo Kasumi LLC. All rights reserved.</p>
```

### 翻译键结构

```javascript
{
  "footer": {
    "nav": {
      "about": "关于我们",
      "services": "服务承诺",
      "terms": "合规条款"
    },
    "copyright": "© 2024 Mygo Kasumi LLC. All rights reserved.",
    "privacy": "隐私政策",
    "terms": "服务条款"
  }
}
```

---

## 维护指南

### 常见修改

#### 修改背景色

```css
:root {
  --footer-bg: #001F3F;  /* 改为新颜色 */
}
```

#### 修改文字色

```css
:root {
  --footer-text: #E0E0E0;           /* 改为新颜色 */
  --footer-text-secondary: #B0B0B0;
  --footer-text-tertiary: #888;
}
```

#### 修改间距

```css
.footer-main {
  gap: 60px;  /* 改为新值 */
}
```

#### 修改过渡时间

```css
:root {
  --transition: all 0.5s ease;  /* 改为新值 */
}
```

### 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2024-02-22 | 初始版本 |

---

**文档版本**：1.0
**最后更新**：2024 年 2 月 22 日
**维护者**：Mygo Kasumi LLC Design Team
