import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import axios from "axios";
import "../styles/CalorieCounter.css"
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";

function CalorieCounter() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [result, setResult] = useState({
    total_cal: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    insights: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("message", image);

      const { data } = await axios.post(
        `${BACKEND_URL}/image/calorie-counter`,
        formData,
        {
          withCredentials: true,
        }
      );

      setResult({
        total_cal: data.total_cal || 0,
        protein: data.protein || 0,
        fats: data.fats || 0,
        carbs: data.carbs || 0,
        insights: data.insights || "",
      });
    } catch (error) {
      console.error(error);
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  if (serverError) return <ServerUnavailable />;

  return (
    <>
      <Navbar />
      
      <div className="cc-page">
        <div className="cc-container">
          {/* Header */}
          <div className="cc-header">
            <h1>Sahay+</h1>
            <p>Upload food photo for instant calorie & macro breakdown</p>
            <p>Sahay+ may make mistakes; please verify with reliable sources. For general guidance only—not professional dietary or medical advice.</p>
          </div>

          {/* Upload + Results */}
          <div className="cc-main-grid">
            {/* Upload */}
            <div className="cc-upload-section">
              <label htmlFor="food-upload" className="cc-upload-zone">
                {preview ? (
                  <img src={preview} alt="Food preview" className="cc-preview" />
                ) : (
                  <>
                    
                    <h3>Upload Food Photo</h3>
                    <p>Snap or drag your meal picture</p>
                  </>
                )}
              </label>
              <input
                id="food-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cc-file-input"
              />
            </div>

            {/* Results */}
            <div className="cc-results-section">
              <div className="cc-calories">
                <h2>{result.total_cal} KCAL</h2>
                <p>Total estimated energy</p>
              </div>

              <div className="cc-macros">
                <div className="cc-macro">
                  <span className="cc-value">{result.protein}g</span>
                  <span>Protein</span>
                </div>
                <div className="cc-macro">
                  <span className="cc-value">{result.carbs}g</span>
                  <span>Carbs</span>
                </div>
                <div className="cc-macro">
                  <span className="cc-value">{result.fats}g</span>
                  <span>Fats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="cc-bottom-section">
            <div className="cc-insights">
              <h3>Movex Nutrition Insight</h3>
              <p>{result.insights || "Upload to get personalized nutrition advice"}</p>
            </div>

            <div className="cc-actions">
              <button 
                className="cc-analyze-btn"
                onClick={handleAnalyze} 
                disabled={!image || loading}
              >
                {loading ? "Analyzing..." : "Analyze Meal"}
              </button>
              <button 
                className="cc-reset-btn"
                onClick={() => {
                  setImage(null);
                  setPreview("");
                  setResult({ total_cal: 0, protein: 0, fats: 0, carbs: 0, insights: "" });
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CalorieCounter;
