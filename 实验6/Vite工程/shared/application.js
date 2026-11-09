"use strict";
window.createLabRootOptions = function () {
  const { PostCard, SearchPanel, MessageBoard, LocalHint, UserCard } =
    window.LabComponents;
  const loaded = LabUtils.load("vue-lab6-messages", LabUtils.validMessage);
  const state = Vue.reactive({
    articles: window.blogArticles,
    keyword: "",
    category: "",
    messages: loaded.value,
    storageNote: loaded.note,
    night: false,
  });
  const HomeView = {
    name: "HomeView",
    components: { PostCard, SearchPanel, MessageBoard },
    data() {
      return {
        state,
        lab5Href: window.lab5Href || "../../实验5/代码/index.html",
      };
    },
    computed: {
      filteredArticles() {
        const word = this.state.keyword.trim().toLowerCase();
        return this.state.articles.filter(
          (a) =>
            a.title.toLowerCase().includes(word) &&
            (!this.state.category || a.category === this.state.category),
        );
      },
    },
    methods: {
      reset() {
        this.state.keyword = "";
        this.state.category = "";
      },
      createMessage(payload) {
        const name = payload.name.trim(),
          content = payload.content.trim();
        if (!name || name.length > 20 || !content || content.length > 300)
          return;
        this.state.messages.push({
          id: LabUtils.uid(),
          name,
          content,
          at: new Date().toISOString(),
        });
      },
      removeMessage(id) {
        this.state.messages = this.state.messages.filter((m) => m.id !== id);
      },
    },
    template: `<div><section class="hero"><div class="container hero-row"><div class="hero-copy"><span class="hero-label">VUE / COMPONENTS & ROUTER</span><h1>把页面，组织成能复用的部分。</h1><p>文章卡片、搜索面板和留言板各司其职。沿着导航，探索同一个应用里的不同视图。</p></div><img class="hero-art" src="assets/stack.svg" width="480" height="280" alt="层叠知识卡片"></div></section><main class="container layout"><div class="feed"><section id="articles"><div class="section-title"><h2>我的学习笔记</h2><span id="article-count" class="meta">显示 {{filteredArticles.length}} / 共 {{state.articles.length}} 篇文章</span></div><search-panel v-model:keyword="state.keyword" v-model:category="state.category" @reset="reset"></search-panel><section v-if="!filteredArticles.length" class="empty-state"><h3>{{state.articles.length?'没有找到相关文章':'暂时没有文章'}}</h3><p>修改条件或点击重置。</p></section><div id="article-list"><post-card v-for="article in filteredArticles" :key="article.id" :article="article"></post-card></div></section><message-board :messages="state.messages" :storage-note="state.storageNote" @create="createMessage" @remove="removeMessage"></message-board></div><aside class="sidebar"><section class="panel"><h3>组件化之后</h3><p class="muted">父组件拥有状态，子组件接收props，并通过emit发出操作意图。</p></section><section class="panel"><h3>应用导航</h3><p><router-link to="/about">关于与组件通信 →</router-link></p><p><a :href="lab5Href">对照实验5实现 →</a></p></section></aside></main></div>`,
  };
  const AboutView = {
    name: "AboutView",
    components: { LocalHint, UserCard },
    data() {
      return {
        greeting: "",
        profile: { name: "James", age: 19, tags: ["Vue", "学习记录"] },
      };
    },
    methods: {
      showGreeting(message) {
        this.greeting = message;
      },
    },
    template: `<main class="container register-wrap"><section class="panel"><p class="eyebrow">LOCAL COMPONENTS / PROPS / EMITS</p><h1>关于栈间笔记</h1><p class="muted">这个页面演示局部注册、类型明确的props与子组件自定义事件。</p><local-hint></local-hint><user-card :name="profile.name" :age="profile.age" :tags="profile.tags" @greet="showGreeting"></user-card><p v-if="greeting" id="greeting" class="notice" role="status">父组件收到：{{greeting}}</p><router-link to="/">← 返回博客</router-link></section></main>`,
  };
  const PostView = {
    name: "PostView",
    data() {
      return { state };
    },
    computed: {
      article() {
        return this.state.articles.find(
          (a) => String(a.id) === this.$route.params.id,
        );
      },
    },
    template: `<main class="container register-wrap"><article v-if="article" class="panel"><span class="tag">{{article.category}}</span><h1 class="detail-title">{{article.title}}</h1><p class="meta">{{article.date}} · 约{{article.minutes}}分钟</p><div class="article-body"><h2>学习记录</h2><p>{{article.summary}}</p><h2>从数据到视图</h2><p>此页通过动态路由参数查找文章对象。标题、类别和摘要均来自独立数据文件，切换编号时由计算属性重新取值。</p><h2>实现与检查</h2><p>先明确数据结构和状态归属，再处理用户输入、查询与渲染。文章详情与列表共用唯一标识；未知编号会显示回退提示。</p></div><div class="article-end"><router-link to="/">← 返回列表，保留搜索条件</router-link></div></article><section v-else class="panel"><h1>没有找到这篇文章</h1><p>请检查文章编号或返回列表。</p><router-link to="/">返回首页</router-link></section></main>`,
  };
  const NotFound = {
    template:
      '<main class="container register-wrap"><section class="panel"><h1>页面不存在</h1><p>这个路径没有对应视图。</p><router-link to="/">返回首页</router-link></section></main>',
  };
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      { path: "/", component: HomeView },
      { path: "/about", component: AboutView },
      { path: "/post/:id", component: PostView },
      { path: "/:pathMatch(.*)*", component: NotFound },
    ],
    scrollBehavior() {
      return { top: 0 };
    },
  });
  const options = {
    name: "BlogApplication",
    data() {
      return { state, version: Vue.version };
    },
    watch: {
      "state.messages": {
        deep: true,
        handler(value) {
          this.state.storageNote = LabUtils.save("vue-lab6-messages", value);
        },
      },
    },
    template: `<div class="app-shell" :class="{night:state.night}"><header class="site-header"><div class="container header-row"><router-link class="brand" to="/"><img src="assets/logo.svg" width="36" height="36" alt="">栈间笔记</router-link><nav class="nav" aria-label="主导航"><router-link to="/">博客</router-link><router-link to="/about">关于与组件通信</router-link><button id="theme-toggle" type="button" @click="state.night=!state.night" :aria-pressed="state.night">{{state.night?'恢复日间':'切换夜间'}}</button></nav></div></header><router-view></router-view><footer class="site-footer"><div class="container footer-row"><p>栈间笔记 · Vue {{version}} · Vue Router</p><router-link to="/">返回博客</router-link></div></footer></div>`,
  };
  return { options, router };
};
