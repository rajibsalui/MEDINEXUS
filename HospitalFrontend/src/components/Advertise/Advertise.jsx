import React from 'react'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
const Advertise = () => {
    return <>
        <div className='ml-[210px] relative'>
            <img src={assets.advertise} className='h-[400px] w-[78%] object-cover object-top' />
            <p className='absolute top-[50px] left-6 text-[50px] text-white'>We Are Here To <span className='absolute left-[200px] top-[35px] text-[90px] font-semibold text-white'>Serve</span></p>
        </div>
  </>
}

export default Advertise