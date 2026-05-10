const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const adminOnly = require("../middleware/roleMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;