import React, {useEffect, useState} from 'react';
import './navbar.css';
import { FaTimes, FaBars } from 'react-icons/fa';
import AvatarInfo from '../AvatarInfo/AvatarInfo';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/Authcontext';
import { useLocation } from 'react-router-dom';
import AvatarImage from '../AvatarInfo/AvatarImage';
import logo from '../../assets/Logo.png'

export default function Navbar() {
  const location=useLocation()
  const pathname=location.pathname
  const {currentUser}=useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatarInfo, setShowAvatarInfo] = useState(false);

  useEffect(()=>{
    setShowAvatarInfo(false)
    window.scrollTo({top:0})
  },[location])

  const showMenu = () =>{
    setIsMenuOpen(!isMenuOpen);
  }

  const showAvatarInfos = () => {
    setShowAvatarInfo(!showAvatarInfo);
  }

  return (
    <header>
      <div className='first'>
        <nav className="navbar">
            <div className="navbar__logo">
              <Link to="/">
                  <img src={logo} alt="Logo" />
              </Link> 
            </div>
              <div className={`navbar__links ${isMenuOpen ? 'navbar__links__responsive animate-slidedown' : ''}`}>
                <ul className='navbar__links__left'>
                    <li className={pathname=='/events'?('bg-blue3color p-2 rounded-2xl'):''}><Link to="/events">Evenement</Link></li>
                    <li className={pathname=='/donation'?(' bg-blue3color p-2 rounded-2xl'):''}><Link to="/donation">Donation</Link></li>
                </ul>
              </div>
              <ul className='navbar__links__right gap-5'>
                  <li className='navbar__links__right__trad'>Fr-<span>En</span></li>
                  <li>
                  {currentUser ? 
                      <div className='navbar__links__right__avatar' onClick={showAvatarInfos}>
                        <AvatarImage/>
                      </div>: 
                      <Link className='navbar__links__right__login bg-blue2color  hover:bg-opacity-50 duration-300' to="/signin">
                        <button className='text-white'>
                          Sign In
                        </button>
                      </Link>
                  }
                  </li>
              </ul>
        </nav>
        <div className='navbar__menu self-center cursor-pointer' onClick={showMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      
      <div className='second'>
        {showAvatarInfo ? 
          <div className='navbar__avatarInfo'>
            <AvatarInfo setShowAvatarInfo={setShowAvatarInfo} /> 
          </div> : 
        null }
      </div>
      
      
    </header>
  )
}