import "./Nav.css";
import { CiSearch } from "react-icons/ci";
import Logo from "../../Assets/Smart.png";
import icon from "../../Assets/cart_icon.png";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from '../../Assets/nav_dropdown.png';

function Nav() {
    const [menu, setmenu] = useState("shop");
    const {getTotalCartItems}=useContext(ShopContext);
    const menuRef=useRef();

    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle('open');
    }
    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src={Logo} alt='logo-img' />
            </div>
            <div className="search-bar">
               <CiSearch className="search-icon" />
              <Link to='/search'><input type="text" placeholder="Search any products" /></Link> 
            </div>
            <img onClick={dropdown_toggle} src={nav_dropdown} alt=""/>
            <ul ref={menuRef} className="navbar-menu">
                <li onClick={() => { setmenu("shop") }}><Link style={{textDecoration:"none"}} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("mens") }}><Link style={{textDecoration:"none"}} to='/mens'>Mens</Link> {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("women") }}><Link style={{textDecoration:"none"}} to='/womens'>Womens</Link>{menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("kids") }}><Link style={{textDecoration:"none"}} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="navbar-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={icon} alt="cart-icon" /></Link>
                <div className="navbar-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Nav;



