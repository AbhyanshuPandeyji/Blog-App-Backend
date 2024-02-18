import  User  from "../models/UserModel.js";
import mongoose from 'mongoose'
import mongodb from "mongodb"


export const getUser = async (req , res)=>{
    // console.log("user router is working");
    // res.status(200).json("user router is working");

    // if(error) return console.log("the getting user error method doesnt work")
    const { email } = req.body;

    const user = await User.find();

    // if(!email){
    //     return console.log("wrong email user doesn't exits");
        
    // }

    res.status(200).json({
        user
    });

}


export const createUser = async (req , res)=>{

    const { name ,  email , password , username } = req.body;

    const userData = await User.create({name , email , password , username });

    res.status(200).json( { 
        message : "User has been Created" ,
        userData});
}

export const getSingleUser = async (req ,res)=>{
    try {
        // const { _id : userId } = await User.findOne({email})
        // console.log(userId)

        // const userId = req.body.id;
        // const {email} = req.body;
        const user = await User.findById(req.params.id);
        // console.log(userId)
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
    }
}

// update user - update user work partially , need a way to update or use the logged in user
export const updateUser = async (req ,res)=>{
    try {
        const userOriginal = await User.findById(req.params.id);

        const { name , age , occupation } = req.body;

        const updatedUser = await User.updateOne(userOriginal , {
            name : name,
            age: age,
            occupation: occupation
        })


        res.status(200).json({
            user : updatedUser
        })
    } catch (error) {
        console.log(error)
    }
}


// delete the user - delete user works
export const deleteUser = async (req,res)=>{
    try {
        
        const user = await User.findById(req.params.id);
        await user.deleteOne();
        // res.status(200).json(`user deleted with the id ${deleteUser}`)
        // const deleteUser = await User.deleteOne({email})
        res.status(200).json({
            message : `Your Account Has been deleted`
        })
    } catch (error) {
        console.log(error)
    }
}