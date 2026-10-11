<template>
  <div class="layout">
    <div class="bg-orbs-container">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

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
  position: relative;
  display: flex;
  gap: 24px;
  min-height: 100vh;
  padding: 24px;
  background: #dec4c7;
  overflow: hidden;
}

.bg-orbs-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  box-shadow: 
    inset 0 20px 40px rgba(255, 255, 255, 0.7),
    inset 0 -25px 45px rgba(153, 72, 98, 0.3),
    0 25px 50px rgba(120, 40, 65, 0.18);
  backdrop-filter: blur(8px);
}

.orb-1 {
  width: 550px;
  height: 550px;
  bottom: -150px;
  left: -100px;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 240, 243, 0.95) 0%,
    rgba(232, 185, 196, 0.9) 40%,
    rgba(188, 120, 138, 0.75) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.orb-2 {
  width: 700px;
  height: 700px;
  top: 10%;
  left: 20%;
  background: radial-gradient(
    circle at 40% 30%,
    rgba(255, 245, 248, 0.9) 0%,
    rgba(235, 192, 203, 0.65) 50%,
    rgba(196, 135, 152, 0.5) 100%
  );
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 
    inset 0 30px 60px rgba(255, 255, 255, 0.85),
    inset 0 -30px 50px rgba(153, 72, 98, 0.25),
    0 30px 60px rgba(100, 30, 50, 0.15);
  z-index: 2;
}

.orb-3 {
  width: 600px;
  height: 600px;
  top: -180px;
  right: -100px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 250, 252, 0.95) 0%,
    rgba(222, 168, 182, 0.8) 45%,
    rgba(175, 100, 122, 0.65) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.sidebar,
.content {
  position: relative;
  z-index: 5;
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