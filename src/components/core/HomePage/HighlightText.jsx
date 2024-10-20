import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-custom-gradient bg-clip-text text-transparent pl-1 pr-1'>
       {text}
    </span>
  )
}

export default HighlightText