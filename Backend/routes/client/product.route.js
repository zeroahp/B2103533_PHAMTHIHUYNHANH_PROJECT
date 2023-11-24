const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

router.get("/:id",controller.getProduct);

// router.get("/feature", controller.feature);


module.exports = router;
