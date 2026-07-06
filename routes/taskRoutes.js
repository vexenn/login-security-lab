const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

// Secure all task endpoints below by forcing them through the JWT verification middleware
router.use(authMiddleware);

// Map operations to Capstone required REST API paths
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;