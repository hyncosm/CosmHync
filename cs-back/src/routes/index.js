const userRouter = require("./user.router");
const productRouter = require("./product.route");
const categoryRouter = require("./category.route");
const brandRouter = require("./brand.route");
const commandeRouter = require("./commande.route");
const authRouter = require("./auth");

module.exports = {
  authRouter,
  userRouter,
  productRouter,
  categoryRouter,
  brandRouter,
  commandeRouter
};
