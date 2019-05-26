const { ApolloServer } = require("apollo-server-express");
const express = require("express");
require("dotenv").config();
const schema = require("./schema");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");

const configuration = {
  development: {
    ssl: true,
    port: 4000,
    hostname: "localhost"
  }
};
const env = process.env.NODE_ENV || "development";

const app = express();

const apollo = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      if(connectionParams.authToken) {
        console.log(connectionParams.authToken)
        return { user: 'iaeiae'}
      }
      throw new erro('Missing Auth Token')
    }
  },
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const long_token = req.headers.authorization || "";
      return { long_token: long_token };
    }
  }
});
apollo.applyMiddleware({ app });

const config = configuration[env];
let server;
if (config.ssl) {
  server = https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, `ssl/${env}/server.key`)),
      cert: fs.readFileSync(path.resolve(__dirname, `./ssl/${env}/server.crt`))
    },
    app
  );
} else {
  server = http.createServer(app);
}

apollo.installSubscriptionHandlers(server);

server.listen({ port: config.port }, () => {
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.subscriptionsPath
    }`
  )
});
