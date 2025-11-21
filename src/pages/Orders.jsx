import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { ShopContext } from '@/context/ShopContext'
import { listMyOrder } from '@/services/apis'
import React, { useContext, useEffect, useState } from 'react'

const Orders = () => {
  const { corrency } = useContext(ShopContext)
  const [orders, setOrders] = useState([])



  // Fetch user orders
  const allorders = async () => {
    const res = await listMyOrder()
    setOrders(res.data.userOrder)  // <-- ARRAY of orders
  }

  useEffect(() => {
    allorders()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  const reverseOrder = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );


  return (<section> <div className="container"> <div className="border-t pt-16"> <div className="text-2xl">
    <Title text1={"MY"} text2={"ORDERS"} /> </div>

    <div className="mt-6 space-y-10">
      {reverseOrder?.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        reverseOrder.map((order, index) => (
          <div key={index} className="border rounded-xl p-5 shadow-sm">

            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Order ID: {order._id}
              </h3>
              <p className="text-green-600 text-sm">{order.status}</p>
            </div>

            <p className="text-gray-500">
              Order Date: {formatDate(order.date)}
            </p>
            <p className="text-gray-700 font-medium">
              Total Amount: {corrency}{order.amount}
            </p>

            {/* ORDER ITEMS */}
            <div className="mt-4 space-y-6">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      src={item.productId?.image[0]}
                      className="w-16 sm:w-20 rounded"
                      alt=""
                    />

                    <div>
                      <p className="sm:text-base font-medium">
                        {item.productId?.name}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-base">
                        <p className="text-lg">
                          {corrency}{item.productId?.price}
                        </p>
                        <p>Qty: {item.quentity}</p>
                        <p>Size: {item.size}</p>
                      </div>

                      <p className="mt-2 text-gray-500">
                        Added On: {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-sm md:text-base">
                        {order.status}
                      </p>
                    </div>

                    <Button variant="outline">
                      Track Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>

  </div>
  </div>
  </section>


  )
}

export default Orders
