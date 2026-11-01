/* 文章使用模板字符串+innerHTML；所有可变文本先转义。 */
'use strict';
const articles = Array.isArray(window.blogArticles) ? window.blogArticles : [];
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function renderData(data = articles) {
  const list = document.getElementById('article-list');
  document.getElementById('article-count').textContent = `显示 ${data.length} / 共 ${articles.length} 篇文章`;
  if (!data.length) {
    list.innerHTML = `<section class="empty-state"><h3>${articles.length ? '没有找到相关文章' : '暂时没有文章'}</h3><p>${articles.length ? '换一个关键词或分类，或点击重置查看全部。' : '请先在 data.js 中添加文章数据。'}</p></section>`;
    return;
  }
  let html = '';
  for (const article of data) {
    html += `<article class="article-card"><div class="article-top"><span class="tag">${escapeHtml(article.category)}</span><time class="meta">${escapeHtml(article.date)}</time></div><h3><a href="article.html?id=${encodeURIComponent(article.id)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.summary)}</p><a class="read" href="article.html?id=${encodeURIComponent(article.id)}">阅读文章 · 约 ${escapeHtml(article.minutes)} 分钟 →</a></article>`;
  }
  list.innerHTML = html;
}
function filterArticles(data, keyword, category) {
  const normalized = keyword.trim().toLocaleLowerCase();
  return data.filter(article => article.title.toLocaleLowerCase().includes(normalized)
    && (!category || article.category === category));
}
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  renderData(filterArticles(articles, searchForm.elements.keyword.value, searchForm.elements.category.value));
});
searchForm.addEventListener('reset', () => {
  // reset 默认行为随后清空控件；渲染直接使用原始数组，避免读取旧控件值。
  renderData(articles);
});
renderData(articles);
