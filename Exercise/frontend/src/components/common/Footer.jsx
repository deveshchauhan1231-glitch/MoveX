import "../../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-main">

        
        <div className="footer-brand">
          <h2>Movex</h2>
          <p>
            Precision fitness tracking powered by metabolic science and
            personal health analytics.
          </p>
        </div>

        
        <div className="footer-system">
          <h4>System Information</h4>
          <p>Version: v1.2.0</p>
          <p>Last Updated: April 2026</p>
          
        </div>

        
        <div className="footer-dev">
          <h4>Developer</h4>
          <p>Concept, Designed & Developed by</p>
          <strong>Devesh Chauhan</strong>
        </div>

      </div>

      
      <div className="footer-divider"></div>

      
      <div className="footer-bottom">
        <p>© {currentYear} Movex. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;