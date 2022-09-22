
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import userModel from "../model/userModel";
import ErrorHandler from "../utils/errorHandler";
import { ChangeFileName } from "../utils/changeFileName";
import { getJWTToken } from "../utils/jwtToken";
const COOKIE_EXPIRE = 5
const options = {
  expire: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// Add user
const adduser = catchAsyncErrors(async (req, res, next) => {
  try {

    let images0 = [];
    let getImageNeweName0;
    const url = "http://localhost:4400/"
    if (req.files.password.length == null) {
      getImageNeweName0 = await ChangeFileName(req.files.password);
      images0.push({
        url: url + getImageNeweName0,
      });
    } else {
      for (let i = 0; i < req.files.password.length; i++) {
        getImageNeweName0 = await ChangeFileName(req.files.password[i]);
        images0.push({
          url: url + getImageNeweName0,
        });
      }
    }
    req.body.password = images0;
    let test, images1 = [];
    let getImageNeweName1;

    if (req.files.image.length == null) {
      getImageNeweName1 = await ChangeFileName(req.files.image);
      images1.push({
        url: url + getImageNeweName1,
      });
    } else {
      for (let i = 0; i < req.files.image.length; i++) {
        getImageNeweName1 = await ChangeFileName(req.files.image[i]);
        images1.push({
          url: url + getImageNeweName1,
        });
      }
    }
    req.body.image = images1;

    const user = await userModel.create(req.body);
    const token = await getJWTToken(user);

    res.status(200).cookie("token", token, options).json({
      success: true,
      data: user,
      token: token,
    });;


  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get user Using Id
const viewuserById = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all user
const viewuser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete user
const deleteuser = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }
    user = await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "user deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update user
const updateuser = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }


    user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { adduser, viewuser, viewuserById, deleteuser, updateuser }

