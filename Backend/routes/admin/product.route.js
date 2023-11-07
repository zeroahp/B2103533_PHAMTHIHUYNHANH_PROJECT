const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.post("/create", controller.create);

router.get("/:id",controller.editPrint);
router.put("/update/:id",controller.update);
router.put("/:id", controller.delete);
router.patch("/change-status/:id", controller.changeStatus);

module.exports = router;