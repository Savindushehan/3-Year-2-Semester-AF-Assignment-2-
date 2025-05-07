import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../SharedComponents/AuthContext';
import LoginImage from '../../Asserts/Images/Login.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useAuth();

    useEffect(() => {
        const cssId = 'bootstrap-css';
        const jsId = 'bootstrap-js';

        if (!document.getElementById(cssId)) {
            const bootstrapCSS = document.createElement('link');
            bootstrapCSS.id = cssId;
            bootstrapCSS.rel = 'stylesheet';
            bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
            document.head.appendChild(bootstrapCSS);
        }

        if (!document.getElementById(jsId)) {
            const bootstrapJS = document.createElement('script');
            bootstrapJS.id = jsId;
            bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
            document.body.appendChild(bootstrapJS);
        }

        return () => {
            const css = document.getElementById(cssId);
            const js = document.getElementById(jsId);
            if (css) document.head.removeChild(css);
            if (js) document.body.removeChild(js);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            setUserId(uid);
            setSuccess('Logged in successfully!');
            navigate("/RegisteredUserSharedPage");
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light position-relative">
            <img
                src={LoginImage}
                alt="Illustration"
                className="position-absolute"
                style={{ maxWidth: "35%", left: "8%", zIndex: 10 }}
            />

            <form
                onSubmit={handleLogin}
                className="bg-white rounded-4 p-5 shadow-lg"
                style={{ maxWidth: "400px", width: "100%", zIndex: 2 }}
            >
                <h2 className="text-center text-primary mb-4">Welcome Back</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}

                <div className="mb-3 input-group">
                    <span className="input-group-text bg-light">
                        <FaEnvelope className="text-primary" />
                    </span>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 input-group">
                    <span className="input-group-text bg-light">
                        <FaLock className="text-primary" />
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-pill"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
