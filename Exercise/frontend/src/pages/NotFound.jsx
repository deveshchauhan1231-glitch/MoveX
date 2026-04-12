import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate=useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width:"100vw",
      minHeight: "100vh",
      textAlign: "center",
      padding: "2rem",
      background: "#f8f9fa",
      color: "#333"
    }}>
      <h1 style={{ fontSize: "8rem", margin: 0 , color:"#2bab6f"}}>404</h1>
      <h2 style={{ margin: "1rem 0" }}>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <button style={{background:"#2bab6f"}} onClick={()=>navigate("/")}>Go back to Home</button>
    </div>
  );
};

export default NotFound;
