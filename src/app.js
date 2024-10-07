require("express-async-errors");
require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
const middlewareErrorhandler = require("./middleware/errorHadler");

// ROUTER;
const authRouter = require("./routes/authRoute");
const bookRouter = require("./routes/bookRoute");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);

app.use((req, res) => res.status(404).send("Route does not exists"));
app.use(middlewareErrorhandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

start();
