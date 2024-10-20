const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course")

//createRatingAndReview
exports.createRating = async(req,res)=>{
    try{
        //get userid
        const userId = req.user.id;

        //fetch data from req
        const {rating,review,courseId} = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne({
                                                    _id:courseId,
                                                    studentsEnrolled : {$elemMatch: {$eq: userId} }
        });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });

        if(alreadyReviewed) {
        return res.status(403).json({
            success:false,
            message:'Course is already reviewed by the user',
        });
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review, 
            course:courseId,
            user:userId,
        });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                                    {
                                                                        $push: {
                                                                        ratingAndReviews: ratingReview._id,
                                                                        }
                                                                    },
                                                                    {new: true});

        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
            console.log(error);
            return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}

//getAverage-Rating-Reviews
exports.getAverageRating = async (req,res)=>{
    try{
        //get course id
        const courseId = req.body.courseId;

        //calculate average rating , we will use operators --> $avg , $match , $group

        const result = await RatingAndReview.aggregate([               //aggregate function returns an array
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)      //string type converted into ObjectId
                }
            },
            {
                $group:{
                    _id:null,                                     //using this line , we form a single group of all the fetched entries
                    averageRating : { $avg: "$rating"}            // here "rating" is the property inside RatingAndReview model
                }
            }
        ])

        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average rating for this course fetched successfully",   //note in our case, aggregate func returns a single value in an array , which is nothing but the "averageRating"
                averageRating : result[0].averageRating                          //In "result[0].averageRating"  averageRating is the key
            })
        }

        //if no rating/review exists
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, No ratings given till now",
            averageRating : 0
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while fetching average rating and reviews",
        })
    }
}


//getAll-Rating-Reviews
exports.getAllRating = async (req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
                                                         .populate({
                                                            path:"user",
                                                            select:"firstName lastName image email"
                                                         })
                                                         .populate({
                                                            path:"course",
                                                            select:"courseName"
                                                         })
                                                         .exec();
        
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data : allReviews
        })                                                 
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while fetching All rating and reviews",
        })
    }
}