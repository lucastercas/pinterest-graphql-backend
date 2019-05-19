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
    postComment: async(_, {comment, pin}, header) => {
      console.log('\n==========')
      console.log(`Posting comment ${comment} on pin ${pin}`)
      console.log('User: ', header)
      return true;
    }
  },
};

module.exports = resolvers;
