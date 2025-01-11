import User from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users: users,
      message: `User Has Been Found`,
    });
  };
  

export const getSingleUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.find({_id : id });
  
    res.status(200).json({
      success: true,
      users: user,
      message: `User Has Been Found`,
    });
  };
  
