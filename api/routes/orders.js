const express = require("express");

const OrdersController = require("../controllers/orders");
const checkAuth = require("../auth/jwt-auth");

const router = express.Router();

// GET ALL ORDERS
router.get("/", checkAuth, OrdersController.getAllOrders);

// CREATE AN ORDER
router.post("/", checkAuth, OrdersController.createNewOrder);

// GET SINGLE ORDER
router.get("/:orderId", checkAuth, OrdersController.getSingleOrder);

// DELETE AN ORDER
router.delete("/:orderId", checkAuth, OrdersController.deleteSingleOrder);

module.exports = router;
