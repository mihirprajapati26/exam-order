// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const orderSSR = require("../controllers/orderSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with orders using EJS
router.get("/", orderSSR.renderOrders);
// End2: Define a route to render the addorder.ejs view
router.get("/addorder", renderOrder.renderForm);
// End3:Route to add  order using EJ
router.post("/addorder", orderSSR.addOrder);
// Define a route to render the singleorder.ejs view
router.get("/single-order/:id", orderSSR.renderOrder);
// Define a route to delete singleorder
router.delete("/single-order/:id", orderSSR.deleteOrder);
// Define a route to update single order.ejs
router.put("/single-order/:id", orderSSR.updateOrder);
// Define order to update
router.get("/single-order/update/:id", orderSSR.renderUpdateOrder);

module.exports = router;