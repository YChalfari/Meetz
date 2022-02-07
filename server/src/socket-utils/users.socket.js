const users = [];

const addUser = ({ id, username, position, isFacingForward }) => {
  console.log(id, username, position, isFacingForward);
  if (username) username = username.trim().toLowerCase();
  //check for existing user
  //Check for existing user
  const existingUser = users.find((user) => user.id === id);
  if (existingUser) {
    return;
  }
  const user = { id, username, position, isFacingForward };
  users.push(user);
  return { users };
};

const updateUser = ({ id, position, isFacingForward }) => {
  // console.log("updateUser", data);
  const user = users.find((user) => user.id === id);
  if (user) {
    user.position = position;
    user.isFacingForward = isFacingForward;
  }

  return users;
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users;
};
const getUser = (id) => users.find((user) => user.id === id);

module.exports = {
  addUser,
  getUser,
  removeUser,
  updateUser,
};
