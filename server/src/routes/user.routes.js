const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const UserController = require("../controllers/user.controller");

// router.get("/api/users/me/friends", UserController.getUser);
router.post("/api/users", UserController.addUser);
router.post("/api/users/login", UserController.login);
router.post("/api/users/logout", auth, UserController.logout);
module.exports = router;
