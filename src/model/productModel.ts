import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const productScehma = new mongoose.Schema({
  name: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [255, 'name should be less than 255 character'],
    unique: false
  },
  price: {
    type: 'Number',
    ref: '',
    required: false,
    maxlength: [255, 'price should be less than 255 character'],
    unique: false
  }
});


const productModel = mongoose.model("product", productScehma);
export default productModel