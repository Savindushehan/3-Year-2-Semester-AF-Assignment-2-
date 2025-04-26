import React, { useState } from 'react';
import SalyImage from '../../Asserts/Images/Saly-1.png'; // adjust the path if needed
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // import useNavigate

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); // hook for navigation

    const buttonStyle = {
        width: "172px",
        height: "55px",
        color: "#FFFFFF",
        backgroundColor: "#6f5ab8",
        borderTopLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        fontSize: "24px",
        border: "2px solid #846DCC",
        fontFamily: "Roboto",
        cursor: "pointer",
        position: "absolute",
        bottom: "2rem",
        transition: "transform 1s ease",
        transform: isHovered ? "scale(1.3)" : "scale(1)" // zoom on hover
    };
    const handleClick = () => {
        navigate("/CountrySharedpage"); // programmatic navigation
    };

    return (
        <div className="container" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "2rem",
            height: "80vh",
            overflow: "hidden",
            position: "relative"
        }}>
            <img
                src={SalyImage}
                alt="Illustration"
                style={{ maxWidth: "100%", height: "auto" }}
            />

            <div className="words" style={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "1.5rem",
                lineHeight: "1.4"
            }}>
                <h1>
                    Explore Detailed Information<br />
                    on Every Country<br />
                    Worldwide
                </h1>
            </div>

            <button
                id='btn'
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                GetStart
            </button>
        </div>
    );
};

export default Home;
