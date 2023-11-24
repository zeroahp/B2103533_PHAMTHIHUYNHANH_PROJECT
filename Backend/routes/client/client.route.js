const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/client.controller");


router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/user", controller.getUser);
router.post("/logout", controller.logout);

// router.post("/register", controller.create);

module.exports = router;
