import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {AiOutlineArrowRight} from "react-icons/ai"
import Login from './Login';

const Third = () => {
  const [login,setlogin]= useState(false)

  return (
    <div className='w-full md:max-w-[576px] px-10'>
        {/* {top name} */}
          <div className='w-full flex justify-between py-7 rounded'>
            <div className="py-3">
                <p className="font-bold text-xl">Muneer k k </p>
                <p className="text-yellow-500 font-semibold text-sm">My settings</p>
            </div >
            <img src="../assets/moya2.jpeg" alt="" className="w-12 h-12 logobox1 text-red-500 object-cover" onClick={()=>setlogin(true)}/>
          </div>
          {/* {music} */}
          <div className="bg-slate-200 rounded-xl">
            <div className="py-5 pt-5 flex gap-3 ">
                <img src="../assets/godzila.jpeg" alt="" className="w-12 h-12 rounded-xl ml-5"/>
                <div>
                <h3 className="font-bold text-lg">godzila </h3>
                <p className="font-normal text-base">Eminem</p>
                </div>
            </div>
            <div className='w-full px-2 rounded-sm'>
            <ReactAudioPlayer
             src="my_audio_file.ogg"
             autoPlay
             controls
             className='rounded-sm w-full '
            />
            </div>
          </div>
          {/* {time} */}
          <div className='w-full bg-slate-200 rounded-xl mt-5'>
            <p className='font-normal text-4xl pt-12 pb-6 px-6'>8:48 AM</p>
            <p className='px-6 py-2 pb-6'>☀️  &nbsp;&nbsp;&nbsp; Now is almost sunny</p>
          </div>
          {/* {last} */}
          <div className='bg-slate-200 rounded-xl mt-6'>
            <p className='px-5 py-6 pt-12 font-semibold text-lg opacity-95'>Unleash the <br />freelance <br />super power</p>
            <p className='px-5 font-normal text-base'> unlimited task,premium <br />feature and much more</p>
            <div className='flex items-center gap-4 px-4'>
                <img src="../assets/mobi.png" alt=""  className='rounded-xl py-5'/>
                <button className='w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center'>
                <AiOutlineArrowRight/>
                </button>
            </div>
          </div>
          <div>
            {login && <Login/>}
          </div>
    </div>
  )
}

export default Third