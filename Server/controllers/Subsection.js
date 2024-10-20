const Section = require("../models/Section")
const SubSection = require("../models/subSection")         //here the initially name was subSection
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const cloudinary = require("cloudinary");
const mongoose = require("mongoose")

//create Subsection handler
exports.createSubSection = async(req,res)=>{
    try{
        //fetch data
        const {sectionId, title, description, timeDuration} = req.body;

        //extract video file
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !description || !timeDuration){
            return res.status(404).json({
                success:false,
                message:"All fileds are required for creating a sub-section"
            }); 
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        //create sub-section in DB
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
            videoUrl_publicId:uploadDetails.public_id
        })

        //update section with this subSection ki ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                               {
                                                                $push:{
                                                                    subSection:subSectionDetails._id
                                                                }},
                                                                {new:true} 
        ).populate("subSection");

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-Section created successfully",
            data:updatedSection
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to create sub-section, please try again",
            error: error.message,
        }); 
    }
}

//update sub-section handler
exports.updateSubSection = async(req,res)=>{
    try{
            //fetch data
            const { title, subSectionId ,  description, timeDuration} = req.body;

            //extract new video file
            const video = req.files.videoFile;

            //validation
            if(!subSectionId || !title || !description || !timeDuration || !video){
                return res.status(400).json({
                    success:false,
                    message:"All fileds are required for updating a sub-section"
                }); 
            }

            //delete the file on cloudinary, through its public_id
            const subsectionData = await SubSection.findById({_id: subSectionId });
            const publicIdOfOldVideo = subsectionData.videoUrl_publicId;

                try{
                    await cloudinary.uploader.destroy(publicIdOfOldVideo, { resource_type: "video" });
                }
                catch(error){
                    console.log(error)
                    return res.status(400).json({
                        success:false,
                        message:"BHAI SAHAB , ERROR OCCUR WHILE DELETING FILE FROM CLOUDINARY"
                    }); 
                }
            
            //upload the new video on cloudinary
            const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
            
            //update the details in DB
            const updatedSubSection = await SubSection.findByIdAndUpdate(
                                                                         {_id:subSectionId},
                                                                         {
                                                                            title:title,
                                                                            description:description,
                                                                            timeDuration:timeDuration,
                                                                            videoUrl:uploadDetails.secure_url,
                                                                            videoUrl_publicId:uploadDetails.public_id
                                                                         },
                                                                         {new:true}
            )

            //return response
            return res.status(200).json({
                success:true,
                message:"Sub-Section updated successfully",
                updatedSubSection
            });
         }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating sub-section, please try again"
            }); 
        }
}

//delete sub-section handler
exports.deleteSubSection = async(req,res)=>{
    try{
        //fetch data
        const {sectionId,subSectionId} = req.body;

        //remove subSectionId from the subSection array in Section
        const updatedSection = await Section.findByIdAndUpdate(
                                                                {_id:sectionId},
                                                                {
                                                                    $pull:{
                                                                        subSection:subSectionId
                                                                    }
                                                                },
                                                                {new:true}
        );

        //delete from DB
        await SubSection.findByIdAndDelete(subSectionId);

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully"
        });

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while deleting sub-section, please try again"
        });
    }
}
