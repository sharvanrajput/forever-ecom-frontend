import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Collection from "./pages/Collection"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Layout from "./Layout/Layout"
import AdminLayout from "./Layout/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import AddProduct from "./pages/admin/AddProduct"
import ListProduct from "./pages/admin/ListProduct"
import OrdersDetails from "./pages/admin/OrdersDetails"
import UpdateProduct from "./pages/admin/UpdateProduct "
import Verify from "./pages/Verify"
 

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/product/list" element={<ListProduct />} />

          <Route path="/admin/product/add" element={<AddProduct />} />

          <Route path="/admin/product/update/:id" element={<UpdateProduct />} />

          <Route path="/admin/product/orders" element={<OrdersDetails />} />
        </Route>

      </Routes>
    </>
  )
}

export default App