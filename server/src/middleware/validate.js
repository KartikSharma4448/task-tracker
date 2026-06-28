// Request validation middleware using express-validator.

const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extracted = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: extracted
    });
  };
};

module.exports = { validate };
