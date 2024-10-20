const mongoose = require("mongoose");
// const subSection = require("./subSection");

const courseSchema = new mongoose.Schema({
    
     courseName:{
        type:String,
        required:true,
        trim:true
     },
     courseDescription:{
        type:String,
        trim:true
     },
     instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
     },
     whatYouWillLearn:{
        type:String,
     },
     courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
     ],
     ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
     ],
     
     price:{
      type:Number
     },
     tag: {
            type: [String],
            required: true,
	  },
     thumbnail:{
      type:String,
     },

     category:{                                          
      type:mongoose.Schema.Types.ObjectId,        
      ref:"Category"
     },

     studentsEnrolled:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
      }
     ],
     instructions: {
         type: [String],
      },
      status: {
         type: String,
         enum: ["Draft", "Published"],
      },
})

module.exports = mongoose.model("Course" , courseSchema);