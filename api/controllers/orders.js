const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

// GET ALL ORDERS
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .select("_id product quantity")
      .populate("product", "name");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders.map((order) => {
        return {
          _id: order._id,
          product: order.product,
          quantity: order.quantity,
          details: {
            description: "VIEW ORDER DETAILS",
            type: "GET",
            url: "http://localhost:3000/orders/" + order._id,
          },
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// CREATE AN ORDER
exports.createNewOrder = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product) {
      res.status(404).json({ success: false, error: "Product not found!" });
    } else {
      const order = await Order.create({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });

      return res.status(201).json({
        success: true,
        message: "Order created successfully...",
        createdOrder: {
          _id: order._id,
          product: order.product,
          quantity: order.quantity,
          details: {
            description: "VIEW CREATED ORDER DETAILS",
            type: "GET",
            url: "http://localhost:3000/orders/" + order._id,
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// GET SINGLE ORDER
exports.getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id)
      .select("_id product quantity")
      .populate("product");

    if (order) {
      return res.status(200).json({
        _id: order._id,
        product: order.product,
        quantity: order.quantity,
        details: {
          description: "VIEW ALL ORDERS",
          type: "GET",
          url: "http://localhost:3000/orders",
        },
      });
    } else {
      res.status(404).json({ success: false, error: "No record found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// DELETE AN ORDER
exports.deleteSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({ success: false, error: "No record found!" });
    } else {
      await order.remove({ _id: id });

      return res.status(200).json({
        success: true,
        message: "Order deleted successfully...",
        details: {
          description: "TO CREATE NEW ORDER",
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" },
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
