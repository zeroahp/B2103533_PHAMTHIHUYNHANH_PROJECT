const Product = require("../../models/product.model")
const User = require("../../models/user.model")
const Cart = require("../../models/cart.model")
const SearchHelper = require("../../Helper/searchProduct");

module.exports.index = async (req, res) => {
    //Search
    let Search = SearchHelper(req.query);
    // console.log("search", req.query);
    const searchObj = {
        deleted: false,
        status: "Hoạt động",
    };

    //Search
    if (req.query.title) {
        searchObj.title = Search.regex;
    }

    //filterStatus
    if (req.query.status) {
        searchObj.status = req.query.status;
    }

    //filterCate
    if (req.query.category) {
        searchObj.category = req.query.category;
    }

    //sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    //feature
    if (req.query.feature) {
        searchObj.feature = req.query.feature;
    }

    //discount
    if (req.query.discountPercentage) {
        searchObj.discountPercentage = req.query.discountPercentage;
    }


    const products = await Product.find(searchObj)
        .sort(sort)
    res.send(products);
}

module.exports.getProduct = async (req, res, next) => {
    const id = req.params.id;
    console.log("chon san pham - ", id);

    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    console.log(product);
    res.send(product);
}


module.exports.addToCart = async (req, res, next) => {

    const product_id = req.body.productId;
    const user_id = req.body.userId;

    const cart = new Cart({
        user_id: user_id,
        product : [
            {
                product_id: product_id,
                quantity: 1
            },
        ],
    })

    const result = await cart.save();

    console.log(result);
}

module.exports.cartDetail = async (req, res, next) => {

    const cart = await Cart.find(
        {
            deleted: false,
        }
    )

    console.log(cart);
    res.send(cart);
}
