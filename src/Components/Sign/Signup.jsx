import React, { useState } from 'react'
import { useRef } from 'react'
import {FaUserAlt} from 'react-icons/fa'
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import auth from '../../../firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../Util/ErrorMessage'
import MyInput from '../Util/MyInput'

const Signup = () => {
    const location = useLocation();
    const navigate=useNavigate()
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const confirmref=useRef()
    const usernameref=useRef()
    const emailref=useRef()
    const passwordref=useRef()
    const from =location.state?.from?.pathname || '/'
    async function handleRegistre(e){
        e.preventDefault()
        if(confirmref.current.value==passwordref.current.value){
            try{
                setLoading(true)
                setError('')
                await createUserWithEmailAndPassword(auth, emailref.current.value, passwordref.current.value)
                    .then((userCredential) => {
                        // Signed in  
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        setError(errorMessage)
                })
                await updateProfile(auth.currentUser, { displayName: usernameref.current.value }).then(()=>{
                    navigate(from,{replace:true})
                })
                .catch(
                    (err) => console.log(err)
                );
            }catch{
                setError('Failed to create an account')
            }
            setLoading(false)
        }
        else{
            setError('Passwords do not match')
        }
    }
   
  return (
    <div className='flex justify-center mt-6'> 
        <form onSubmit={handleRegistre} className='flex flex-col sm:gap-7 gap-2 items-center justify-center md1:w-[700px] w-[360px]'>
            <FaUserAlt size={27} className="text-blue4color"/>
            <div className='flex flex-col sm:gap-11 gap-2'>
                <h2 className='sm:text-3xl text-xl font-bold text-blue1color gradient'>Rejoignez notre groupe en s’inscrivant:</h2>
                <ErrorMessage error={error}/>
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Username :" type="text" ref={usernameref} />
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Email :" type="email" ref={emailref} />
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Mot de passe :" type="password" ref={passwordref} />
                <MyInput p textcolor="text-blue1color" bg="bg-input" title="Confirmer :" type="password" ref={confirmref} />
            </div>
            <button disabled={loading} type="submit" className='bg-blue1color text-white font-bold text-sm py-3 hover:bg-blue3color transition-all duration-300 px-8 rounded-3xl'>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup