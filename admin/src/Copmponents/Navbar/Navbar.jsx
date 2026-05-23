import React from "react";
import "./Navbar.css";
import navlogo from '../../assets/Smart.png'
import navProfile from '../../assets/Admin_Surya.jpeg';
import dropdouwn_icon from '../../Assets/dropdown_icon.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={navlogo} alt="" className="nav-logo" />
                <p className="admin-paragraph">Admin Panel</p>
            </div>
            <div className="admin-profile">
                <img src={navProfile} alt="" className="nav-profile" />
                <img src={dropdouwn_icon} alt="" className="drop-downicon" />
            </div>
        </div>
    )
}
export default Navbar;
