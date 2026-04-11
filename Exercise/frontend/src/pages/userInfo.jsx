import React from "react";
import { useState } from "react";
import axios from "axios";
import "../styles/userInfo.css"
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";
function UserInfo() {
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const [info, setInfo] = useState({
        name: "",
        gender: "",
        age: 0,
        weight: 0,
    });
    const[updated,setUpdated]=useState(false);
    const [message, setMessage] = useState("");
    const [serverError, setServerError] = useState(false);

    const token = searchParams.get("token");

    function handleChange(e) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e){
        e.preventDefault();
        if (!token) {
            setMessage("Your verification session is missing or expired. Please verify your email again.");
            return;
        }
        try{
            await axios.post(`${BACKEND_URL}/auth/complete-profile`,{
                token,
                name: info.name,
                gender: info.gender,
                age: Number(info.age),
                weight: Number(info.weight)
            });
            setUpdated(true);
            navigate("/Login?profile=completed");
        }catch(err){
            setMessage(err.response?.data?.message || "Unable to save your info.");
            setServerError(true);
        }
    }

    if(serverError) return <ServerUnavailable />;

    if(!updated){
        return (
        <>
        <Navbar />
            <div className="u-frame">
                <form className="u-form">
                    {message ? <p>{message}</p> : null}
                    <div className="u-field"><label>Name:</label>
                    <input className="u-inp" type="text" value={info.name} onChange={handleChange} name="name" autoComplete="off"/></div>

                    <div className="u-field">
                    <label>Gender:</label>
                    <select name="gender" className="u-inp" value={info.gender} onChange={handleChange}>
                        <option value="">-- Select gender -- </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select></div>

                    <div className="u-field"><label>Age:</label>
                    <input type="text" value={info.age} className="u-inp" onChange={handleChange} name="age" /></div>

                    <div className="u-field"><label>Weight:</label>
                    <input type="text" value={info.weight} className="u-inp" onChange={handleChange} name="weight" /></div>
                    <button type="submit" onClick={handleSubmit} className="u-btn">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    )
    }
    return null;
}
export default UserInfo;
