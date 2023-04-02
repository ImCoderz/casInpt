import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import eventt from '../../assets/event.png'
import ProgressBar from '../Util/ProgressBar'
import ActivitiesSwipper from '../Util/ActivitiesSwipper'
import { FaDonate } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { Link, useParams } from 'react-router-dom'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import { getDownloadURL, list, listAll, ref } from 'firebase/storage'
import Skeleton from '../Skeletons/Skeleton'

const Event = () => {
    const params=useParams()
    const id=params.id
    const imagesRef=ref(storage,"events")
    const [images,setImages]=useState()
    const [loading,setLoading]=useState(false)
    const map=new Map()


    const [event,setEvent]=useState()
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
                const data=await getDocs(eventCollection,id)
                const devents=(data.docs.filter((doc)=>doc.id==id)).map((doc)=>({...doc.data(),id:doc.id}))
                setEvent(devents[0])
                setLoading(false)
              }catch(error){
                console.log(error);
            }
          }
          getEvents()
      },[])
  return (
    <div className='mt-3 flex flex-col items-center gap-5'>
        <div className='flex flex-col items-center md:w-[70%] w-full md:px-0 px-5  gap-2'>
            {
                loading? <Skeleton classes="title width-50"/>
                :<h1 className='text-blue2color font-bold text-2xl'>{event?.name}</h1>
            }
            {
                <img className={`w-full md:h-[400px] h-[250px] ${!images&&('skeleton')}`} src={images?.get(event?.name)} alt=""  />
            }
            <div className=' w-full items-center gap-2'>
                <h1 className='font-bold text-blue2color text-lg'>Destination :</h1>
                {
                loading? <Skeleton classes="title width-100"/>
                :<p>{event?.destination}</p>
                }
                
            </div>
            <div className=' w-full items-center gap-2'>
                <h1 className='font-bold text-blue2color text-lg'>Description :</h1>
                {
                loading? <Skeleton classes="title width-100"/>
                :<p>{event?.description}</p>
                }
            </div>
            <div className=' flex-col w-full  gap-2'>
                <h3 className='font-bold text-blue2color text-lg'>Progression :</h3>
                {
                loading? <Skeleton classes="title width-100"/>
                :
                (
                    <div className='flex justify-between items-center gap-2'>
                        <p className='font-bold text-blue2color '> {event?.dateStart}</p>
                        <ProgressBar/>
                        <p className='font-bold text-blue2color '>{event?.dateEnd}</p>
                    </div>
                )
                }
            </div>
            <div className='flex w-full justify-center md:gap-20 gap-2 pt-1 mt-3'>
                <Link to='/stripe' className='py-3 lg:px-8 px-4 bg-blue2color rounded-3xl text-bgcolor font-bold text-sm hover:bg-opacity-40 transition-all duration-300 flex gap-3 items-center'>Faire un don <FaDonate size={27}/></Link >
                <Link to='/autrement' className='py-3 lg:px-8 px-3 bg-blue2color rounded-3xl text-bgcolor font-bold text-sm hover:bg-opacity-40 transition-all duration-300 flex gap-3 items-center'>Autrement <GiClothes size={27}/></Link>
            </div>
            <div className='w-full mt-8 '>
                <h1 className='text-blue2color font-bold text-2xl text-center'>Activities</h1>
                <ActivitiesSwipper/>
            </div>
        </div>
    </div>
  )
}

export default Event   