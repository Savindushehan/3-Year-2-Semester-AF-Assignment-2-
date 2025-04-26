import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const RegisteredHeader = () => {
    const [isHoverBtn1, setIsHoverBtn1] = useState(false);
    const [isHoverBtn2, setIsHoverBtn2] = useState(false);
    const navigate = useNavigate(); 
    const handleCustomizeClick = () => {
        navigate("/AddUser"); 
    };

    const handleSignOutClick =() => {
        navigate("/ManiSharedPage"); 
    }
    const btn1Style = {
        width: "172px",
        height: "55px",
        color: "#FFFFFF",
        backgroundColor: isHoverBtn1 ? "#6f5ab8" : "#846DCC",
        borderTopLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        fontSize: "24px",
        border: "2px solid #846DCC",
        fontFamily: "Roboto",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    const btn2Style = {
        width: "172px",
        height: "55px",
        color: isHoverBtn2 ? "#846DCC" : "#000000",
        backgroundColor: isHoverBtn2 ? "#f1f1f1" : "#ffffff",
        borderTopLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        fontSize: "24px",
        border: "2px solid #846DCC",
        fontFamily: "Roboto",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    return (
        <div className="header-row" style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <div className="header-row-subrow1" style={{ width: "10%", textAlign: "center", fontSize: "24px", fontFamily: "Roboto" }}>
                <h3 style={{ marginLeft: "1rem" }}>CountryGEN</h3>
            </div>
            <div className="header-row-subrow2" style={{ width: "30%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "24px", fontFamily: "Roboto",cursor:"pointer" }}>
                <span onClick={handleSignOutClick} >Home</span>
                <span>About Us</span>
                <span>Contact Us</span>
            </div>
            <div className="header-row-subrow3" style={{ width: "27%", display: "flex", flexDirection: "row", justifyContent: "space-evenly", fontFamily: "Roboto" }}>

            <button
                    id="btn2"
                    style={btn2Style}
                    onMouseEnter={() => setIsHoverBtn2(true)}
                    onMouseLeave={() => setIsHoverBtn2(false)}
                    onClick={handleCustomizeClick}
                >
                    Customize
                </button>

                <button
                    id="btn1"
                    style={btn1Style}
                    onMouseEnter={() => setIsHoverBtn1(true)}
                    onMouseLeave={() => setIsHoverBtn1(false)}
                    onClick={handleSignOutClick}
                >
                    Sign Out
                </button>
               
            </div>
        </div>
    );
};

export default RegisteredHeader;
