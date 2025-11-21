import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let copyproduct = [...products]

      copyproduct = copyproduct.filter(item => item.category === category)
      copyproduct = copyproduct.filter(item => item.subCategory === subCategory)

      setRelated(copyproduct.slice(0, 5))

      console.log(related)
    }
  }, [category,subCategory,products])


  return (
    <div className='my-15'>
      <Title text1={"RELATED"} text2={"PRODUCT"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          related?.map((item, i) => related ? (
            <div className='px-2' key={i}>
              <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
            </div>
          ): null)
        }
      </div>

    </div>
  )
}

export default RelatedProduct