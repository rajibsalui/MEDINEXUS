import React, { useContext, useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'
const Adddoctors = () => {const url = "http://localhost:4000";
    const { getTotalCartAmount, food_list } = useContext(StoreContext)
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
                userId:"",
                name: "",
                email: "",
                password: "",
                description: "",
                charges: "",
                specialization:"",
                degree: "",
                datesavailable: ""
    })









  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [adminData, setAdminData] = useState([]);
    const fetchAdmin = async () => {
    const response = await axios.get(url + "/api/hospital/listuser");
        setData(response.data.data)
        console.log(response.data)
    }
    const loadAdminData = async (token) => {
    const response = await axios.post(url + "/api/hospital/getUser", {}, { headers: { token } })
      setEmail(response.data.emailData)
      console.log(response.data.emailData)
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










    const onChangaeHAndler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("specialization", data.specialization)
        formData.append("userId",email)
        formData.append("description",data.description)
        formData.append("degree",data.degree)
        formData.append("charges",Number(data.charges))
        formData.append("datesavailable",data.datesavailable)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/hospital_doctor/add`, formData,{ headers: { token } })
        if (response.data.success) {
            setData({
                userId:"",
                name: "",
                email: "",
                password: "",
                description: "",
                charges: "",
                specialization:"",
                degree: "",
                datesavailable: ""
            })
            setImage(false)
        }
        else {
        }
}

  return (
      <div className='add'>
          {!token ? <>
                <h2 className='nottoken'>Kindly Sign In To Your Account . . . .</h2>
            </> : <><form className='flex-col' onSubmit={onSubmitHandler}>
              <div className='add-img-upload flex-col'>
                  <p>Upload Doctor's Image</p>
                  <label htmlFor='image'>
                      <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
                  </label>
                  <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
              </div>
          <div className='add-category-price'>
              <div className='add-product-name flex-col'>
                  <p>Doctor's name</p>
                  <input onChange={onChangaeHAndler} value={data.name} type='text' name='name' placeholder='Type here'/>
          </div>

              <div className='add-product-name flex-col'>
                  <p>Doctor's Specialization:</p>
                  <input onChange={onChangaeHAndler} value={data.specialization} type='text' name='specialization' placeholder='Type here'/>
          </div>
          <div className='add-product-name flex-col'>
                  <p>Doctor's Degree:</p>
                  <input onChange={onChangaeHAndler} value={data.degree} type='text' name='degree' placeholder='Type here'/>
              </div>
                  </div>
                  <div className='add-category-price'>
                      
                <div className='add-product-description flex-col'>
                  <p>Doctor's description</p>
                  <textarea onChange={onChangaeHAndler} value={data.description} name='description' rows="6" placeholder='Write Content here'></textarea>
                  </div>
                  <div className='add-product-name flex-col'>
                  <p>Doctor's Email</p>
                  <input onChange={onChangaeHAndler} value={data.email} type='text' name='email' placeholder='Type here'/>
                  </div>
                  <div className='add-product-name flex-col'>
                  <p>Doctor's Password</p>
                  <input onChange={onChangaeHAndler} value={data.password} type='password' name='password' placeholder='Type here'/>
                  </div>
                  </div>
          <div className='add-category-price'>
            <div className='add-category flex-col'>
                      <p>Doctor Dates Available</p>
                      <select onChange={onChangaeHAndler} name='datesavailable'>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesdays">Wednesdays</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                      </select>
                  </div>
                  <div className='add-price flex-col'>
                      <p>Doctor Charges</p>
                      <input onChange={onChangaeHAndler} value={data.charges} type='Number' name='charges' placeholder=' ₹ 100'/>
                  </div>
              </div>
              <button type='submit' className='add-btn'>ADD</button>
          </form></>}
          
    </div>
  )
}

export default Adddoctors