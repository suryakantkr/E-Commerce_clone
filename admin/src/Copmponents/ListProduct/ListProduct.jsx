import './ListProduct.css';
import { useEffect, useState } from "react";
import cross_icon from "../../assets/cart_cross_icon.png";

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch("http://localhost:4000/allproducts")
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }
    useEffect(() => {
        fetchInfo();
    }, [])
    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }
    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-formate-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproduct-format-main">
                <hr />
                {allproducts.map((Product, index) => {
                    return <>
                        <div key={index} className="listproduct-format">
                            <img src={Product.image} alt="" className="listproduct-product-icon" />
                            <p>{Product.name}</p>
                            <p>${Product.old_price}</p>
                            <p>${Product.new_price}</p>
                            <p>{Product.category}</p>
                            <img onClick={() => { remove_product(Product.id) }} src={cross_icon} alt="" className="listproduct-remove-icon" />
                        </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    );
};
export default ListProduct;