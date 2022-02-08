const users = [];

const addUser = ({ id, sID, displayName, position, room, isFacingForward }) => {
  // console.log(id, displayName, position, isFacingForward, room);
  if (displayName) displayName = displayName.trim().toLowerCase();
  //Check for existing user
  const existingUser = users.find((user) => user.id === id);
  if (!id) return users;
  if (existingUser) {
    return updateUser({ id, displayName, position, room, isFacingForward });
  }
  const user = { id, displayName, position, isFacingForward, room, sID };
  users.push(user);
  return { users };
};

const updateUser = ({ id, displayName, position, room, isFacingForward }) => {
  // console.log("updateUser", data);
  const index = users.findIndex((user) => user.id === id);
  if (index) {
    users[index].position = position;
    users[index].isFacingForward = isFacingForward;
    users[index].displayName = displayName;
    users[index].room = room;
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
