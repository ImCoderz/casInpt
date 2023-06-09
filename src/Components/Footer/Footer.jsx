import React from 'react';
import './Footer.css';
import logo from '../../assets/Logo.png'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footer__first'>
            <img src={logo} alt="Logo" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A aliquid at iure, neque laborum consequatur!</p>
            <button>Contact us</button>
        </div>
        <footer className="footer__second">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
        </footer>
    </div>
  )
}
