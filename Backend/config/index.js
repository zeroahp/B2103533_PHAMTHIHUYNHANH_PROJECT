require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGOBD_URI || "mongodb://127.0.0.1:27017"
    }
};
module.exports = config;