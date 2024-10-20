import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto mt-20'>
        <h1 className='text-center text-4xl font-semibold px-3'>
          Get In Touch
        </h1>

        <p className='text-center font-medium text-xl text-richblack-300 p-4 mb-2'>
           We’d love to here for you, Please fill out this form.
        </p>

        <div>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection