const User = require("../../models/user.model")
// const SearchHelper = require("../../Helper/searchProduct");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {
    use
} = require("../..");
require("dotenv").config();




//create
module.exports.register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPasswd = await bcrypt.hash(req.body.passwd, salt);

    if (req.body.position === "" || isNaN(req.body.position)) {
        const countProducts = await User.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwd: hashedPasswd,
        position: req.body.position,
    })

    //kh hien thi pass, bao mat
    const result = await user.save();
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

    const user = await User.findOne({
        email
    });

    if (!user) {
        return res.status(404).send({
            message: "User not found!"
        })
    }

    if (!await bcrypt.compare(req.body.passwd, user.passwd)) {
        return res.status(400).send({
            message: "Invalid credentials"
        })
    }
    const token = jwt.sign({
        _id: user._id,
    }, process.env.KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.send({
        message: "succes",
        token: token,
    });
}

//End login

module.exports.getUser = async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claim = jwt.verify(cookie, process.env.KEY)

        if (!claim) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({
            _id: claim._id
        })

        const {
            passwd,
            ...data
        } = await user.toJSON();
        
        res.send(data);
    } catch (error) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

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
