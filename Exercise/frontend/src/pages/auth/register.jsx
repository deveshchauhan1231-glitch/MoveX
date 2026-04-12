import React from "react";
import { useState } from "react";
import "../../styles/register.css"
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import supabase from "../../config/supabase.js";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const[loading,setLoading]=useState(false);
    const [registered,setRegistered]=useState(false);
    const [message, setMessage] = useState("");
    function handleChange(e) {
        
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    data: {
                        name: form.name
                    },
                    emailRedirectTo: `${window.location.origin}/userInfo?verified=success`
                }
            });

            if (error) {
                throw error;
            }
            
            setRegistered(true);
            setMessage( "Please check your email for the verification link.");
        } catch(ee) {
            console.log(ee);
            setRegistered(false);
            setMessage( "Unable to create account.");
            
        }finally{
            setLoading(false)}
    }

    async function handleResendEmail() {
        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email: form.email
                ,
                options: {
                    emailRedirectTo: `${import.meta.env.VITE_PUBLIC_SITE_URL}/userInfo?verified=success`
                }
            });

            if (error) {
                throw error;
            }

            setMessage("Verification email sent successfully.");
        } catch {
            setMessage("Unable to resend verification email.");
        }
    }
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
                <button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? "Working..." : "Submit"}</button>   
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
