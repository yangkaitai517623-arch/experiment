# Vue实验5与实验6

## 运行

在仓库根目录运行 `python -m http.server 8000 --bind 127.0.0.1`。

- 实验5：`http://127.0.0.1:8000/实验5/代码/index.html`
- 指令练习：`实验5/代码/directives.html`
- TodoList：`实验5/代码/todos.html`
- 实验6：`http://127.0.0.1:8000/实验6/代码/index.html`

Vue 3.5.44与Vue Router 4.6.3已固定下载到vendor，主版本不需要npm、不需要CDN。

## 已完成内容

实验5使用Vue3选项式API，包含八组指令练习、computed即时搜索、watch变化反馈、ref聚焦、留言增删和深度watch本地持久化，以及可添加/完成/编辑/删除/分类/统计的TodoList。

实验6包含PostCard、SearchPanel、MessageBoard局部组件，props和emits的单向数据流，About局部注册与父子问候示例，Hash路由、动态文章参数、未知编号及404回退，切换视图保留查询和留言。

## Vite扩展

进入`实验6/Vite工程`执行`npm ci`、`npm run dev`。生产构建为`npm run build`，预览为`npm run preview`。工程含App.vue和BuildInfo.vue，复用同一套选项式组件；执行构建后会生成dist；本地提交包另含已验证的构建产物。依赖采用锁文件，不提交node_modules。

本实现为教学用客户端应用。留言和任务只存同源浏览器，不含后端账号或跨设备同步。v-html仅展示可信静态片段；用户留言使用文本插值。

浏览器验证共130项通过，覆盖指令、表单、状态变化、缓存异常、组件通信、路由、5档布局与生产构建运行。
