import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Authcontext'
import MainPage from '../MainPage/MainPage'
import {BsFillFastForwardFill} from 'react-icons/bs'
import {FaBackward} from 'react-icons/fa'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import logo1 from '../../assets/logo1.png'
import SearchBar from '../Util/SearchBar'
import { storage } from '../../../firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import ShowEvents from './ShowEvents'
import { AddEventButton } from '../Util/Buttons'

const Events = () => {
  const [events,setEvents]=useState([])
  const [removed,setRemoved]=useState(false)
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState([])
  const [search,setSearch]=useState('')
  const [images,setImages]=useState([])
  const imagesRef=ref(storage,"events/")
  const map=new Map()

  useEffect(()=>{
      const getEvents=async()=>{
        setLoading(true)
        try{
            await listAll(imagesRef).then((res)=>{
              res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                  map.set(item.name,url)
                  setImages(map)
                })
              })
            })
            const eventCollection=collection(db,"events")
            const data=await getDocs(eventCollection)
            const devents=data.docs.map((doc)=>({...doc.data(),id:doc.id}))
            setEvents(devents)
            setData(devents)
            setLoading(false)
          }catch(error){
            console.log(error);
        }
      }
      getEvents()
  },[removed])
  
  useEffect(()=>{
    const filteredEvents=data.filter((doc)=>doc.name.toLowerCase().includes(search.toLowerCase()))
    setEvents(filteredEvents)
    setRemoved(false)
  },[search,removed])

  const {currentUser}=useAuth()
  const titleDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, maxime? Obcaecati, nesciunt"
  return (
    <div>
      <MainPage title="Events" text={titleDescription} image={logo1} />
      <div className='flex flex-col px-20 gap-6'>
        <div className='w-full items-center justify-center flex flex-col gap-4'>
            <h3 className='text-xl font-bold text-blue2color'>The last 3 /10 events:</h3>
            <SearchBar search={search} setSearch={setSearch}/>
            <AddEventButton/>
            <ShowEvents setRemoved={setRemoved} loading={loading} events={events} images={images}/>
        </div>
        <div className='w-full items-center justify-center flex'>
            <div className='flex justify-between sm:w-[900px] w-full'>
                <button className='text-blue4color font-bold text-xl hover:text-opacity-40 duration-300 flex gap-3'><FaBackward size={27}/>Previous</button>
                <button className='text-blue4color font-bold text-xl hover:text-opacity-40 duration-300 flex gap-3'>Next <BsFillFastForwardFill size={27}/></button>
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Events