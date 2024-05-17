import React, { useEffect, useState } from 'react'
import './Orders.css'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from "react-toastify"

const Orders = () => {
  const url = "http://localhost:4000";




const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [adminData, setAdminData] = useState([]);
    const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/hospital/listuser");
    setAdminData(response.data.data)
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







  const [orders, setOrders] = useState([]);
  const [sortorders, setSortOrders] = useState([]);

  const [fetchemail, setFetchemail] = useState("");
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) { 
      setOrders(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }
  
  
   
  useEffect(() => {
    fetchAllOrders();
  }, []);


  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {orderId,status: event.target.value})
    if (response.data.success) {
      await fetchAllOrders();
    }
  } 


  return (
    <div className='order add'>
      {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><h1>Order Page</h1>
      <div className='order-list'>
        {
          orders.map((order, index) => {
            if (order.payment === true && order.status=="Food Processing") {
            return(
              <div>
                {order.items.map((iteme, indexs) => {
                  if (iteme.userId === email) {
                    
                  let item = iteme.name;
                  let quant = iteme.quantity;
                  let rate = iteme.price;
                  let amt = iteme.quantity * iteme.price;
                    return <>
                      <div key={index} className='order-item'>
                        
                      <img src={url + "/images/" + iteme.image} className='orderimage' alt='' /> 
              <div>
                  <p className='order-item-food'>
                    <p>{item} x { quant}</p>
                          </p>
                          
                <p className='order-item-name'>{new Date(order.date).toLocaleString()}</p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <p className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ","+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </p>
                </div>
                <p>Item Rate: ₹{rate}</p>
                <p>Amount: ₹{amt}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                      <br />
                    </div>  
              </>
                }
            })}
              
            </div>
                )
               
                 
              
            }
            
          })
        }
      </div>
      <div className='order-list'>
        {
          orders.map((order, index) => {
            
            if (order.payment === true && order.status=="Out for delivery") {
            return(
              <div>
                {order.items.map((iteme, indexs) => {
                  if (iteme.userId === email) {
                    
                  let item = iteme.name;
                  let quant = iteme.quantity;
                  let rate = iteme.price;
                  let amt = iteme.quantity * iteme.price;
                    return <>
                      <div key={index} className='order-item'>
                        
                      <img src={url + "/images/" + iteme.image} className='orderimage' alt='' /> 
              <div>
                  <p className='order-item-food'>
                    <p>{item} x { quant}</p>
                          </p>
                          
                <p className='order-item-name'>{new Date(order.date).toLocaleString()}</p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <p className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ","+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </p>
                </div>
                <p>Item Rate: ₹{rate}</p>
                <p>Amount: ₹{amt}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                      <br />
                    </div>  
              </>
                }
            })}
              
            </div>
                )
               
                 
              
          }
          })
        }
          </div>
          <div className='order-list'>
        {
          orders.map((order, index) => {
            
            if (order.payment === true && order.status=="Delivered") {
            return(
              <div>
                {order.items.map((iteme, indexs) => {
                  if (iteme.userId === email) {
                    
                  let item = iteme.name;
                  let quant = iteme.quantity;
                  let rate = iteme.price;
                  let amt = iteme.quantity * iteme.price;
                    return <>
                      <div key={index} className='order-item'>
                        
                      <img src={url + "/images/" + iteme.image} className='orderimage' alt='' /> 
              <div>
                  <p className='order-item-food'>
                    <p>{item} x { quant}</p>
                          </p>
                          
                <p className='order-item-name'>{new Date(order.date).toLocaleString()}</p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <p className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ","+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </p>
                </div>
                <p>Item Rate: ₹{rate}</p>
                <p>Amount: ₹{amt}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                      <br />
                    </div>  
              </>
                }
            })}
              
            </div>
                )
               
                 
              
          }
          })
        }
        </div>
      </>}
      
    </div>
  )
}

export default Orders