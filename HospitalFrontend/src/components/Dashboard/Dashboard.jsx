import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'

import './List.css'
import axios from 'axios'
import { toast } from "react-toastify"
const Dashboard = () => {


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














  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/medicine/list`);
    if (response.data.success) {
      setList(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  


  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/medicine/remove`, { id: foodId },{ headers: { token } })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

    
    
    
    
    
    
    const [doclist, setDocList] = useState([]);
  const docfetchList = async () => {
    const response = await axios.get(`${url}/api/hospital_doctor/list`);
    if (response.data.success) {
      setDocList(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    docfetchList();
  }, [])
  


  const removedoc = async (foodId) => {
    const response = await axios.post(`${url}/api/hospital_doctor/remove`, { id: foodId },{ headers: { token } })
    await docfetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }
    
    
    
    
    



    return <>
        <div className=''>
            <div className='flex gap-10 border-solid h-[300px] mx-5 mt-5'>
                <div className='border-solid border-2  w-[600px] overflow-scroll overflow-x-hidden relative'>
                            <div className='list add flex-col'>
      {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><p className='headlist'>All Medicine List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Company</b>
            <b>ExpiryDate</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item, index) => {
          if(item.userId===email)
          return(
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt='' />
            <p>{item.name }</p>
            <p>{item.company }</p>
            <p>{new Date(item.expiryDate).toLocaleString() }</p>
            <p>₹{item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
          )
        })}
      </div></>}
      
                            </div>
                </div>
                <div className='border-solid border-2  w-[600px] relative overflow-scroll overflow-x-hidden'>

                    <div className='list add flex-col'>
      {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><p className='headlist'>All Doctors In Your Hospital List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Specialization</b>
            <b>Description</b>
            <b>Dates Available</b>
            <b>Action</b>
        </div>
        {doclist.map((item, index) => {
          if(item.userId===email)
          return(
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt='' />
            <p>{item.name }</p>
            <p>{item.specialization }</p>
            <p>{item.description }</p>
            <p>{item.datesavailable}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
          )
        })}
      </div></>}
      
    </div>

                    
                </div>
            </div>
            <div className='flex gap-10 border-solid h-[350px] mx-5 mt-5 mb-8'>
          <div className='border-solid border-2 w-[1250px] relative overflow-scroll'>
          
            <div className='order_add'>
      {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><h1 className='orderpage'>Order Page</h1>
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

          
          </div>
                {/* <div className='border-solid border-2 border-sky-500 w-[400px]'>5</div>
                <div className='border-solid border-2 border-sky-500 w-[400px]'>6</div> */}
            </div>
            
      </div>
  </>
}

export default Dashboard