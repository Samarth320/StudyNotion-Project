const User = require("../models/User")
const mailSender = require("../utils/new-mail-sender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//this function takes the email to reset password , and sends the link of one UI page on mail , to reset the password
// the challenge is 
// 1. we need to generate the unique link each time when the request is made. for that we will use "crypto.randomUUID()" --> gives unique identification id 
// 2. to ensure that , this link must valid for only 5 mins , for that we add token(unique id) and resetPasswordExpiry in user 


//resetPasswordToken --> generates unique token for creating unique link ,as well as to inserts that token along with its expiry time in DB , so that 
                //       we can use this token to access the user to update its password
exports.resetPasswordToken = async (req,res)=>{
    try{
       //get email from req body
       const email = req.body.email;

       //email validation
       const user = await User.findOne({email:email});
       if(!user)
       {
        return res.status(401).json({
            success:false,
            message:"Your Email is not registered with us"
        })
       }

       //generate unique id (token) for creating unique link
       const token = crypto.randomBytes(20).toString("hex");

       //update user by adding token and expiration time
       const updatedDetails = await User.findOneAndUpdate(
                                                            {email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires:Date.now() + 3600000,
                                                            },
                                                            {new:true}
       )
       console.log("DETAILS", updatedDetails);

       //create url
       const url = `http://localhost:3000/update-password/${token}`    //use the deploy link of frontend here

       //send mail containing the url
		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

       //send response
       return res.status(200).json({
        success:true,
        message:"Email sent successfully , please check email and reset password"
      })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "something went wrong while sending reset password mail"
        })
    }
}

//resetPassword --> does the actual password updation
exports.resetPassword = async (req,res)=>{
    try{
        //data fetch
        const {password, confirmPassword , token} = req.body;    //here token will be pass in req body by the frontend , from url

        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password and confirm password are not same for password reset"
            });
        }

        //get user info from DB using token
        const userDetails = await User.findOne({token:token});

        //if no entry then invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            });
        }

        //token time check
        // if(userDetails.resetPasswordExpires < Date.now() ){
        //     return res.json({
        //         success:false,
        //         message:"Token is expired , please regenerate your token"
        //     });
        // }

        if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        //hash the password
        const hashedPassword = await bcrypt.hash(password , 10);

        //update the password in DB
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        //return res
        return res.status(200).json({
            success:true,
            message:"Password reset successfull"
        })
    }
    catch(error){
        return res.status(500).json({
            error: error.message,
            success:false,
            message:"Something went wrong while password reset"
        })
    }
}
