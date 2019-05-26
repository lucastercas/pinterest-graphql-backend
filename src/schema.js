const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const path = require("path");

const typeDefs = importSchema(path.resolve(__dirname, 'schema.graphql'))
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
