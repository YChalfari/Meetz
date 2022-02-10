const generateMessage = (username, text, id) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
    senderID: id,
  };
};

module.exports = { generateMessage };
