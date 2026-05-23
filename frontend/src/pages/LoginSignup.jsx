import { useState } from 'react';
import '../pages/css/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const ChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const Login = async () => {
        console.log("Login Funtion Excuted", formData);
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log("Response:", data);

        if (data.success) {
            localStorage.setItem("auth-token", data.token);
            alert("Login Successful");
            window.location.replace("/");
        } else {
            alert("Login Failed");
        }
    }
    const Signup = async () => {
        console.log("Signup Function Executed", formData);
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log("Response:", data);

        if (data.success) {
            localStorage.setItem("auth-token", data.token);
            alert("Signup Successful");
            window.location.replace("/");
        } else {
            alert("Signup Failed");
        }
    };
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={ChangeHandler} type="text" placeholder="Your Name" /> : <></>}
                    <input name='email' value={formData.email} onChange={ChangeHandler} type="text" placeholder="Email Address" />
                    <input name='password' value={formData.password} onChange={ChangeHandler} type="password" placeholder="Password" />
                </div>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="check box" id="1" />
                    <p>by continuing, i agree to the terms of use & privacy.</p>
                </div>
                <button onClick={() => { state === "Login" ? Login() : Signup() }}>Continue</button>
                {state === "Sign Up" ? <p className="loginsignup-login">Already have an account ? <span onClick={() => { setState("Login") }}>Login</span></p> :
                    <p className="loginsignup-login">Creating as account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
            </div>

        </div>
    )
}
export default LoginSignup;