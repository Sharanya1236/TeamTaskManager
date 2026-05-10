const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {

  try {
    const {
  title,
  description,
  status,
  dueDate,
  project,
  assignedTo,
} = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      project,
      createdBy: req.user.id,
      assignedTo,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS
exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project", "title")
      .populate("createdBy", "name")
.populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
exports.updateTaskStatus = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = req.body.status;

    const updatedTask = await task.save();

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};