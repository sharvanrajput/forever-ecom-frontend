
import { assets } from '@/assets/assets'
import RelatedProduct from '@/components/RelatedProduct'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import { UserContext } from '@/context/userContext'
import { api } from '@/services/apis'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Product = () => {
  const { productId } = useParams()
  const { products, corrency, addToCart } = useContext(ShopContext)
  const [product, setProduct] = useState({})
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")
  const [currentTab, setCurrentTab] = useState("Description")

  const tabs = ["Description", "Review"]
  const tabContent = [
    {
      triger: "Description",
      data: [" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam? ", " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam?"]
    },
    {
      triger: "Review",
      data: ["tow Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam? ", " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus ex distinctio, veniam minima incidunt autem necessitatibus. Veniam ut repudiandae saepe eius iure omnis enim? Veritatis officia enim similique ipsam?"]
    }
  ]






  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);


  const fatchproduct = async () => {
    products.map(item => {
      if (item._id === productId) {
        setProduct(item)
        setImage(item.image[0])
        return 0
      }
    })
  }



  useEffect(() => {
    fatchproduct()
  }, [productId, products])

 


  return product ? (
    <section className="py-5">
      <div className="container">
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
          <div className="flex gap-12 sm-gap-12 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {
                  product?.image?.map((item, index) => (
                    <img src={item} key={index} onClick={() => setImage(item)} alt="" className='w-[24%] sm:w-full sm:mb-3 fshrink-0 cursor-pointer' />
                  ))
                }
              </div>
              <div className="w-full sm:w-[80%]">
                {image && <img src={image} className='w-full h-auto' alt="" />}
              </div>
            </div>
            <div className="flex-1 self-center ">
              <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={`${assets.star_icon}`} className='w-3 ' alt="" />
                <img src={`${assets.star_icon}`} className='w-3 ' alt="" />
                <img src={`${assets.star_icon}`} className='w-3 ' alt="" />
                <img src={`${assets.star_icon}`} className='w-3 ' alt="" />
                <img src={`${assets.star_dull_icon}`} className='w-3 ' alt="" />
                <p>(122)</p>
              </div>
              <p className='mt-2 text-3xl font-medium'>{corrency}{product.price}</p>
              <p className='mt-2 text-gray-500 md:w-4/5'>{product.description}</p>
              <div className="flex flex-col gap-4 my-5">
                <p>Select Size</p>
                <div className="flex gap-2">
                  {
                    product?.size?.map((item, i) => (
                      ["S", "M", "L", "XL", "XXL"].includes(item) && <Button key={i} variant={"secondary"} onClick={() => setSize(item)} className={`rounded-none ${item === size ? "border border-black " : "border-none"} `} >{item}</Button>
                    ))
                  }
                </div>
              </div>
              <Button className={"rounded-none "} onClick={() => addToCart(product, size)} >Add to Cart</Button>
              <hr className="mt-5 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex">
            {
              tabs.map((tab, i) => (
                <Button variant={"outline"} onClick={() => setCurrentTab(tab)} className={"rounded-none"} key={i}>{tab}</Button>
              ))
            }
          </div>
          <div className="border flex flex-col gap-4 p-4">
            {
              tabContent.map(content =>
                content.triger === currentTab ? (content?.data?.map((p, i) => <p className='text-[15px]!' key={i}>{p}</p>)) : null
              )
            }
          </div>
        </div>
        <RelatedProduct category={product.category} subCategory={product.subCategory} />
      </div>
    </section >
  ) : <div className="opacity-0"></div>
}

export default Product