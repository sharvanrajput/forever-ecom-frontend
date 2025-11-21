import React from 'react'
import Subtitle from './Subtitle'
import { assets } from '@/assets/assets'

const Banner = () => {
  return (
    <section className="">

      <div className="container">
        <div className='flex flex-col sm:flex-row border border-gray-400'>
          {/* left */}
          <div className="w-full sm:w-1/2  flex items-center justify-center py-10 sm:py-0">
            <div className="text-[#414141]">
              <Subtitle title={"Our Best Seller"} left={true} />

              <h1 className='text-3xl sm:py-3 lg:text-5xl'>Latest Arrivals</h1>
              <Subtitle title={"Shop Now"} right={true} />
            </div>
          </div>
          {/* right */}
          <img src={assets.hero_img} className='w-full sm:w-1/2' alt="" />
        </div>
      </div>
    </section>
  )
}

export default Banner