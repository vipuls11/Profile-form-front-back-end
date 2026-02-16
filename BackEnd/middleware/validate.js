const { body } = require("express-validator");

const profileValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("mobile")
    .isLength({ min: 10 })
    .withMessage("Mobile number must be at least 10 digits"),
];

module.exports = profileValidation;
