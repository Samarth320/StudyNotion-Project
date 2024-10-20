import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from "../components/common/Footer"
import ExploreMore from '../components/core/HomePage/ExploreMore';

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"

const Home = () => {
  return (
    <div>

        {/* section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between">

                <Link to ={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                                    transition-all duration-200 hover:scale-95 w-fit z-1">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[-5px]
                                         transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>  
                </Link>
                
                <div className='flex gap-2 text-center font-semibold text-4xl mt-6'>
                   Empower your Future with <HighlightText text={"Coding Skills"}/>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>
                    With our Online coding courses,you can learn at your own pace,from anywhere in the world, and get access to
                    wealth of resources , including hands on projects,quizzes and personalized feedback from instructors.
                </div>

                <div className='flex mt-8 gap-7'>
                    <CTAButton active={true} linkto={"/signup"}>
                        learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='my-12  mx-3 shadow-[0_0_20px_20px_rgba(51,255,255,0.2)]'>
                    <video 
                        muted loop autoPlay
                        className="shadow-[17px_17px_0_0] shadow-white">

                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* code section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}

                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your <HighlightText text={" coding potential"} /> with our online courses
                            </div>
                        }

                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }

                        ctabtn1={
                            {
                                btnText:"Try it yourself",
                                linkto:"/signup",
                                active:true
                            }
                        }

                        ctabtn2={
                            {
                                btnText:"learn more",
                                linkto:"/login",
                                active:false
                            }
                        }

                        codeblock={`import React from 'react';
                                   function Greeting(props) {
                                    return (
                                        <div>
                                            <h1>Hi there!</h1>
                                            <p>You’ve arrived at the "StudyNotion" portal.</p>
                                            <p>Dive into coding adventures with StudyNotion!</p>
                                        </div>
                                    );
                                }
                                export default Greeting;`}
                        codeColor={"text-yellow-5"}
                        backgroundGradient={"bgCodeblock1"}
                    />
                </div>

            {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}

                        heading={
                            <div className='text-4xl font-semibold flex gap-2'>
                                Start <HighlightText text={"Coding"}/>in<HighlightText text={"Seconds."}/>
                            </div>
                        }

                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/login",
                                active:true
                            }
                        }

                        ctabtn2={
                            {
                                btnText:"learn more",
                                linkto:"/login",
                                active:false
                            }
                        }

                        codeblock={`import React from 'react';
                                   function Greeting(props) {
                                    return (
                                        <div>
                                            <h1>Hi there!</h1>
                                            <p>You’ve arrived at the "StudyNotion" portal.</p>
                                            <p>Dive into coding adventures with StudyNotion!</p>
                                        </div>
                                    );
                                }
                                export default Greeting;`}
                        codeColor={"text-yellow-5"}
                        backgroundGradient={"bgCodeblock2"}
                    />
                </div>

                <ExploreMore/>

       </div>

        {/* section 2  homepage_bg class is present in app.css */}
           <div className="bg-pure-greys-5 text-richblack-700">
             <div className="homepage_bg h-[310px]">     
                    
                    <div className="w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto">
                            
                            {/* this div is just for adding above space */}
                            <div className = "h-[400px]"></div>        

                            <div className="flex gap-7 text-white">
                                <CTAButton linkto={"/signup"} active={true}>
                                    <div className="flex gap-3 items-center">
                                        Explore Full Catalog
                                        <FaArrowRight/>
                                    </div>
                                </CTAButton>

                                <CTAButton linkto={"/signup"} active={false}> 
                                   Learn More
                                </CTAButton>
                            </div>

                    </div>
             </div>

             <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7'>
                 
                <div className='flex flex-row gap-7 mt-[95px] mb-10'>
                    
                    <div className = "text-4xl font-semibold w-[45%] ">
                       Get the Skills you need for a <HighlightText text={"job that is in demand."} />
                    </div>
                    
                    <div className='flex flex-col w-[40%] gap-10 items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More   
                        </CTAButton>
                   </div>        

                </div>

                <TimelineSection/>

                <LearningLanguageSection/>

             </div>
              

           </div>
                           

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter
                        bg-richblack-900 text-white'>

               <InstructorSection/>  

               <h2 className='text-center text-4xl font-semibold mt-10 mb-20'>
                  Review From Other Learners
               </h2>       

        </div>

        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Home