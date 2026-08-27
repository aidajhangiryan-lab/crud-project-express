<template>
  <div class="tasks-card">
    <div class="tasks-header">
      <h2>MY TASKS</h2>
    </div>
    <div class="task-wrapper">
      <div class="tasks-list">
        <h2>New task</h2>
        <Task v-for="task in taskStore.newTasks" :key="task.id" :item="task" />
      </div>
      <div class="tasks-list">
        <h2>Done</h2>
        <Task v-for="task in taskStore.doneTasks" :key="task.id" :item="task" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Task from "./Task.vue";
import { onMounted, watch } from "vue";
import { useTaskStore } from "../store/task.js";

const taskStore = useTaskStore();
onMounted(() => {
  taskStore.fetchTasks();
});
</script>
<style scoped>
.task-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.tasks-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.28);

  backdrop-filter: blur(25px) saturate(160%);
  -webkit-backdrop-filter: blur(25px) saturate(160%);

  border: 1px solid rgba(255, 255, 255, 0.45);

  border-radius: 24px;

  box-shadow:
    0 8px 32px rgba(120, 0, 50, 0.18),
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.12);
  padding: 28px;
  border-radius: 20px;
}
.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.tasks-header h2 {
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
}
.tasks-count {
  color: #c4869d;
  font-size: 14px;
  font-weight: 600;
}
.tasks-list h2 {
  display: inline-block;
  padding: 8px 20px;
  color: white;

  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 14px;

  box-shadow:
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 12px #ea638c,
    0 0 25px rgba(216, 17, 89, 0.6);

  animation: glitter-border 1.8s ease-in-out infinite alternate;
}

@keyframes glitter-border {
  0% {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow:
      0 0 4px rgba(255, 255, 255, 0.5),
      0 0 8px #ea638c;
  }

  50% {
    border-color: white;
    box-shadow:
      0 0 8px white,
      0 0 16px #ea638c,
      0 0 28px #ea638c;
  }

  100% {
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 0 5px white,
      0 0 12px #ea638c,
      0 0 35px #d81159;
  }
}
.tasks-list {
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
