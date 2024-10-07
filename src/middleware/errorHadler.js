const errorHandler = (err, req, res, next) => {
  console.error(err);

  const customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  if (err.name === "ValidationError") {
    customError.statusCode = 400;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field`;
  }

  if (err.name === "CastError") {
    customError.statusCode = 404;
    customError.message = `No item found with id: ${err.value}`;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandler;
