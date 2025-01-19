import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [150, "Name Cannot Exceed 150 character"],
    minLength: [4, "Name Should have More Than 4 Character"],
  },
  description: {
    type: String,
    required: [true, "Please Enter The  Description" ],
    unique: true,
    // validate:[validator.isEmail,"Please Enter A valid Email"],
  },
  author: {
    type: String,
  },
  content: {
    type: String,
    required: [true],
    // minLength: [8, "Password Should be greater Than 8 Characters"],
    // select: false,
  },
  // not an array because it will be only one image - will be on cloudanary
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // role: {
  //   type: String,
  //   default: "user", // till we make him a admin
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // username: {
  //   type: String,
  //   required: [true, "Please Enter Your Name"],
  //   maxLength: [30, "Name Cannot Exceed 30 character"],
  //   minLength: [4, "Name Should have More Than 4 Character"],
  //   unique: true,
  // },
  // age: { type: Number },
  // occupation: { type: String },
  // resetPasswordToken: String,
  // resetPasswordExpire: String,
});

// this line is required to send the user schema model
// pre is a keyword for presave in  methods in the mongoose shcema or the  node js functions i dont know
// UserSchema.pre("save", async function (next) {
//   // if(!this.isModified("password")){
//   //     next();
//   // }
//   // password gets hashed when saving user it is required
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // JWT Token
// // to say this user is saved and can access the authorized routes
// UserSchema.methods.getJWTToken = function () {
//   console.log(
//     "jwt token is being created for cookies",
//     this._id,
//     process.env.JWT_SECRET
//   );

//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     // expiresIn: process.env.JWT_EXPIRE,
//     expiresIn: "100d",
//   });
// };

// // // Compare Password
// UserSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
