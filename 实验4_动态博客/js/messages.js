/* 留言使用 createElement + textContent + append，不把用户内容拼入 innerHTML。 */
'use strict';
(() => {
  const KEY = 'stack-notes-lab4-messages-v1';
  const store = window.BlogStore;
  const form = document.getElementById('message-form');
  const list = document.getElementById('message-list');
  const status = document.getElementById('message-status');
  const storageStatus = document.getElementById('storage-status');
  const error = document.getElementById('message-error');
  const restored = store.getFromLocal(KEY, []);
  const valid = m => m && typeof m.messageId === 'string' && typeof m.name === 'string'
    && m.name.trim().length >= 1 && m.name.length <= 20 && typeof m.content === 'string'
    && m.content.trim().length >= 1 && m.content.length <= 300 && typeof m.createdAt === 'string'
    && Number.isFinite(Date.parse(m.createdAt));
  let messages = Array.isArray(restored.value) ? restored.value.filter(valid) : [];
  const seen = new Set(); messages = messages.filter(m => !seen.has(m.messageId) && seen.add(m.messageId));
  if (!restored.ok || !Array.isArray(restored.value) || messages.length !== restored.value.length) {
    storageStatus.textContent = '本地数据无法完整读取，已忽略无效记录。当前仍可发表留言。';
  }
  function persist() {
    const result = store.saveToLocal(KEY, messages);
    storageStatus.textContent = result.ok ? '当前全部留言已保存；刷新本页可恢复，数量从留言数组实时计算。'
      : '浏览器未允许写入本地存储；留言仅显示在当前页面，刷新可能丢失。';
    return result.ok;
  }
  function renderMessage() {
    list.replaceChildren();
    document.getElementById('message-count').textContent = `共 ${messages.length} 条留言`;
    document.getElementById('message-empty').hidden = messages.length > 0;
    for (const message of messages) {
      const item = document.createElement('li'); item.className = 'message-item'; item.dataset.id = message.messageId;
      const row = document.createElement('div'); row.className = 'message-header';
      const author = document.createElement('strong'); author.textContent = message.name;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'delete-message';
      button.textContent = '删除'; button.setAttribute('aria-label', `删除 ${message.name} 的这条留言`);
      button.addEventListener('click', () => {
        messages = messages.filter(m => m.messageId !== message.messageId);
        const saved = persist(); renderMessage();
        status.textContent = saved ? '已删除该条留言，本地存储已同步。' : '已从当前页面删除；浏览器存储未能更新。';
      });
      row.append(author, button);
      const content = document.createElement('p'); content.className = 'message-content'; content.textContent = message.content;
      const time = document.createElement('time'); time.className = 'meta'; time.dateTime = message.createdAt;
      time.textContent = new Date(message.createdAt).toLocaleString('zh-CN',{hour12:false});
      item.append(row, content, time); list.append(item);
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim(), content = form.elements.content.value.trim();
    const badName = !name || name.length > 20, badContent = !content || content.length > 300;
    form.elements.name.setAttribute('aria-invalid', String(badName));
    form.elements.content.setAttribute('aria-invalid', String(badContent));
    if (badName || badContent) {
      error.textContent = badName ? '昵称须为 1—20 字，不能只有空格。' : '留言须为 1—300 字，不能只有空格。';
      (badName ? form.elements.name : form.elements.content).focus(); return;
    }
    const messageId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    messages.push({messageId,name,content,createdAt:new Date().toISOString()});
    const saved = persist(); renderMessage(); form.reset();
    status.textContent = saved ? '留言发表成功，并已保存到当前浏览器。' : '留言已显示；当前浏览器无法持久保存。';
  });
  form.addEventListener('reset', () => {
    error.textContent = ''; status.textContent = '';
    form.elements.name.setAttribute('aria-invalid','false'); form.elements.content.setAttribute('aria-invalid','false');
  });
  renderMessage();
})();
