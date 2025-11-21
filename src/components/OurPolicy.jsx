import { assets } from '@/assets/assets'
import React from 'react'

const OurPolicy = () => {
  return (
    <section className='py-20'>
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base  text-gray-700">
          <div>
            <img src={assets.exchange_icon} alt={"imag"} className={"size-12 mx-auto mb-5"} />
            <p className="font-semibold">Easy Exchange Policy</p>
            <div className="text-gray-400">We offer hassel free exchange offer </div>
          </div>
          <div>
            <img src={assets.quality_icon} alt={"imag"} className={"size-12 mx-auto mb-5"} />
            <p className="font-semibold">7 Days Return Policy</p>
            <div className="text-gray-400">We provide free 7 days return policy </div>
          </div>
          <div>
            <img src={assets.support_img} alt={"imag"} className={"size-12 mx-auto mb-5"} />
            <p className="font-semibold">Best Customer Support</p>
            <div className="text-gray-400">We provide 24/7 customer Support </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default OurPolicy