import "../styles/About.css"
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <div className="about-page" style={{background:"rgb(17, 17, 17)"}}>  
      <Navbar />
      
      <section className="about-hero">
        <h1>Track. Analyze. Transform.</h1>
        <p>Turning daily sweat into data-driven progress.</p>
      </section>

      <main className="main-content">  
        
        <section className="about-section">
          <h2>The Vision</h2>
          <p>
            We believe fitness shouldn't be a guessing game. Our platform was built for those 
            who crave precision. By combining <strong>MET-based calorie tracking</strong> with 
            visual analytics, we help you make informed choices about your health and performance.
          </p>
        </section>

        
        <div className="feature-grid">
          <div className="feature-card" >
            <div className="icon">📊</div>
            <h3>Activity Heatmaps</h3>
            <p>A full 365-day visualization of your consistency. Never break the chain.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💪</div>  
            <h3>Strength Analytics</h3>
            <p>Track every rep and set to visualize your strength gains over time.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📖</div>
            <h3>MET Library</h3>
            <p>Browse exercises with precision metabolic data and step-by-step guides.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🤖</div>
            <h3>AI Fitness Coach S.A.H.A.Y</h3>
            <p><b>S</b>mart <b>A</b>I for <b>H</b>ealth <b>A</b>nd <b>Y</b>ield provides real-time answers to your health queries powered by Sarvam AI.</p>
          </div>
        </div>

        
        <section className="data-philosophy">
          <h3>The Science Behind the Stats</h3>
          <p>
            Our calculations aren't just estimates. We utilize the 
            <strong> Metabolic Equivalent of Task (MET)</strong> to ensure that your 
            calorie burn data is grounded in physiological research, tailored to the 
            specific intensity of your movements.
          </p>
        </section>
      </main>
      
      <Footer />  
    </div>
  );
};

export default About;
