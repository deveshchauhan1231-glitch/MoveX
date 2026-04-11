import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../styles/login.css"
import Navbar from "../../components/common/Navbar";
import Footer from '../../components/common/Footer';
import Home from "../Home.jsx";
import supabase from "../../config/supabase.js";

function Login(){
    const [searchParams] = useSearchParams();
    const verified = searchParams.get("verified");
    const profile = searchParams.get("profile");

    const [registered, setRegistered] = useState(false);
    const [message, setMessage] = useState("");

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
            const { error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password
            });

            if (error) {
                throw error;
            }

            setRegistered(true);
            setMessage("");
        }catch{
            setRegistered(false);
            setMessage("Unable to log in.");
        }
    }

    const statusMessage =
        verified === "success"
            ? "Email verified successfully. Please complete your profile if prompted, or log in now."
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
            {statusMessage ? <p>{statusMessage}</p> : null}
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
