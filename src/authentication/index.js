const uuid = require("uuid/v4");
const jsonwebtoken = require("jsonwebtoken");

const { sendMail } = require("../email");

const createShortLivedToken = ({ email, id }) => {
  console.log("Creating Short Lived Token");
  return jsonwebtoken.sign({ id, email }, process.env.SECRET, {
    expiresIn: "5m"
  });
};

const sendShortLivedToken = async (email, token) => {
  console.log("Sending Token to Email");
  const result = await sendMail({
    from: '"Clifton Schulktz" <clifton.schultz@ethereal.email>',
    to: email,
    text: `${process.env.APP_URL}/verify?token=${token}`,
    html: `<a href="${
      process.env.APP_URL
    }/verify?token=${token}" target="_blank">Authenticate</a>`,
    subject: "Auth token"
  });
  console.log("Result: ", result);
  if (result) {
    return true;
  }
  return false;
};

const createLongLivedToken = short_token => {
  try {
    const { id, email } = jsonwebtoken.verify(short_token, process.env.SECRET);
    const long_token = jsonwebtoken.sign(
      { id, email },
      process.env.SECRET,
      { expiresIn: "30 days" }
    );
    console.log('Short Token: ', short_token)
    console.log('Long Token: ', long_token)
    return Promise.resolve(long_token);
  } catch (error) {
    console.error("Error on createLongLivedToken: ", error);
    throw error;
  }
};

const verify = long_token => {
  console.log("Verifying Token: ", long_token);
  try {
    return jsonwebtoken.verify(long_token, process.env.SECRET);
  } catch (error) {
    console.error("Error on Token Verification: ", error);
    throw new Error("Unauthorized");
  }
};

const authorize = async (database, long_token) => {
  console.log("Authorizing User - Auth Index");
  const { id } = verify(long_token);
  const user = await database("users")
    .select()
    .where({ id });
  return user
};

const createUser = email => {
  console.log("Creating User");
  const id = uuid();
  return { id, email };
};

module.exports = {
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  verify,
  authorize,
  createUser
};
