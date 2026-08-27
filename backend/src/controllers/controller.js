const taskService = require("../services/task.service");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskById(id);
    if (!task) return res.status(404).json({ error: "Задача не найдена" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description } = req.body;
    const newTask = await taskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { title, description } = req.body;
    const updatedTask = await taskService.updateTask(
      req.params.id,
      title,
      description,
    );
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function makeNew(req, res, next) {
  try {
    await taskService.makeNew(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function makeDone(req, res, next) {
  try {
    await taskService.makeDone(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
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
