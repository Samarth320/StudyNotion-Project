const Section = require("../models/Section")
const Course = require("../models/Course")

//create section handler
exports.createSection = async(req,res)=>{
    try{
        //fetch data
        const {sectionName, courseId} = req.body;

        //validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing data for creating a section"
            });
        }

        //create section entry in DB
        const newSection = await Section.create({sectionName:sectionName});

        //update course with section Object_id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                              courseId, 
                                                              {
                                                                $push:{
                                                                    courseContent : newSection._id
                                                                }
                                                              },
                                                              {new:true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again"
        });
    }
}

//update a section handler
exports.updateSection = async(req,res)=>{
    try{
        //fetch data
        const {sectionName , sectionId} = req.body

        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing data for creating a section"
            });
        }

        //update the data in DB
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true} );

        //return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        });

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to update section, please try again"
        });
    }
}

//delete section handler
exports.deleteSection = async(req,res)=>{
    try{
        //fetch id
        const {sectionId , courseId} = req.body;

        //HW --> remove sectionId from the courseContent
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                    {_id:courseId},
                                                                    {
                                                                        $pull:{
                                                                            courseContent:sectionId
                                                                        }
                                                                    },
                                                                    {new:true}
        )

        //delete section from DB
        await Section.findByIdAndDelete(sectionId);

        //return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        });

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to delete section, please try again"
        });
    }
}