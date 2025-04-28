import mongoose from "mongoose";

/**
 * @type {string | undefined}
 */
const MONGO_URI = process.env.MONGO_URI;
const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected to MongoDb!");
    return;
  }
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the env");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!.");
  } catch (error) {
    console.error("mongodb connection error");
  }
};

export default connectToDB;
