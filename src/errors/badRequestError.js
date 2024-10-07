const CustomeError = require("./customError");

class BadRequestError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
