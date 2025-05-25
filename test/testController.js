import Blog from "../models/BlogModal.js";
import User from "../models/UserModel.js";

export const getAllBlogsWithFilters = async (req, res, next) => {

    try {
        const {
            // page = 1,
            // limit = 10,
            search,
            // tags,
            // multiTags,
            sort,
            startDate,
            endDate,
            // ...filters // Other filters
        } = req.query;

        const query = {};

        // Search (title and content in this example)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }, // Search in content as well
            ];
        }

        // Tags (single tag)
        // if (tags) {
        //     query.tags = tags;
        // }

        // // Multi-tags (all must match)
        // if (multiTags) {
        //     const tagArray = Array.isArray(multiTags) ? multiTags : [multiTags];
        //     query.tags = { $all: tagArray };
        // }


        // Other filters (exact matches)
        for (const key in filters) {
            query[key] = filters[key];
        }

        // Date range (assuming you have a 'createdAt' or 'date' field)
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Or query.date
        } else if (startDate) {
            query.createdAt = { $gte: new Date(startDate) };
        } else if (endDate) {
            query.createdAt = { $lte: new Date(endDate) };
        }

        // const skip = (page - 1) * limit;
        const blogs = await Blog.find(query)
            .sort(sort || { createdAt: -1 }) // Sort by createdAt (newest first) by default
        // .skip(skip)
        // .limit(parseInt(limit));

        // const totalCount = await Blog.countDocuments(query);

        // res.json({
        //     blogs,
        //     // currentPage: parseInt(page),
        //     // totalPages: Math.ceil(totalCount / limit),
        //     // totalItems: totalCount,
        // });
        // const blogs = await Blog.find(query);

        res.status(200).json({
            success: true,
            blogs: blogs,
            message: `All blogs has been found`,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create blog" }); // Send error response
    }
}

export const getToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        console.log(token)

        if (!token) {
            // return next(new ErrorHandler("Please Login to access this resource", 401));
            return res.status(401).json({ message : "Please Login to access this resource"});
        }

        // first we need the data of the user for the verification 
        // when we created jwt token we assigned the id which was mongodb _id so we just accessing that id here
        // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const decodedData = jwt.verify(token, `SECRECT`);

        // once we got the decoded data and 
        // till he is login we can access user data
        // req.user = await User.findById(decodedData.id);
        const user = await User.findById(decodedData.id);
        console.log(user);

        res.status(200).json({message:"token has been found" , user: user});

    } catch (error) {
        console.log(error)
    }
}