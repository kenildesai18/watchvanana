import jwt from "jsonwebtoken";
const secret = "Darsh$2003";

function setToken(user) {
  if (user == null) {
    return null;
  }
  // console.log(user);
  return jwt.sign(
    {
      username: user.username,
      password: user.password,
    },

    secret,
    { expiresIn: "5d" }
  );
}

export function getToken(token) {
  if (token == null) {
    return null;
  }
  return jwt.verify(token, secret);
}

export default setToken;
