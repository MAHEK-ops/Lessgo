const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected route (example)
router.get("/me", authMiddleware, getMe);

module.exports = router;
