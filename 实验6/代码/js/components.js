"use strict";
(() => {
  const PostCard = {
    name: "PostCard",
    props: { article: { type: Object, required: true } },
    template: `<article class="article-card"><div class="article-top"><span class="tag">{{article.category}}</span><time class="meta">{{article.date}}</time></div><h3><router-link :to="'/post/'+article.id">{{article.title}}</router-link></h3><p>{{article.summary}}</p><router-link class="read" :to="'/post/'+article.id">阅读笔记 · 约 {{article.minutes}} 分钟 →</router-link></article>`,
  };
  const SearchPanel = {
    name: "SearchPanel",
    props: {
      keyword: { type: String, default: "" },
      category: { type: String, default: "" },
    },
    emits: {
      "update:keyword": (v) => typeof v === "string",
      "update:category": (v) => typeof v === "string",
      reset: () => true,
    },
    template: `<form class="panel" @submit.prevent><div class="search-grid"><div class="field"><label for="keyword">标题关键词 · 即时搜索</label><input id="keyword" type="search" :value="keyword" @input="$emit('update:keyword',$event.target.value)" placeholder="例如 CSS"></div><div class="field"><label for="category">分类</label><select id="category" :value="category" @change="$emit('update:category',$event.target.value)"><option value="">全部分类</option><option>HTML</option><option>CSS</option><option>JavaScript</option></select></div><button type="button" class="secondary" id="reset-search" @click="$emit('reset')">重置</button></div></form>`,
  };
  const MessageBoard = {
    name: "MessageBoard",
    props: {
      messages: { type: Array, required: true },
      storageNote: { type: String, default: "" },
    },
    emits: {
      create: (v) =>
        v && typeof v.name === "string" && typeof v.content === "string",
      remove: (id) => typeof id === "string",
    },
    data() {
      return { nickname: "", draft: "", error: "", status: "" };
    },
    methods: {
      time: window.LabUtils.time,
      submit() {
        const name = this.nickname.trim(),
          content = this.draft.trim();
        if (!name || name.length > 20 || !content || content.length > 300) {
          this.error = "请填写1—20字昵称和1—300字留言。";
          return;
        }
        this.$emit("create", { name, content });
        this.nickname = "";
        this.draft = "";
        this.error = "";
        this.status = "已通知父组件添加留言。";
        this.$nextTick(() => this.$refs.nicknameInput.focus());
      },
    },
    template: `<section class="panel" id="guestbook"><p class="eyebrow">PROPS DOWN / EVENTS UP</p><h2>给博客留一条消息</h2><form id="message-form" @submit.prevent="submit"><div class="field"><label for="nickname">昵称（1—20字）</label><input id="nickname" ref="nicknameInput" v-model.trim="nickname" maxlength="20" aria-describedby="message-error"></div><div class="field"><label for="message">留言（1—300字）</label><textarea id="message" v-model.trim="draft" maxlength="300" aria-describedby="message-error"></textarea></div><button type="submit">发表留言</button><p id="message-error" class="hint error">{{error}}</p><p class="meta" role="status">{{status}}</p></form><p class="storage-note" id="storage-note">{{storageNote||'仅在当前浏览器保存。'}}</p><div class="section-title"><h3>留言列表</h3><p class="meta" id="message-count">共 {{messages.length}} 条留言</p></div><p v-if="!messages.length" id="message-empty" class="muted">还没有留言。</p><ul class="message-list"><li v-for="message in messages" :key="message.id" class="message-item"><div class="message-header"><strong>{{message.name}}</strong><button class="delete-message" type="button" @click="$emit('remove',message.id)" :aria-label="'删除'+message.name+'的留言'">删除</button></div><p class="message-content">{{message.content}}</p><time class="meta" :datetime="message.at">{{time(message.at)}}</time></li></ul></section>`,
  };
  const LocalHint = {
    name: "LocalHint",
    data() {
      return { title: "这是在About视图中局部注册的组件。" };
    },
    template:
      '<div class="component-demo"><h3 :title="title">局部组件已注册</h3><p>{{title}} 其他视图没有自动获得它的注册。</p></div>',
  };
  const UserCard = {
    name: "UserCard",
    props: {
      name: { type: String, required: true },
      age: { type: Number, default: 19 },
      tags: { type: Array, default: () => [] },
    },
    emits: {
      greet: (message) => typeof message === "string" && message.length > 0,
    },
    methods: {
      send() {
        this.$emit("greet", `大家好，我是${this.name}，今年${this.age}岁。`);
      },
    },
    template: `<div class="component-demo"><h3>子组件收到的资料</h3><p>{{name}} · {{age}}岁 · {{tags.join(' / ')}}</p><button id="greet-button" type="button" @click="send">向父组件打招呼</button></div>`,
  };
  window.LabComponents = {
    PostCard,
    SearchPanel,
    MessageBoard,
    LocalHint,
    UserCard,
  };
})();
