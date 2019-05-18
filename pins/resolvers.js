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
        /*
      return {
        id: 'test-id',
        title: 'test-title',
        link: 'test-link',
        image: 'test-image',
        user_id: 'test-user-id'
      }
      */
    }
  },
  Mutation: {
    addPin: async (_, { pin }, { long_token }) => {
      console.log('\n==========')
      console.log("Adding a Pin");
      console.log('Pin: ', pin)
      const [user] = await authorize(database, long_token);
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      await database("pins").insert(createdPin);
      console.log('Created Pin: ', createdPin)
      return createdPin;
    }
  }
};

module.exports = resolvers;
