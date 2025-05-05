import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../SharedComponents/AuthContext'; // adjust path if needed
import LoginImage from '../../Asserts/Images/Login.png'; // adjust the path if needed

const LoginPage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useAuth(); // access setUserId from context

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            console.log("User UID:", uid); // for debugging
            setUserId(uid); // ✅ Store UID in context
            setSuccess('Logged in successfully!');
            navigate("/RegisteredUserSharedPage");
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };
    

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
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s ease",
        marginTop: "1rem",
        textAlign: "center"
    };

    const inputContainerStyle = {
        display: "flex",
        alignItems: "center",
        background: "#f4f4fa",
        borderRadius: "12px",
        padding: "0.8rem 1rem",
        width: "100%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        border: "1px solid #ddd"
    };

    const inputStyle = {
        border: "none",
        outline: "none",
        background: "transparent",
        width: "100%",
        fontSize: "16px",
        fontFamily: "Roboto",
        marginLeft: "0.75rem",
        color: "#333"
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, #e9e4f0, #f9f9f9)"
        }}>
             <img
                src={LoginImage}
                alt="Illustration"
                style={{ maxWidth: "35%", height: "auto" , position:"absolute",zIndex:"1", left:"8%" }}
            />
            <form onSubmit={handleLogin} style={{
                width: "360px",
                padding: "2.5rem",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem"
            }}>
                <h2 style={{
                    fontFamily: "Raleway",
                    fontSize: "2rem",
                    textAlign: "center",
                    marginBottom: "1rem",
                    color: "#6f5ab8"
                }}>Welcome Back</h2>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

                {/* Email Field */}
                <div style={inputContainerStyle}>
                    <FaEnvelope color="#6f5ab8" size={18} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Password Field */}
                <div style={inputContainerStyle}>
                    <FaLock color="#6f5ab8" size={18} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Login Button */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
