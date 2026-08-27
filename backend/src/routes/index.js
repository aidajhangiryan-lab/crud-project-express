const express = require("express");
const router = express.Router();
const taskController = require("../controllers/controller");
const { validateTask, validateId } = require("../middleware/validate");

router.get("/tasks", taskController.getAllTasks);
router.put("/tasksMakeDone/:id", taskController.makeDone);
router.put("/tasksMakeNew/:id", taskController.makeNew);
router.get("/tasks/:id", validateId, taskController.getTaskById);
router.post("/tasks", validateTask, taskController.createTask);
router.put("/tasks/:id", validateId, validateTask, taskController.updateTask);
router.delete("/tasks/:id", validateId, taskController.deleteTask);

module.exports = router;
