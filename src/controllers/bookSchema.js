const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notfoundError");
const Book = require("../models/BooksModel");

const addBook = async (req, res) => {
  const { title, genre, author } = req.body;

  if (!title || !genre || !author) {
    throw new BadRequestError("Please provide title, genre and author");
  }

  const book = await Book.create(req.body);
  res.status(201).json({ message: "Book added successfully", book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  const { status } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    throw new NotFoundError("Book not found!");
  }

  if (req.user.role === "user") {
    book.status = status;
  } else {
    Object.assign(book, req.body);
  }

  await book.save();

  res.status(200).json({ message: "Book updated successfully", book });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;
  const bookExists = await Book.findById(bookId);

  if (!bookExists) {
    throw new NotFoundError("Book not found!");
  }

  await Book.findOneAndDelete({ _id: bookId });

  res.status(200).json({ message: "Book deleted successfully" });
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  const booksLength = await Book.countDocuments();

  res.status(200).json({ books, count: booksLength });
};

// const borrowBook = async () => {
//   const { id: bookId } = req.params;

//    const bookExists = await Book.findById(bookId);

//    if (!bookExists) {
//      throw new NotFoundError("Book not found!");
//    }

// }

module.exports = { addBook, updateBook, deleteBook, getAllBooks };
