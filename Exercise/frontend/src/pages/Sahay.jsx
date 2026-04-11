
import { useState } from "react";
import axios from "axios";
import "../styles/sahay.css"
import Footer from '../components/common/Footer';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx"
import ServerUnavailable from "./ServerUnavailable.jsx";
import { BACKEND_URL } from "../config/api.js";

function Sahay() {
    const navigate=useNavigate();
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    async function sendQuery() {
        try {
            setLoading(true);

            const ans = await axios.post(`${BACKEND_URL}/chatbot/fitness-chat`, {
                message: query
            }, {
                withCredentials: true
            });

            setMessages(prev => [...prev, {
                role: "ai",
                query: ans.data.reply
            }]);

            setLoading(false);

        } catch (err) {
            if (err.response?.status === 401) {
          setMessages(prev => [...prev, {
                role: "ai",
                query: "Please Sign up or log in to continue"
            }]);
            setLoading(false);
        }
        else setServerError(true);
        }
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setMessages(prev => [...prev, {
            role: "user",
            query: query
        }]);

        sendQuery();
        setQuery("");
    }

    if(serverError) return <ServerUnavailable />;

    return (
        <>
        <Navbar />
            <div className="s-frame">
                
                <div className="s-container">

                    <div className="chat-area">
                        {messages.map((message, index) => {
                            if (message.role === "user") {
                                return (
                                    <div key={index} className="u-msg">
                                        <div>
                                            <strong>{message.query}</strong>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="ai-msg">
                                        <div>
                                            <strong>{message.query}</strong>
                                        </div>
                                    </div>
                                )
                            }
                        })}

                        {loading && (
                            <div className="ai-msg">
                                <strong>Loading...</strong>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="s-form">
                        <input
                            type="text"
                            placeholder="Ask Sahay"
                            name="query"
                            value={query}
                            onChange={handleChange}
                            className="s-inp"
                            autoComplete="off"
                        />
                        <button type="submit" className="s-btn">Send</button>
                    </form>

                </div>
                <div className="cc-counter">
                    <p style={{fontSize:"1.2rem"}}><strong>Go beyond calories with <b>Sahay+</b> ,monitor macros and gain clear nutritional insights</strong></p>
                    <img src="./Sahay+.png"/>
                    <button onClick={()=>navigate("/calorie-counter")}>Explore</button>
                </div>
               
            </div>
             <Footer />
        </>
    )
}

export default Sahay;
