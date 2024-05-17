import React, { useState } from 'react'
import LoginPopup from '../src/components/LoginPopup/LoginPopup.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Ambulamce from './pages/Ambulance/Ambulance.jsx'
import Medicine from './pages/All Medicine/Medicine.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import Verify from './pages/Verify/Verify'
import Cart from './pages/Cart/Cart.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const loggedIn=window.localStorage.getItem("isLoggedIn")
  return <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    <div>
      <Navbar setShowLogin={setShowLogin} loggedIn />
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/emergency' element={<Ambulamce/> } />
        <Route path='/medicinelist' element={<Medicine />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />

        
      </Routes>
    </div>
    
    
  </>
}

export default App