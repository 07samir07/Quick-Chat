import mongoose from "mongoose";

//FUNCTION TO CONNECT TO THE MONGODB DATABASE
export const connectDB = async () => {
  try {
    mongoose.connection.on("Connected", () =>
      console.log("Database Connected"),
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
  } catch (error) {
    console.log(error);
  }
};
