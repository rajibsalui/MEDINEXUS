import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setDate] = useState([]);
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setDate(response.data.data);
        console.log(response.data);
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

  return (
      <div className='my-orders'>
          <h2>My Order's</h2>
          <div className='container'>
              {
                  data.map((order, index) => {
                      if (order.payment === true && order.status=="Food Processing") {    
                      return (
                          <div key={index} className='my-orders-order'>
                              <img src={assets.parcel_icon} alt="" />
                              <p>
                                  {order.items.map((item, index) => {
                                      if (index === order.items.length - 1) {
                                          return (item.name+" x " + item.quantity)
                                      }
                                      else {
                                          return (item.name+" x " + item.quantity+",")
                                      }
                                  })}
                              </p>
                              <p>₹{order.amount}.00</p>
                              <p>Items:{order.items.length}</p>
                              <p><span>&#x25cf;</span><b>{order.status}</b></p>
                              {/* <p><span>&#x25cf;</span><b>{order.payment.toString()}</b></p> */}
                              <button onClick={fetchOrders}>Track Order</button>
                          </div>
                      )
                      }
                  })
              }
          </div>
          <div className='container'>
              {
                  data.map((order, index) => {
                      if (order.payment === true && order.status=="Out for delivery") {    
                      return (
                          <div key={index} className='my-orders-order'>
                              <img src={assets.parcel_icon} alt="" />
                              <p>
                                  {order.items.map((item, index) => {
                                      if (index === order.items.length - 1) {
                                          return (item.name+" x " + item.quantity)
                                      }
                                      else {
                                          return (item.name+" x " + item.quantity+",")
                                      }
                                  })}
                              </p>
                              <p>₹{order.amount}.00</p>
                              <p>Items:{order.items.length}</p>
                              <p><span>&#x25cf;</span><b>{order.status}</b></p>
                              {/* <p><span>&#x25cf;</span><b>{order.payment.toString()}</b></p> */}
                              <button onClick={fetchOrders}>Track Order</button>
                          </div>
                      )
                      }
                  })
              }
          </div>
          <div className='container'>
              {
                  data.map((order, index) => {
                      if (order.payment === true && order.status=="Delivered") {    
                      return (
                          <div key={index} className='my-orders-order'>
                              <img src={assets.parcel_icon} alt="" />
                              <p>
                                  {order.items.map((item, index) => {
                                      if (index === order.items.length - 1) {
                                          return (item.name+" x " + item.quantity)
                                      }
                                      else {
                                          return (item.name+" x " + item.quantity+",")
                                      }
                                  })}
                              </p>
                              <p>₹{order.amount}.00</p>
                              <p>Items:{order.items.length}</p>
                              <p><span>&#x25cf;</span><b>{order.status}</b></p>
                              {/* <p><span>&#x25cf;</span><b>{order.payment.toString()}</b></p> */}
                              <button onClick={fetchOrders}>Track Order</button>
                          </div>
                      )
                      }
                  })
              }
          </div>
          <div className='container'>
              {
                  data.map((order, index) => {
                      if (order.payment === false) {    
                      return (
                          <div key={index} className='my-orders-order'>
                              <img src={assets.parcel_icon} alt="" />
                              <p>
                                  {order.items.map((item, index) => {
                                      if (index === order.items.length - 1) {
                                          return (item.name+" x " + item.quantity)
                                      }
                                      else {
                                          return (item.name+" x " + item.quantity+",")
                                      }
                                  })}
                              </p>
                              <p>₹{order.amount}.00</p>
                              <p>Items:{order.items.length}</p>
                              <p><span>&#x25cf;</span><b className='failed'>Payment Failed</b></p>
                              {/* <p><span>&#x25cf;</span><b>{order.payment.toString()}</b></p> */}
                              <button>Track Order</button>
                          </div>
                      )
                    }
                  })
              }
          </div>
      </div>
  )
}

export default MyOrders