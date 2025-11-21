import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { changeOrderStatus, listAllOrder } from '@/services/apis'
import { useEffect, useState } from 'react'
import { BsBoxSeam } from "react-icons/bs"
import { toast } from 'react-toastify'

const OrdersDetails = () => {

  const [orderData, setOrderData] = useState([])

  const fatchAllorder = async () => {
    try {
      const res = await listAllOrder()
      if (res.data.success) {
        setOrderData(res.data.order)
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fatchAllorder()
  }, [])

  useEffect(() => {
    console.log(orderData)
  }, [orderData])

  const updateStatus = async (id, status) => {
    try {
      const res = await changeOrderStatus({ id, status })
      fatchAllorder()
      console.log(res.data)
    } catch (error) {

    }

  }



  return (
    <div>
      {
        orderData.map(order => (

          <div key={order._id} className='mb-3' >
            <Card>
              <CardContent>
                <div className='flex justify-between'>
                  <div className='flex  gap-10 mb-10'>
                    <BsBoxSeam className='size-20' />
                    <div>

                      {order.items.map((item, i) => {
                        if (i === order.items.length - 1) {
                          return <p key={i}> {item.productId.name} X {item.quentity} <span> {item.size} </span></p>
                        } else {
                          return <p key={i}> {item.productId.name} X {item.quentity} <span> {item.size} </span>,</p>
                        }


                      })}
                    </div>
                  </div>
                  <div>
                    <p className='mb-3'>Amount : {order.amount} </p>
                    <Select value={order.status} onValueChange={(value) => updateStatus(order._id, value)} >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Order Placed">Order Placed</SelectItem>
                        <SelectItem value="Packing">Packing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Ready for Dispatch">Ready for Dispatch</SelectItem>
                        <SelectItem value="Out of Delevery">Out of Delevery</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex items-end gap-10'>
                  <div>
                    <p className='text-xl! font-bold! mb-2'> {order.address.firstname} {order.address.lastname}   </p>
                    <p className='text-xl!  mb-2'> Phone : {order.address.phone}    </p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode} </p>
                  </div>
                  <div>
                    <p>Item : {order.items.length} </p>
                    <p>Method : {order.paymentMethod} </p>
                    <p>Payment : {order.payment ? "done" : "pending"}</p>
                    <p>Date : {new Date(order.date).toLocaleDateString()} </p>
                  </div>


                </div>

              </CardContent>
            </Card>
          </div>
        ))

      }
    </div >
  )
}

export default OrdersDetails