const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },

    author: {
      type: String,
      required: [true, "Please provide an author name"],
      trim: true,
      maxlength: [50, "Author name cannot be more than 50 characters"],
    },
    genre: {
      type: String,
      required: [true, "Please provide a genre"],
      trim: true,
    },
    publicationDate: {
      type: Date,
      required: [true, "Please provide a publication date"],
    },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
