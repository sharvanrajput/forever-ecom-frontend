import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"

// Dynamic Imports (same spelling, same paths)
const Home = lazy(() => import("./pages/Home"))
const Collection = lazy(() => import("./pages/Collection"))
const Cart = lazy(() => import("./pages/Cart"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Login = lazy(() => import("./pages/Login"))
const Orders = lazy(() => import("./pages/Orders"))
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"))
const Product = lazy(() => import("./pages/Product"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const AddProduct = lazy(() => import("./pages/admin/AddProduct"))
const ListProduct = lazy(() => import("./pages/admin/ListProduct"))
const OrdersDetails = lazy(() => import("./pages/admin/OrdersDetails"))
const UpdateProduct = lazy(() => import("./pages/admin/UpdateProduct ")) // spelling NOT changed
const Verify = lazy(() => import("./pages/Verify"))

const Layout = lazy(() => import("./Layout/Layout"))
const AdminLayout = lazy(() => import("./Layout/AdminLayout"))

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  )
}

export default App
