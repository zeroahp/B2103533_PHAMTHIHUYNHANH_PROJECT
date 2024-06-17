const Product = require("../../models/product.model")
const SearchHelper = require("../../Helper/searchProduct");

module.exports.index = async (req, res) => {
    //Search
    let Search = SearchHelper(req.query);

    const searchObj = {
        deleted: false,
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

    const products = await Product.find(searchObj)
        .sort(sort)
    res.send(products);
}

//create
module.exports.create = async (req, res, next) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position === "" || isNaN(req.body.position)) {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if (req.body.priceNew === "" || isNaN(req.body.priceNew)) {
        req.body.priceNew = ((req.body.price * (100 - req.body.discountPercentage)) / 100).toFixed(0);

    }
    

    const product = new Product(req.body);
    await product.save();

    res.send(product);
}
//End create


//test getedit
module.exports.editPrint = async (req, res, next) => {
    const id = req.params.id;
    console.log("chon san pham - ", id);

    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    // console.log(product);
    res.send(product);
}
//End getedit

//update
module.exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);

        
        req.body.priceNew = ((req.body.priceNew * (100 - req.body.discountPercentage)) / 100).toFixed(0);
        
        console.log("new",req.body.priceNew);

        await Product.updateOne({
            _id: id
        }, req.body);

        res.send("Cap nhat thanh cong");
    } catch (error) {
        console.error(error);

    }
}
//End update

//delete
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        })
        res.send("Xóa thành công!");

    } catch (error) {
        console.error(error);
    }
}
//End delete

//changeStatus
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);

        if (product.status === 'Hoạt động') {
            product.status = 'Ngừng hoạt động';
        } else if (product.status === 'Ngừng hoạt động') {
            product.status = 'Hoạt động';
        }
        await product.save();
        res.send("Changstatus thành công!");
    } catch (error) {
        console.error(error);
    }
}
//End changeStatus

//detail
module.exports.detail = async (req, res) => {
    // try{
        const id = req.params.id;

        const product = await Product.find({
            _id: id,
            deleted: false
        })

        res.send(product);
        console.log(product);
}
//End detail

