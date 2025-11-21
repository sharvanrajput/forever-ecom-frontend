import { assets } from '@/assets/assets'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, corrency, updateQuentity, removeFromCart } = useContext(ShopContext)

  const navigate = useNavigate()

  return (
    <section className='py-1'>
      <div className="container">
        <div className="border-t pt-14">
          <div className="text-2xl mb-3">
            <Title text1={"YOUR"} text2={"CART"} />
          </div>
          <div>
            {
              cartItems.map((item, i) => (
                <div className="" key={i}>
                  <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                    <div className="flex items-start gap-4">
                      <img src={item.productId.image[0]} className='w-16 sm:w-20' alt="" />
                      <div>
                        <p className='text-sm sm:text-lg font-medium'>{item.productId.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{corrency}{item.productId.price}</p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <input type="number" onChange={(e) => e.target.value !== "" ? updateQuentity(item.productId._id, item.size, e.target.value) : null} min={1} defaultValue={item.quentity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' id="" />
                    <img onClick={() => removeFromCart(item._id)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' alt="" />
                  </div>
                </div>
              ))
            }
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className='text-end mt-2'>
                <Button size={"lg"} onClick={() => navigate("/place-order")} className={"rounded-none w-full"}>Check out</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart