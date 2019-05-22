const uuid = require("uuid/v4");

const addPin = (user, pin) => {
  if (!user) {
    console.log('Unauthorized User')
    throw new Error("Unauthorized");
  }
  const pin_id = uuid();
  return Promise.resolve({
    user: {
      id: user.id,
      email: user.email
    },
    pin: {
      id: pin_id,
      image: pin.image,
      title: pin.title,
      user_id: user.id
    }
  })
}

const addComment = (user_id, pin_id, content) => {
  const comment = {
    user_id: user_id,
    pin_id: pin_id,
    comment_id: uuid(),
    content: comment
  }
  return comment
};

module.exports = {
  addPin
};
