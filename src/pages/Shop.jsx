import Hero from '../componets/Herosection/Hero';
import NewCo from '../componets/NewCollection/NewCo';
import NewsLe from '../componets/NewsLetter/NewsLe';
import Offers from '../componets/Offers/Offers';
import Popular from '../componets/Popular/Popular';


const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCo />
            <NewsLe />
        </div>
    )
}
export default Shop;


