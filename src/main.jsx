import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from './context/UserContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <ShopContextProvider>
      <UserContextProvider>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </UserContextProvider>
    </ShopContextProvider>
  </BrowserRouter>,
)
