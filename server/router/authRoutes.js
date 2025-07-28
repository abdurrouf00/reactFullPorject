// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/dashboard", passport.authenticate("jwt", { session: false }), authController.dashboard);
router.post("/logout", authController.logout);

module.exports = router;

