import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Exercises.css"
import Navbar from "../components/common/Navbar.jsx"
import Footer from '../components/common/Footer';
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";



function Exercises() {
    const [ex, setEx] = useState("");
    const [loading,setLoading]=useState(true);  
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [exerciseNotFound, setExerciseNotFound] = useState(false);
    const [serverError, setServerError] = useState(false);
    const navigate = useNavigate();
    function handleNameChange(e) {
        setEx(e.target.value);
    }
    function handleFilterChange(e) {
        setFilter(e.target.value);
    }
    async function handleNameSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setExerciseNotFound(false);
            const temp = await axios.get(`${BACKEND_URL}/info/getThatExercise/${ex.toLowerCase()}`);
            setData(temp.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 400) {
                setData([]);
            }
            if (err.response?.status === 404) {
                setData([]);
                setExerciseNotFound(true);
                setLoading(false);
            }
            else if (err.response?.status !== 400) setServerError(true);
        }

    }
    async function handleFilterSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setExerciseNotFound(false);
            const temp = await axios.get(`${BACKEND_URL}/info/getExerciseByFilter/${filter.toLowerCase()}`);
            setData(temp.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 400) {
                setData([]);
            }
            if (err.response?.status === 404) {
                setData([]);
                setExerciseNotFound(true);
                setLoading(false);
            }
            else if (err.response?.status !== 400) setServerError(true);
        }

    }
    useEffect(() => {
        (async () => {
            try {
                setExerciseNotFound(false);
                const temp = await axios.get(`${BACKEND_URL}/info/getAllExercises`);
                setData(temp.data);
                setLoading(false);
            } catch (err) {
                if (err.response?.status === 400) {
                    setData([]);
                }
                else setServerError(true);
            }
        })();
    }, []);

    if(serverError) return <ServerUnavailable />;

    if(loading)
    {
        return(
            <div className="ex-page">
            <Navbar />
            <div className="ex-container-loading">
                <div className="loading">
                    Loading...
                </div>
                
            </div>
            <Footer />
            </div>
        )
    }
    else{
        return (
        <div className="ex-page">
        <Navbar />
            <div className="ex-container">
                <form className="ex-search">
                    <input className="ex-inp" type="text" list="exerciseList" name="name" value={ex} onChange={handleNameChange} placeholder="Enter exercise name" autoComplete="off"/>
                    <button className="ex-btn" type="submit" onClick={handleNameSubmit}>Search</button>
                </form>
                <form className="ex-filter">
                    <input  className="ex-inp" type="text" list="exerciseList" name="name" value={filter} onChange={handleFilterChange} placeholder="Enter body part name" autoComplete="off"/>
                    <button className="ex-btn" type="submit" onClick={handleFilterSubmit}>Search</button>
                </form>
                <datalist id="exerciseList">
            {data.map((item) => (
              <option key={item._id} value={item.name} />
            ))}
          </datalist>

                {exerciseNotFound ? (
                    <div className="ex-not-found" style={{display:"flex", justifyContent:"center", alignItems:"center", width:"50%"}}>
                        <h1>Exercise does not exist.</h1>
                    </div>
                ) : data.map((item) => {
                    
                    
                    return <div key={item.name} className="ex-exCard"
                        onClick={() => navigate(`/iexercise/${item.name}`)}>
                        
                        <h2>{item.name.toUpperCase()}</h2>

                        <div className="ex-steps-list">
                            <h2><strong>Steps</strong></h2>
                            <ol>
                            {item.steps.map((step) => (
                                <li><h3 >{step}</h3></li>
                            ))}
                            </ol>
                        </div>
                        <div className="ex-parts-list">
                            <h2><strong>Body Parts Trained</strong></h2>

                            <ul>
                            {item.bodyParts.map((part, index) => (
                                
                                <li><h3 key={index}>{part.toUpperCase()}</h3></li>
                            ))}
                            </ul>
                        </div>
                        <h3>MET VALUE:  {item.met}</h3>

                    </div>;
                })}
            </div>
            <Footer />
        </div>
        )
    }
    
    
}
export default Exercises;
