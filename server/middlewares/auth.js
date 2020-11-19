const firebase = require('./firebase');
const ErrorResponse = require('./ErrorResponse');
const asyncHandler = require('./async');
const User = require('../models/UserModel');

exports.authCheck = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authtoken) {
    token = req.headers.authtoken;
  } else if (req.cookies.procommerce) {
    token = req.cookies.procommerce;
  }

  // Make sure token is send;
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access the resourceee', 401)
    );
  }

  try {
    // verify token
    const firebaseUser = await firebase.auth().verifyIdToken(token);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log(error.message);
    return next(
      new ErrorResponse('Not authorized to access the resource', 401)
    );
  }
});

// Grant access to specific roles...
exports.authorize = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    if (!roles.includes(user.role)) {
      return next(
        new ErrorResponse(
          `User role ${user.role} is unauthorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
