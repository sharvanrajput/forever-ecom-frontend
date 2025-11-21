import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { SidebarTrigger } from '../ui/sidebar'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import { api, Logout } from '@/services/apis'

const AdminHeader = () => {

  const { userData, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const getuserdata = () => {
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
    setUser(null)
    navigate("/")
  }


  return (
    <nav className=' shadow py-2 sticky top-0 bg-white'>
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