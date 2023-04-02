import {doc,serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import {db}from '../../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../firebase'
import toast,{ Toaster } from 'react-hot-toast'
import MyInput from '../Util/MyInput'
import ErrorMessage from '../Util/ErrorMessage'

const Addevent = () => {
    const titleref=useRef()
    const descriptionref=useRef()
    const destinationref=useRef()
    const dateStartref=useRef()
    const dateEndref=useRef()
    const photoURLref=useRef()
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)

    async function handleAddEvent(e){
      e.preventDefault()
      try{
          setLoading(true)
          const docData={
            name: titleref.current.value,
            description: descriptionref.current.value,
            destination: destinationref.current.value,
            createdAt:serverTimestamp(),
            dateStart: dateStartref.current.value.toString(),
            dateEnd: dateEndref.current.value.toString(),
          }
          setError('')
          Promise.all([setDoc(doc(db,"events",titleref.current.value),docData),uploadImage(titleref.current.value)]).then(()=>{
            toast.success('a new Event has been created')
          })
          .catch((err)=>{
            setError(err.message)
          })
      }catch{
        toast.error('Failed to add an event')
      }
      setLoading(false)
    }

    async function uploadImage(name){
      const imageref=ref(storage,`events/${name}`)
      try {
        await uploadBytes(imageref,photoURLref.current.files[0]).then(()=>{
          setTimeout(() => {
          }, 2000);
        })
        .catch((err)=>{
          console.log(err);
        })
      } catch (error) {
        setError('Failed to upload the image')
      }
    }

  return (
    <div className='flex flex-col items-center gap-2 justify-center mt-1'>
        <Toaster/>
        <h2 className='sm:text-3xl text-xl font-bold text-blue1color gradient '>Add Events</h2>
        <form onSubmit={handleAddEvent} className='flex flex-col sm:gap-2 gap-2 bg-blue3color items-center justify-center md1:w-[700px] w-[360px]'>
            <FaUserAlt size={27} className="text-blue4color mt-3"/>
            <div className='flex px-10 w-full flex-col items-center sm:gap-5 gap-2'>
                <ErrorMessage success={error}/>
                <MyInput textcolor="text-blue4color" bg="bg-color" title ="Event title :" type="text" ref={titleref}/>
                <MyInput textcolor="text-blue4color" bg="bg-color" title ="Event description :" type="text" ref={descriptionref}/>
                <MyInput textcolor="text-blue4color" bg="bg-color" title ="Event destination :" type="text" ref={destinationref}/>
                <MyInput textcolor="text-blue4color" bg="bg-color" title ="Start date :" type="date" ref={dateStartref}/>
                <MyInput textcolor="text-blue4color" bg="bg-color" title ="End date :" type="date" ref={dateEndref}/>
                <MyInput textcolor="text-blue4color" bg="bg-color cursor-pointer" title ="Event Image :" type="file" ref={photoURLref}/>
            </div>
            <button disabled={loading} type="submit" className='bg-blue4color mb-3  text-white font-bold text-sm py-3 hover:bg-blue2color transition-all duration-300 px-12 rounded-3xl'>Add</button>
        </form>
    </div>
  )
}

export default Addevent