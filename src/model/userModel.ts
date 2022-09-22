import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userScehma = new mongoose.Schema({
  username: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [40, 'username should be less than 255 character'],
    unique: true
  },
  password: {
    type: 'String',
    ref: '',
    required: false,
    maxlength: [20, 'password should be less than 255 character'],
    unique: false
  },
  image: [{ url: { type: 'String', required: false } }]
});

//  Bcrypt Password
userScehma.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model("user", userScehma);

export default userModel