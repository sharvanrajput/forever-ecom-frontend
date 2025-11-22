
import { api } from '@/services/apis'
import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { UserContext } from '@/context/UserContext'

const Layout = () => {

  const { userData, refetch, setUser } = useContext(UserContext);

  useEffect(() => {
    api.get("/user/me")
      .then(res => {
        console.log("Fetched User:", res.data.user);
        setUser(res.data.user);   // <-- Store user in context
      })
      .catch(err => {
        console.log("ERROR:", err.response?.data);
      });
  }, [refetch]);

 

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout