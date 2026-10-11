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

async function getAllByPriority(req, res, next) {
  try {
    const tasks = await taskService.getAllByPriority();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description, priority } = req.body;
    const newTask = await taskService.createTask(title, description, priority);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { title, priority, description } = req.body;
    const updatedTask = await taskService.updateTask(
      req.params.id,
      title,
      priority,
      description,
    );
    if (!updatedTask)
      return res.status(404).json({ error: "Задача не найдена" });
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}

async function updatePriority(req, res, next) {
  try {
    const { priority } = req.body;
    const updatedPriority = await taskService.updatePriority(
      req.params.id,
      priority,
    );
    if (!updatedPriority)
      return res.status(404).json({ error: "Задача не найдена" });
    res.json(updatedPriority);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Задача не найдена" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function makeNew(req, res, next) {
  try {
    const makeNew = await taskService.makeNew(req.params.id);
    if (!makeNew) return res.status(404).json({ error: "Задача не найдена" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function makeDone(req, res, next) {
  try {
    const makeDone = await taskService.makeDone(req.params.id);
    if (!makeDone) return res.status(404).json({ error: "Задача не найдена" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
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
