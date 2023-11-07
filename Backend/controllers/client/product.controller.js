const Product = require("../../models/product.model")
const ApiError = require("../../api.error");

module.exports.index = async(req, res) => {
    const products = await Product.find({});
    const newProducts = products.map(item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0);
        return item;
    });

    // console.log(newProducts);

    res.send(newProducts);
}

