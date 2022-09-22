
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import userModel from "..//model/userModel";
import ErrorHandler from "../utils/errorHandler";
import { comparePassword, getJWTToken } from "../utils/jwtToken";
import { ChangeFileName } from "../utils/changeFileName";

const COOKIE_EXPIRE = 5
const options = {
  expire: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

const userRegister = catchAsyncErrors(async (req, res, next) => {
  let images0 = [];
  let getImageNeweName0;
  console.log(req)
  const url = "http://localhost:4400/"
  if (req.files) {
    if (req.files.image.length == null) {
      getImageNeweName0 = await ChangeFileName(req.files.image);
      images0.push({
        url: url + getImageNeweName0,
      });
    } else {
      for (let i = 0; i < req.files.image.length; i++) {
        getImageNeweName0 = await ChangeFileName(req.files.image[i]);
        images0.push({
          url: url + getImageNeweName0,
        });
      }
    }
  }
  req.body.image = images0;
  const user = await userModel.create(req.body);
  const token = await getJWTToken(user);

  res.status(200).cookie("token", token, options).json({
    success: true,
    data: user,
    token: token,
  });
});

const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  //checking if user has given password and  username both

  if (!username || !password) {
    return next(new ErrorHandler("Please enter username and password ", 400));
  }

  const user = await userModel.findOne({ username }).select("+password ");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password ", 401));
  }
  const token = await getJWTToken(user);
  const isPasswordMatched = await comparePassword(password, user);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password ", 401));
  }

  res.status(200).cookie("token", token, options).json({
    success: true,
    data: user,
    token: token,
  });
});

const forgetPassword = catchAsyncErrors(async (req, res, next) => { });

const resetPassword = catchAsyncErrors(async (req, res, next) => { });

const logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export { userRegister, userLogin, forgetPassword, resetPassword, logout }