const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/allErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorizedError('Вы не авторизованы'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
      req.user = payload;
      next();
    } catch (err) {
      next(new UnauthorizedError('Вы не авторизованы'));
    }
  }
};
