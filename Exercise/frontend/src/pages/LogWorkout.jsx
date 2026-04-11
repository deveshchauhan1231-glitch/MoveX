import Navbar from "../components/common/Navbar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LogWorkout.css"
import Footer from '../components/common/Footer';
import { useNavigate } from "react-router-dom";
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";

function Log() {
  const [data, setData] = useState([]);
  const [exDone, setExDone] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ex, setEx] = useState({

    exerciseName: "",
    type: "",
    duration: 0,
    reps: 0,
    weight: 0,
    distance: 0,
    sets: 0
  });
  const [auth, setAuth] = useState(true);

  
  const [weight, setWeight] = useState(0);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  

  useEffect(() => {
    (async () => {
      try {
        const temp = await axios.get(`${BACKEND_URL}/info/getAllExercises`);
        setData(temp.data);

        const temp2 = await axios.get(
          `${BACKEND_URL}/progress/getExercise`,
          { withCredentials: true }
        );

        setExDone(Array.isArray(temp2.data.allExercises) ? temp2.data.allExercises : []);

        const wt = await axios.get(`${BACKEND_URL}/users/info`, {
          withCredentials: true,
        });
        setWeight(wt.data?.info?.weight || 0);

        setLoading(false);
      } catch (err) {
        console.log("error in useEffect", err);
        if (err.response?.status === 400) {
          setData([]);
        }
        else if (err.response?.status === 401) {
          setAuth(false);
          setLoading(false);
        }
        else setServerError(true);
      }
    })();
  }, []);

  function handleChange(e) {
    setEx(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(ex.name===""){
      alert("invalid exercise")
    }
    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/progress/postDailyExercises`,
        { exercises: [ex] },
        { withCredentials: true }
      );
      
      const met = data.find(item => item.name === ex.exerciseName)?.met;
      const caloriesBurned = (met * weight * 3.5 / 200) * ex.duration;
      
      

      const Strength = (ex.sets * ex.reps * ex.weight);

      

      await axios.post(
        `${BACKEND_URL}/progress/postDailyStats`, {
        calories: caloriesBurned,
        strength: Strength
      },
        { withCredentials: true }
      );

      const temp = await axios.get(
        `${BACKEND_URL}/progress/getExercise`,
        { withCredentials: true }
      );

      console.log("getExercise after post", temp.data);
      setExDone(Array.isArray(temp.data.allExercises) ? temp.data.allExercises : []);
      setLoading(false);
    } catch (err) {
      console.log("error in handleSubmit", err);
      if (err.response?.status === 400) {
        setExDone([]);
      }
      else setServerError(true);
    }
  }

  if (serverError) return <ServerUnavailable />;

  if (loading) {
    return (
      <div className="page-frame">
        <Navbar />
        <div className="loading-page">
          <div className="loading-text">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="page-frame">
        <Navbar />

        <div className="loading-page">
          <div className="auth-gate-card">
            <h1>Sign in to continue</h1>
            <p>
              Save your workouts, track your progress, and see your performance analytics.
            </p>

            <button
              className="auth-gate-btn"
              onClick={() => navigate("/Login")}
            >
              Sign in
            </button>
          </div>
        </div>

        <Footer />
      </div>);
  }

  return (
    <div className="page-frame">
      <Navbar />
      <div className="main-container">
        {/* Form on top */}
        <form className="exercise-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="text-input"
              type="text"
              name="exerciseName"
              value={ex.exerciseName}
              onChange={handleChange}
              placeholder="Enter exercise name"
              list="exerciseList"
            />
          </div>

          <datalist id="exerciseList">
            {data.map((item) => (
              <option key={item._id} value={item.name} />
            ))}
          </datalist>



          {data.find(item => item.name === ex.exerciseName)?.type === "distance" && (
            <div className="input-group">
              <label style={{color:"white"}}>Distance:</label>
              <input
                className="number-input"
                type="number"
                name="distance"
                placeholder="Distance (km)"
                value={ex.distance}
                onChange={handleChange}
              />
            </div>
          )}

          

          {data.find(item => item.name === ex.exerciseName)?.type === "reps" && (
            <div className="reps-group">
              {data.find(item => item.name === ex.exerciseName)?.usesWeight && (
                <>
                  <label className="labels" style={{color:"white"}}>weight:</label>
                  <input
                    className="number-input"
                    type="number"
                    name="weight"
                    placeholder="Weight KG"
                    value={ex.weight}
                    onChange={handleChange}
                  />
                </>)}

              <label className="labels" style={{color:"white"}}>sets:</label>
              <input
                className="number-input"
                type="number"
                name="sets"
                placeholder="Number of sets"
                value={ex.sets}
                onChange={handleChange}
              />
              <label className="labels" style={{color:"white"}}>reps:</label>
              <input
                className="number-input"
                type="number"
                name="reps"
                placeholder="Number of reps"
                value={ex.reps}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input-group">
            <label style={{color:"white"}}>Duration: </label>
            <input
              className="number-input"
              type="number"
              name="duration"
              placeholder="Duration of exercise in minutes"
              value={ex.duration}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="submit-btn" type="submit">
              Save exercise
            </button>
          </div>
        </form>

        {/* Cards below */}
        <div className="cards-list">
          <div className="cards-wrapper">
            {exDone.map((day) =>
              (day.exercises || []).map((item) => (
                <div className="exercise-card" key={item._id}>
                  <div className="card-name">{item.exerciseName}</div>
                  <div className="card-details">
                    Type: {item.type}
                    {item.reps ? ` | Reps: ${item.reps} | Sets: ${item.sets} ${item.usesWeight ? `| Weight : ${item.weight}` : ""}` : ""}
                    {item.weight ? ` | Weight: ${item.weight}` : ""}

                    {item.duration ? ` | Duration: ${item.duration} min` : ""}
                    {item.distance ? ` | Distance: ${item.distance}` : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Log;
