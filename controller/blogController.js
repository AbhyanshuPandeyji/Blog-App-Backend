// import User from "../models/UserModel.js";
import Blog from "../models/BlogModal.js"

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs: blogs,
    message: `All blogs has been`,
  });
};


export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.find({ _id: id });

  res.status(200).json({
    success: true,
    blog: blog,
    message: `Blog Has Been Found`,
  });
};

export const createBlog = async (req, res) => {
  const { title, description, author, content } = req.body;
  const blog = await Blog.create({
    title: title,
    description: description,
    author: author,
    content: content
  });

  res.status(200).json({
    success: true,
    blog: blog,
    message: `Blog Has Been created`,
  });
};

// Author needs to be checked before granting access to the updation and deletion of blog , either author or admin, with using parameter keywords.
// for update the first needs to be the original blog , then the page there will be a button to activate editing taking that content as blog and then sending new data
export const updateBlog = async (req, res) => {
  const { title, description, content } = req.body;

  // getting author will not work like that , ?author="Name" -> then how will it work ? figure out.
  const { id , author } = req.params;

  const originalBlog = await Blog.findOne({ _id : id })

  if (!originalBlog){
    return res.status(400).json({ message: "Blog Does not Exits" });
  }

  const updatedData = {}

  if(title){
    if(title === "" || title.length < 4 ) {return res.status(400).json({message : "Enter The full title"});}
    updatedData.title = title;
  }

  if(description){
    // if(description === "") 
      // {return res.status(400).json({message : "Enter a different username"});}
    updatedData.description = description;
  }

  if(content){
    // if(description === "") 
      // {return res.status(400).json({message : "Enter a different username"});}
    updatedData.content = content;
  }

  // can be used for author based on parameters keywords
  // if(description){
  //   if(checkUsername || username === userOriginal.username) {return res.status(400).json({message : "Enter a different username"});}
  //   updatedData.username = username;
  // }

  const blog = await Blog.findOneAndUpdate(originalBlog , updatedData , { new : true});

  res.status(200).json({
    success: true,
    blog: blog,
    message: `Blog Has Been Found and updated`,
  });
};


export const deleteBlog = async (req, res) => {
  try {
    const {id} = req.params;

    // using params because not using the access token to save the user
    const blog = await Blog.findById({ _id : id});

    if(!blog){
      return res.status(404).json({message: "Blog Doesn't Exists"})
    }

    await blog.deleteOne();
    // res.status(200).json(`user deleted with the id ${deleteUser}`)
    // const deleteUser = await User.deleteOne({email})
    res.status(200).json({
      message: `Your Blog Has been deleted`,
    });
  } catch (error) {
    return res.status(400).json({message: error});
  }
};

