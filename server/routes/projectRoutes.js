const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");


// CREATE PROJECT
router.post("/", protect, createProject);


// GET ALL PROJECTS
router.get("/", protect, getProjects);
router.delete("/:id", protect, deleteProject);
module.exports = router;