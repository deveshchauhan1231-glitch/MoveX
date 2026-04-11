import Navbar from "../components/common/Navbar.jsx"
import Footer from "../components/common/Footer.jsx"
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"

function Home(){
    const navigate=useNavigate();
    return(
        <div className="h-frame">
        <Navbar />
        <div className="hero-top">
            <div className="h-info">
                <span style={{fontSize:"3.75rem", color:"#cfd6df",fontWeight:"700"}}>.Track .Train</span>
                <span style={{fontSize:"3.75rem", color:"#2bab6f",fontWeight:"700"}}>.Transform</span>
                <p style={{fontSize:"1.25rem", color:"#cfd6df",fontWeight:"700"}}>Browse exercises, log your workouts, and watch your progress unfold with beautiful analytics and an AI coach Sahay by your side.</p>
                <div className="btns">
                    <button className="h-btn" onClick={()=>navigate("./Exercises")}>Browse Exercises</button>
                <button className="h-btn" onClick={()=>navigate("/Sahay")}>Explore Sahay</button>  
                </div>
                
            </div>
            <img className="h-img" src="hero-gym.jpg"/>
        </div>
        <div className="hero-bottom"></div>
        <Footer />
        </div>
    )
}
export default Home;