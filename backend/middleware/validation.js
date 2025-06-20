const { body, param, validationResult } = require("express-validator");

const validateSignup = [
  param("ownerId").isMongoId().withMessage("Invalid ownerId"),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("phone")
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  param("ownerId").isMongoId().withMessage("Invalid ownerId"),
  body("phone").matches(/^\d{10}$/).withMessage("Phone must be 10 digits"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateSignup, validateLogin };
