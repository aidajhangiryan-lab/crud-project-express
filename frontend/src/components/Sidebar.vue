<template>
  <div class="task-form">
    <h1>NEW TASK</h1>

    <div class="form-content">
      <label>Title</label>
      <input type="text" v-model="title" placeholder="Enter task title..." />

      <label>Priority</label>
      <select v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Description</label>
      <textarea
        v-model="description"
        placeholder="Describe your task..."
        maxlength="255"
      ></textarea>

      <button @click="handleCreating">CREATE TASK</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";

const taskStore = useTaskStore();
const title = ref("");
const priority = ref("low");
const description = ref("");

async function handleCreating() {
  await taskStore.createTask(title.value, description.value, priority.value);

  title.value = "";
  description.value = "";
  priority.value = "low";
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&family=Molle:ital@1&family=Monsieur+La+Doulaise&family=Parisienne&display=swap");
.task-form {
  width: 100%;
  max-width: 600px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.28);

  backdrop-filter: blur(25px) saturate(160%);
  -webkit-backdrop-filter: blur(25px) saturate(160%);

  border: 1px solid rgba(255, 255, 255, 0.45);

  border-radius: 24px;

  box-shadow:
    0 8px 32px rgba(120, 0, 50, 0.18),
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.12);
  border-radius: 20px;
}

h1 {
  margin-bottom: 28px;
  color: #3e2723;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  margin-top: 8px;
  color: #855267;
  font-size: 14px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ebcdd8;
  border-radius: 12px;
  outline: none;
  background: #ffffff;
  color: #604b54;
  font-size: 15px;
  transition: 0.2s ease;
}

textarea {
  min-height: 130px;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: #b7a6ad;
}

input:focus,
textarea:focus {
  border-color: #d9a0b5;
  box-shadow: 0 0 0 3px rgba(217, 160, 181, 0.15);
}

button {
  margin-top: 18px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #fff;
  color: #855267;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
  letter-spacing: normal;
  word-spacing: normal;
  font-stretch: normal;
}
button:hover {
  transform: translateY(-3px);
  background: #fff;
  color: #d81159;
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.7),
    0 0 25px rgba(255, 255, 255, 0.4);
}

input,
textarea,
select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ebcdd8;
  border-radius: 12px;
  outline: none;
  background: #ffffff;
  color: #604b54;
  font-size: 15px;
  transition: 0.2s ease;
}

select {
  cursor: pointer;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #d9a0b5;
  box-shadow: 0 0 0 3px rgba(217, 160, 181, 0.15);
}
</style>
