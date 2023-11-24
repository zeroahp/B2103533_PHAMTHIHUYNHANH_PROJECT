var mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    category: {
        type: String,
    },
    feature:{
        type: String,
    },
    description: String,
    price: Number,
    priceNew: Number,
    discountPercentage: {
        type: Number,
        default:0
    },
    stock: Number,
    thumbnail: String,
    status: {
        type: String,
    },
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
    // timestamps được sử dụng để tự động thêm hai trường "createdAt" và "updatedAt" cho mỗi tài liệu trong cơ sở dữ liệu MongoDB. Các trường này giúp theo dõi thời gian tạo và thời gian cập nhật của tài liệu.
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;