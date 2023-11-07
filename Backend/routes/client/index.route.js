const homeRoutes = require("./home.route")
const productRoutes = require("./product.route");

module.exports = (app) => {
    app.use("/api", homeRoutes)

    app.use("/api/products",productRoutes);

}