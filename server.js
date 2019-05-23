const { ApolloServer } = require('apollo-server');
require('dotenv').config()

const schema = require('./graphql/schema');

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { long_token: req.headers.authorization };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
