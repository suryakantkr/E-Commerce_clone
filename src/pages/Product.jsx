import { useContext } from "react"
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Breadcrum from "../componets/Breadcrum/Breadcrum";
import ProductDisplay from "../componets/ProductDisplay/ProductDisplay";
import DisBox from "../componets/DiscriptionBox/DisBox";
import Relatedroduct from "../componets/RelatedProducts/Relatedproduct";

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DisBox/>
            <Relatedroduct/>
        </div>
    )
}


export default Product;
