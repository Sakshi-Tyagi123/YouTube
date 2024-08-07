import React, { useState } from "react";
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/sakshi.jpg'
import { Link } from "react-router-dom";

function Navbar({ setSidebar }) {
    const [input, setInput] = useState('');

    const handleSearch = (e) => {
        
        console.log("Search query:", input);
    }

    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="" />
                <Link to='/'><img className="logo" src={logo} alt="" /></Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Link to={`/search/${input}`} className="search-button-link">
                        <button type="button" onClick={handleSearch} className="search-button">
                            <img src={search_icon} alt="" />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} alt="" className="user-icon" />
            </div>
        </nav>
    )
}

export default Navbar;
