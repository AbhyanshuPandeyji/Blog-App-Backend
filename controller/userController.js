import User from "../models/UserModel.js";
import sendToken from "./../utils/jwtToken.js";

export const getUser = async (req, res) => {
  // console.log("user router is working");
  // res.status(200).json("user router is working");

  // if(error) return console.log("the getting user error method doesnt work")
  // const { email } = req.body;

  /* The line `// const user = await User.find();` is a commented-out line of code in the JavaScript
  file. It is not being executed because it is commented out. */
  // const user = await User.find();

  const { username, password } = req.body;

  if (!username || !password) {
    return res.send(400).json({
      message: "entered the wrong email or password",
    });
  }

  const user = await User.findOne({ username: username }).select("+password");
  // this statement wont work , you cant do it , password is hashed , mongodb use select to select password explicitly
  // const user = await User.findOne({ username: username, password: password });
  // but this can work if i define password select true in the user schema , but thats a bad practice
  // so i should only be including password for the compare and not when user is being selected
  // const user = await User.findOne({ username: username });
  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: "user is not found",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    // 401 is for unauthorized
    return res.send(401).json({ message: "Invalid Email Or Password" });
  }

  // if(!email){
  //     return console.log("wrong email user doesn't exits");

  // }
  sendToken(user, 200, res, "User Has been found successfully");

  // res.status(200).json({
  //   user,
  //   message: "Getting All users Data is been successful",
  // });
};

export const createUser = async (req, res) => {
  const { name, email, password, username } = req.body;

  const user = await User.create({ name, email, password, username });

  // res.status(200).json({
  //   message: "User has been Created",
  //   userData,
  // });
  sendToken(user, 200, res);
};

export const getSingleUser = async (req, res) => {
  try {
    // const { _id : userId } = await User.findOne({email})
    // console.log(userId)

    // const userId = req.body.id;
    // const {email} = req.body;
    const user = await User.findById(req.params.id);
    // console.log(userId)
    res.status(200).json({
      user,
      message: "Getting a single user is been successful",
    });
  } catch (error) {
    console.log(error);
  }
};

// update user - update user work partially , need a way to update or use the logged in user
export const updateUser = async (req, res) => {
  try {
    const userOriginal = await User.findById(req.params.id);

    const { name, age, occupation } = req.body;

    const updatedUser = await User.updateOne(userOriginal, {
      name: name,
      age: age,
      occupation: occupation,
    });

    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete the user - delete user works
export const deleteUser = async (req, res) => {
  try {
    // using params because not using the access token to save the user
    const user = await User.findById(req.params.id);
    await user.deleteOne();
    // res.status(200).json(`user deleted with the id ${deleteUser}`)
    // const deleteUser = await User.deleteOne({email})
    res.status(200).json({
      message: `Your Account Has been deleted`,
    });
  } catch (error) {
    console.log(error);
  }
};
