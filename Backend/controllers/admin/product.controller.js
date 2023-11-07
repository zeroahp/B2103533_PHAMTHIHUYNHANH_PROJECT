const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });
    const newProducts = products.map(item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0);
        return item;
    });
    res.send(newProducts);
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

    console.log(product);
    res.send(product);
}
//End getedit

//update
module.exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);

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

        if (product.status === 'Active') {
            product.status = 'Inactive';
        } else if (product.status === 'Inactive') {
            product.status = 'Active';
        }
        await product.save();
        res.send("Changstatus thành công!");

    } catch (error) {
        console.error(error);
    }
}
//End changeStatus

//filter
module.exports.filter = async (req, res) => {
    const status = req.params.status;

    const findActive = await Product.find({
        status: 'Active'
    })

    const findInactive = await Product.find({
        status: 'Inactive'
    })

}
//End filter