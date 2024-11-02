import mongoose, { Connection } from "mongoose";

let mongoConnection: Connection | null = null;

// Function to initialize the Mongoose connection
async function connectToDatabase() {
  if (mongoConnection && mongoConnection.readyState === 1) {
    // Reuse existing database connection
    console.log("Reusing existing database connection");
    return mongoConnection;
  }

  // Connect to the database
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }
  console.log("Connecting to database...");
  const mongooseInstance = await mongoose.connect(process.env.MONGODB_URI);
  mongoConnection = mongooseInstance.connection;
  return mongoConnection;
}

export default connectToDatabase;
