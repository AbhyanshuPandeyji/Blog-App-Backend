import mongoose from "mongoose";
import mongodb from "mongodb";
import dotenv from "dotenv"


const APP_URL = "mongodb://localhost:27017/blog";

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
    await mongoose.connect(APP_URL , );
    console.log("Connected to MongoDB");
  };

export default   database;