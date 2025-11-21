import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '@/context/ShopContext'
import { Button } from './ui/button'

const CartTotal = () => {
  const { corrency, delevery_fee, subTotalamount } = useContext(ShopContext)
  return (

    <div className='w-full '>
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Total"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm ">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{corrency}{subTotalamount}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shiping Charges</p>
          <p>{corrency}{delevery_fee}.00</p>
        </div>
        <hr />
        <div className="flex text-semibold justify-between">
          <p>Subtotal</p>
          <p>{corrency}{subTotalamount === 0 ? 0 : subTotalamount + delevery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal