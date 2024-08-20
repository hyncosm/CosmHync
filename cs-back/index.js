const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const configs = require("./config");
const {
  userRouter,
  productRouter,
  categoryRouter,
  commandeRouter,
  authRouter
} = require("./src/routes");
const bodyParser = require("body-parser");
const { join } = require("path");
const env = require("dotenv");
env.config({ path: join(__dirname, "..", ".env") });

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));;

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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/commande", commandeRouter);

app.listen(configs.PORT, () => {
  console.log("Backend server is running! on port :", configs.PORT);
});
