const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const configs = require("./config");
const {
  userRouter,
  productRouter,
  categoryRouter,
  brandRouter,
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

// Define the rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });

// // Apply the rate limiter to all requests
// app.use(limiter);

//for dev 

app.use(
  cors({
    origin: "*",
  })
);

//for prod

// const allowedOrigins = [
//   'https://www.coaching-elegance.com',
//   'https://coaching-elegance.com'
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//       if (allowedOrigins.includes(origin) || !origin) {
//           callback(null, true);
//       } else {
//           console.error(`CORS error: Origin ${origin} not allowed`);
//           callback(new Error('Not allowed by CORS'));
//       }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

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
app.use("/api/brand", brandRouter);
app.use("/api/commande", commandeRouter);

app.listen(configs.PORT, () => {
  console.log("Backend server is running! on port :", configs.PORT);
});
