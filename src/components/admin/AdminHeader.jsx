import { UserContext } from '@/context/userContext'
import { api, Logout } from '@/services/apis'
import { LogOut } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { SidebarTrigger } from '../ui/sidebar'

const AdminHeader = () => {

  const { userData, setUser, setuserinfo } = useContext(UserContext)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const getuserdata = async () => {
    api.get("/user/me")
      .then(res => {
        console.log("Fetched User:", res.data.user);
        setUser(res.data.user);   // <-- Store user in context
      })
      .catch(err => {
        console.log("ERROR:", err.response?.data);
      });
  }

  useEffect(() => {
    getuserdata()
  }, [])

  useEffect(() => {
    if (userData && userData?.role !== "admin") {
      navigate("/")
    }
    console.log("admin user", userData)
  }, [userData])

  const handleLogout = async () => {
    const res = await Logout()
    localStorage.removeItem("token")
    setuserinfo(null)
    navigate("/")
  }

useEffect(() => {
  if (token) {
    getuserdata()
  }
}, [token])




  const locaiton = useLocation()



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locaiton.pathname]);




  return (
    <nav className=' shadow py-2 sticky top-0 bg-white z-20'>
      <div className="container">
        <div className="flex justify-between ">

          <div className='flex items-center gap-5'>
            <SidebarTrigger />
          </div>


          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} className={"me-10"} >
              <DropdownMenuItem>{userData?.name}</DropdownMenuItem>
              <DropdownMenuItem>{userData?.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem variant='destructive' onClick={handleLogout}> <LogOut /> Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </nav>
  )
}

export default AdminHeader