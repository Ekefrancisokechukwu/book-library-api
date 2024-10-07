const { Router } = require("express");
const { register, login, logout } = require("../controllers/authContoller");

const router = Router();

router.route("/Register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
