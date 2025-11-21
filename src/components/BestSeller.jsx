import React, { useContext, useEffect, useState } from 'react'
import ProductSlide from './ProductSlide'
import ProductItem from './ProductItem'
import { ShopContext } from '@/context/ShopContext'
import Title from './Title'

const BestSeller = () => {
  const { products } = useContext(ShopContext)

  const [bestproducts, setBestProducts] = useState([])
  useEffect(() => {
    const bestproduct = products.filter(product => product.bestseller == true)
    setBestProducts(bestproduct.slice(0,5))
  }, [products])

  return (
    <section className='py-10'>
      <div className="container">

        <div className="text-center py-8 ">
          <Title text1={"BEST"} text2={"SELLER"} />
          <p className='text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, enim.
          </p>
        </div>


        {/* <div className="grid"> */}
        <ProductSlide>
          {
            bestproducts.map((item) => (
              <div className='px-2'>
                <ProductItem key={item.id} id={item._id} name={item.name} image={item.image} price={item.price} />
              </div>
            ))
          }
        </ProductSlide>
        {/* </div> */}




      </div>
    </section>
  )
}

export default BestSeller