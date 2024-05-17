import React, { useContext, useEffect, useState } from 'react'
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
                <div className='border-solid border-2  w-[800px] overflow-scroll  relative'>
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
                <div className='border-solid border-2  w-[800px] relative overflow-scroll overflow-x-hidden'>

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
            <div className='flex gap-10 border-solid border-emerald-300 h-[300px] mx-5 mt-5 mb-8'>
                <div className='border-solid border-2 border-sky-500 w-[400px]'>4</div>
                {/* <div className='border-solid border-2 border-sky-500 w-[400px]'>5</div>
                <div className='border-solid border-2 border-sky-500 w-[400px]'>6</div> */}
            </div>
            
      </div>
  </>
}

export default Dashboard