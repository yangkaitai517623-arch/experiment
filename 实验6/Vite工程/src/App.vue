<script>
import BuildInfo from "./components/BuildInfo.vue";
export default {
  name: "ViteApplication",
  components: { BuildInfo },
  data() {
    return { BlogRoot: window.labRoot.options };
  },
};
</script>
<template><BuildInfo /><component :is="BlogRoot" /></template>
