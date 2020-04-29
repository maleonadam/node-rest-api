const express = require("express");

const UsersController = require("../controllers/users");
const checkAuth = require("../auth/jwt-auth");

const router = express.Router();

// CREATE AN ACCOUNT
router.post("/register", UsersController.usersSignUp);

// LOGIN USER
router.post("/login", UsersController.usersSignIn);

// DELETE AN ACCOUNT
router.delete("/:userId", checkAuth, UsersController.deleteAccount);

module.exports = router;
