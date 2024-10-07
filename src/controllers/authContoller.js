const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notfoundError");
const UnAuthenticatedError = require("../errors/unauthenticatedError");
const UserModel = require("../models/UserModel");
const { attachCookiesToResponse } = require("../utils/jwt");
const tokenUser = require("../utils/tokenUser");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    throw new BadRequestError("Please provide email, name, and password");
  }

  const isUserExistEmail = await UserModel.findOne({ email });
  const isUserExistUsername = await UserModel.findOne({ username });

  if (isUserExistEmail) {
    throw new BadRequestError("User with this email already exists");
  }

  if (isUserExistUsername) {
    throw new BadRequestError("User with this username already exists");
  }

  const usersCount = await UserModel.countDocuments();

  let role = "user";
  if (usersCount === 0) {
    role = "admin";
  }

  const user = await UserModel.create({ username, email, password, role });

  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(201).json({
    message: "User registered successfully",
    user: userWithoutPassword,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new BadRequestError("Please provide both email and password");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found with the provided email.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const { password: _, ...userWithoutPassword } = user.toObject();
  const userToken = tokenUser(user);
  const token = attachCookiesToResponse(res, userToken);
  res.status(200).json({
    message: "User logged in successfully",
    user: userWithoutPassword,
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { logout, login, register };
