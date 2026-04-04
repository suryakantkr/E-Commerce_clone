
import '../pages/css/LoginSignup.css';

const LoginSignup = () => {
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Your Name" />
                    <input type="text" placeholder="Email Address" />
                    <input type="text" placeholder="'Password" />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="check box" id="1" />
                    <p>by continuing, i agree to the terms of use & privacy .</p>
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an account ? <span>Login</span></p>
            </div>

        </div>
    )
}
export default LoginSignup