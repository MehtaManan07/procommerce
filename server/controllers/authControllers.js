const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/UserModel');

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.user.picture && req.user.picture,
  });
  sendTokenResponse(201, newUser, res, req);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const provider = req.user.firebase.sign_in_provider;
  const identities = req.user.firebase.identities;
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    if (provider === 'password') {
      return next(new ErrorResponse(`Invalid credentials`, 401));
    }
    const newUser = await User.create({
      name: req.user.name,
      email: req.user.email,
      photo: req.user.picture && req.user.picture,
    });
    sendTokenResponse(201, newUser, res, req);
  }
  sendTokenResponse(200, user, res, req);
});


exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('procommerce')
  res.status(200).json({ success: true });
});


const sendTokenResponse = (statusCode, user, res, req) => {
  const token = req.headers.authtoken;
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('procommerce', token, cookieOptions)
  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
};
