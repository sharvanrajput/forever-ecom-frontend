import { api } from "@/services/apis";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

  const [userData, setUser] = useState(null)

  const getuserdata = () => {
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
    getuserdata()
  }, [])


  const values = {
    userData, setUser
  }

  return (
    <UserContext.Provider value={values} >
      {children}
    </UserContext.Provider>
  )
}
