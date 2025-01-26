import User from "../models/UserModel.js";
import sendToken from "../utils/sendToken.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users: users,
    message: `User Has Been Found`,
  });
};

export const createUser = async (req, res) => {
  console.log("req.body", req.body.userData);

  const { name, email, password , username } = req.body.userData;

  // user find one to find a single user otherwise it will try to find the matching value from entire data
  // and try to return an array which it can never do because it can never find the data of username at the highest level. 
  const existingUser = await User.findOne({ username: username }).select("+password");
  // and i cannot search the data that is singly exists and at the same time is in the data base , because to find in a range i can
  // but as the mongodb doesnt hold it as a sequence i cannot find within a range of data just the type of data
  // $gt : range
  // $lt : range


  // if(existingUser){
  //   return res.status(409).json({message: "User Already exists"})
  //   // "if user already exists then return dont save user",
  //   // existingUser
  // }
  // ;

  // console.log("existing user" , existingUser);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // console.log("trying to register the user if it already not exists")

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    username: username,
  });

  // res.status(200).json({
  //   user,
  //   success: true,
  //   message: "The User Has Been Created",
  // });

  sendToken(user, 200, res, "user has been created");
};



export const loginUser = async (req, res, next) => {
  const { email, password } = req.body.userData;

  // console.log(email , password)

  if (!email || !password) {
    return res.status(400).json({ message: "Please Enter Email and Password" });
  }

  const user = await User.findOne({ email: email }).select("+password");

  // console.log("user found or not" , user)
  if (!user) {
    return res.status(400).json({ message: "Wrong Email Or Password" });
  }

  const IsPasswordMatch = await user.comparePassword(password);
  // console.log("password match or not" )
  // console.log(IsPasswordMatch)

  if (!IsPasswordMatch) {
    return res.status(400).json({ message: "Wrong Email Or Password" });
  }

  sendToken(user, 200, res, "You have successfully logged in");
};

// export const getUser = async (req, res) => {
//   // console.log("user router is working");
//   // res.status(200).json("user router is working");

//   // if(error) return console.log("the getting user error method doesnt work")
//   // const { email } = req.body;

//   /* The line `// const user = await User.find();` is a commented-out line of code in the JavaScript
//   file. It is not being executed because it is commented out. */
//   // const user = await User.find();

//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.send(400).json({
//       message: "entered the wrong email or password",
//     });
//   }

//   const user = await User.findOne({ username: username }).select("+password");
//   // this statement wont work , you cant do it , password is hashed , mongodb use select to select password explicitly
//   // const user = await User.findOne({ username: username, password: password });
//   // but this can work if i define password select true in the user schema , but thats a bad practice
//   // so i should only be including password for the compare and not when user is being selected
//   // const user = await User.findOne({ username: username });
//   console.log(user);

//   if (!user) {
//     return res.status(400).json({
//       message: "user is not found",
//     });
/* The lines `// age: { type: Number },` and `// occupation: { type: String },` are commented out in
the UserSchema. They are defining additional fields that could be included in the user document in
the MongoDB database. */
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     // 401 is for unauthorized
//     return res.send(401).json({ message: "Invalid Email Or Password" });
//   }

//   // if(!email){
//   //     return console.log("wrong email user doesn't exits");

//   // }
//   sendToken(user, 200, res, "User Has been found successfully");

//   // res.status(200).json({
//   //   user,
//   //   message: "Getting All users Data is been successful",
//   // });
// };

// export const createUser = async (req, res) => {
//   // const { name, email, password, username } = req.body;
//   const { name } = req.body.userData;
//   // console.log("create user req.body", req.body);

//   // res.send(200).json({ message: "user has been created" });

//   // const user = await User.create({ name, email, password, username });
//   const user = await User.create({ name: name });

//   res.status(200).json({
//     message: "User has been Created",
//     // user,
//   });
//   // sendToken(user, 200, res);
// };

// export const getSingleUser = async (req, res) => {
//   try {
//     // const { _id : userId } = await User.findOne({email})
//     // console.log(userId)

//     // const userId = req.body.id;
//     // const {email} = req.body;
//     const user = await User.findById(req.params.id);
//     // console.log(userId)
//     res.status(200).json({
//       user,
//       message: "Getting a single user is been successful",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // update user - update user work partially , need a way to update or use the logged in user


export const updateUser = async (req, res) => {
  try {
    const userOriginal = await User.findById(req.params.id);

    const { name, username } = req.body;

    // if(name === "" || name.length < 4 ) return console.log("Enter The full name");
    const updatedData = {}
    const checkUsername = await User.find({username : username });

    if(name){
      if(name === "" || name.length < 4 ) {return res.status(400).json({message : "Enter The full name"});}
      updatedData.name = name;
    }

    if(username){
      if(checkUsername || username === userOriginal.username) {return res.status(400).json({message : "Enter a different username"});}
      updatedData.username = username;
    }

    // this is what should be done , an object already created to give the data to see which data needs to be changed
    // regardless how many datas are being given for the updating
    const updatedUser = await User.updateOne(userOriginal, updatedData , {new: true});

    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// delete the user - delete user works
export const deleteUser = async (req, res) => {
  try {
    // using params because not using the access token to save the user
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({message: "User Doesn't Exists"})
    }

    await user.deleteOne();
    // res.status(200).json(`user deleted with the id ${deleteUser}`)
    // const deleteUser = await User.deleteOne({email})
    res.status(200).json({
      message: `Your Account Has been deleted`,
    });
  } catch (error) {
    return res.status(400).json({message: error});
  }
};
