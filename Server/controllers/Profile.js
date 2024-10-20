const Profile = require("../models/Profile")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


//update profile 
exports.updateProfile = async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;   //dateOfBirth and about are optional

        //get user id
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required to update the profile"
            })
        }

        //find userDetails
        const userDetails = await User.findById({_id:id});

        //find profile 
		const profile = await Profile.findById(userDetails.additionalDetails);

        //update the profile , note -> profile object is already created, so we will just update the data in that profile object and we will do save()
        profile.dateOfBirth = dateOfBirth;
        profile.gender = gender;
        profile.about = about;
        profile.contactNumber = contactNumber;

        await profile.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profile
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occur while updating the profile"
        })
    }
}

//delete account
exports.deleteAccount = async (req,res)=>{
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById({ _id: id });
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })            
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete user
        await User.findByIdAndDelete({_id:id});

        //remove student from studentsEnrolled in course

        //return response
        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        })

        //HW --> 1 CRON JOB
        //HW --> 2 Schedule this delete Account request
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Cannot be deleted"
        })
    }
}

//get all the details of a particular user 
exports.getAllUserDetails = async (req,res)=>{
    try{
        //get id
        const id = req.user.id;

        //get user details 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //validate
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })  
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Entire User data fetched successfully",
            data:userDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching all userDetails"
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Profile Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error occur while updating profile picture",
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};