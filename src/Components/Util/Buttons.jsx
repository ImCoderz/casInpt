import React from 'react'
import { useAuth } from '../../Context/Authcontext'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import { CiCircleRemove } from 'react-icons/ci'

export const AddEventButton = () => {
    const {currentUser}=useAuth()
  return (
    <>
        {
        currentUser?.email=="admin@gmail.com" && (
            <Link to={'/addevent'} ><button className='hover:bg-green-400 duration-300  text-bgcolor rounded-xl bg-green-600 px-12 text-lg py-2 flex gap-3' >Add Event <MdAddCircle className='text-bgcolor' size={27}/></button></Link>
        )
        }
    </>
  )
}

export const RemoveButton=({setOpen})=>{
  const {currentUser}=useAuth()
  return(
    <>
      {
        currentUser?.email=="admin@gmail.com" && (
            <button  onClick={()=>setOpen(true)} className='hover:bg-red-400 duration-300 text-sm text-bgcolor rounded-tr-3xl bg-red-600 sm:px-4 px-4 py-1 absolute top-0 right-0 flex gap-3'><CiCircleRemove size={27}/></button>
        )
      }
    </>
  )
}

