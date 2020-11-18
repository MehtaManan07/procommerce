const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');
exports.trial = asyncHandler(async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}/me`
    res.json({ url })
  });
  