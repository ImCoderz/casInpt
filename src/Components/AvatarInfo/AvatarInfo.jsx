import React from 'react';
import './AvatarInfo.css';
import { IoMdSettings, FiLogOut } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/Authcontext';
import auth from '../../../firebase';
import { signOut } from 'firebase/auth';
import AvatarImage from './AvatarImage';
import toast ,{Toaster} from 'react-hot-toast';


export default function AvatarInfo({setShowAvatarInfo}) {
    async function handleSignout(){
        await signOut(auth).then(() => {
            setShowAvatarInfo(false)
            toast.success("you have logged out successfully")
          }).catch((error) => {
            toast.error("Error occured while logging out")
          });
    }
    const {currentUser}=useAuth()
  return (
    <div className='avatar'>
        <Toaster/>
        <div className='avatar__first'>
            <div className='avatar__first__img'>
               <AvatarImage/>
            </div>
            <div className='avatar__first__info '>
                <h4>{currentUser?.displayName||'user'}</h4>
                <p >{currentUser?.email}</p>
                <Link to ={'/mydonation'}><p className='underline'>Go to myDonation</p></Link>
            </div>
        </div>
        <div className='avatar__second'>
            <div>
                <div className='avatar__second__icon'><IoMdSettings /></div>
                <p>Settings</p>
                <div className='avatar__second__icon'><FiLogOut /></div>
                <p onClick={handleSignout} className='cursor-pointer text-blue2color hover:text-blue4color'>Logout</p>
            </div>
        </div>
        <div className='avatar__last'>
            <p>condition d'utilisation</p>
        </div>
    </div>
  )
}
