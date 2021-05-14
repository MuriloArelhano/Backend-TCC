const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (request, response, next) => {
  const userHeader = request.headers.authorization;

  if (!userHeader) {
    return response.status(401).json({
      error: 'Acesso negado. Forneça o token de autenticação',
    });
  }

  const [, token] = userHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.jwt.secret);
    request.userID = decoded.sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: err });
  }
};
