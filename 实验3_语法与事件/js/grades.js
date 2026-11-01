/* 纯统计函数不改写原数组；页面事件只负责读取条件和呈现结果。 */
'use strict';
const students = Object.freeze([
  { name:'林晓', score:92 }, { name:'陈晨', score:85 }, { name:'王宁', score:78 },
  { name:'李悦', score:64 }, { name:'周航', score:58 }, { name:'赵一', score:43 }
]);
function calculateGrades(data, threshold) {
  const passed = data.filter(student => student.score >= threshold);
  const total = passed.reduce((sum, student) => sum + student.score, 0);
  return { count:passed.length, rate:data.length ? passed.length / data.length * 100 : 0,
    average:passed.length ? total / passed.length : null, names:passed.map(s => s.name) };
}
document.getElementById('grade-rows').replaceChildren(...students.map(student => {
  const row = document.createElement('tr');
  for (const value of [student.name, student.score]) {
    const cell = document.createElement('td'); cell.textContent = String(value); row.append(cell);
  }
  return row;
}));
const statsButton = document.querySelector('#stats-button');
function renderStats(trigger) {
  const threshold = Number(document.querySelector('#threshold').value);
  const result = calculateGrades(students, threshold);
  document.querySelector('#pass-count').textContent = result.count;
  document.querySelector('#pass-rate').textContent = result.rate.toFixed(1) + '%';
  document.querySelector('#pass-average').textContent = result.average === null ? '—' : result.average.toFixed(2);
  document.querySelector('#pass-names').textContent = result.names.length ? '及格名单：' + result.names.join('、') : '当前及格线下暂无及格学生。';
  document.querySelector('#stats-summary').textContent = `及格线 ${threshold} 分，班级共 ${students.length} 人；由${trigger}触发。平均分仅针对及格学生。`;
  document.querySelector('#stats-result').hidden = false;
}
// onclick 小写；赋值绑定与 addEventListener 两种方式分别演示。
statsButton.onclick = () => renderStats('点击');
statsButton.addEventListener('mouseenter', () => {
  if (document.getElementById('hover-stats').checked) renderStats('鼠标移入');
});
