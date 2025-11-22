import { api } from "@/services/apis";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [userData, setUser] = useState(null)
  const token = localStorage.getItem("token")

  const getuserdata = async () => {
    api.get("/user/me")
      .then(res => {
        console.log("Fetched User:", res.data.user);

        setUser(res.data.user);   // <-- Store user in context
      })
      .catch(err => {
        console.log("ERROR:", err.response?.data);
        setUser(null);
      });

  }

  useEffect(() => {
    if (token) {
      getuserdata()
    }
  }, [])


  const setuserinfo = (data) => {
    setUser(data)
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    setUser(null)
  }


  const values = {
    userData, setUser, setuserinfo, handleLogout, getuserdata
  }

  return (
    <UserContext.Provider value={values} >
      {children}
    </UserContext.Provider>
  )
}
