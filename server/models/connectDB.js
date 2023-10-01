import mongoose from "mongoose";

 const uri = process.env.mongoUriAtlas;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error(
      "Error occurred while attempting to connect to the database:"
    );
    console.error(error);

    // You can add specific error handling for certain error types, for example:
    if (error.name === "MongoNetworkError") {
      console.error("Failed to connect to MongoDB network.");
    } else if (error.name === "MongoTimeoutError") {
      console.error("Connection to MongoDB timed out.");
    } else {
      console.error("Unknown error occurred while connecting to the database.");
    }
  }
};

export default connectDB;
