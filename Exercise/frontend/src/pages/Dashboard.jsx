import HeatMap from "@uiw/react-heat-map";
import axios from "axios";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import "../styles/Dashboard.css"
import { useState,useEffect } from "react";
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalStrength, setTotalStrength] = useState(0);
  const[pb,setPb]=useState({cal:0,str:0})
  const [heatMapData, setHeatMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const temp=await axios.get(`${BACKEND_URL}/users/info` ,{withCredentials: true});
        console.log(temp.data);
        
        setUserName(temp.data.info.name);
        const [totalsRes, heatmapRes, bestRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/progress/getTotalCalandStr`, {
            withCredentials: true
          }),
          axios.get(`${BACKEND_URL}/progress/getHeatMapInfo`, {
            withCredentials: true
          }),
          axios.get(`${BACKEND_URL}/progress/getBest`,{withCredentials:true})
        ]);

        setTotalCalories(totalsRes.data.totalCal || 0);
        setTotalStrength(totalsRes.data.totalStrength || 0);
        setPb({ cal: bestRes.data.maxCalories || 0, str: bestRes.data.maxStrength || 0 });
        const heatmapData = heatmapRes.data.map((stat) => ({
          date: stat.date,
          calories: stat.calories || 0,
          strength: stat.strength || 0,
          count: Math.round((stat.calories || 0) + (stat.strength || 0))
        }));

        setHeatMapData(heatmapData);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getHeatmapTooltip = (date) => {
    const dayData = heatMapData.find((item) => item.date === date);
    if (!dayData || dayData.count === 0) return "";

    return `${new Date(date).toLocaleDateString("en-IN")}
Calories Burned: ${dayData.calories}
Volume Lifted: ${dayData.strength}`;
  };

  if (serverError) return <ServerUnavailable />;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-loading" style={{background:"rgb(17, 17, 17)", color:"white"}}>
          Loading your progress...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container" style={{background:"rgb(17, 17, 17)"}}>

        <div className="dashboard-header">
          <h1>Welcome back, {userName}</h1>
          <p style={{color:"white"}}>Your performance analytics overview</p>
        </div>

        <div className="stats-container">

          <div className="stat-card calories" style={{background:"rgb(44,43,43)"}}>
            <h3 style={{color:"white"}}>Total Calories Burned</h3>
            <div className="stat-number">
              {totalCalories.toLocaleString()} Kcal
            </div>
          </div>

          <div className="stat-card strength" style={{background:"rgb(44,43,43)"}}>
            <h3 style={{color:"white"}}>Total Volume Lifted</h3>
            <div className="stat-number">
              {totalStrength.toLocaleString()} KG
            </div>
          </div>

          <div className="stat-card pb" style={{background:"rgb(44,43,43)"}}>
            <h3 style={{color:"white"}}>Personal Best</h3>
            <div className="stat-number">
              <p>{pb.cal} Kcal & {pb.str} KG </p>
              
            </div>
          </div>

        </div>
        <div className="heatmap-section">

          <h2>Your Activity (Last 365 Days)</h2>

          <div className="heatmap-wrapper" style={{background:"rgb(44, 43, 43)", color:"white"}}>
            <HeatMap
              style={{color:"white"}}
              width={1000}
              value={heatMapData}
              startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
              rectRender={(props, data) => (
                <rect {...props}>
                  <title>{getHeatmapTooltip(data.date)}</title>
                </rect>
              )}
              rectProps={{
                rx: 4
              }}
              panelColors={{
  0: "#d7f5e6",
  20: "#a8e6c8",
  40: "#73d9a6",
  60: "#41c78a",
  80: "#2bab6f",
  100: "#1e8f5c"
}}
            />
          </div>

          <p className="heatmap-info">
            Darker green indicates higher activity levels.
          </p>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Dashboard;
