import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
})

export const loginUser = async (data) => {
  return await api.post("/user/login", data)
}
export const Register = async (data) => {
  return await api.post("/user/register", data)
}
export const Logout = async (data) => {
  return await api.post("/user/logout", data)
}
export const MyData = async () => {
  return await api.get("/user/me")
}


export const addProducts = async (data) => {
  return api.post("/product/add", data)
}
export const updateProducts = async (id, data) => {
  return api.patch(`/product/update/${id}`, data)
}
export const listProducts = async () => {
  return api.get("/product/list")
}

export const oneProduct = async (id) => {
  return api.get(`/product/single/${id}`)
}

export const deleteProducts = async (id) => {
  return api.delete(`/product/remove`, {
    data: { id },
  })
}

// cart apis

export const addToUserCart = async (data) => {
  return api.post("/cart/add", data)
}
export const getUserCart = async () => {
  return api.get("/cart/get")
}
export const removeItemfromCart = async (id) => {
  return api.post("/cart/remove", { id })
}
export const updateItemQuentity = async (productId, size, quentity) => {
  return api.post("/cart/update", { productId, size, quentity })
}

// order 

export const PlaceOrdercod = async (amount, address) => {
  return api.post("/order/place", { amount, address })
}
export const PlaceOrdercodWithStripe = async (amount, address) => {
  return api.post("/order/stripe", { amount, address })
}
export const VerifyStripePayment = async (success, orderid) => {
  return api.post("/order/verifystripe", { success, orderid })
}
export const listAllOrder = async () => {
  return api.post("/order/listorder")
}
export const listMyOrder = async () => {
  return api.post("/order/myorder")
}
export const changeOrderStatus = async (data) => {
  return api.post("/order/status", data)
}
