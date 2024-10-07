const CustomeError = require("./customError");

class UnAuthenticatedError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnAuthenticatedError;
