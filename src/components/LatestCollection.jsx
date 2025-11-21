import { ShopContext } from '@/context/ShopContext'

import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import ProductSlide from './ProductSlide'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)

  const [latestProduct, setLatestProduct] = useState([])

  useEffect(() => {
    setLatestProduct(products.slice(0, 10))
  }, [products])

  return (
    <section className='py-10'>
      <div className="container">

        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <p className='text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, enim.
          </p>
        </div>


        {/* <div className="grid"> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {
            latestProduct.map((item) => (
              <div className='px-2'>
                <ProductItem key={item.id} id={item._id} name={item.name} image={item.image} price={item.price} />
              </div>
            ))
          }
        </div>
        {/* </div> */}




      </div>
    </section>
  )
}

export default LatestCollection