import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserContext } from '@/context/userContext'
import { api, loginUser, Register } from '@/services/apis'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {userData} = useContext(UserContext)
  const [currentform, setCurrentForm] = useState("Login")
  const navigate = useNavigate()


  const [logindata, setLogindata] = useState({
    email: "",
    password: ""
  })
  const [signupdata, setSignupdata] = useState({
    name: "",
    email: "",
    password: ""
  })

  const logininput = (e) => {
    const { name, value } = e.target
    setLogindata(prev => ({ ...prev, [name]: value }))
  }
  const registerinput = (e) => {
    const { name, value } = e.target
    setSignupdata(prev => ({ ...prev, [name]: value }))
  }


  const { setUser } = useContext(UserContext);

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


  const submitHandler = async (e) => {
    e.preventDefault()
    if (currentform === "Login") {
      const res = await loginUser(logindata)
      getuserdata()
      navigate("/")
      console.log(res)
    }
  }

  const registerHandler = async (e) => {
    e.preventDefault()
    if (currentform === "Sign Up") {
      const res = await Register(signupdata)
      getuserdata()
      navigate("/")
      console.log(res)
    }
  }

  useEffect(()=>{
    if (userData) {
      navigate("/")
    }
  },[userData])


  return (
    <div className='flex justify-center items-center  h-[50vh]'>
      {currentform === "Sign Up" ? (
        <div className='max-w-lg'>
          <div className="flex items-center gap-2 justify-center mb-10 ">
            <h2 className='text-3xl '>{currentform}</h2>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
          </div>
          <form onSubmit={registerHandler}>
            <Input className={"rounded-none  mb-3"} onChange={registerinput} value={signupdata.name} type="text" name="name" placeholder="Full Name" />
            <Input className={"rounded-none  mb-3"} onChange={registerinput} value={signupdata.email} type="email" name="email" placeholder="Email Address" />
            <Input className={"rounded-none  mb-3"} onChange={registerinput} value={signupdata.password} type="password" name="password" placeholder="Password" />
            <p className='text-gray-400 text-center text-sm'>Already Have and Account? <Button type="button" variant={"ghost"} onClick={() => setCurrentForm("Login")} className={"px-2 "} >Login</Button></p>
            <Button>Sign Up</Button>
          </form>
        </div>
      ) : (
        <div className='max-w-lg'>
          <div className="flex items-center gap-2 justify-center mb-10 ">
            <h2 className='text-3xl '>{currentform}</h2>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
          </div>
          <form onSubmit={submitHandler}>
            <Input className={"rounded-none  mb-3"} onChange={logininput} value={logindata.email} type="email" name="email" placeholder="Email Address" />
            <Input className={"rounded-none  mb-3"} onChange={logininput} value={logindata.password} type="password" name="password" placeholder="Password" />
            <p className='text-gray-400 text-center text-sm'>Already Have and Account? <Button type="button" onClick={() => setCurrentForm("Sign Up")} variant={"ghost"} className={"px-2 "} >Login</Button></p>
            <Button>Login</Button>
          </form>
        </div>
      )
      }
    </div >
  )
}

export default Login