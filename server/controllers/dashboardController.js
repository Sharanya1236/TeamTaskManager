const Task = require("../models/Task");
const Project = require("../models/Project");

const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "pending",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    const totalProjects = await Project.countDocuments();

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalProjects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};