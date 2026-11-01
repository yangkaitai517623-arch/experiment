'use strict';
const externalButton=document.getElementById('demo-button');
const externalLog=document.getElementById('placement-log');
externalLog.textContent='外部脚本已加载，按钮查找成功。';
externalButton.addEventListener('click',()=>{console.log('外部文件按钮触发');externalLog.textContent+='\n点击事件触发：独立 JS 文件。';});
