import React from "react";
import './Footer.scss'
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className='footer'>
            <p className='footer__copyright'>&copy; Copyright 2022 by <a href="https://www.facebook.com/profile.php?id=100009054660142" target="_blank">Nguyen Huy</a>. Feel free to use this project for your own purposes. This does NOT apply if you plan to produce your own course or tutorials based on this project.</p>
            <div className='footer__logo' onClick={() => navigate('/welcome')}>S-Storage</div>
        </footer>
    )
}

export default Footer