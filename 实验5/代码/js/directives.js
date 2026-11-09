"use strict";
Vue.createApp({
  data() {
    return {
      myClass: "demo-active",
      isActive: true,
      color: "#2257c4",
      fontSize: 18,
      resourceUrl: "https://cn.vuejs.org/",
      resourceName: "Vue官方文档",
      score: 65,
      flag: true,
      books: [
        { id: 1, name: "计算机网络", author: "张功萱" },
        { id: 2, name: "Vue.js前端框架技术与实战", author: "储久良" },
        { id: 3, name: "HTML+CSS+JavaScript页面设计", author: "王大松" },
      ],
      student: { name: "James", age: 19, city: "Chongqing" },
      count: 0,
      now: "",
      numbers: [],
      eventInfo: "尚未触发",
      myName: "",
      hobbies: [],
      sex: "",
      lazyName: "",
      myNo: "",
      myIdea: "",
      trustedHtml:
        '<strong style="color:#2257c4">来自可信静态数据的强调文字</strong>',
    };
  },
  computed: {
    validScore() {
      return (
        typeof this.score === "number" &&
        Number.isFinite(this.score) &&
        this.score >= 0 &&
        this.score <= 100
      );
    },
  },
  methods: {
    showDate() {
      this.now = new Date().toLocaleDateString("zh-CN");
    },
    randomSix(start, end) {
      this.numbers = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * (end - start) + start),
      );
    },
    describeEvent(message, event) {
      this.eventInfo = `${message}：${event.type}，目标 ${event.currentTarget.tagName}`;
    },
  },
}).mount("#app");
