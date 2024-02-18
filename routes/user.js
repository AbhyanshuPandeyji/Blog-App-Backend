import express from 'express';
import { getUser , createUser , getSingleUser , updateUser , deleteUser } from '../controller/userController.js';


const router = express.Router();

// get all users
router.get("/" , getUser);

// get a single user - by param id not the logged in user id
router.get("/singleUser/:id" , getSingleUser);

// create an user - without auth or password hash
router.post("/" , createUser);

// update user data - still by params id , not the stored id
router.put("/updateUser/:id" , updateUser);

// delete user , by the params id , not the logged in user id
router.delete("/deleteUser/:id" , deleteUser);


export default  router;