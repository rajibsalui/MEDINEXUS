import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import axios from 'axios'

import { assets } from '../../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowHospitalLogin,loggedIn}) => {


  const [user, setUser] = useState("home");
  const [data, setData] = useState([])
    const [email, setEmail] = useState("")
  

    
    const { token, setToken } = useContext(StoreContext);

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
  }, [])
  const url = "http://localhost:4000"
    const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/hospital/listuser");
        setData(response.data.data)
        console.log(response.data)
    }
    const loadAdminData = async (token) => {
    const response = await axios.post(url + "/api/hospital/getUser", {}, { headers: { token } })
    setEmail(response.data.emailData)
    } 
    useEffect(() => {
        async function loadData() {
          await fetchAdmin();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadAdminData(localStorage.getItem("token"));
            }
        }
    loadData();
    },[])

  return <>
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      {/* <ul className="navbar-user">
          <Link to='/' onClick={()=>setUser("home")} className={user==="home"?"active":""}>Home</Link>
          <Link to='/user' onClick={()=>navigate('/user')} className={user==="user"?"active":""}>user</Link>
          <a href='#app-download' onClick={()=>setUser("mobile-app")} className={user==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setUser("contact-us")} className={user==="contact-us"?"active":""}>contact us</a>
      </ul> */}
        <div className="navbar-right">
          {/* <img src={assets.search_icon} alt="" /> */}
          {/* <div className="navbar-search-icon">
               <Link to='/cart'><img src = {assets.basket_icon } alt="" /></Link>
               <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div> */}
        {!token ? <>
          <button onClick={() => setShowHospitalLogin(true)}>Sign in</button> 
        </>:
          <>
          <ul className="navbar-user">
          <Link to='/' onClick={()=>setUser("home")} className={user==="home"?"active":""}>Home</Link>
          <Link to='/addmedicine' onClick={()=>navigate('/addmedicine')} className={user==="user"?"active":""}>Add Medicine</Link>
          <Link to='/adddoctor' onClick={()=>navigate('/adddoctor')} className={user==="mobile-app"?"active":""}>Add Doctors</Link>
          <Link to='/listdoctor' onClick={()=>navigate('/listdoctor')} className={user==="mobile-app"?"active":""}>All Doctors</Link>
          <Link to='/listmedicine' onClick={()=>navigate('/listmedicine')} className={user==="mobile-app"?"active":""}>All Medicine</Link>
          <a href='#footer' onClick={()=>setUser("contact-us")} className={user==="contact-us"?"active":""}>Appointments</a>
          <a href='#footer' onClick={()=>setUser("contact-us")} className={user==="contact-us"?"active":""}>Contact Us</a>
          </ul>
            <div className='navbar-profile'>
              {
                data.map((item, index) => {
                if (item.email === email)
                {
                    return <>
                        <img src={`${url}/images/`+item.image} alt='' className='profile_logo_nav'/>
                    </>
                }
               })
              }
            
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/orders')}><img src={assets.bag_icon} alt=''/><p>Order</p></li>
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
  </>
}

export default Navbar