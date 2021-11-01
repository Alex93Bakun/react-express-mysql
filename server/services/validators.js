const { body } = require('express-validator');

const validators = {
    userValidator: [
        body('email').isEmail().normalizeEmail().trim(),
        body('password')
            .not()
            .isEmpty()
            .trim()
            .isLength({ min: 5 })
            .withMessage('Must be at least 5 chars')
            .matches(/\d/)
            .withMessage('Must contain a number'),
    ],
    loginValidator: [
        body('email').isEmail().normalizeEmail().trim(),
        body('password')
            .not()
            .isEmpty()
            .trim()
            .isLength({ min: 5 })
            .withMessage('Must be at least 5 chars')
            .matches(/\d/)
            .withMessage('Must contain a number'),
    ],
};

module.exports = validators;
