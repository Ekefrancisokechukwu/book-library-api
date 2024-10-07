const tokenUser = (user) => {
  return {
    username: user.username,
    password: user.password,
    id: user._id,
    role: user.role,
  };
};

module.exports = tokenUser;
