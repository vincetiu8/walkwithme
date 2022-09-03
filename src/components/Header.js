import React from 'react'
import logo from '../images/logo.png'
import "./Header.css"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';

function Header() {
    return (
        <div className="header">
            <IconButton>
                <AccountBoxIcon className = "header_icon" fontSize="large" />
            </IconButton>
            
            <img className = "header_logo" src={logo} alt="walk with me logo"/>
            <IconButton>
                <ChatBubbleIcon className = "header_icon" fontSize = "large" />
            </IconButton>
            
        </div>
    )
}

export default Header