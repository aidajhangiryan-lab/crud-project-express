<template>
  <div class="layout">
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <main class="content">
      <TaskList />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TaskList from "./TaskList.vue";
</script>

<style scoped>
.layout {
  display: flex;
  gap: 24px;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #ea638c, #ffb3c6);
}

.sidebar {
  width: 20%;
  flex-shrink: 0;
  border-radius: 20px;
}

.content {
  width: 80%;
  flex: 1;
}
</style>
