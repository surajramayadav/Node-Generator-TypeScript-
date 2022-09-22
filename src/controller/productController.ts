
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import productModel from "../model/productModel";
import ErrorHandler from "../utils/errorHandler";

// Add product
const addproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get product Using Id
const viewproductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all product
const viewproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await productModel.find();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete product
const deleteproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }
    product = await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "product deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update product
const updateproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("product not found", 404));
    }


    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      productFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


export { addproduct, viewproductById, viewproduct, deleteproduct, updateproduct }