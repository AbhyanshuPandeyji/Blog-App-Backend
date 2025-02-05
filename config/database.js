import mongoose from "mongoose";
// import mongodb from "mongodb";
import dotenv from "dotenv";
// have to import in sub files also to use env , any file i am using , why is that
// so i think this is the url mistake i am doing in my ecommerce project because password is not matching i need to encode or use a simple password without special keyword

dotenv.config();
// console.log(process.env)

// local url
// const APP_URL = "mongodb://localhost:27017/Blog";


// MongoDB connection string.
const APP_URL =
  `mongodb+srv://abhyanshupandeyji:${encodeURIComponent(
    "Abhy@1234"
  )}@blog.vucqwyx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Blog`;

// Break the connection string into parts and encode the password
// const DB_USERNAME = process.env.DB_USERNAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_CLUSTER = process.env.DB_CLUSTER
// const DB_NAME = process.env.DB_NAME
// const APP_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appName=Blog`;


const database = async () => {
  // await mongoose.connect(process.env.APP_URL);
  try {
    // await mongoose.connect(process.env.BASE_URL);
    await mongoose.connect(APP_URL);
    // await mongoose.connect();
    console.log(`Connected to MongoDB Database ${APP_URL}`);
  } catch (error) {
    console.log("there is an error in connection to the database ", error);
  }
};

export default database;
