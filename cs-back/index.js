const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const configs = require("./config");
const {
  userRouter,
  productRouter,
  categoryRouter,
  saleRouter,
} = require("./src/routes");
const authRoute = require("./src/routes/auth");
const bodyParser = require("body-parser");
const { join } = require("path");
const env = require("dotenv");
env.config({ path: join(__dirname, "..", ".env") });

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/api/auth", authRoute);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/sale", saleRouter);

app.listen(configs.PORT, () => {
  console.log("Backend server is running! on port :", configs.PORT);
});
