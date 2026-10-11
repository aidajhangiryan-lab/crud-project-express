const Task = require("../models/Task");

async function getAllTasks() {
  return await Task.findAll({ order: [["createdAt", "DESC"]] });
}

async function getAllByPriority() {
  return await Task.findAll({ order: [["priority", "DESC"]] });
}

async function getTaskById(id) {
  return await Task.findByPk(id);
}
async function createTask(title, description, priority) {
  return await Task.create({ title, description, priority });
}

async function updateTask(id, title, priority, description) {
  const task = await Task.findByPk(id);
  if (!task) return null;

  await task.update({ title, priority, description });
  return task;
}

async function updatePriority(id, priority) {
  const task = await Task.findByPk(id);
  if (!task) return null;

  await task.update({
    priority,
  });
  return task;
}

async function makeNew(id) {
  const task = await Task.findByPk(id);
  if (!task) return null;

  await task.update({ isDone: false });
  return task;
}

async function makeDone(id) {
  const task = await Task.findByPk(id);
  if (!task) return null;

  await task.update({ isDone: true });
  return task;
}

async function deleteTask(id) {
  const deletedCount = await Task.destroy({ where: { id } });
  return deletedCount > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  getAllByPriority,
  createTask,
  updateTask,
  updatePriority,
  deleteTask,
  makeDone,
  makeNew,
};
