const users = [];

const addUser = (userr, sID) => {
  // console.log(id, displayName, position, isFacingForward, room);
  if (userr.displayName)
    userr.displayName = userr.displayName.trim().toLowerCase();
  //Check for existing user
  const existingUser = users.find((user) => user.id === userr.id);
  if (!userr.id) return users;
  if (existingUser) {
    return updateUser(userr, sID);
  }
  const newUser = { ...userr, sID };
  users.push(newUser);
  return { users };
};

const updateUser = (userr, sID) => {
  console.log(users);
  const index = users.findIndex((user) => user.sID === sID);
  // console.log(index);
  if (index) {
    users[index] = { ...userr, sID };
  } else {
    users.push({ ...userr, sID });
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
