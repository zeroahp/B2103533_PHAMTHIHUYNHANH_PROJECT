const homeRoutes = require("./home.route")
const productRoutes = require("./product.route");
const clientRoutes = require("./client.route");

module.exports = (app) => {
    app.use("/page-client", homeRoutes)

    app.use("/page-client/product",productRoutes);
    
    app.use("/account",clientRoutes);

}