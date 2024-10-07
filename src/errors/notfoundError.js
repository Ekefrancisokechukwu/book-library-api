const CustomeError = require("./customError");

class NotFoundError extends CustomeError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
