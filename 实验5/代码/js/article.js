/* id 必须对应真实数据；未知文章显示提示，避免错误详情。 */
"use strict";
(() => {
  const id = new URLSearchParams(location.search).get("id");
  const article = window.blogArticles.find((a) => String(a.id) === id);
  const target = document.getElementById("article-detail");
  const escape = (text) =>
    String(text).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  if (!article) {
    target.innerHTML =
      '<h1>没有找到这篇文章</h1><p>文章编号不存在，请返回文章列表。</p><a href="index.html">返回首页</a>';
    return;
  }
  const paragraphs = {
    1: [
      "语义标签表达内容的用途。header 放页头，nav 表示导航，main 放主要内容，article 表示可独立阅读的文章，aside 放补充信息。",
      "布局与语义分工不同：HTML 提供结构，CSS 的盒模型决定尺寸，Flex 负责安排主内容与侧栏。容器设置 gap 后，可以避免依赖不易追踪的外边距。",
      "检查页面时，先看标题层级与链接目标，再查看图片替代文本与键盘焦点。把结构写清楚，会降低后续交互代码查找节点的难度。",
    ],
    2: [
      "默认 content-box 中，width 只控制内容区。若设置 width 300px、左右 padding 20px 和 border 1px，边框盒总宽度就是 342px。",
      "改为 border-box 后，width 包含内容、padding 和 border，总宽度为 300px，内容宽度为 258px。margin 始终位于边框之外。",
      "Flex 两栏可用 .feed { flex: 1; min-width: 0; } 与固定侧栏组合；窄屏再通过媒体查询修改主轴方向。",
    ],
    3: [
      "事件让程序在用户操作时运行。click 适合按钮触发，mouseenter 与 mouseleave 适合菜单显隐，focus 与 blur 适合表单提示和验证。",
      "监听 submit 应绑定在 form 上。回调中调用 preventDefault，可阻止默认导航，再由自己的代码读取输入、校验数据并更新界面。",
      "数据校验与界面渲染应分开。相同校验函数既可在 blur 中调用，也可在 submit 时整体执行，避免两套规则产生冲突。",
    ],
    4: [
      "留言中包含用户输入，使用 textContent 可以把标签文字原样显示。createElement 创建 li、strong、p 和 button，append 负责建立层级关系。",
      "每条留言要有唯一 messageId。删除时按标识过滤数组，再重新渲染列表与数量，避免用数组下标删除错误的留言。",
      "数组是留言的状态来源，页面和本地存储都是它的投影。每次变化遵循“更新状态、保存、渲染”的顺序，数量由数组长度实时计算。",
    ],
    5: [
      "解构赋值便于从对象中取出所需字段，箭头函数适合短小的数据处理回调。使用 let 和 const 可以避免函数级变量在循环中的意外共享。",
      "filter 返回符合条件的新数组，map 用于转换数据，includes 可实现标题子串匹配。搜索只更新显示结果，不修改原始文章数组。",
      "扩展运算符可以合并数组或复制对象第一层属性，但这是浅复制。嵌套对象仍然可能共享引用，需要根据数据结构选择合适策略。",
    ],
    6: [
      "响应式布局应优先考虑阅读顺序。桌面上文章与侧栏并排，小屏时把侧栏放到文章之后，搜索框和分类控件也改成纵向排列。",
      "图片使用 max-width: 100%，Flex 子项设置 min-width: 0，长文本采用 overflow-wrap。代码区可以独立滚动，避免撑开整页。",
      "在 320px、390px、768px 和桌面宽度下检查布局。键盘焦点、触摸目标和减少动态效果的偏好，也应一起考虑。",
    ],
  };
  document.title = article.title + " | 栈间笔记";
  target.innerHTML = `<header class="article-heading"><span class="tag">${escape(article.category)}</span><h1>${escape(article.title)}</h1><p class="meta">${escape(article.date)} · 约 ${article.minutes} 分钟阅读</p></header><div class="article-body"><p>${escape(article.summary)}</p>${paragraphs[article.id].map((p, i) => `<section><h2>${["理解问题", "实现方法", "检查与思考"][i]}</h2><p>${escape(p)}</p></section>`).join("")}</div><footer class="article-end"><a href="index.html#articles">← 返回文章列表</a></footer>`;
})();
