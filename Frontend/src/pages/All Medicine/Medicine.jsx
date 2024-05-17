import React, { useEffect, useState } from 'react'
import './FoodDisplay.css'
import axios from 'axios'
import FoodItem from '../../components/FoodItem/FoodItem'

const Medicine = () => {
    const [list, setList] = useState([]);
    const url = "http://localhost:4000";
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
  

  return (
        <div className='food-display' id='food-display'>
            <h2>Top Medicine Near You</h2>
            <div className="food-display-list">
                {list.map((item, index) => {
                    
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} date={new Date(item.expiryDate).toLocaleString() } />
                    
                })}
            </div>
        </div>
    )
}

export default Medicine