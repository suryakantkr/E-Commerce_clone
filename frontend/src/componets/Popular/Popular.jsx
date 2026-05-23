import './Popular.css';
import Item from "../Item/Item";
import { useEffect, useState } from 'react';

const Popular = () => {
    const [popula_products, setPolular_Products] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/popularinwomen")
            .then((res) => res.json())
            .then((data) => setPolular_Products(data))
    }, []);
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr></hr>
            <div className='popular-item'>
                {popula_products.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}
export default Popular;


