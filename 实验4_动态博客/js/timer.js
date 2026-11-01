/* 计时器扩展：Date.now 计算时差，减少 setInterval 延迟导致的累积误差。 */
'use strict';
(() => {
  const display = document.getElementById('read-timer');
  if (!display) return;
  const toggle = document.getElementById('timer-toggle');
  const state = document.getElementById('timer-state');
  let elapsed = 0, started = Date.now(), paused = false, interval = null;
  function current() { return elapsed + (started === null ? 0 : Date.now() - started); }
  function render() {
    const seconds = Math.floor(current()/1000);
    display.textContent = String(Math.floor(seconds/60)).padStart(2,'0') + ':' + String(seconds%60).padStart(2,'0');
    state.textContent = paused ? '已暂停' : document.hidden ? '页面在后台，自动暂停' : '正在计时';
  }
  function sync() {
    if (started !== null) elapsed += Date.now() - started;
    started = null;
    if (interval !== null) clearInterval(interval);
    interval = null;
    if (!paused && !document.hidden) { started = Date.now(); interval = setInterval(render,250); }
    toggle.textContent = paused ? '继续' : '暂停'; render();
  }
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  document.getElementById('timer-reset').addEventListener('click',()=>{
    elapsed=0;started=null;sync();
  });
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',()=>{ if(interval!==null) clearInterval(interval); });
  window.addEventListener('pageshow',sync);
  sync();
})();
