import './NewsLe.css';

const NewsLe=()=>{
    return(
        <div className="newsletter">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newletter and stay update</p>
        <div className="input">
            <input type="text" placeholder='your email id' />
            <button>Subscribe</button>
        </div>
        </div>
    )
}

export default NewsLe;