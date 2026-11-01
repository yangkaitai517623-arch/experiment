/* 原生 form.submit 事件；novalidate 让自定义提示完整演示。 */
'use strict';
const form = document.getElementById('register-form');
const statusBox = document.getElementById('register-status');
const fields = ['username','email','phone','password','confirm'];
const rules = {
  username: {tip:'4—12 位字母、数字或下划线。', regex:/^\w{4,12}$/, error:'用户名须为 4—12 位字母、数字或下划线。'},
  email: {tip:'请输入完整邮箱，例如 student@example.com。', regex:/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/, error:'请输入有效的邮箱地址。'},
  phone: {tip:'以 1 开头的 11 位数字。', regex:/^1\d{10}$/, error:'手机号码须为以 1 开头的 11 位数字。'},
  password: {tip:'8—20 位，至少包含字母和数字，不允许空格。', regex:/^(?=.*[A-Za-z])(?=.*\d)\S{8,20}$/, error:'密码须为 8—20 位，包含字母和数字且无空格。'},
  confirm: {tip:'请再次输入与密码完全一致的内容。'}
};
function setHint(name, text, kind) {
  const hint = document.getElementById(name + '-hint');
  hint.textContent = text; hint.className = 'hint' + (kind ? ' ' + kind : '');
  document.getElementById(name).setAttribute('aria-invalid', String(kind === 'error'));
}
function validateField(name) {
  const input = document.getElementById(name);
  // 密码原样校验，不用 trim 静默改变用户密码。
  const value = ['password','confirm'].includes(name) ? input.value : input.value.trim();
  let message = '';
  if (!value) message = '此项不能为空。';
  else if (name === 'confirm') {
    if (value !== document.getElementById('password').value) message = '两次输入的密码不一致。';
  } else if (!rules[name].regex.test(value)) message = rules[name].error;
  setHint(name, message || '格式正确。', message ? 'error' : 'success');
  return !message;
}
for (const name of fields) {
  const input = document.getElementById(name);
  input.addEventListener('focus', () => {
    // 聚焦时解释规则，不删除已有错误；修改输入后会重新校验。
    if (input.getAttribute('aria-invalid') !== 'true') setHint(name, rules[name].tip, '');
  });
  input.addEventListener('blur', () => validateField(name));
  input.addEventListener('input', () => {
    statusBox.hidden = true;
    if (input.getAttribute('aria-invalid') === 'true') validateField(name);
    if (name === 'password' && document.getElementById('confirm').value) validateField('confirm');
  });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const results = fields.map(name => validateField(name));
  statusBox.hidden = false;
  if (results.every(Boolean)) {
    const data = { username:form.elements.username.value.trim(), email:form.elements.email.value.trim(),
      phone:form.elements.phone.value.trim(), password:'[已隐藏]', confirm:'[已隐藏]' };
    console.log('注册表单校验通过（密码已隐藏）：', data);
    statusBox.className = 'notice success';
    statusBox.textContent = `校验通过，${data.username}！表单数据已输出到控制台（密码隐藏）。这是前端演示，未创建真实账号。`;
  } else {
    statusBox.className = 'notice error';
    statusBox.textContent = '提交未通过，请按字段提示修改后重新提交。';
    document.getElementById(fields[results.indexOf(false)]).focus();
  }
});
form.addEventListener('reset', () => {
  for (const name of fields) setHint(name, '', '');
  statusBox.hidden = true;
});
