import React from "react";
import { useState } from "react";
import axios from "axios";
import Login from "./login";
import "../../styles/register.css"
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ServerUnavailable from "../ServerUnavailable.jsx";
import { BACKEND_URL } from "../../config/api.js";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [registered,setRegistered]=useState(false);
    const [message, setMessage] = useState("");
    const [serverError, setServerError] = useState(false);
    function handleChange(e) {
        
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/auth/signup`, form);
            setRegistered(true);
            setMessage( "Please check your email for the verification link.");
        } catch {
            setRegistered(false);
            setMessage( "Unable to create account.");
            setServerError(true);
        }
    }

    async function handleResendEmail() {
        try {
            await axios.post(`${BACKEND_URL}/auth/resend-verification`, {
                email: form.email
            });
            setMessage("Verification email sent successfully.");
        } catch {
            setMessage("Unable to resend verification email.");
            setServerError(true);
        }
    }
    if(serverError) return <ServerUnavailable />;
    if(!registered)
    {
        return(
            <>
            <Navbar />
            <div className="register-frame">
                
            <form className="register-container">
                <span className="register-inp">
                <label>Name : </label>
                <input type="text" name="name" value={form.name} placeholder="Enter your name" onChange={handleChange} className="register-inp-field" autoComplete="off"/>
                </span>
                <span className="register-inp">
                <label>E-mail : </label>
                <input type="email" name="email" value={form.email} placeholder="Enter your email" onChange={handleChange} className="register-inp-field"/>
                </span>
                <span className="register-inp">
                <label>Password : </label>
                <input type="password" name="password" value={form.password} placeholder="Enter your password" onChange={handleChange} className="register-inp-field" autoComplete="off"/>
                </span>
                <button type="submit" onClick={handleSubmit} >Submit</button>   
            </form>
            <Footer />
        </div>
        </>
        )
    }
    else{
        return(
            <>
            <Navbar />
            <div className="register-frame">
                <div className="register-container" style={{display:"flex", flexDirection:"column"}}>
                    <p>{message}</p>
                    
                    <button type="button" onClick={handleResendEmail} style={{backgroundColor:"#2bab6f"}}>Resend verification email</button>
                </div>
                <Footer />
            </div>
            </>
        )
    }
}
export default Register;
