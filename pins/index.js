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

const addComment = (user, pin_id, content) => {
  if(!user) {
    console.error("Unauthorized User")
    throw new Erro("Unauthorized")
  }
  const com_id = uuid()
  console.log('Comment Id: ', com_id)
  return Promise.resolve({
    user: {
      id: user.id,
      email: user.email
    },
    comment: {
      user_id: user.id,
      pin_id: pin_id,
      comment_id: com_id,
      content: content
    }
  })
};

module.exports = {
  addPin, addComment
};
