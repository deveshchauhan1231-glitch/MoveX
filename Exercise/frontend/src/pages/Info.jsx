import Navbar from "../components/common/Navbar.jsx"
import Footer from "../components/common/Footer.jsx"
import axios from "axios"
import "../styles/info.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";




function Info(){
    const [info, setInfo] = useState({
    _id: "",
    name: "",
    steps: [],
    bodyParts: [],
    met: 0,
    type:"",
    usesWeight:true
});

    function getInsight(info) {
  const { met, usesWeight, type, bodyParts } = info;
  const parts = bodyParts.map(p => p.toLowerCase());

  
  if (met >= 9 && type === "distance")
    return "One of the highest calorie-burning exercises you can do — track your pace, not just distance.";

  if (met >= 8 && !usesWeight)
    return "High intensity with zero equipment — impressive calorie burn per session.";

  if (type === "time")
    return "Hold duration matters more than reps — increase by 5–10 seconds each week.";

  if (type === "distance")
    return "Increase distance by no more than 10% per week to avoid overuse injuries.";

  if (usesWeight && parts.includes("shoulders"))
    return "Rotator cuff is vulnerable — never rush progressive overload here.";

  if (usesWeight && met >= 5)
    return "Progressive overload friendly — aim to add weight or reps every week.";

  if (!usesWeight && parts.includes("back"))
    return "Master bodyweight form here before ever adding external resistance.";

  if (parts.includes("legs"))
    return "Largest muscle group in the body — consistency here pays off everywhere.";

  if (parts.includes("core"))
    return "Core strength carries over to every other lift you do.";

  if (parts.includes("back"))
    return "Keep your spine neutral throughout — form over weight, always.";

  if (parts.includes("chest"))
    return "Breathe out on the push, in on the return — rhythm matters.";

  
  return "Consistency beats intensity — showing up regularly is what drives results.";
}

    const[loading,setLoading]=useState(true);
    const [serverError, setServerError] = useState(false);

    const { name }=useParams();
    useEffect(() => {
        (async () => {
            try {
                const temp = await axios.get(`${BACKEND_URL}/info/getThatExercise/${name}`);
                setInfo(temp.data[0]);
                setLoading(false);
            } catch (err) {
                if (err.response?.status === 400) {
                    setInfo({
    _id: "",
    name: "",
    steps: [],
    bodyParts: [],
    met: 0,
    usesWeight:false,
    type:""
});
                }
                else setServerError(true);
            }
        })();
    }, [name]);
    const percent = Math.min((info.met / 10) * 100, 100);
    const insight=getInsight(info);
    if(serverError) return <ServerUnavailable />;
    if(loading)
    {
        return(
            <>
            <Navbar />
            <div className="container-loading">
                <div className="loading">Loading...</div>
                
            </div>
            </>
        )
    }
    else{
        return(
        <>
        <Navbar />
        <div className="container">
            
            <div className="top-hero">
                <div className="img-hero" ><h1>Images coming soon</h1></div>
                <div className="tech-info">
                    <div className="detail-info"><h2>{info.name.toUpperCase()}</h2></div>
                    <div className="detail-info">
                        <p >INTENSITY SCORE</p>
                        <h1><strong>{info.met}</strong></h1>
                        <div className="progress">
  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
</div>
                    </div>
                </div>
                </div>{/*here image , met score, name */}
            <div className="parts"><ul>{info.bodyParts.map((parts)=>(
                        <strong><li>{parts.toUpperCase()}</li></strong>
                    ))}</ul></div>{/*here the body parts it trains*/}
            <div className="bottom-hero">
                <div className="steps">{info.steps.map((step,i)=>(
                        <h3>{i+1+")"+step}</h3>
                    ))}</div>
                <div className="basic-info">
                    <h2>Movex Insights</h2>{insight}</div>
                </div>{/*here we have to add the steps*/}
        </div>
        <Footer />
</>
    )
    }
    
}
export default Info;
