import '../Breadcrum/Breadcrum.css';
import arrow_icon from '../../Assets/breadcrum_arrow.png';
import Product from '../../pages/Product';

const Breadcrum = () => {
    return (
        <div className="breadcrum">
            HOME<img src={arrow_icon} alt='arrow icon' />
            SHOP<img src={arrow_icon} alt='arrow icon' />
            {Product.category}
            <img src={arrow_icon} alt="arrow icon" />
            {Product.name}
        </div>
    )
}
export default Breadcrum;
