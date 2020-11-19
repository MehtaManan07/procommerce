const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/UserModel');

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.user.picture && req.user.picture,
  });
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const provider = req.user.firebase.sign_in_provider;
  const identities = req.user.firebase.identities
  console.log(Object.keys(identities).length)
  console.log(provider)
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
    res.status(201).json({
      success: true,
      data: newUser,
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
