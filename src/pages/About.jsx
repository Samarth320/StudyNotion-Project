import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from '../components/core/About/Quote';
import foundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/About/StatsComponent';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactFormSection from '../components/core/About/ContactFormSection';
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div className='text-white w-[100%] min-h-screen mx-auto font-semibold'>

        {/* section 1 */}
        <section className=' mx-auto pt-8 bg-richblack-700'>

            <div className='flex flex-col'>

                <header className='w-7/12 mx-auto text-center px-5 text-3xl translate-y-[50%]'>

                    <h1 className='px-5 mb-2'>
                        Driving Innovation in Online Education for<br/>
                        <HighlightText text={"Brighter Future"} />
                    </h1>

                    <div className='text-xl font-medium text-richblack-300 mt-3'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </div>
                </header>

                <div className='flex lg:flex-row flex-col gap-x-3 mx-auto translate-y-[50%]'>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>

            </div>


        </section>
        {/* section 2 */}
        <section className='my-28 pt-32'>
            <div className='w-11/12 mx-auto text-center text-3xl mb-3'>
              <Quote/>
            </div>
        </section>

        {/* section 3 */}
        <section className='w-11/12 mx-auto mt-5'>
            <div className="flex flex-col p-5 m-5 gap-10 w-11/12 mx-auto">

                {/* founding story box */}
                <div className='flex w-[100%] justify-between mb-5'>
                    {/* founding story right wala box */}
                    <div className='w-[40%]'>
                        <h1 className='font-semibold text-3xl mb-3 bg-temp-color bg-clip-text text-transparent'>Our Founding Story</h1>

                        <p className='text-sm font-medium text-richblack-400'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className='text-sm font-medium text-richblack-400'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>

                    {/* founding story right wala box */}
                    <div className='w-[40%]'>
                        <img src={foundingStory} />
                    </div>
                </div>

                {/* vision and mission */}
                <div className='flex w-[100%] justify-between mb-10 mt-5'>

                    {/* left box */}
                    <div className='w-[40%] pt-3 pb-3'>
                        <h1 className='font-semibold text-3xl mb-3 bg-vision-color bg-clip-text text-transparent' >Our Vision</h1>
                        <p className='text-sm font-medium text-richblack-400'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    {/* right box  */}
                    <div className='w-[40%] pt-3 pb-3'>
                        <h1 className='font-semibold text-3xl bg-custom-gradient bg-clip-text text-transparent mb-3'>Our Mission</h1>
                        <p className='text-sm font-medium text-richblack-400'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <div className="mx-auto mt-20 flex w-[100%] mb-20 flex-col justify-between gap-10 text-white">
            <StatsComponent/>
        </div>

        {/* section 5 */}
        <div className='flex flex-col items-center justify-center gap-5 mx-auto mb-[140px]'>
           <LearningGrid />
           <ContactFormSection /> 
        </div>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

            <h1 className="text-center text-4xl font-semibold mt-8">
               Reviews from other learners
            </h1>

            {/* <ReviewSlider /> */}
      </div>
      
      <Footer />


    </div>
  )
}

export default About