const mongoose = require("mongoose");

const Product = require("../models/product");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().select("_id name price");

    return res.status(200).json({
      success: true,
      count: products.length,
      products: products.map((product) => {
        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          details: {
            description: "VIEW PRODUCT DETAILS",
            type: "GET",
            url: "http://localhost:3000/products/" + product._id,
          },
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// ADD A PRODUCT
exports.addNewProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfuly...",
      createdProduct: {
        _id: product._id,
        name: product.name,
        price: product.price,
        details: {
          description: "VIEW CREATED PRODUCT",
          type: "GET",
          url: "http://localhost:3000/products/" + product._id,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id).select("_id name price");

    if (product) {
      return res.status(200).json({
        success: true,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          details: {
            description: "GET ALL PRODUCTS",
            type: "GET",
            url: "http://localhost:3000/products",
          },
        },
      });
    } else {
      res.status(404).json({ success: false, error: "No record found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// UPDATE PRODUCT
exports.updateSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const updateOps = {};

    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    const product = await Product.findById(id);

    if (product) {
      await Product.update({ _id: id }, { $set: updateOps });

      return res.status(200).json({
        success: true,
        message: "Product updated successfully...",
        details: {
          description: "VIEW UPDATED PRODUCT",
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
    } else {
      res.status(404).json({ success: false, error: "No record found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// DELETE PRODUCT
exports.deleteSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ success: false, error: "No record found!" });
    } else {
      await product.remove();

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully...",
        details: {
          description: "TO ADD NEW PRODUCT",
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" },
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
