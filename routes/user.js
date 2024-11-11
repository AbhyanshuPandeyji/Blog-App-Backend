import express from "express";
import {
  createUser,
  // getSingleUser,
  // updateUser,
  // deleteUser,
  getAllUsers,
  loginUser,
} from "../controller/userController.js";

const router = express.Router();

// get users
// router.get("/", getUser);

// get All User
router.get("/getAll", getAllUsers);

// login User
router.post("/login", loginUser);

// get a single user - by param id not the logged in user id
// router.get("/singleUser/:id", getSingleUser);

// // create an user - without auth or password hash
router.post("/create", createUser);

// // update user data - still by params id , not the stored id
// router.put("/updateUser/:id", updateUser);

// // delete user , by the params id , not the logged in user id
// router.delete("/deleteUser/:id", deleteUser);

export default router;
