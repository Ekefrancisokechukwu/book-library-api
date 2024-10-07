const { Router } = require("express");
const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookSchema");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/auth");

const router = Router();

router
  .route("/")
  .post(authenticateUser, authorizePermissions(["admin"]), addBook)
  .get(getAllBooks);

router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions(["admin", "user"]), updateBook)
  .delete(authenticateUser, authorizePermissions(["admin"]), deleteBook);

module.exports = router;
