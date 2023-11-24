const productRoutes = require("./product.route");
const adminRoutes = require("./admin.route");
module.exports = (app) => {
    app.use("/api/admins", productRoutes);
    app.use("/account-admin", adminRoutes);

}
