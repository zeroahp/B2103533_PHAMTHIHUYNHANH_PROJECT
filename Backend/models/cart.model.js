var mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        product : [
            {
                product_id: String,
                quantity: Number
            },
        ],
        deleted: {
            type: Boolean,
            default: false
        },
    },{
        timestamps: true
        // timestamps được sử dụng để tự động thêm hai trường "createdAt" và "updatedAt" cho mỗi tài liệu trong cơ sở dữ liệu MongoDB. Các trường này giúp theo dõi thời gian tạo và thời gian cập nhật của tài liệu.
    }
);

const Cart = mongoose.model("Cart", cartSchema, "cart");
module.exports = Cart;