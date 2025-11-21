import { assets } from '@/assets/assets'
import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
  const data = new Date().getFullYear()
  return (
    <footer>
      <div className="container">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 ">
          <div>
            <img src={assets.logo} className='mb-5  w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae laborum aliquam illum. Porro quisquam deserunt, asperiores ipsam eum repellat!</p>
          </div>

          <div className="">
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>Home</li>
              <li>About</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="">
            <p className='text-xl font-medium mb-5'>Get in touch</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>+91 9315324537</li>
              <li>sharvanrajput098@gmail.com</li>
            </ul>
          </div>

        </div>

        <hr />
        <p className="py-5 text-sm text-center flex  justify-center items-center"> <Copyright className='me-2' /> {data} forever.com , All rights reserved  </p>

      </div>
    </footer>
  )
}

export default Footer