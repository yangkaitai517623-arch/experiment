import * as Vue from "vue";
import * as VueRouter from "vue-router";
import "../shared/site.css";
window.Vue = Vue;
window.VueRouter = VueRouter;
window.lab5Href = new URL(
  "../../../实验5/代码/index.html",
  document.baseURI,
).href;
await import("../shared/vue-data.js");
await import("../shared/utils.js");
await import("../shared/components.js");
await import("../shared/application.js");
window.labRoot = window.createLabRootOptions();
const { default: App } = await import("./App.vue");
Vue.createApp(App).use(window.labRoot.router).mount("#app");
