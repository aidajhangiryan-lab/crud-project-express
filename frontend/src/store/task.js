import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);

  const newTasks = computed(() => {
    return tasks.value.filter((task) => !task.is_done);
  });

  const doneTasks = computed(() => {
    return tasks.value.filter((task) => task.is_done);
  });

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    tasks.value = await res.json();
  }

  async function createTask(title, description) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const newTask = await res.json();
    tasks.value.unshift(newTask);
  }

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  async function updateTask(id, title, description) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const updatedTask = await res.json();

    const index = tasks.value.findIndex((task) => task.id === id);

    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }

    return updatedTask;
  }

  async function makeDone(id) {
    const res = await fetch(`/api/tasksMakeDone/${id}`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    const task = tasks.value.find((task) => task.id === id);

    if (task) {
      task.is_done = 1;
    }
  }

  async function makeNew(id) {
    const res = await fetch(`/api/tasksMakeNew/${id}`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    const task = tasks.value.find((task) => task.id === id);

    if (task) {
      task.is_done = 0;
    }
  }

  return {
    tasks,
    newTasks,
    doneTasks,
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
    makeDone,
    makeNew,
  };
});
