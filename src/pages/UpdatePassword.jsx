import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import {useState} from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    
    const {loading} = useSelector((state)=> state.auth);
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const {password , confirmPassword} = formData;

    const handleOnChange = (e)=>{
        setFormData((prevData)=>(
           {
              ...prevData,
              [e.target.name] : e.target.value, 
           }
        ))
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password , confirmPassword , token , navigate));
    }

  return (
    <div className="text-white relative flex flex-col items-center justify-center top-[140px]">
        {
            loading ? (<div>Loading ...</div>) : 
            (
                <div className="flex flex-col gap-2 font-inter">

                    <h1 className="text-white text-3xl font-semibold">Choose a new Password</h1>
                    <p className = "text-1xl mb-5 text-richblack-300 ">Almost done. Enter your new password and youre all set.</p>

                   <form onSubmit = {handleOnSubmit}>
                        <label className = "relative">
                                <p className="text-1xl mb-1 text-richblack-300">New Password</p>

                                <input 
                                    required
                                    type = {showPassword ? "text" : "password"}
                                    name = "password"
                                    value = {password}
                                    onChange = {handleOnChange}
                                    placeholder = "Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full mb-5 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />

                                <span className = "absolute right-5 top-10 z-10 "
                                 onClick = {()=> setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? <IoEye fontSize = {24}/> : <IoEyeOff fontSize = {24}/>
                                    }
                                </span>
                        </label>   

                        <label className = "relative">
                                <p className="text-1xl mb-1 text-richblack-300">Confirm New Password</p>
                                
                                <input 
                                    required
                                    type = {showConfirmPassword ? "text" : "password"}
                                    name = "confirmPassword"
                                    value = {confirmPassword}
                                    onChange = {handleOnChange}
                                    placeholder = "Confirm Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full mb-10 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />

                                <span className = "absolute right-5 top-[75%] z-5 "
                                onClick = {()=> setShowConfirmPassword((prev) => !prev)}>
                                    {
                                        showConfirmPassword ? <IoEye fontSize = {24}/> : <IoEyeOff fontSize = {24}/>
                                    }
                                </span>
                        </label>  

                        <button type = "submit" className="mt-4 w-full mb-3 font-bold rounded-[8px] bg-yellow-50 py-[8px] px-[12px] text-richblack-900
                                        hover:scale-95 transition-all duration-200">
                            Reset Password
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
  )
}

export default UpdatePassword