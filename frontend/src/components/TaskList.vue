<template>
  <div class="tasks-card">
    <div class="tasks-header">
      <h2>My Workspace</h2>

      <button class="sort-button" @click="toggleSort">
        <span>⇅</span>
        Sort by {{ taskStore.sortBy === "priority" ? "Date" : "Priority" }}
      </button>
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
import { onMounted } from "vue";
import { useTaskStore } from "../store/task.js";

const taskStore = useTaskStore();

const toggleSort = () => {
  taskStore.fetchTasks(taskStore.sortBy === "priority" ? "date" : "priority");
};

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
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(25px) saturate(160%);
  -webkit-backdrop-filter: blur(25px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(20, 10, 8, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.25),
    inset 0 -1px 1px rgba(255, 255, 255, 0.05);
  padding: 28px;
}

.tasks-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.tasks-header h2 {
  margin: 0;
  color: #3e2723;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 2px;
  font-stretch: expanded;
  text-transform: uppercase;
}

.tasks-list h2 {
  display: inline-block;
  padding: 8px 20px;
  color: #855267;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  letter-spacing: 1px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
}

.tasks-list {
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sort-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid rgba(197, 95, 125, 0.35);
  border-radius: 14px;
  background: rgba(255, 243, 247, 0.7);
  color: #855267;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  cursor: pointer;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(133, 82, 103, 0.08);
  transition: all 0.2s ease;
}

.sort-button span {
  font-size: 20px;
  line-height: 1;
}

.sort-button:hover {
  background: #f7dce6;
  border-color: #c45b70;
  color: #a51f42;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(165, 31, 66, 0.15);
}

@media (max-width: 600px) {
  .tasks-card {
    padding: 16px;
  }

  .tasks-header {
    gap: 12px;
    flex-wrap: wrap;
  }

  .tasks-header h2 {
    font-size: 20px;
    letter-spacing: 1px;
  }

  .sort-button {
    padding: 8px 12px;
  }

  .task-wrapper {
    flex-direction: column;
  }
}
</style>
