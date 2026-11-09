# Web 全栈开发技术：JavaScript 实验3与实验4

本仓库包含两个可独立运行的原生 HTML / CSS / JavaScript 实验，无需安装前端依赖。

## 本地运行

在仓库根目录执行：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

然后在浏览器打开：

- 实验3：`http://127.0.0.1:8000/实验3_语法与事件/index.html`
- 实验4：`http://127.0.0.1:8000/实验4_动态博客/index.html`

也可直接打开各目录 `index.html`，但 localStorage 的刷新恢复建议使用本地 HTTP 方式验证。

## 实验3：基本语法与事件分析

- `index.html`：成绩统计，显示及格人数、及格率、及格者平均分与名单；支持点击和可选的鼠标移入统计；无人及格时明确显示空结果。
- `register.html`：用户名、邮箱、手机、密码及确认密码的 focus / blur / submit 校验。注册只作前端演示，不创建真实账号，不保存密码；Console 中密码使用隐藏文本。
- `js-basics-es6.html`：25组基础语法与 ES6 练习，包括变量、类型、条件、循环、函数、模板字符串、解构和扩展运算符。
- `loading-head.html`、`loading-tail.html`、`loading-external.html`：对比三种脚本放置方式，理解 window.onload 与 DOM 可用时机。
- `js/theme.js`：classList 日夜换肤、二级主题菜单、querySelectorAll + for 批量绑定三种主题。

## 实验4：动态页面与数据驱动交互

- `js/data.js`：独立文章数据数组；`js/blog.js` 通过模板字符串与 innerHTML 动态创建文章列表，输出前转义可变文本。
- 标题关键词与分类联合查询、查询重置、结果数量及空状态；搜索不修改原始数据数组。
- `js/messages.js`：createElement / textContent / append 创建留言节点，支持多条留言、计数和按唯一 messageId 删除。
- `js/storage.js`：JSON 序列化读写 localStorage；刷新恢复、结构验证、损坏缓存与存储拒绝的异常提示。
- `js/timer.js`：阅读计时器，支持暂停、继续、归零、页面隐藏自动暂停及清理定时器。
- `article.html?id=1`：文章详情；未知编号显示回退提示。

## 验证

本地已完成116项浏览器检查，覆盖关键交互、表单边界、无数据与无匹配结果、留言刷新恢复与删除、异常存储以及320px至1440px布局。浏览器为 Microsoft Edge（Chromium 内核）。

## 数据说明

文章及成绩为练习用模拟数据。留言只保存在当前浏览器和当前来源下，不会跨浏览器同步，也不会上传服务器。前端校验不能替代真实注册系统的服务端校验。


## 新增：Vue实验5与实验6

已追加Vue3选项式API博客、八组指令、TodoList、局部组件与Hash路由，以及Vite/SFC生产构建。详见[Vue实验说明](Vue实验说明.md)。原实验3、4目录保留。
