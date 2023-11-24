var mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    passwd:{
        type: String,
        require: true
    },
    position: Number,
    slug: {
        type: String,
        slug: "name",
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

const User = mongoose.model("User", userSchema, "users");
module.exports = User;