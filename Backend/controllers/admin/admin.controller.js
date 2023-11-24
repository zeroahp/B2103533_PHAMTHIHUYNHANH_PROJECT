const Admin = require("../../models/admin.model")
const User = require("../../models/user.model")
// const SearchHelper = require("../../Helper/searchProduct");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();




//create
module.exports.register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPasswd = await bcrypt.hash(req.body.passwd, salt);

    if (req.body.position === "" || isNaN(req.body.position)) {
        const countProducts = await Admin.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwd: hashedPasswd,
        position: req.body.position,
        isadmin: req.body.isadmin
    })

    //kh hien thi pass, bao mat
    const result = await admin.save();
    const {
        passwd,
        ...data
    } = await result.toJSON();

    console.log(data);
    res.send(data);
}
//End create

//login
module.exports.login = async (req, res, next) => {

    const email = req.body.email;

    const admin = await Admin.findOne({
        email
    });

    if (!admin) {
        return res.status(404).send({
            message: "Admin not found!"
        })
    }

    if (!await bcrypt.compare(req.body.passwd, admin.passwd)) {
        return res.status(400).send({
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign({
        _id: admin._id,
    }, process.env.KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.send({
        message: "succes"
    });
}

//End login

//get admin
module.exports.getAdmin = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claim = jwt.verify(cookie, process.env.KEY)

        if (!claim) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const admin = await Admin.findOne({
            _id: claim._id
        })

        const {
            passwd,
            ...data
        } = await admin.toJSON();
        
        res.send(data);
    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}


//End get alladmin

//getAll
module.exports.index = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claim = jwt.verify(cookie, process.env.KEY)

        if (!claim) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        // Kiểm tra xem người dùng có quyền truy cập thông tin tất cả người dùng hay không
        // if (!claim.isAdmin) {
        //     return res.status(403).send({
        //         message: 'unauthorized'
        //     });
        // }

        // Nếu có quyền truy cập, lấy thông tin tất cả người dùng
        const admin = await Admin.find({}, '-passwd'); // Lấy tất cả người dùng, loại bỏ trường 'passwd'

        res.send(admin);
    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

//get-All-User
module.exports.accountManagement = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claim = jwt.verify(cookie, process.env.KEY)

        if (!claim) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        // Kiểm tra xem người dùng có quyền truy cập thông tin tất cả người dùng hay không
        // if (!claim.isAdmin) {
        //     return res.status(403).send({
        //         message: 'unauthorized'
        //     });
        // }

        // Nếu có quyền truy cập, lấy thông tin tất cả người dùng
        const user = await User.find({}, '-passwd'); // Lấy tất cả người dùng, loại bỏ trường 'passwd'

        res.send(user);

    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

//deletedAll

// module.exports.deleteAll = async (req, res) => {
//     try {
//         const cookie = req.cookies['jwt'];

//         const claim = jwt.verify(cookie, process.env.KEY);

//         if (!claim) {
//             return res.status(401).send({
//                 message: 'unauthenticated'
//             });
//         }

//         // if (!claim.isAdmin) {
//         //     return res.status(403).send({
//         //         message: 'unauthorized'
//         //     });
//         // }

//         const result = await Admin.deleteMany();

//         res.send({
//             message: `Deleted ${result.deletedCount} users`
//         });
//     } catch (error) {
//         return res.status(401).send({
//             message: 'unauthenticated'
//         });
//     }
// };
// //End deletedAll

//logout
module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })

    res.send({
        message: 'success'
    })
}
//End logout
