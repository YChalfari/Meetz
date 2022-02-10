let users = [];

const addUser = (userr, sID) => {
  console.log(sID);
  //Check for existing user
  const existingUser = users.find((user) => user.id === userr.id);
  if (!userr.id) return users;
  if (existingUser) {
    return updateUser(userr, sID);
  }
  const newUser = { ...userr, sID };
  users.push(newUser);
  return users;
};

const updateUser = (userr, sID) => {
  // console.log({ userr });
  // console.log({ USERS: users });
  const index = users.findIndex((user) => user.id === userr.id);
  console.log(index);
  if (index !== -1) {
    users[index] = { ...userr, sID };
  } else {
    users.push({ ...userr, sID });
  }

  return users;
};
const removeUser = (id) => {
  console.log("before", id, users);
  users = users.filter((user) => user.sID !== id);
  console.log("after", users);
  return users;
};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  getUser,
  removeUser,
  updateUser,
  getUsersInRoom,
};
