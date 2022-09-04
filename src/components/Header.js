import React from 'react'
import logo from '../images/walkwithme.png'
import "./Header.css"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom"


function Header() {
    return (
        <div className="header">
            <IconButton>
                <Link to="/my-profile"><AccountBoxIcon id="profile" className = "header_icon" fontSize="large" /></Link>
            </IconButton>
            
            <img className = "header_logo" src={logo} alt="walk with me logo"/>
            <IconButton>
                <Link to="/add-trip"><AddIcon id="add-trip" className = "header_icon" fontSize = "large" /></Link>
            </IconButton>
            
        </div>
    )
}

export default Header