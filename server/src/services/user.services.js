const User = require("../models/user.model");

const addUser = async function (body) {
  try {
    const user = new User(body);
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (e) {
    throw Error(e.message);
  }
};

const loginUser = async function ({ email, password }) {
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (e) {
    throw Error(e.message);
  }
};

const logoutUser = async function (req) {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    const user = await req.user.save();
    console.log("User logged out");
    return user;
  } catch (e) {
    throw Error(e.message);
  }
};
module.exports = {
  addUser,
  loginUser,
  logoutUser,
};
