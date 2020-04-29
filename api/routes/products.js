const express = require("express");

const ProductsController = require("../controllers/products");
const checkAuth = require("../auth/jwt-auth");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", ProductsController.getAllProducts);

// ADD A PRODUCT
router.post("/", checkAuth, ProductsController.addNewProduct);

// GET SINGLE PRODUCT
router.get("/:productId", ProductsController.getSingleProduct);

// UPDATE PRODUCT
router.patch("/:productId", checkAuth, ProductsController.updateSingleProduct);

// DELETE PRODUCT
router.delete("/:productId", checkAuth, ProductsController.deleteSingleProduct);

module.exports = router;
