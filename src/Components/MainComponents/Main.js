import React from 'react';
import SalyImage from '../../Asserts/Images/Saly-44.png'; // Update the path if necessary

const Main = () => {
    return (
        <div
            className="main-container"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2rem",
                height: "80vh",
                overflow: "hidden",
                position: "relative",
                flexWrap: "wrap",
                gap: "2rem",
                overflowX:"hidden"
            }}
        >
            <img
                src={SalyImage}
                alt="Illustration"
                style={{
                    maxWidth: "100%",
                    width: "400px",
                    height: "auto",
                    flex: "1 1 40%"
                }}
            />

            <div
                className="text-content"
                style={{
                    flex: "1 1 50%",
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "1.25rem",
                    lineHeight: "1.6",
                    textAlign: "left"
                }}
            >
                <h1 style={{ marginBottom: "0.5rem", fontSize: "2rem" }}>
                    Explore accurate and up-to-date<br />
                    information on countries worldwide —
                </h1>
                <p>
                    Including{" "}
                    <span style={{ color: "#7B00FF", fontWeight: 500 }}>
                        demographics, economy, culture,
                    </span>{" "}
                    and more. Perfect for students, researchers, and global explorers.
                </p>
            </div>
            
        </div>
    );
};

export default Main;
