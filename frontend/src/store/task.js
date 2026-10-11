import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const sortBy = ref("date");

  const newTasks = computed(() => tasks.value.filter((task) => !task.isDone));
  const doneTasks = computed(() => tasks.value.filter((task) => task.isDone));

  async function fetchTasks(mode = sortBy.value) {
    const url = mode === "priority" ? "/api/tasksByPriority" : "/api/tasks";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    tasks.value = await res.json();
    sortBy.value = mode;
  }

  async function sortByPriority() {
    const res = await fetch("/api/tasksByPriority");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    tasks.value = await res.json();
  }

  async function createTask(title, description, priority) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });
    if (!res.ok) throw new Error("Failed to create task");

    await fetchTasks();
  }

  async function deleteTask(id) {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");

    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  async function updateTask(id, title, description, priority) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });
    if (!res.ok) throw new Error("Failed to update task");

    await fetchTasks();
  }

  async function updatePriority(id, priority) {
    const res = await fetch(`/api/tasksUpdatePriority/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    });
    if (!res.ok) throw new Error("Failed to update priority");

    await fetchTasks();
  }

  async function makeDone(id) {
    const res = await fetch(`/api/tasksMakeDone/${id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to update task");

    const task = tasks.value.find((task) => task.id === id);
    if (task) task.isDone = true;
  }

  async function makeNew(id) {
    const res = await fetch(`/api/tasksMakeNew/${id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to update task");

    const task = tasks.value.find((task) => task.id === id);
    if (task) task.isDone = false;
  }

  return {
    tasks,
    sortBy,
    newTasks,
    doneTasks,
    fetchTasks,
    sortByPriority,
    createTask,
    deleteTask,
    updateTask,
    updatePriority,
    makeDone,
    makeNew,
  };
});
