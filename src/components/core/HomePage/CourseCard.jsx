import React from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import { PiNetworkFill } from "react-icons/pi";

const CourseCard = ({key,cardData , currentCard , setCurrentCard}) => {
  return (
    <div className={`w-[25%] flex flex-col gap-8
                    ${currentCard === cardData.heading ? "bg-richblack-5" : "bg-richblack-800" }
                     px-4 py-5 text-richblack-300 `}
                     onClick={()=>setCurrentCard(cardData.heading)}>

            <div className='flex flex-col gap-2 py-3'>
                
                <div className={` text-[16px] font-semibold ${currentCard === cardData.heading ? "text-richblack-700" : "text-richblack-5" }`}>
                   {cardData.heading}
                </div>
                <div className={`text-sm w-[80%] items-center ${currentCard === cardData.heading ? "text-richblack-600" : ""}`}>
                    {cardData.description}
                </div>
            </div>

            <div  className='flex py-2 justify-between border-t-2 border-dashed border-richblack-300 px-2' >

                    <div className='flex gap-2 items-center'>

                        <HiMiniUsers className={`h-20px w-20px ${currentCard === cardData.heading ? "text-blue-300" : ""}`} />
                        <div>
                            {cardData.level}
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <PiNetworkFill className={`h-20px w-20px ${currentCard === cardData.heading ? "text-blue-300" : ""}`} />
                        <div>
                            {cardData.lessionNumber} lessons.
                        </div>
                    </div>

            </div>

    </div>
  )
}

export default CourseCard