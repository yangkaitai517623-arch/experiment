"use strict";
Vue.createApp({
  data() {
    const restored = LabUtils.load("vue-lab5-todos", LabUtils.validTodo);
    return {
      todos: restored.value,
      taskText: "",
      filter: "all",
      filters: [
        { value: "all", label: "全部" },
        { value: "active", label: "未完成" },
        { value: "done", label: "已完成" },
      ],
      editingId: null,
      editText: "",
      editInput: null,
      error: "",
      storageNote: restored.note,
    };
  },
  computed: {
    visibleTodos() {
      return this.todos.filter(
        (t) =>
          this.filter === "all" || (this.filter === "done" ? t.done : !t.done),
      );
    },
    doneCount() {
      return this.todos.filter((t) => t.done).length;
    },
    activeCount() {
      return this.todos.length - this.doneCount;
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        this.storageNote = LabUtils.save("vue-lab5-todos", value);
      },
    },
  },
  methods: {
    add() {
      const value = this.taskText.trim();
      if (!value || value.length > 120) {
        this.error = "任务须为1—120字，不能只有空格。";
        return;
      }
      this.todos.push({ id: LabUtils.uid(), text: value, done: false });
      this.taskText = "";
      this.error = "";
    },
    del(id) {
      if (this.editingId === id) this.cancelEdit();
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    startEdit(todo) {
      this.editingId = todo.id;
      this.editText = todo.text;
      this.$nextTick(() => this.editInput?.focus());
    },
    saveEdit(id) {
      if (this.editingId !== id) return;
      const value = this.editText.trim();
      if (!value || value.length > 120) {
        this.error = "编辑不能为空，已保留原任务。";
        this.cancelEdit();
        return;
      }
      const todo = this.todos.find((t) => t.id === id);
      if (todo) todo.text = value;
      this.error = "";
      this.cancelEdit();
    },
    cancelEdit() {
      this.editingId = null;
      this.editText = "";
      this.editInput = null;
    },
  },
}).mount("#app");
