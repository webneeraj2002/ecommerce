const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/authController")

router.get("/", async (req, res) => {
  res.send("Hello World");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);



module.exports = router;