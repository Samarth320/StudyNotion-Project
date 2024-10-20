import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <p className='w-[70%] mx-auto mb-15'>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={`combines technology`}/>,

         <span className="bg-vision-color bg-clip-text text-transparent">
            {" "}
            expertise
         </span>,

         and community to create an

         <span className="text-yellow-50">
         {" "}
           unparalleled educational experience.
         </span>

    </p>
  )
}

export default Quote