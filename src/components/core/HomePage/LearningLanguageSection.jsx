import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col items-center gap-10 mt-[130px] pb-10 mb-32'>

            <div className='flex flex-col gap-3'>

                <div>
                  <h1 className='text-center text-[36px] font-bold font-inter flex gap-2'> 
                     Your swiss knife for <HighlightText text={"learning any language"} />
                  </h1>
                </div>

                <div className="w-[760px] h-[48px]">
                    <p className='text-md font-inter text-16px text-center font-bold'>
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom 
                        schedule and more.
                    </p>
                </div>

            </div>

            <div className='flex flex-row items-center justify-center mt-5'>

                <img src={know_your_progress} 
                 alt="knowYourProgressImage"
                 className='object-contain -mr-32' />

                <img src={compare_with_others} 
                 alt="compareWithOthersImage"
                 className='object-contain' />

                <img src={plan_your_lessons} 
                 alt="planYourLessonsImage"
                 className='object-contain -ml-36' />

            </div>

            <div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection