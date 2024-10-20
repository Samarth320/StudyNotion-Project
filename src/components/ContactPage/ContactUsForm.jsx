import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../data/countrycode.json"
// import apiConnector from "../../services/apiconnector"

const ContactUsForm = () => {

    const [loading , setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState : {errors , isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data)=>{
        console.log("printing form data" , data)

        try{
            setLoading(true)
            // const response = await apiConnector("POST" , )
            const response = {status:"ok"}
            console.log("printing response" , response);
            setLoading(false);
        }
        catch(error){
            console.log("Error occur while sending message in contact us form" , error.message)
            setLoading(false);
        }
    }

    useEffect( ()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    }, [reset , isSubmitSuccessful] )

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7'>

        {/* firstname and lastname */}
        <div className='flex gap-5'>
            {/* firstname */}
            <div className='flex flex-col'>
                <label htmlFor='firstname' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  First Name
                </label>
           
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder='Enter First Name'
                    { ...register("firstname" , {required:true}) }
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />

                {
                    errors.firstname && (
                        <span>
                            please enter firstname
                        </span>
                    )
                }
            </div>

            {/* lastname optional to enter by the user */}
            <div className='flex flex-col'>
                <label htmlFor='lastname' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                   Last Name
                </label>
           
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder='Enter Last Name'
                    { ...register("lastname") }
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </div>
        </div>

        {/* email */}
        <div className='flex flex-col'>
            <label htmlFor='email' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address
            </label>
            <input 
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                {...register("email", {required:true})}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {
                errors.email && (
                    <span>
                        please enter your email Address
                    </span>
                )
            }
        </div>
        
        {/* phone number */}
        <div className='flex flex-col'>

            <label htmlFor='phonenumber' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
               Phone Number
            </label>

            <div className='flex gap-5'>

                {/* dropdown */}
                    <select 
                        id="dropdown"
                        name="dropdown"
                        {...register("countrycode" , {required:true})}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[80px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    >
                        {
                            CountryCode.map( (element , index)=>{
                                return(
                                    <option key={index} value={element.code}>
                                        {element.code} -{element.country}
                                    </option>
                                )
                            } )
                        }
                    </select>

                    <input 
                        type='number'
                        id="phonenumber"
                        name="phonenumber"
                        placeholder='12345 67890'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        {...register("phoneNo" , {
                            required  : {vale:true , message:"please enter phone number"},
                            maxLength : {value:10 , message:"Invalid Phone Number"},
                            minLength : {value:8 , message:"Invalid Phone Number"}
                        })}
                    />               
            </div>
            {
                        errors.phoneNo && (
                            <span className='text-pink-200 p-2 font-medium text-sm'>
                                {errors.phoneNo.message}
                            </span>
                        )
            }
        </div>

        {/* message box */}
        <div className='flex flex-col'>
            <label htmlFor='message' className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Enter Message
            </label>
            <textarea 
                id='message'
                name='message'
                cols="30"
                rows="7"
                placeholder='Enter Your Message here'
                {...register("message" , {required:true})}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {
                errors.message && (
                    <span className='text-pink-200 p-2 font-medium text-sm'>
                        please enter your message
                    </span>
                )
            }
        </div>

        {/* button submit     */}
        <button type='submit'
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>
            Send Message
        </button>
    </form>
  )
}

export default ContactUsForm