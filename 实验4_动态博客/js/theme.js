/* 实验3换肤：classList + click + mouseenter/leave + 批量绑定。 */
'use strict';
(() => {
  const picker = document.querySelector('.theme-picker');
  if (!picker) return;
  const toggle = document.getElementById('theme-toggle');
  const menu = document.getElementById('theme-menu');
  const choices = document.querySelectorAll('[data-theme]');
  function applyTheme(name) {
    document.body.classList.remove('night', 'forest');
    if (name !== 'day') document.body.classList.add(name);
    toggle.setAttribute('aria-pressed', String(name === 'night'));
    toggle.textContent = name === 'night' ? '更换皮肤 · 夜间' : name === 'forest' ? '更换皮肤 · 森林' : '更换皮肤 · 日间';
    for (let i = 0; i < choices.length; i++) {
      choices[i].setAttribute('aria-pressed', String(choices[i].dataset.theme === name));
    }
  }
  function show() { menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); }
  function hide() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('night') ? 'day' : 'night');
  });
  picker.addEventListener('mouseenter', show);
  picker.addEventListener('mouseleave', hide);
  picker.addEventListener('focusin', show);
  picker.addEventListener('focusout', e => { if (!picker.contains(e.relatedTarget)) hide(); });
  picker.addEventListener('keydown', e => { if (e.key === 'Escape') { hide(); toggle.focus(); hide(); } });
  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', () => { applyTheme(choices[i].dataset.theme); });
  }
})();
