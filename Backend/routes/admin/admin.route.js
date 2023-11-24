const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/admin.controller");


router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/welcome", controller.getAdmin);

router.get("/account-management", controller.accountManagement);

router.post("/logout", controller.logout);

// router.post("/register", controller.create);

module.exports = router;
