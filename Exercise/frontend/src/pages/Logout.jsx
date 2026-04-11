import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/logout.css"
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";
function Logout()
{
    const[loggedOut,setLoggedOut]=useState(false);
    const [serverError, setServerError] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                await axios.post(`${BACKEND_URL}/auth/logout`,{},{withCredentials:true});
                setLoggedOut(true);
            } catch (err) {
                console.log(err);
                setServerError(true);
            }
        })();
    }, []);

    if(serverError) return <ServerUnavailable />;

    if(loggedOut)
    {
        
        return(
        <>
        <Navbar />
        <div className="l-frame">
            <div className="l-content">
                <h2>Logged out successfully</h2>
            </div>
        </div>
        <Footer />
        </>
    )
    }
    else{
        return(
        <>
        <Navbar />
        <div className="l-frame">
            <div className="l-content">
                <h2>Failed to Log out successfully, please try again later</h2>
            </div>
        </div>
        <Footer />
        </>)
    }
}
export default Logout;
