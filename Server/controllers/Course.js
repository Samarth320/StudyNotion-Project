const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader")

//create course handler
exports.createCourse = async (req,res)=>{
    try{
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, 
              price, tag,category,instructions, } = req.body;       

        let {status} = req.body;                  //because we want to re-assign it , hence we have used "let" instead of "const"      

        //fetch thumbnail Image
        const thumbnail = req.files.thumbnailImage;

        // console.log("all fields" , courseName , courseDescription, whatYouWillLearn, price,tag,category,thumbnail);

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"ALL fields are required , please enter all fields"
            })
        }

        const userId = req.user.id;        //we have store this in JWT payload , and during user login, we decode the payload and insert it in req.user


        if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found"
            });
        }

        //check given category is valid or not (for postman testing purpose only)
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"category Details not found"
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME)
        console.log(thumbnailImage);

        //create entry for new course in DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
        })

        //add this new course to user schema i.e instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},     //search
            {
                $push:{
                    courses:newCourse._id    //update
                }
            },
            {new:true}                      //returns updated document
        )

        //update the Tag schema
        await Category.findByIdAndUpdate(             //category
            {_id : category},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data : newCourse
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error : error.message
        });
    }
}

//showAllCourses handler function
exports.getAllCourses = async (req,res)=>{
    try{
        //TODO
        const allCourses = await Course.find( {} , {
                                                     courseName : true, 
                                                     price : true, 
                                                     thumbnail : true, 
                                                     instructor : true,
                                                     ratingAndReviews : true,
                                                     studentsEnrolled : true } )
                                                     .populate("instructor").exec();
        
            return res.status(200).json({
            success:true,
            message:"All Courses Fetched Successfully",
            data : allCourses
        });
                                                
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch Course data",
            error : error.message
        });
    }
}

//getCourseDetails
exports.getCourseDetails = async (req,res)=>{
    try{
        //get id
        const {courseId} = req.body;

        //find course details
        const courseDetails = await Course.find(
                                                {_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails",
                                                        },
                                                    }
                                                )
                                                // .populate("category")
                                                //.populate("ratingAndReviews")
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    },
                                                })
                                                .exec();
                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}