import jwt from "jsonwebtoken";

//FUNCTION TO GENERATE A TOKEN FOR A USER
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};
