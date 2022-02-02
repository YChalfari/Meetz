const { addUser, loginUser, logout } = require("../services/user.services");
const auth = require("../middleware/auth");

exports.login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const addedUser = await addUser(req.body);
    return res.status(201).send(addedUser);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await logoutUser(req);
    res.status(200).send("User logged out");
  } catch (e) {
    res.status(500).send();
  }
};
