const express = require("express");
const router = express.Router();
const{registerUser,loginUser} = require("../controllers/authController");

const jwt = require("jsonwebtoken");
// Test Route
router.get("/", (req, res) => {
   res.send("router is working for users");
});

// Register Route
router.post("/register",registerUser );

// login route
router.post("/login",loginUser);

module.exports = router;
