const {
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  authorize,
  createUser
} = require("./index");

const database = require("../database");

const resolvers = {
  Query: {
    users: async () => {
      console.log("Querying Users");
      const users = await database("users").select();
      return users;
    },
    me: async (_, __, { long_token }) => {
      console.log('\n==========')
      console.log("Querying Me");
      const [user] = await authorize(database, long_token);
      console.log("User: ", user);
      return user;
    }
  },
  Mutation: {
    sendShortLivedToken: async (_, { email }) => {
      console.log('\n==========')
      console.log("Sending Short Lived Token, Email:", email);
      let user;
      const userExists = await database("users")
        .select()
        .where({ email });
      if (userExists.length) {
        user = userExists[0];
      } else {
        user = createUser(email);
        await database("users").insert(user);
      }
      const token = createShortLivedToken(user);
      console.log("Token: ", token);
      return sendShortLivedToken(email, token);
    },
    createLongLivedToken: (_, { short_token }) => {
      console.log('\n==========')
      console.log('Creating Long Lived Token')
      return createLongLivedToken(short_token);
    }
  },
  Person: {
    __resolveType: person => {
      if (person.admin) {
        return "Admin";
      }
      return "User";
    }
  },
  User: {
    pins(person) {
      return database("pins")
        .select()
        .where({ user_id: person.id });
    }
  }
};

module.exports = resolvers;
