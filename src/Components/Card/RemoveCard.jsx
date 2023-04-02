import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { db } from '../../../firebase';
import { toast } from 'react-hot-toast';

const RemoveCard = ({open,title,setOpen,setRemoved}) => {
    const deleteEvent=async()=>{
        try {
            await deleteDoc(doc(db,"events",title));
            toast.success(`${title} event has been removed`)
            setOpen(false)
            setRemoved(true)
        } catch (error) {
            console.log(error);
        }
    }
  return (
   <>
    {
    open&&(
        <div className='absolute w-[60%] gap-6 h-[60%] bg-skeleton flex flex-col justify-center items-center shadow-lg shadow-black'>
            <h3 className='text-lg text-bold text-blue2color flex gap-1 sm:flex-row justify-center items-center flex-col'>Are you sure to remove <span className='text-blue4color'>{title}</span></h3>
            <div className='flex gap-5'>
                <button onClick={deleteEvent} className=' text-sm text-bold text-bgcolor px-8 py-1 rounded-xl bg-green-600 hover:opacity-50'>Yes</button>
                <button onClick={()=>setOpen(false)} className=' text-sm text-bold text-bgcolor px-5 py-1 rounded-xl bg-red-600 hover:opacity-50'>Cancel</button>
            </div>
        </div>
    )
    }
   </>
  )
}

export default RemoveCard