/* Vue3选项式API：data存状态，computed派生列表，watch处理副作用。 */
"use strict";
Vue.createApp({
  data() {
    const loaded = LabUtils.load("vue-lab5-messages", LabUtils.validMessage);
    return {
      articles: window.blogArticles,
      keyword: "",
      category: "",
      searchFeedback: "尚未输入关键词，当前显示全部文章。",
      messages: loaded.value,
      nickname: "",
      draft: "",
      messageError: "",
      messageStatus: "",
      storageNote: loaded.note,
      night: false,
      vueVersion: Vue.version,
    };
  },
  computed: {
    filteredArticles() {
      const word = this.keyword.trim().toLowerCase();
      return this.articles.filter(
        (a) =>
          a.title.toLowerCase().includes(word) &&
          (!this.category || a.category === this.category),
      );
    },
  },
  watch: {
    keyword(value, old) {
      this.searchFeedback = `关键词由“${old || "空"}”变为“${value || "空"}”；匹配 ${this.filteredArticles.length} 篇。`;
    },
    category(value) {
      this.searchFeedback = `分类：${value || "全部"}，当前匹配 ${this.filteredArticles.length} 篇。`;
    },
    messages: {
      deep: true,
      handler(value) {
        this.storageNote = LabUtils.save("vue-lab5-messages", value);
      },
    },
  },
  methods: {
    formatTime: LabUtils.time,
    announceSearch() {
      this.searchFeedback = `当前查询匹配 ${this.filteredArticles.length} 篇文章。`;
    },
    resetSearch() {
      this.keyword = "";
      this.category = "";
      this.searchFeedback = "已清空搜索条件。";
    },
    resetMessage() {
      this.nickname = "";
      this.draft = "";
      this.messageError = "";
      this.messageStatus = "";
      this.$refs.nicknameInput.focus();
    },
    addMessage() {
      const name = this.nickname.trim(),
        content = this.draft.trim();
      if (!name || name.length > 20 || !content || content.length > 300) {
        this.messageError = "请填写1—20字昵称和1—300字留言，不能只有空格。";
        this.messageStatus = "";
        return;
      }
      this.messages.push({
        id: LabUtils.uid(),
        name,
        content,
        at: new Date().toISOString(),
      });
      this.nickname = "";
      this.draft = "";
      this.messageError = "";
      this.messageStatus = "留言已加入列表。保存状态见下方说明。";
      this.$nextTick(() => this.$refs.nicknameInput.focus());
    },
    deleteMessage(id) {
      this.messages = this.messages.filter((m) => m.id !== id);
      this.messageStatus = "已删除这条留言。";
    },
  },
}).mount("#app");
