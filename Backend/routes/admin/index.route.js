const productRoutes = require("./product.route");
module.exports = (app) => {
    app.use("/api/admins", productRoutes);
}