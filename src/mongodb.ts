import mongoose from "mongoose";

interface config {
  MONGODB_URI: string;
}

const config = <config>{
  MONGODB_URI: process.env.MONGODB_URI,
};

async function connectDb() {
  try {
    await mongoose.connect(config.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}
connectDb();
