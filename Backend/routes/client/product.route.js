const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

router.get("/:id",controller.getProduct);

router.post("/add-to-cart", controller.addToCart);
router.get("/cart-detail", controller.cartDetail);


module.exports = router;
