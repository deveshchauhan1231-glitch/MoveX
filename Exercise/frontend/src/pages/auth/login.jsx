import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css"
import Navbar from "../../components/common/Navbar";
import Footer from '../../components/common/Footer';
import Home from "../Home.jsx";
import ServerUnavailable from "../ServerUnavailable.jsx";
import { BACKEND_URL } from "../../config/api.js";

function Login(){
    const [searchParams] = useSearchParams();
    const verified = searchParams.get("verified");
    const profile = searchParams.get("profile");

    const [registered, setRegistered] = useState(false);

    const [form, setForm] = useState({
        email:"",
        password:""
    });

    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();

        try{
            await axios.post(`${BACKEND_URL}/auth/login`,form, {
  withCredentials: true,
});
            setRegistered(true);
        }catch{
            setRegistered(false);
            
        }
    }

    const message =
        verified === "success"
            ? "Email verified successfully. You can log in now."
            : verified === "invalid"
                ? "This verification link is invalid or expired."
                : verified === "missing"
                    ? "Verification token is missing."
                    : profile === "completed"
                        ? "Profile saved successfully. Please log in."
                        : "";


    if(!registered){
        return(
        <div className="login-frame">
            <Navbar />
        <form className="login-container">
            {message ? <p>{message}</p> : null}
            <span className="login-inp">
            <label>E-mail :    </label>
            <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="login-inp-field"
            />
            </span>

            <span className="login-inp">
            <label>Password : </label>
            <input
            
                type="password"
                name="password"
                value={form.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="login-inp-field"
                autoComplete="off"
            />
            </span>
            <button type="submit" onClick={handleSubmit}>
            Submit
        </button>

        </form>
        <Footer />
        
        </div>
    )
    }
    return(
        <Home />
    )
}

export default Login;
