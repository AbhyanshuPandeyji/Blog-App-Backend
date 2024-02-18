import express from 'express';
import database from './config/database.js';
import userRoute from './routes/user.js';
import bodyParser from 'body-parser';

// import dotenv from 'dotenv/config';
import dotenv from 'dotenv';



const app = express();

const PORT =  8000;


app.use(express.json())
// app.use(dotenv)
// app.use(bodyParser.json())



app.use("/user" , userRoute );



database();

app.listen( PORT , ()=>{
    console.log("server is working!...");
})