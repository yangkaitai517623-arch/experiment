/* 实验3-1、3-2：每个示例独立作用域，避免重复 const、错误变量名导致中断。 */
'use strict';
(() => {
  function runExamples() {
    const output = document.querySelector('#syntax-output');
    output.textContent = '';
    const lines = [];
    const log = (label, value) => {
      const text = label + '：' + (typeof value === 'string' ? value : JSON.stringify(value));
      lines.push(text); console.log(label, value);
    };
    const PI = 3.14159; let age = 18; age = 22;
    log('01 const / let', {PI,age});
    const primitive = {string:'cqut.edu.cn',number:60.5,boolean:true,nullValue:null};
    log('02 基本类型', primitive); log('03 undefined 的类型', typeof undefined);
    const person = {name:'James',age:19,sayYes(){return 'yes';}};
    log('04 对象方法', person.sayYes());
    const values = [3,66,13]; const pushedLength = values.push(28); const removed = values.pop();
    log('05 push / pop', {pushedLength,removed,values});
    const sequence = []; for (let i=0;i<4;i++) sequence.push(i);
    log('06 for 循环', sequence);
    const callbacks = []; for (let i=0;i<10;i++) callbacks[i]=()=>i;
    log('07 let 块作用域 closures[4]()',callbacks[4]());
    const mixed = ['重庆理工大学','cqut.edu.cn',100]; const walked=[];
    for (const item of mixed) walked.push(item);
    log('08 for...of', walked);
    const indexed=[]; mixed.forEach((value,index)=>indexed.push(`${index}:${value}`));
    log('09 forEach', indexed);
    function add(a,b){return a+b;} const sub=function(a,b){return a-b;};const plus=(a,b)=>a+b;
    log('10 三种函数', {add:add(1,2),sub:sub(30,5),arrow:plus(10,20)});
    const mark=78;log('11 if 条件',mark>=60?'及格':'未及格');
    log('12 String 方法', {includes:'chongqing'.includes('chong'),trim:'  HTML  '.trim(),split:'HTML,CSS,JS'.split(',')});
    log('13 filter / map', [43,64,92].filter(x=>x>=60).map(x=>`成绩${x}`));
    log('14 Number 方法', {parseInt:Number.parseInt('88px',10),toFixed:(78.5).toFixed(2)});
    const product='手机',price=2999;log('15 模板字符串',`商品：${product}，价格：${price}元`);
    log('16 模板表达式',`${10} + ${5} = ${10+5}`);
    log('17 多行模板',`第一行
第二行
第三行`);
    log('18 ES6 字符串新增', {includes:'chongqing'.includes('chong'),startsWith:'chongqing'.startsWith('ch'),endsWith:'chongqing'.endsWith('ing')});
    const [first,second]=[14,34,23];log('19 数组解构',{first,second});
    const {name:userName,age:userAge}=person;log('20 对象解构与重命名',{userName,userAge});
    const name='James',years=19;const short={name,years,sayHello(){return 'Hello';}};
    log('21 对象简写与方法简写',{name:short.name,hello:short.sayHello()});
    const [A,...B]=[1,2,3,4,5,6];log('22 剩余解构',{A,B});
    const original=[1,2],copy=[...original,3,4];log('23 扩展合并数组',{original,copy});
    const updated={...person,age:20};log('24 对象展开（浅复制）',{sourceAge:person.age,updatedAge:updated.age});
    const sum=(...nums)=>nums.reduce((a,b)=>a+b,0);log('25 剩余参数',sum(1,2,3,4));
    output.textContent=lines.join('\n');
    document.querySelector('#syntax-count').textContent=`已运行 ${lines.length} 组示例；相同结果同时输出到 Console。`;
  }
  document.querySelector('#run-syntax').addEventListener('click',runExamples);
  runExamples();
})();
