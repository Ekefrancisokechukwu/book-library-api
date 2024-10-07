const CustomError = require("./customError");

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = UnauthorizedError;
