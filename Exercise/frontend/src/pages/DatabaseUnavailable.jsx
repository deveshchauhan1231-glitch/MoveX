import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import "../styles/DatabaseUnavailable.css";

function DbError() {
  return (
    <div className="db-page">
      <Navbar />

      <div className="db-wrap">
        <div className="db-box">
          <h1>Database Unavailable</h1>
          <p>Please try again after some time.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DbError;