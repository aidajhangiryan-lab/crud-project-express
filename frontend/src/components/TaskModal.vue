<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <!-- EDIT -->
      <template v-if="mode === 'edit'">
        <div class="modal-header">
          <h2>Update Task</h2>
          <button class="close-button" @click="$emit('close')">×</button>
        </div>

        <div class="form-group">
          <label>Title</label>
          <input v-model="title" type="text" />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="description"></textarea>
        </div>

        <div class="form-group">
          <label>Priority</label>
          <select v-model="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="modal-actions">
          <button class="cancel-button" @click="$emit('close')">Cancel</button>
          <button class="save-button" @click="updateTask">Save</button>
        </div>
      </template>

      <!-- PRIORITY -->
      <div v-else-if="mode === 'priority'" class="form-content">
        <h2>CHANGE PRIORITY</h2>

        <label>Priority</label>
        <select v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button @click="handlePriorityUpdate">SAVE PRIORITY</button>
      </div>

      <!-- DELETE -->
      <template v-else-if="mode === 'delete'">
        <div class="modal-header">
          <h2>Delete Task</h2>
          <button class="close-button" @click="$emit('close')">×</button>
        </div>

        <p class="delete-text">
          Are you sure you want to delete
          <strong>{{ task.title }}</strong
          >?
        </p>

        <div class="modal-actions">
          <button class="cancel-button" @click="$emit('close')">Cancel</button>
          <button class="delete-button" @click="deleteTask">Delete</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task.js";

const taskStore = useTaskStore();
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: "edit",
  },
});

const emit = defineEmits(["close", "updated", "deleted"]);

const title = ref(props.task.title);
const description = ref(props.task.description);
const id = ref(props.task.id);
const priority = ref(props.task.priority || "low");

const updateTask = async () => {
  try {
    await taskStore.updateTask(
      id.value,
      title.value,
      description.value,
      priority.value,
    );

    emit("updated", {
      title: title.value,
      description: description.value,
      priority: priority.value,
    });
    emit("close");
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const deleteTask = async () => {
  try {
    await taskStore.deleteTask(id.value);

    emit("deleted");
    emit("close");
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

async function handlePriorityUpdate() {
  try {
    const updatedTask = await taskStore.updatePriority(
      props.task.id,
      priority.value,
    );

    emit("updated", updatedTask);
  } catch (error) {
    console.error("Failed to update priority:", error);
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  box-sizing: border-box;

  background: rgba(35, 25, 30, 0.35);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  z-index: 2147483647;

  pointer-events: all;
}

.modal {
  position: relative;

  width: 620px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border: 1px solid #ebcdd8;
  border-radius: 22px;
  padding: 35px;
  box-sizing: border-box;
  box-shadow:
    0 30px 80px rgba(60, 40, 48, 0.35),
    0 10px 30px rgba(133, 82, 103, 0.2);

  z-index: 999999999;
  pointer-events: all;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 28px;
}

.modal-header h2 {
  margin: 0;

  color: #855267;

  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: #f8eef2;
  color: #855267;

  font-size: 25px;
  cursor: pointer;
}

.close-button:hover {
  background: #ebcdd8;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #604b54;

  font-size: 0.95rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;

  box-sizing: border-box;

  border: 1px solid #ebcdd8;
  border-radius: 12px;

  padding: 14px 16px;

  background: #ffffff;

  color: #604b54;

  font-family: inherit;
  font-size: 0.95rem;

  outline: none;
}

.form-group select {
  cursor: pointer;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #d9a0b5;

  box-shadow: 0 0 0 3px rgba(217, 160, 181, 0.15);
}

.form-group textarea {
  min-height: 160px;
  resize: vertical;
}

.delete-text {
  margin: 30px 0;

  color: #604b54;

  font-size: 1rem;
  line-height: 1.6;
}

.delete-text strong {
  color: #855267;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;

  gap: 12px;

  margin-top: 30px;
}

.modal-actions button {
  min-width: 110px;

  border: none;
  border-radius: 10px;

  padding: 12px 20px;

  font-family: inherit;
  font-size: 0.9rem;

  cursor: pointer;
}

.cancel-button {
  background: #f5eef1;
  color: #604b54;
}

.save-button {
  background: #d9a0b5;
  color: white;
}

.delete-button {
  background: #c66b7b;
  color: white;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-content h2 {
  margin-bottom: 18px;
  color: #855267;
  font-size: 22px;
  letter-spacing: 1px;
}

.form-content label {
  margin-top: 8px;
  color: #855267;
  font-size: 14px;
  font-weight: 600;
}

.form-content select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ebcdd8;
  border-radius: 12px;
  outline: none;
  background: #ffffff;
  color: #604b54;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
}

.form-content select:focus {
  border-color: #d9a0b5;
  box-shadow: 0 0 0 3px rgba(217, 160, 181, 0.15);
}

.form-content button {
  margin-top: 18px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  color: #855267;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.form-content button:hover {
  transform: translateY(-2px);
  color: #d81159;
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.7),
    0 0 25px rgba(255, 255, 255, 0.4);
}
</style>