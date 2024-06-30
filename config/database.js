import mongoose from "mongoose";
// import mongodb from "mongodb";
// import dotenv from "dotenv";
// have to import in sub files also to use env , any file i am using , why is that
import dotenv from "dotenv";
// so i think this is the url mistake i am doing in my ecommerce project because password is not matching i need to encode or use a simple password without special keyword

dotenv.config();

// const APP_URL = "mongodb://localhost:27017/blog";
// const APP_URL = process.env.BASE_URL;
const APP_URL =
  // console.log("process.env.BASE_URL", process.env.BASE_URL);
  // console.log("APP URL", APP_URL);
  // "mongodb+srv://abhyanshupandeyji:Abhy%401234@blog.vucqwyx.mongodb.net/?retryWrites=true&w=majority&appName=Blog";
  // use this method of url password encoding
  /* The line of code ``mongodb+srv://abhyanshupandeyji:${encodeURIComponent(
  "Abhy@1234"
)}@blog.vucqwyx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Blog`` is constructing a
MongoDB connection string. */
  `mongodb+srv://abhyanshupandeyji:${encodeURIComponent(
    "Abhy@1234"
  )}@blog.vucqwyx.mongodb.net/Blog?retryWrites=true&w=majority&appName=Blog`;

// "mongodb://localhost:27017/Blog"
// const database = async () =>
// {
//     try {
//         await mongoose.connect( APP_URL , (err, data)=>{

//             if(err) throw err;
//             // res.status(500).json("server Error");
//             console.log("Database connected");

//         })
//     } catch (error) {
//         console.log(error.message);
//         process.exit(1);
//     }

//     };

const database = async () => {
  // await mongoose.connect(process.env.APP_URL);
  try {
    // await mongoose.connect(process.env.BASE_URL);
    await mongoose.connect(APP_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("there is an error in connection to the database ", error);
  }
};

export default database;
