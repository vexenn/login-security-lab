const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");

//  Apply the brute-force limiter explicitly to the login route
router.post("/login", loginLimiter, authController.login);

module.exports = router;