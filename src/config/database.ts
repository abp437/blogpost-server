import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL missing");
  }

  await mongoose.connect(mongoUrl);

  console.log("MongoDB connected");
}
