import { assets } from '@/assets/assets'
import NewsLetterBox from '@/components/NewsLetterBox'
import Title from '@/components/Title'
import React from 'react'

const About = () => {
  return (
    <section className=' '>
      <div className="container">
        <div className="text-2xl text-center pt-8 border-t ">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam consectetur ducimus voluptates ea dicta magnam nulla asperiores pariatur placeat harum culpa ut perspiciatis corrupti, animi est earum, quia, quis explicabo.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt assumenda doloremque quasi quae sequi quod, ea atque! Ipsam eligendi, nostrum, facilis accusamus exercitationem, quod perferendis recusandae alias minima debitis quos unde! Eveniet laudantium culpa expedita porro eligendi fugit hic excepturi!</p>
            <b className="text-gray-800">Our Mission</b>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, facere sapiente. Earum sint iure temporibus voluptates quas omnis cum reiciendis tempore. Ea culpa nemo reprehenderit omnis dolor laboriosam sapiente quaerat.</p>
          </div>
        </div>

        <div className="text-2xl text-center pt-8 border-t ">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="flex flex-col md:flex-row text-sm md-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus facilis veniam laborum dolore obcaecati voluptatibus magnam ipsa minima molestiae eos.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus facilis veniam laborum dolore obcaecati voluptatibus magnam ipsa minima molestiae eos.</p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus facilis veniam laborum dolore obcaecati voluptatibus magnam ipsa minima molestiae eos.</p>
          </div>

        </div>

        <NewsLetterBox />

      </div>
    </section>
  )
}

export default About