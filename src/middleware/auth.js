const UnAuthenticatedError = require("../errors/unauthenticatedError");
const UnauthorizedError = require("../errors/unauthorizedError");
const { verifyToken } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const { iat, exp, ...rest } = verifyToken(token);
    req.user = rest;

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Token is not valid");
  }
};

const authorizePermissions = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Access denied");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
