const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const clientRoutes = require("./routes/client");
const generalRoutes = require("./routes/general");
const managementRoutes = require("./routes/management");
const salesRoutes = require("./routes/sales");

// middleWare

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// connect mongodb

const PORT = process.env.PORT || 5001;

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("data base is connected is successfully");
  } catch (error) {
    console.log(error);
  }
};
app.listen(PORT, () => {
  connectDB();
  console.log(`server Port :${PORT}`);
});
