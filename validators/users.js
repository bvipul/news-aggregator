const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("email must be correct"),
  body("password")
    .notEmpty()
    .withMessage("password can not empty"),
  body("newsPreferences")
    .optional()
    .isArray({
      min: 1,
    })
    .withMessage("newsPreferences must be an array with atleast one element"),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email must be correct"),
  body("password")
    .notEmpty()
    .withMessage("password must not be empty")
];

module.exports = {
  registerValidator,
  loginValidator,
};
