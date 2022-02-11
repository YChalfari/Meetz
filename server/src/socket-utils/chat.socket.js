const generateMessage = (username, text, id, type) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
    senderID: id,
    type,
  };
};

module.exports = { generateMessage };
