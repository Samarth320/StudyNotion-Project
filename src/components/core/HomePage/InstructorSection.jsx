import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button";
import { FaArrowRight } from 'react-icons/fa6'

const InstructorSection = () => {
  return (
    <div className='w-[100%] mt-20'>
        <div className='flex items-center gap-20 w-[100%]'>
            <div className='w-[50%]'>
                <img 
                     src={InstructorImage} 
                     alt="InstructorImage"
                     className='shadow-custom-white' />
            </div>

            <div className='w-[50%] flex flex-col gap-10'>

                <div className='text-4xl font-semibold'>
                    Become an
                    <HighlightText text={"Instructor"} />
                </div>

                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                            Star Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection