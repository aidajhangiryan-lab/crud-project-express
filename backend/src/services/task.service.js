const db = require("../config/db");

async function getAllTasks() {
  const [rows] = await db.query("SELECT * FROM tasks ORDER BY created_at DESC");
  return rows;
}

async function getTaskById(id) {
  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
  return rows[0];
}

async function createTask(title, description) {
  const [result] = await db.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
  );

  return getTaskById(result.insertId);
}

async function updateTask(id, title, description) {
  await db.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?", [
    title,
    description,
    id,
  ]);

  return await getTaskById(id);
}

async function makeNew(id) {
  await db.query("UPDATE tasks SET is_done = 0 WHERE id = ?", [id]);
  return { id };
}

async function makeDone(id) {
  await db.query("UPDATE tasks SET is_done = 1 WHERE id = ?", [id]);
  return { id };
}

async function deleteTask(id) {
  await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  return { id };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  makeDone,
  makeNew,
};
