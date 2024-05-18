import express from "express";
import database from "./config/database.js";
import userRoute from "./routes/user.js";
import bodyParser from "body-parser";

// import dotenv from 'dotenv/config';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173","https://blog-app-frontend-snowy.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

cors;
app.use(express.json());
// app.use(dotenv);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/user", userRoute);

database();

app.listen(PORT, () => {
  console.log("server is working!...");
});
