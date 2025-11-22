// import { products } from "@/assets/assets";
import { addToUserCart, getUserCart, listProducts, removeItemfromCart, updateItemQuentity } from "@/services/apis";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./userContext";

export const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {

  const corrency = "$"
  const delevery_fee = 10
  const [products, setProducts] = useState([])
  // this stats for search input and show the search bar
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  // for add to cart
  const [cartItems, setCartItems] = useState([])

  const fatchproducts = async () => {
    try {
      const res = await listProducts()
      if (res.data.success) {
        console.log(res.data.products)
        setProducts(res.data.products)
      }
    } catch (error) {

    }
  }

  const setcarttmpty = () => {
    setCartItems([])
  }

  useEffect(() => {
    fatchproducts()
  }, [])



  const fatchallCartitem = async () => {
    try {
      const res = await getUserCart()
      console.log(res.data.userCart)
      setCartItems(res.data.userCart)
    } catch (error) {

    }
  }
  const updateQuentity = async (productId, size, quentity) => {
    const res = await updateItemQuentity(productId, size, quentity)
    fatchallCartitem()
    console.log(res.data)
  }

  const removeFromCart = async (id) => {
    try {
      const res = await removeItemfromCart(id)
      await fatchallCartitem()
      toast.success(res.data.message)

    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (product, size, quentity) => {
    const productId = product._id
    if (!size) {
      toast.error("Select Product Size")
      return;
    }
    // const existingitme = cartItems.find(item => item._id === product._id && item.size === size)
    // if (existingitme) {
    //   setCartItems(prevCart => prevCart.map(item => item._id === product._id && item.size === size ? { ...item, quentity: item.quentity + 1 } : item))
    // } else {
    //   setCartItems(prevCart => [...prevCart, { ...product, size, quentity: 1 }])
    // }

    try {

      const res = await addToUserCart({ productId, size, })
      console.log(res.data.existingProduct)


      await fatchallCartitem()
    } catch (error) {

    }
  }

  useEffect(() => {
    fatchallCartitem()
  }, [])

  const totalItems = cartItems.reduce((sum, item) => sum += item.quentity, 0)

  useEffect(() => console.log(cartItems), [cartItems])

  const subTotalamount = cartItems.reduce((sum, item) => sum += item.productId.price * item.quentity, 0)

  const value = {
    products, corrency, delevery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, updateQuentity, removeFromCart, totalItems, subTotalamount, setcarttmpty
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )

}