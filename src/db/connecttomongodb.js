import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const mongoDbUrl = process.env.MONGO_DB_URL;

    if (!mongoDbUrl) {
      throw new Error("MONGO_DB_URL environment variable is not set");
    }

    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
