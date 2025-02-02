/** */
// import express from "express";
// import database from "./config/database.js";
// import bodyParser from "body-parser";
// import path from "path";


// // import dotenv from 'dotenv/config';
// import dotenv from "dotenv";
// // import 'dotenv/config'


// import cookieParser from "cookie-parser";
// import cors from "cors";

// // if dotenv is not in the root folder then need to also mention the folder by dir method
// // console.log("dotenv is beinig used", dotenv.config());
// // console.log("process.env.BASE_URL", process.env.BASE_URL);
// import userRoute from "./routes/user.js";
// import adminRoute from "./routes/admin.js";
// import blogRoute from "./routes/blog.js";
// // import { configDotenv } from "dotenv";

// dotenv.config();




// const app = express();


// const PORT = 8000;


// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Catch-all route to serve index.html for any route not matching an API endpoint
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://blog-app-frontend-snowy.vercel.app",
//       "https://blog-app-frontend-sp8b.onrender.com",
//     ],
//     methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// // cors;
// app.use(express.json());
// // app.use(dotenv);
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use("/api/user", userRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/blog", blogRoute);

// database();

// app.listen(PORT, () => {
//   console.log("server is working!...");
// });


// import express from "express";
// import database from "./config/database.js";
// import bodyParser from "body-parser";
// import path from "path";
// import { fileURLToPath } from "url"; // Import to handle ES module paths
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import userRoute from "./routes/user.js";
// import adminRoute from "./routes/admin.js";
// import blogRoute from "./routes/blog.js";

// // Initialize dotenv configuration
// dotenv.config();

// // Get __dirname equivalent for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 8000;

// // Serve static files from the React app's build folder
// // app.use(express.static(path.join(__dirname, 'client', 'build')));

// // // Catch-all route to serve index.html for any route not matching an API endpoint
// // app.get('*', (req, res) => {
// //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// // });

// // Configure CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // Local React development
//       "https://blog-app-frontend-snowy.vercel.app", // Production frontend (Vercel)
//       "https://blog-app-frontend-sp8b.onrender.com", // Production frontend (Render)
//     ],
//     methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
//     credentials: true, // Allow credentials (cookies, etc)
//   })
// );

// // Add custom headers for CORS preflight
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// // Middleware to parse JSON, cookies, and body data
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser());

// // Route definitions
// app.use("/api/user", userRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/blog", blogRoute);

// // Connect to the database
// database();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}...`);
// });

/**/


// this is for vite app

import express from "express";
import database from "./config/database.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // For ES Module paths
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import blogRoute from "./routes/blog.js";
import multer from "multer";

// Initialize dotenv configuration
dotenv.config();

// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Serve static files from the Vite build output (client/dist)
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// // Catch-all route to serve index.html for any route not matching an API endpoint
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local React development
      "https://blog-app-frontend-snowy.vercel.app", // Production frontend (Vercel)
      "https://blog-app-frontend-sp8b.onrender.com", // Production frontend (Render)
    ],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true, // Allow credentials (cookies, etc)
  })
);

// Add custom headers for CORS preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware to parse JSON, cookies, and body data
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// const storage = multer.diskStorage({ // Or multer.memoryStorage() for in-memory storage
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // Directory to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()) // Unique filenames
//   }
// })

// const upload = multer({ storage: storage }); // Create a multer instance

// Route definitions
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);

// Connect to the database
database();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});
