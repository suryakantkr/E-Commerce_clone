import './Sidebar.css';
import {Link} from 'react-router-dom';
import add_product_icon from "../../Assets/cart_icon.png";
import product_list from '../../assets/logo.png'

const Sideba=()=>{
    return(
        <div className='sidebar'>
<Link to={'./addproduct'} style={{textDecoration:"none"}}>
 <div className="sidebar-item">
    <img src={add_product_icon} alt="" className='' />
    <p>Add Products</p>
 </div>
</Link>
<Link to={'/listproduct'} style={{textDecoration:"none"}}>
 <div className="sidebar-item">
    <img src={product_list} alt="" className='' />
    <p>Products List</p>
 </div>
</Link>
        </div>
    )
}
export default Sideba;