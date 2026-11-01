/* localStorage 只能存字符串；所有读写异常转换成显式结果。 */
'use strict';
window.BlogStore = (() => {
  function saveToLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return {ok:true}; }
    catch (error) { return {ok:false, reason:error.name}; }
  }
  function getFromLocal(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return {ok:true,value:raw === null ? fallback : JSON.parse(raw)};
    } catch (error) { return {ok:false,value:fallback,reason:error.name}; }
  }
  return {saveToLocal,getFromLocal};
})();
