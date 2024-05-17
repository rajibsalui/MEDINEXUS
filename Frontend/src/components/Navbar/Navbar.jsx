import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin,loggedIn}) => {


  const [user, setUser] = useState("home");
    
    const { token, setToken,getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
    setToken("");
    navigate("/")
  }
  useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
    loadData();
    },[])

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.Preview} alt="" className="logo" /></Link>
      {/* <ul className="navbar-user">
          <Link to='/' onClick={()=>setUser("home")} className={user==="home"?"active":""}>Home</Link>
          <Link to='/user' onClick={()=>navigate('/user')} className={user==="user"?"active":""}>user</Link>
          <a href='#app-download' onClick={()=>setUser("mobile-app")} className={user==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setUser("contact-us")} className={user==="contact-us"?"active":""}>contact us</a>
      </ul> */}
        <div className="navbar-right">
          {/* { <img src={assets.search_icon} alt="" /> } */}
          
        {!token ? <>
          <button className="emergency">Emergency</button>
          <button onClick={() => setShowLogin(true)}>Sign in</button> 
        </>:
          <>

          <ul className="navbar-user">
          <Link to='/' onClick={()=>setUser("home")} className={user==="home"?"active":""}>Home</Link>
          <Link to='/medicinelist' onClick={()=>navigate('/user')} className={user==="user"?"active":""}>Medicine List</Link>
          <a href='#app-download' onClick={()=>setUser("mobile-app")} className={user==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setUser("contact-us")} className={user==="contact-us"?"active":""}>contact us</a>
            </ul>
            <div className="navbar-search-icon">
               <Link to='/cart'><img src = {assets.basket_icon } alt="" /></Link>
               <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt=''/><p>Order</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt=''/><p>Logout</p></li>
            </ul>
          </div>        
          </>
        }
        {/* {!token ? <button onClick={()=>navigate('/advertise')}>Resturant</button> :<div></div>      
        } */}
          
        </div>
    </div>
  )
}

export default Navbar