import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import {getPasswordResetToken} from "../services/operations/authAPI"
import { FaArrowLeftLong } from "react-icons/fa6";


const ForgotPassword = () => {

   const [emailSent , setEmailSent] = useState(false);
   const [email , setEmail] = useState("");
   const {loading} = useSelector((state)=> state.auth); 
   const dispatch = useDispatch();

   const handleOnSubmit  = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email , setEmailSent));
   }

  return (
  <div className=" flex items-center justify-center">
    <div className="text-white 
                   relative mt-[8%] flex justify-center items-center">
        {
            loading ? ( <div className = " spinner"></div> ) :

             (
                <div className="flex flex-col gap-2 py-10 w-[60%] ">

                    <h1 className="font-semibold text-2xl">
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <p className="text-1xl text-richblack-200 py-2 ">
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"  : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit = {handleOnSubmit} className="flex flex-col gap-10 w-[50%]">
                        {
                            !emailSent && (
                                <label>
                                    <p className="text-richblack-50 pb-1 text-sm font-inter py-2"> Email Address </p>
                                    <input
                                        required
                                        type="email"
                                        name = "email"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                        placeholder = "Enter Your Email"
                                        style={{
                                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full px-5 rounded-[0.5rem] bg-richblack-800 p-[5px] text-richblack-5"
                                    />
                                </label>
                            )
                        }

                        <button className="inter text-2xl text-center text-[12px] px-6 rounded-md font-bold w-[200px]
                              bg-yellow-50 hover:scale-95 transition-all duration-200 text-richblack-900 bg-ric" type="submit">

                          {!emailSent ? "Reset Password" : "Resend email"} 

                        </button> 
                        
                    </form>

                    <div>
                        <Link to= "/login" >
                           <div className="flex gap-2 items-center py-2 px-2">
                                <FaArrowLeftLong />
                                <p className="">Back to login</p>
                           </div>
                        </Link>
                    </div>
                </div>
            )
        }
     </div>
    </div>   
  )
}

export default ForgotPassword