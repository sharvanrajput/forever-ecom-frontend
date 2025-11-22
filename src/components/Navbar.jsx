import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopContext } from "@/context/ShopContext";
import { useContext, useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiMenuAltRight, BiUser } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { UserContext } from "@/context/UserContext";
import { LayoutDashboard } from "lucide-react";
import { api, Logout } from "@/services/apis";




const Navbar = () => {
  const { setShowSearch, totalItems } = useContext(ShopContext)
  const { userData, setUser } = useContext(UserContext)
  const locaiton = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locaiton.pathname]);

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

  const handleLogout = async () => {
    const res = await Logout()
    localStorage.removeItem("token")
    console.log(res)
    setUser(null)
  }

  useEffect(() => {
    if (token) {
      getuserdata()
    }
  }, [token])


  // const user = { id: "", role: "" }

  return (
    <nav className='sticky top-0 bg-white z-50'>
      <div className="container">
        <div className="flex justify-between items-center py-5 font-medium">

          {/* logo */}
          <Link to={"/"}>
            <img src={assets.logo} className="w-36" alt="" />
          </Link>

          <ul className="hidden lg:flex gap-2 text-sm text-gray-700">
            <NavLink to={"/"} className="flex flex-col items-center gap-1 px-3">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to={"/collection"} className="flex flex-col items-center gap-1 px-3">
              <p>Collecton</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to={"/about"} className="flex flex-col items-center gap-1 px-3">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to={"/contact"} className="flex flex-col items-center gap-1 px-3">
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

          </ul>

          <div className="flex items-center gap-6">

            <FiSearch onClick={() => (setShowSearch(prev => !prev))} className="size-6 cursor-pointer" />

            {
              !userData?.name ? (<Link to={"/login"}> <Button>  Login</Button>  </Link>) :
                (<DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                  </DropdownMenuTrigger>
                  <DropdownMenuContent>

                    <DropdownMenuItem><BiUser />Profile</DropdownMenuItem>
                    <Link to={"/orders"}> <DropdownMenuItem><AiOutlineProduct />Orders</DropdownMenuItem></Link>
                    {userData.role === "admin" && <Link to="/admin/dashboard" > <DropdownMenuItem  >   <LayoutDashboard /> Dashboard </DropdownMenuItem> </Link>}
                    <DropdownMenuItem onClick={handleLogout} variant="destructive"><CiLogout />Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>)

            }

            <Link to={"/cart"} className="relative ">
              <BsCart3 className="size-6 cursor-pointer" />
              <Badge className="absolute right-[-5px] top-[-5px]  w-4 text-center leading-4 text-[8px] aspect-square" >{totalItems}</Badge>
            </Link>



            <Sheet >
              <SheetTrigger>  <BiMenuAltRight className="size-6 cursor-pointer lg:hidden" /></SheetTrigger>
              <SheetContent className={"lg:hidden"} side="left">
                <SheetHeader>
                  <SheetTitle className={"mb-5"}>  <img src={assets.logo} className="w-36" alt="" /></SheetTitle>
                  <SheetDescription>
                    <SheetTrigger asChild><NavLink className={"block mb-3"} to={"/"}>    Home</NavLink></SheetTrigger>
                    <SheetTrigger asChild><NavLink className={"block mb-3"} to={"/collection"}>Collection</NavLink></SheetTrigger>
                    <SheetTrigger asChild><NavLink className={"block mb-3"} to={"/about"}>About</NavLink></SheetTrigger>
                    <SheetTrigger asChild><NavLink className={"block mb-3"} to={"/contact"}>Contact</NavLink></SheetTrigger>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

          </div>


        </div>
      </div>
    </nav>
  )
}

export default Navbar