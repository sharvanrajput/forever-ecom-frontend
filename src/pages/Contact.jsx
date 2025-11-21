import { assets } from '@/assets/assets'
import NewsLetterBox from '@/components/NewsLetterBox'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className="container">
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"CONTEACT"} text2={"US"} />
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
          <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-600">Our Story</p>
            <p className="text-gray-500">gali no 4 , shadhara  , delhi <br /> near metro station </p>
            <p className="text-gray-500">Tel : +91 93153 24537  <br /> Email : sharvanrajput098@gmail.com </p>
            <p className="font-semibold text-xl text-gray-600">Careets at Forever</p>
            <p className="text-gray-500">Learn more about team and job opening</p>
            <Button variant={"outline"} className={"rounded-none border-black hover:bg-black hover:text-white"}>Explore Job</Button>
          </div>
        </div>

        <NewsLetterBox />

      </div>
    </section>
  )
}

export default Contact