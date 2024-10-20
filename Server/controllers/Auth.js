const User = require("../models/User");
const OTP = require("../models/New_otp")
const Profile = require("../models/Profile")
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/new-mail-sender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

//send otp
exports.sendOTP = async (req,res)=>{
    try{
        console.log("call aa gayi");
        //fetch email from req body
        const {email} = req.body;

        //check user is already registered by this email
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent)
        {
            return res.status(401).json({
                success:false,
                message:"user already registered"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6 , {
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false
        });
        console.log("otp generated : " , otp); 

        //check otp is unique or not
        const result = await OTP.findOne({otp:otp});

        while(result)
        {
            otp = otpGenerator.generate(6 , {
                lowerCaseAlphabets : false,
                upperCaseAlphabets : false,
                specialChars : false
            }); 
            result = await OTP.findOne({otp:otp});
        }

        // we have got unique otp mow
        const otpPayload = {email,otp};

        //create an entry for otp in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return successfull response
        return res.status(200).json({
            success:true,
            message:"Otp sent successfully",
            otp
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error.message"
        })
    }
}

//signup
exports.signUp = async (req,res)=>{
    try{
        //fetch data from req body
        const {firstName, lastName, password, confirmPassword, email, accountType, contactNumber, otp } = req.body;

        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check password
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword value does not match , please try again"
            })
        }

        //check registered user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        //find most recent otp
        const recentOtp = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);   
        console.log("recent otp is" , recentOtp);

        //validate otp
        if(recentOtp.length === 0){                                //**************
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp[0].otp)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })           
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password , 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);        

        //we will insert the profile details entry as null , because we want to link this profile-details id with that user
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });

        //make user entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`

        })

        //send successfull response
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "User cannot be registered, please try again"
        })
    }
}

//login
exports.login = async (req,res)=>{
    try{
        //get data
        const {email,password} = req.body;

        //validate data
        if(!email || !password)
        {
            return res.status(403).json({
                success:false,
                message: "All fields are required, please try again"
            })
        }

        //user exist or not
        const user = await User.findOne({email:email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message: "User is not registered, please signup first"
            })
        }

        //match the password , and generate token
        if(await bcrypt.compare(password , user.password)){

            // const token = jwt.sign(
			// 	{ email: user.email, id: user._id, role: user.role },
			// 	process.env.JWT_SECRET,
			// 	{
			// 		expiresIn: "24h",
			// 	}
			// );

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType                
            }

            const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "24h"});

            user.token = token;
            user.password = undefined;

            //create a cookie and send response
            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }

            res.cookie("token" , token , options).status(200).json({
                success:true,
                user,
                token,
                message:"Logged in Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message: "Password is incorrect"
            })           
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "login failure , please try again"
        })        
    }
}


// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} 
        catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res.status(200).json({
               success: true, 
               message: "Password updated successfully" 
            });
	} 
    catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};