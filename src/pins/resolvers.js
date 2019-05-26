const { addPin, addComment } = require("./index");
const { authorize } = require("../authentication");
const database = require("../database");
const { PostgresPubSub } = require("graphql-postgres-subscriptions");

const pubsub = new PostgresPubSub({
  connectionString: `${process.env.DATABASE_URL}?ssl=true`
});

const resolvers = {
  Query: {
    pins: () => {
      console.log("\n==========");
      console.log("Returning Pins");
      return database("pins").select();
    },
    pinById: async (_, { id }) => {
      console.log("\n==========");
      console.log("Returning Pin: ", id);
      const pin = await database("pins")
        .select("*")
        .where("id", id);
      console.log("Pin: ", pin[0]);
      return pin[0];
    },
    commentsByPin: async (_, { pin_id }) => {
      console.log("\n==========");
      console.log("Returning Comments");
      const comments = await database("comments")
        .select("*")
        .where("pin_id", pin_id);
      console.log("Comments: ", comments);
      return comments;
    }
  },
  Mutation: {
    addPin: async (_, { pin }, { long_token }) => {
      console.log("\n==========");
      console.log("Adding Pin: ", pin);
      // Check if user has permission, and return it:
      const [user] = await authorize(database, long_token);
      // Create the pin:
      const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
      console.log("Created Pin: ", createdPin);
      await database("pins").insert(createdPin);
      pubsub.publish("pinAdded", { pinAdded: createdPin });
      return createdPin;
    },
    postComment: async (_, { content, pin_id }, { long_token }) => {
      console.log("\n==========");
      console.log("Posting comment");
      const [user] = await authorize(database, long_token);

      const { comment: createdComment } = await addComment(
        user,
        pin_id,
        content
      );
      await database("comments").insert(createdComment);
      pubsub.publish("commentPosted", { commentPosted: createdComment });
      return createdComment;
    }
  },
  Subscription: {
    pinAdded: {
      subscribe: () => {
        console.log("\n==========");
        console.log("Subscripion Pin Added");
        return pubsub.asyncIterator("pinAdded");
      }
    },
    commentPosted: {
      subscribe: () => {
        console.log("\n==========");
        console.log("Subscripion Comment Posted");
        return pubsub.asyncIterator("commentPosted");
      }
    }
  }
};

module.exports = resolvers;
