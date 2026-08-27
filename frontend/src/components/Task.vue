<template>
  <div class="task-card" :class="{ done: isDone }">
    <div class="task-header">
      <h3 class="task-title">{{ item.title }}</h3>
      <div class="task-actions">
        <input type="checkbox" v-model="isDone" class="task-checkbox" />
        <button class="menu-button" @click="showMenu = !showMenu">⋮</button>
        <div v-if="showMenu" class="task-menu">
          <button @click="openEdit">Update</button>
          <button @click="openDelete">Delete</button>
        </div>
      </div>
    </div>
    <p class="task-date">{{ formattedDate }}</p>
    <p class="task-description">{{ item.description }}</p>
    <Teleport to="body">
      <TaskModal
        v-if="showModal"
        :task="item"
        :mode="modalMode"
        @close="showModal = false"
        @updated="handleUpdated"
        @deleted="handleDeleted"
      />
    </Teleport>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import TaskModal from "./TaskModal.vue";
import { useTaskStore } from "@/store/task.js";
const taskStore = useTaskStore();
const props = defineProps({ item: { type: Object, required: true } });
const isDone = ref(Boolean(props.item.is_done));
const showMenu = ref(false);
const showModal = ref(false);
const modalMode = ref("edit");

const openEdit = () => {
  modalMode.value = "edit";
  showMenu.value = false;
  showModal.value = true;
};

const openDelete = () => {
  modalMode.value = "delete";
  showMenu.value = false;
  showModal.value = true;
};

const handleUpdated = (updatedTask) => {
  Object.assign(props.item, updatedTask);
  showModal.value = false;
};

const handleDeleted = () => {
  showModal.value = false;
};

const formattedDate = computed(() => {
  return props.item.created_at.split("T")[0];
});

function handleClickOutside(event) {
  if (!event.target.closest(".task-actions")) {
    showMenu.value = false;
  }
}

watch(isDone, async (newValue) => {
  if (newValue) {
    await taskStore.makeDone(props.item.id);
  } else {
    await taskStore.makeNew(props.item.id);
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<style scoped>
.task-card {
  width: 330px;
  max-width: none;
  background: #ffffff;
  border: 1px solid #ebcdd8;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 0;
  box-shadow: 0 4px 14px rgba(133, 82, 103, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 18px rgba(133, 82, 103, 0.1);
}
.task-card.done {
  opacity: 0.55;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.task-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #855267;
}
.task-card.done .task-title {
  text-decoration: line-through;
}
.task-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}
.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #d9a0b5;
  flex-shrink: 0;
}
.menu-button {
  border: none;
  background: transparent;
  color: #855267;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 5px;
}
.menu-button:hover {
  color: #604b54;
}
.task-menu {
  position: absolute;
  right: 0;
  top: 28px;
  width: 120px;
  background: white;
  border: 1px solid #ebcdd8;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(133, 82, 103, 0.15);
  z-index: 10;
  overflow: hidden;
}
.task-menu button {
  width: 100%;
  border: none;
  background: white;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  color: #604b54;
}
.task-menu button:hover {
  background: #fff3f7;
}
.task-date {
  margin: 6px 0 0;
  font-size: 0.75rem;
  color: #b7a6ad;
  font-style: italic;
}
.task-description {
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: #604b54;
  line-height: 1.5;
}
</style>
