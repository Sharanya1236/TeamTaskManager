const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
} = require("../controllers/taskController");
const {
  updateTaskStatus,
} = require("../controllers/taskController");

// CREATE TASK
router.post("/", protect, createTask);


// GET TASKS
router.get("/", protect, getTasks);
router.put("/:id", updateTaskStatus);

module.exports = router;