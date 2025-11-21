import { assets } from '@/assets/assets'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShopContext } from '@/context/ShopContext'
import { PlaceOrdercod, PlaceOrdercodWithStripe } from '@/services/apis'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const placeholder = () => {
  const [method, setMethod] = useState("cod")
  const { corrency, delevery_fee, subTotalamount, setcarttmpty, cartItems } = useContext(ShopContext)

  const navigate = useNavigate()

  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const inputHandler = (e) => {
    const { name, value } = e.target
    setFormdata(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log({ ...formdata, method })
    let amount = delevery_fee + subTotalamount



    if (method === "cod") {
      if (cartItems.length > 0) {
        const res = await PlaceOrdercod(amount, formdata)
        toast.success(res.data.message)
        navigate("/orders")
        setcarttmpty()
      }
      else {
        toast.error("cart is empty pick item")
      }
    }

    if (method === "stripe") {
      if (cartItems.length > 0) {
        const res = await PlaceOrdercodWithStripe(amount, formdata)
        toast.success(res.data.message)
        const { session_url } = res.data
        window.location.replace(session_url)
        // setcarttmpty()
      } else {
        toast.error("cart is empty pick item")
      }
    }



    setFormdata({
      firstname: "",
      lastname: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    })
    // navigate("/orders")
  }


  return (
    <section className=''>
      <div className="container">
        <form onSubmit={submitHandler} className="flex flex-col sm:flex-row justify-between py-15  gap-4 min-h-[80vh] border-t ">
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3 ">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
              <Input type={"text"} name="firstname" onChange={inputHandler} value={formdata.firstname} placeholder="First name" className={"rounded-none "} />
              <Input type={"text"} name="lastname" onChange={inputHandler} value={formdata.lastname} placeholder="First name" className={"rounded-none "} />
            </div>
            <div className="flex gap-3">
              <Input type={"email"} name="email" onChange={inputHandler} value={formdata.email} placeholder="Email Address" className={"rounded-none "} />
            </div>
            <div className="flex gap-3">
              <Input type={"text"} name="street" onChange={inputHandler} value={formdata.street} placeholder="Street" className={"rounded-none "} />
            </div>
            <div className="flex gap-3">
              <Input type={"text"} name="city" onChange={inputHandler} value={formdata.city} placeholder="City" className={"rounded-none "} />
              <Input type={"text"} name="state" onChange={inputHandler} value={formdata.state} placeholder="State" className={"rounded-none "} />
            </div>
            <div className="flex gap-3">
              <Input type={"number"} name="zipcode" onChange={inputHandler} value={formdata.zipcode} placeholder="Zip code" className={"rounded-none "} />
              <Input type={"text"} name="country" onChange={inputHandler} value={formdata.country} placeholder="Country" className={"rounded-none "} />
            </div>
            <div className="flex gap-3">
              <Input type={"number"} name="phone" onChange={inputHandler} value={formdata.phone} placeholder="Phone" className={"rounded-none "} />
            </div>
          </div>
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>
            <div className="mt-12">
              <div className="text-lg">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
              </div>
              <div className="flex gap-3  flex-col lg:flex-row ">
                <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 mx-3 cursor-pointer">
                  <p className={`min-w-3.5 h-3.5  border rounded-full ${method === "stripe" ? "bg-green-500" : "bg-transparent"}`}></p>
                  <img src={assets.stripe_logo} alt="" />
                </div>
                <div onClick={() => setMethod("raxerpay")} className="flex items-center gap-3 border p-2 mx-3 cursor-pointer">
                  <p className={`min-w-3.5 h-3.5  border rounded-full ${method === "raxerpay" ? "bg-green-500" : "bg-transparent"}`}></p>
                  <img src={assets.razorpay_logo} alt="" />
                </div>
                <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 mx-3 cursor-pointer">
                  <p className={`min-w-3.5 h-3.5  border rounded-full ${method === "cod" ? "bg-green-500" : "bg-transparent"}`}></p>
                  <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                </div>
              </div>
              <div className="w-full text-end mt-8">
                <Button  >Place Order</Button>

              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default placeholder