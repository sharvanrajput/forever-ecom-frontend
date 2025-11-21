import { ShopContext } from '@/context/ShopContext'
import { VerifyStripePayment } from '@/services/apis'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verify = () => {

  const { setcarttmpty } = useContext(ShopContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get("success")
  const orderid = searchParams.get("orderid")

  const verifypayment = async () => {
    try {
      const res = await VerifyStripePayment(success, orderid)
      if (res.data.success) {
        setcarttmpty([])
        navigate("/orders")
      } else {
        navigate("/cart")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifypayment()
  }, [])


  return (
    <div>

    </div>
  )
}

export default Verify