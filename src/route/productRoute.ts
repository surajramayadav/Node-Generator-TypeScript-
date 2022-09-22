
import express from "express";
const {
  addproduct,
  viewproductById,
  viewproduct,
  deleteproduct,
  updateproduct,
} = require("../controller/productController");

const router = express.Router();


router.route("/add").post(addproduct);
router.route("/view/:id").get(viewproductById);
router.route("/view/").get(viewproduct);
router.route("/update/:id").put(updateproduct);
router.route("/delete/:id").delete(deleteproduct);

module.exports = router;
