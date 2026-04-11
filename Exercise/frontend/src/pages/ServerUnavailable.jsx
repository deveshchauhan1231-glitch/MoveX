import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import "../styles/ServerUnavailable.css";

function ServerUnavailable() {
  return (
    <div className="server-page">
      <Navbar />

      <div className="server-wrap">
        <div className="server-box" >
          <h1>Server Unavailable</h1>
          <p>Please try again after some time.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ServerUnavailable;
