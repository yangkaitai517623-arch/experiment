/* 共用函数：所有页面数据写回都有显式结果，不隐瞒存储失败。 */
"use strict";
window.LabUtils = {
  uid() {
    return (
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
  },
  load(key, valid) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return { value: [], note: "" };
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("结构不是数组");
      const seen = new Set();
      const value = parsed.filter(
        (x) => valid(x) && !seen.has(x.id) && seen.add(x.id),
      );
      return {
        value,
        note:
          value.length === parsed.length ? "" : "已过滤无效或重复的本地记录。",
      };
    } catch (e) {
      return { value: [], note: "缓存读取失败，已回退空列表；仍可继续使用。" };
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return "已保存到当前浏览器，刷新可恢复。";
    } catch (e) {
      return "本地存储不可用，当前内容刷新后可能丢失。";
    }
  },
  validMessage(x) {
    return (
      x &&
      typeof x.id === "string" &&
      typeof x.name === "string" &&
      x.name.trim().length > 0 &&
      x.name.length <= 20 &&
      typeof x.content === "string" &&
      x.content.trim().length > 0 &&
      x.content.length <= 300 &&
      typeof x.at === "string" &&
      Number.isFinite(Date.parse(x.at))
    );
  },
  validTodo(x) {
    return (
      x &&
      typeof x.id === "string" &&
      typeof x.text === "string" &&
      x.text.trim().length > 0 &&
      x.text.length <= 120 &&
      typeof x.done === "boolean"
    );
  },
  time(iso) {
    return new Date(iso).toLocaleString("zh-CN", { hour12: false });
  },
};
