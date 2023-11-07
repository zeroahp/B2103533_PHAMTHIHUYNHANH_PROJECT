const express = require("express");
const cors = require("cors");
require("dotenv").config();

// error
const ApiError = require("./api.error");

//monggoose
const database = require("./config/database");
database.connect();

//Router
const clientRouter = require("./routes/client/index.route");
const adminRouter = require("./routes/admin/index.route");

const app = express();

//Goi dotenv
const port = process.env.PORT;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());


// app.get("/", (req, res) => {
//     res.json({
//         message: "Welcome to project"
//     });
// });

clientRouter(app);
adminRouter(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

// app.use((req, res, next) => {
//     return next(new ApiError(404, "Resoure not found"));
// })

// app.use((err, req, res, next) => {
//     return res.status(err.statusCode || 500).json({
//         message: err.message || "Internal Server Error!"
//     });
// })



module.exports = app;
