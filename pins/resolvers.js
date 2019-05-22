const { addPin } = require("./index");
const { verify, authorize } = require("../authentication");
const database = require("../database");

const resolvers = {
  Query: {
    pins: () => {
      console.log('\n==========')
      console.log('Returning Pins')
      return database("pins").select()
    },
    pinById: async (_, {id}) => {
      console.log('\n==========')
      console.log('Returning Pin: ', id)
      const pin = await database('pins').select('*').where('id', id)
      console.log('Pin: ', pin)
      return pin[0]
    },
    commentsByPin: async(_, {pin_id}) => {
      console.log('\n==========')
      console.log('Returning Comments')
      const comments = await database('comments').select('*')
        .where('pin_id', pin_id)
      return comments
    }
  },
  Mutation: {
    addPin: async (_, { pin }, { long_token }) => {
      console.log('\n==========')
      console.log("Adding a Pin");
      console.log('Pin: ', pin)
      // Check if user has permission, and return it:
      const [user] = await authorize(database, long_token);
      // Create the pin:
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      console.log('Created Pin: ', createdPin)
      await database("pins").insert(createdPin);
      return createdPin;
    },
    postComment: async(_, {comment, pin_id, user_id}, {long_token}) => {
      console.log('\n==========')
      console.log('Posting comment')
      const comment = {
        user_id: user_id,
        pin_id: pin_id,
        comment_id: uuid(),
        content: comment
      }
      await database('comment').insert(comment)
      return true;
    }
  },
};

module.exports = resolvers;
