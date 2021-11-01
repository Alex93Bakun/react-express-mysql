const { User } = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const validateDecorator = require('../services/validateDecorator');
const { createToken } = require('../services/auth.service');

const create = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user) {
                return Promise.reject({
                    statusCode: 422,
                    message: 'This email is already used',
                });
            } else {
                const { login, email, password } = req.body;
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                return User.create({ login, email, password: passwordHash });
            }
        })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(error.statusCode || 400).json({ errors: error.message });
        });
};

const login = (req, res, next) => {
    const loginUser = req.body;
    User.login(loginUser)
        .then(createToken)
        .then((token) => {
            res.json({ token });
            next();
        })
        .catch((error) => {
            res.status(401).json({ error });
        });
};

module.exports = validateDecorator({
    create,
    login,
});
