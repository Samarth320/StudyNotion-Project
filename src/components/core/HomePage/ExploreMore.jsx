import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='flex flex-col items-center '>

        <div className='font-semibold flex items-center gap-2 text-4xl text-center mx-auto'>
           <div> Unlock the </div>
           <div> <HighlightText text={"Power of Code"} /> </div>
        </div>

        <div className='text-center text-richblack-300 text-[16px] text-sm mt-3'>
            Learn to build anything you can imagine
        </div>

        <div className=' flex items-center gap-6 justify-center rounded-full bg-richblack-800 mb-5 border-richblack-100
                       mt-5 px-1 py-1 '>
            {
                tabsName.map( (element,index)=>{
                    return(
                        <div 
                            className={`text-[16px] flex flex-row items-center gap-3 
                                      ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-mdeium" 
                                                               : "text-richblack-200"} rounded-full transition-all duration-200 
                                                                  cursor-pointer hover:bg-richblack-900 hover:text-richblack-5
                                                                  px-2 py-2 `} 
                                                                  key = {index}
                                                                  onClick={()=>setMyCards(element)}>
                            {element}
                        </div>
                    )
                } )
            }
        </div>

        <div className='lg:h-[150px]'></div>

        {/* course card  */}
        <div className=' flex flex-row gap-7 justify-center absolute bottom-[-5%]'>
            {
                courses.map( (element,index)=>{
                    return(
                        <CourseCard key={index} cardData={element} currentCard = {currentCard} setCurrentCard={setCurrentCard} />
                    )
                } )
            }
        </div>

    </div>
  )
}

export default ExploreMore