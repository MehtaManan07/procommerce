const firebase = require('./firebase');
const ErrorResponse = require('./ErrorResponse');
const asyncHandler = require('./async');

exports.authCheck = asyncHandler(async (req, res, next) => {
    const token = req.headers.authtoken
  if (!token) {
   return next(new ErrorResponse(`Invalid or expired token`, 401));
  }
  const firebaseUser = await firebase
    .auth()
    .verifyIdToken(token);
    req.user = firebaseUser
  next();
});

// Grant access to specific roles...
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
