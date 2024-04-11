const { validationResult } = require("express-validator");

function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      code: "VALIDATION_ERROR",
    });
  }

  next();
}

module.exports = validateRequestSchema;
