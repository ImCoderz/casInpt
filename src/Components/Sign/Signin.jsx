import React, { useRef, useState } from 'react'
import {FaUserAlt} from 'react-icons/fa'
import { Link, useLocation,Navigate, useNavigate} from 'react-router-dom'
import auth, { googleprovider } from '../../../firebase'
import { useAuth } from '../../Context/Authcontext'
import { signInWithEmailAndPassword ,signInWithPopup} from 'firebase/auth'
import ErrorMessage from '../Util/ErrorMessage'
import MyInput from '../Util/MyInput'

const Signin = () => {
    
    const location = useLocation();
    const navigate=useNavigate()
    const from =location.state?.from?.pathname || '/'
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const emailref=useRef()
    const passwordref=useRef()
    
    async function handleSignin(e){
        e.preventDefault()
        try{
            setLoading(true)
            setError('')
            await signInWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
            .then((userCredential) => {
                // Signed in
                navigate(from,{replace:true})
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
        }catch{
            setError('Failed to Signin')
        }
        setLoading(false)
    }
    async function signingoogle(){
        try{
            setLoading(true)
            setError('')
            await signInWithPopup(auth,googleprovider)
            .then((userCredential) => {
                // Signed in
                navigate(from,{replace:true})
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });
        }catch{
            setError('Failed to Signin')
        }
        setLoading(false)
    }

  return (
    <div className='flex justify-center mt-11'> 
        <form onSubmit={handleSignin} className='flex flex-col sm:gap-7 gap-3 items-center justify-center md1:w-[700px] w-[370px]'>
            <FaUserAlt size={30} className="text-blue4color"/>
            <div className='flex flex-col  sm:gap-14 gap-3 w-full'>
                <h2 className='sm:text-3xl text-xl font-bold md1:w-[700px] w-[400px] text-center  gradient '>Rejoignez votre session:</h2>
                <ErrorMessage error={error}/>
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Email :" type="email" ref={emailref}/>
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Mot de passe :" type="password" ref={passwordref}/>
                <div>
                    <h2 className='text-sm font-bold w-[600px] text-blue1color text-left '>you don’t have an account . <Link to='/signup' className='border-b-2 border-blue1color hover:border-blue3color hover:text-blue3color'>Registre</Link></h2>
                </div>
            </div>
            <button disabled={loading} type='submit' className='mt-2 sm:mt-0 bg-blue1color text-white font-bold text-sm py-3 hover:bg-blue3color transition-all duration-300 px-8 rounded-3xl'>Sign In</button>
            <button disabled={loading} onClick={signingoogle} className='w-full bg-blue1color text-white font-bold text-sm py-3 hover:bg-blue3color transition-all duration-300 px-8'>Sign In with google</button>
        </form>
    </div>
  )
}

export default Signin