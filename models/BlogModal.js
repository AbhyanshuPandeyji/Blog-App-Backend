import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

// const BlogSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Please Enter Your Name"],
//     maxLength: [150, "Name Cannot Exceed 150 character"],
//     minLength: [4, "Name Should have More Than 4 Character"],
//     trim: true,
//     unique: true,

//   },
//   description: {
//     type: String,
//     required: [true, "Please Enter The  Description"],
//     // unique: true,
//     // validate:[validator.isEmail,"Please Enter A valid Email"],
//   },
//   author: {
//     type: String,
//   },
//   content: {
//     type: String,
//     required: [true],
//     // minLength: [8, "Password Should be greater Than 8 Characters"],
//     // select: false,
//   },
//   ratings: {
//     type: Number,
//     default: 0
//   },
//   // images: [
//   //   {

//   //     public_id: {
//   //       type: String,
//   //       required: true
//   //     },
//   //     url: {
//   //       type: String,
//   //       required: true
//   //     }
//   //   }
//   // ],
//   category: {
//     type: String,
//     required: [true, "Please Enter Product Category"]
//   },
//   numOfViews: {
//     type: Number,
//     default: 0
//   },
//   likes: [
//     {
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true
//       },
//     }
//   ],
//   comments: [
//     {
//       // this is how you intake the id at the time of creation. Learn more about it
//       user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true
//       },
//       name: {
//         type: String,
//         required: true
//       },
//       // this is the rating withing the review of the product 
//       rating: {
//         type: Number,
//         required: true
//       },
//       comment: {
//         type: String,
//         required: true
//       }
//     }
//   ],
//   // this is to check who created the product
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Blog = mongoose.model("Blog", BlogSchema);

// export default Blog;


// New Blog Schema for Uploads



const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Your Title"],
    maxLength: [150, "Title Cannot Exceed 150 characters"],
    minLength: [4, "Title Should have More Than 4 Characters"],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "Please Enter The Description"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  category: {
    type: String,
    enum: ["Technology", "Health", "Education", "Entertainment", "Lifestyle", "Other"], // Example categories
    default: "Other"
  },
  numOfLikes: {
    type: Number,
    default: 0
  },
  numOfSaves: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  numOfViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // userId: {
  // a
  // },
  comment: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true],
      },
      text: {
        type: String,
        required: [true],
      }
    }
  ]
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;



